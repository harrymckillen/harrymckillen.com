<script setup is:inline>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const canvasRef = ref(null);
let scene, camera, renderer, animationId;
let grid, sun, stars, delorean;
let time = 0;
let deloreanAnimationProgress = 0;
let deloreanAnimationComplete = false;

const loadDelorean = () => {
  const loader = new GLTFLoader();

  loader.load(
    "/delorean-dmc-12/scene.gltf",
    (gltf) => {
      delorean = gltf.scene;

      delorean.scale.set(0.02, 0.02, 0.02);
      // Start in foreground, will animate to final position
      delorean.position.set(-4.5, -11.85, 10);
      delorean.rotation.y = Math.PI * 1.5; // Rotate towards cityscape

      delorean.traverse((child) => {
        if (child.isMesh) {

          // Handle both MeshStandardMaterial and other materials
          if (child.material.type === "MeshStandardMaterial" ||
            child.material.type === "MeshPhysicalMaterial") {
            child.material.needsUpdate = true;

            // Maximum metalness and minimum roughness for chrome
            child.material.metalness = 0.9;
            child.material.roughness = 0.1;
            child.material.envMapIntensity = 1.2;
          } else {
            // Convert non-PBR materials to MeshStandardMaterial
            const oldMaterial = child.material;
            child.material = new THREE.MeshStandardMaterial({
              color: oldMaterial.color || 0xcccccc,
              metalness: 1.0,
              roughness: 0.05,
              envMapIntensity: 2.0,
              map: oldMaterial.map,
              normalMap: oldMaterial.normalMap,
            });
          }

          child.receiveShadow = true;
          child.matrixAutoUpdate = false;
          child.updateMatrix();
        }
      });

      scene.add(delorean);

    },
    (progress) => {
      // Progress callback - optional for debugging
    },
    (error) => {
      console.error("Error loading DeLorean:", error);
    },
  );
};

const initScene = () => {
  if (!canvasRef.value) return;

  // Scene setup
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x060231);
  scene.fog = new THREE.Fog(0x060231, 70, 200);

  // Camera setup
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / 680, 0.1, 2000);
  camera.position.set(0, 4, 15);
  camera.lookAt(0, 0, -20);

  // Renderer setup
  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    antialias: true,
    alpha: false,
  });
  renderer.setSize(window.innerWidth, 680);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Use tone mapping for better metallic appearance
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  // CREATE ENVIRONMENT MAP for metallic reflections
  const pmremGenerator = new THREE.PMREMGenerator(renderer);

  // Create a colorful vaporwave environment
  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0x808080);


  // Create a gradient using a shader material for the environment
  const envGeometry = new THREE.SphereGeometry(500, 60, 40);
  const envMaterial = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    vertexShader: `
    varying vec3 vWorldPosition;
    void main() {
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    varying vec3 vWorldPosition;
    void main() {
      float h = normalize(vWorldPosition).y;
      // Gradient from cyan (bottom) to pink (top)
      vec3 topColor = vec3(0.97, 0.4, 0.98); // Pink
      vec3 bottomColor = vec3(0.0, 1.0, 1.0); // Cyan
      vec3 color = mix(bottomColor, topColor, h * 0.5 + 0.5);
      gl_FragColor = vec4(color * 2.0, 1.0); // Multiply by 2 for brightness
    }
  `
  });

  const envSphere = new THREE.Mesh(envGeometry, envMaterial);
  envScene.add(envSphere);


  // Generate environment map
  const envMap = pmremGenerator.fromScene(envScene).texture;
  scene.environment = envMap;

  pmremGenerator.dispose();


  // Create starfield
  createStars();

  // Create retrowave grid
  createGrid();

  // Create sun
  createSun();

  // Create cityscape
  createCityscape();

  // Load DeLorean model
  loadDelorean();

  // Add a solid floor plane to hide everything below
  const floorGeometry = new THREE.PlaneGeometry(1000, 1000);
  const floorMaterial = new THREE.MeshBasicMaterial({
    color: 0x060231,
    side: THREE.DoubleSide,
  });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -3.01; // Slightly below the grid
  scene.add(floor);

  const ambientLight = new THREE.AmbientLight(0xffffff, 3); // Reduced from 13
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
  directionalLight.position.set(5, 10, 5);
  scene.add(directionalLight);

  const directionalLight2 = new THREE.DirectionalLight(0xf867fa, 40);
  directionalLight2.position.set(0, 5, 0);
  scene.add(directionalLight2);

  const directionalLight3 = new THREE.DirectionalLight(0x00ffff, 15);
  directionalLight3.position.set(-5, 3, -5);
  scene.add(directionalLight3);


  // Start animation
  animate();
};

