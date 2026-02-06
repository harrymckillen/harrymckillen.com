<script setup is:inline>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const canvasRef = ref(null);
let scene, camera, renderer, animationId;
let grid, sun, stars, delorean;
let time = 0;

const loadDelorean = () => {
  const loader = new GLTFLoader();

  loader.load(
    "/delorean-dmc-12/scene.gltf",
    (gltf) => {
      delorean = gltf.scene;

      // Calculate the bounding box to see actual size
      // const bbox = new THREE.Box3().setFromObject(delorean);

      delorean.scale.set(0.02, 0.02, 0.02);

      delorean.position.set(-4.5, -12, -9); // Right in front of camera
      delorean.rotation.y = Math.PI * 1.5; // Rotate towards cityscape

      // Debug: Check what materials are loaded
      delorean.traverse((child) => {
        if (child.isMesh) {
          console.log("Material:", child.material.name);
          console.log("Material type:", child.material.type);
          console.log("Has map:", child.material.map);
          console.log("Has metalness map:", child.material.metalnessMap);
          console.log("Has normal map:", child.material.normalMap);
          console.log("Metalness:", child.material.metalness);
          console.log("Roughness:", child.material.roughness);

          // Ensure metallic materials reflect light properly
          if (child.material.type === "MeshStandardMaterial") {
            child.material.needsUpdate = true;
            // Boost metalness and adjust roughness
            child.material.metalness = 0.4;
            child.material.roughness = 0.1;
          }

          child.matrixAutoUpdate = false;
          child.updateMatrix();
        }
      });

      // Freeze the matrix to prevent unnecessary updates
      delorean.matrixAutoUpdate = false;
      delorean.updateMatrix();

      scene.add(delorean);

      // Add spotlight on the DeLorean
      const spotLight = new THREE.SpotLight(0xffffff, 2);
      spotLight.position.set(-4.5, 5, -5); // Above and in front of DeLorean
      spotLight.target = delorean;
      spotLight.angle = Math.PI / 6; // 30 degree cone
      spotLight.penumbra = 0.3; // Soft edge
      spotLight.distance = 50;
      spotLight.castShadow = false;
      scene.add(spotLight);

      // Optional: Add a colored rim light for vaporwave effect
      const rimLight = new THREE.PointLight(0xf867fa, 1.5, 20); // Pink light
      rimLight.position.set(-4.5, -10, -12); // Behind and below DeLorean
      scene.add(rimLight);

      // Optional: Add cyan accent light from the side
      const accentLight = new THREE.PointLight(0x00ffff, 1, 15); // Cyan light
      accentLight.position.set(-8, -10, -9); // To the left
      scene.add(accentLight);
    },
    (progress) => {
      console.log(
        "Loading DeLorean:",
        (progress.loaded / progress.total) * 100 + "%",
      );
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

  // Enable physically correct lighting
  renderer.physicallyCorrectLights = true;

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

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 5);
  scene.add(ambientLight);

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
  const rows = 4; // 4 rows deep
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
            // emissive: Math.random() > 0.5 ? 0xffffff : 0xf867fa,
            // emissiveIntensity: 0.5,
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

  // Camera subtle movement
  camera.position.y = 4 + Math.sin(time * 0.3) * 0.3;

  camera.lookAt(0, 2, -20); // Original lookAt

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
  // console.log("Canvas ref on mounted:", canvasRef.value);
  // simpleExample();
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
  // background: #000;

  .webgl-canvas {
    width: 100%;
    height: 100%;
    display: block;
    // border: 1px solid red;
  }

  // Add gradient mask to blend edges
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

  // Optional: Add side blur/fade
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