const createStars = () => {
  const starsGeometry = new THREE.BufferGeometry();
  const starsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.5,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.8,
  });

  const starsVertices = [];
  const starsSizes = [];

  for (let i = 0; i < 1500; i++) {
    // Create stars in a circular pattern
    const radius = 50 + Math.random() * 100; // Distance from center: 50-150 units
    const theta = Math.random() * Math.PI * 2; // Random angle around circle
    const phi = Math.random() * Math.PI; // Random angle for sphere distribution

    // Convert spherical coordinates to Cartesian
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = -200 + radius * Math.cos(phi); // Center at Z: -120 (behind sun at -110)

    starsVertices.push(x, y, z);
    starsSizes.push(Math.random() * 4 + 1);
  }

  starsGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starsVertices, 3),
  );

  starsGeometry.setAttribute(
    "size",
    new THREE.Float32BufferAttribute(starsSizes, 1),
  );

  stars = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(stars);
};

const createStarsX = () => {
  const starsGeometry = new THREE.BufferGeometry();
  const starsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.5,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.8,
  });

  const starsVertices = [];
  const starsSizes = [];

  for (let i = 0; i < 1500; i++) {
    const x = (Math.random() - 0.5) * 300;
    const y = Math.random() * 50 + 0.1;
    const z = -101 - Math.random() * 100;
    starsVertices.push(x, y, z);

    starsSizes.push(Math.random() * 4 + 1);
  }

  starsGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starsVertices, 3),
  );

  starsGeometry.setAttribute(
    "size",
    new THREE.Float32BufferAttribute(starsSizes, 1),
  );

  stars = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(stars);
};

const createGrid = () => {
  const gridGroup = new THREE.Group();

  // Create the classic vaporwave grid floor with tiling
  const gridSize = 500;
  const divisions = 100;

  // Create multiple grid planes for seamless tiling
  for (let i = 0; i < 3; i++) {
    const planeGroup = new THREE.Group();

    // Create horizontal and vertical lines only (no diagonals)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.7,
      linewidth: 2,
    });
    // Create a second layer for the glow effect
    const glowMaterial = new THREE.LineBasicMaterial({
      color: 0xf867fa,
      transparent: true,
      opacity: 0.2,
      linewidth: 6,
    });

    const step = gridSize / divisions;

    // Create horizontal lines
    for (let j = 0; j <= divisions; j++) {
      const points = [];
      const y = -gridSize / 2 + j * step;
      points.push(new THREE.Vector3(-gridSize / 2, y, 0));
      points.push(new THREE.Vector3(gridSize / 2, y, 0));

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, lineMaterial);
      planeGroup.add(line);

      // Add glow layer
      const glowLine = new THREE.Line(geometry.clone(), glowMaterial);
      planeGroup.add(glowLine);
    }

    // Create vertical lines
    for (let j = 0; j <= divisions; j++) {
      const points = [];
      const x = -gridSize / 2 + j * step;
      points.push(new THREE.Vector3(x, -gridSize / 2, 0));
      points.push(new THREE.Vector3(x, gridSize / 2, 0));

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, lineMaterial);
      planeGroup.add(line);

      // Add glow layer
      const glowLine = new THREE.Line(geometry.clone(), glowMaterial);
      planeGroup.add(glowLine);
    }

    planeGroup.rotation.x = -Math.PI / 2;
    planeGroup.position.y = -3;
    // Start grid at sun's Z position (-50) and extend forward
    planeGroup.position.z = -50 + i * gridSize;

    gridGroup.add(planeGroup);
  }

  grid = gridGroup;
  scene.add(grid);
};

const createSun = () => {
  // Create flat disc instead of sphere
  const sunGeometry = new THREE.CircleGeometry(40, 64);
  const sunMaterial = new THREE.MeshBasicMaterial({
    // color: 0xffffff,
    color: 0xf867fa,
    transparent: false,
    side: THREE.DoubleSide,
  });

  sun = new THREE.Mesh(sunGeometry, sunMaterial);
  sun.position.set(0, 7, -110);

  // Add sun glow ring
  const glowGeometry = new THREE.RingGeometry(40, 42, 64);
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0xff00ff,
    transparent: true,
    opacity: 0.4,
    side: THREE.DoubleSide,
  });
  const glow = new THREE.Mesh(glowGeometry, glowMaterial);
  sun.add(glow);

  scene.add(sun);
};

const createCityscape = () => {
  const cityscapeGroup = new THREE.Group();

  // Create 40 buildings positioned in a condensed grid pattern
  const numBuildings = 40;
  const buildingsPerRow = 10; // 10 buildings per row

  for (let i = 0; i < numBuildings; i++) {
    const row = Math.floor(i / buildingsPerRow);
    const col = i % buildingsPerRow;

    const width = 2 + Math.random() * 3;
    const height = 4 + Math.random() * 20;
    const depth = 3 + Math.random() * 3;

    // Building geometry
    const buildingGeometry = new THREE.BoxGeometry(width, height, depth);
    const buildingMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: false,
      opacity: 1,
    });

    const building = new THREE.Mesh(buildingGeometry, buildingMaterial);

    // Position buildings in a condensed grid centered on the scene (no random offset)
    building.position.set(
      (col - buildingsPerRow / 2) * 6, // X: evenly spaced, no random offset
      height / 2 - 3, // Y: base at grid level
      -85 - row * 8, // Z: rows going back into scene, no random offset
    );

    // Add glowing edges to building
    const edges = new THREE.EdgesGeometry(buildingGeometry);
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0x00ffff,
      linewidth: 1,
    });
    const edgeLines = new THREE.LineSegments(edges, edgeMaterial);
    building.add(edgeLines);

    // Create windows
    const windowsPerFloor = Math.floor(width / 1.5);
    const floors = Math.floor(height / 2);

    for (let floor = 0; floor < floors; floor++) {
      for (let win = 0; win < windowsPerFloor; win++) {
        // Randomly light some windows (30% chance)
        if (Math.random() > 0.7) {
          const windowGeometry = new THREE.PlaneGeometry(0.6, 0.8);
          const windowMaterial = new THREE.MeshBasicMaterial({
            color: Math.random() > 0.5 ? 0xffffff : 0xf867fa, // White or pink
            transparent: true,
            opacity: 0.8,
          });

          const window = new THREE.Mesh(windowGeometry, windowMaterial);
          window.position.set(
            -width / 2 + (win + 0.5) * (width / windowsPerFloor),
            -height / 2 + (floor + 0.5) * 2,
            depth / 2 + 0.01,
          );

          building.add(window);

          // Add window to back side too
          const windowBack = window.clone();
          windowBack.position.z = -depth / 2 - 0.01;
          windowBack.rotation.y = Math.PI;
          building.add(windowBack);
        }
      }
    }

    cityscapeGroup.add(building);
  }

  scene.add(cityscapeGroup);
};

const animate = () => {
  animationId = requestAnimationFrame(animate);
  time += 0.01;

  // Animate grid movement (infinite scroll effect)
  if (grid) {
    grid.position.z = ((time * 2) % 50) - 0.01;
  }

  // Pulse the sun
  if (sun) {
    // Sun sets and rises in a cycle
    const sunCycleSpeed = 0.1; // Adjust for faster/slower sunset
    const sunHeight = Math.sin(time * sunCycleSpeed) * 15 - 5; // Oscillates between -20 and 10
    sun.position.y = sunHeight;
  }

  // Slowly rotate stars in background (behind sun)
  if (stars) {
    stars.rotation.z = time * 0.05; // Slow rotation
  }

  // Animate DeLorean driving into scene
  if (delorean && !deloreanAnimationComplete) {
    deloreanAnimationProgress += 0.008; // Speed of drive-in (higher = faster)

    if (deloreanAnimationProgress >= 1) {
      deloreanAnimationProgress = 1;
      deloreanAnimationComplete = true;
      // Freeze matrix after animation completes for optimization
      delorean.matrixAutoUpdate = false;
      delorean.updateMatrix();
    }

    // Ease-out animation for smooth deceleration
    const easeProgress = 1 - Math.pow(1 - deloreanAnimationProgress, 3);

    // Interpolate from starting position (z=10) to final position (z=-9)
    const startZ = 10;
    const endZ = -9;
    delorean.position.z = startZ + (endZ - startZ) * easeProgress;
  }

  camera.position.y = 4 + Math.sin(time * 0.3) * 0.3;
  camera.lookAt(0, 2, -20);

  renderer.render(scene, camera);
};

const handleResize = () => {
  if (!camera || !renderer) return;

  camera.aspect = window.innerWidth / 680;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, 680);
};

onMounted(() => {
  initScene();
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);

  if (animationId) {
    cancelAnimationFrame(animationId);
  }

  if (renderer) {
    renderer.dispose();
  }
});
</script>

<template>
  <header role="presentation" class="header-scene">
    <canvas ref="canvasRef" class="webgl-canvas"></canvas>
  </header>
</template>

<style lang="scss">
.header-scene {
  position: absolute;
  width: 100%;
  height: 680px;
  z-index: 0;
  top: 0;
  overflow: hidden;

  .webgl-canvas {
    width: 100%;
    height: 100%;
    display: block;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 150px;
    background: linear-gradient(to top, #060231 0%, transparent 100%);
    pointer-events: none;
    z-index: 1;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 0 100px 20px #060231;
    pointer-events: none;
    z-index: 1;
  }
}
</style>
