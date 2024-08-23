---
title: "Another first post but also about over-engineering"
description: "Every few years, I rebuild a few of my websites, either by redesigning them or by changing the underlying technology. This is a story about the latter."
pubDate: "11 Aug 2024"
tags: ["Opinion", "Over-Engineering"]
---

In the last couple of years, I redesigned this website. It was a simple one-pager. I wanted to add a blog. I'd previously built a simple enough Static Site Generator (SSG), using Pug, and AngularJS and GruntJS, but it was over 10 years old, and a bit cumbersome, and not as automated as I'd have liked.

At the time, I had started working with VueJS, and it's quite a nice framework, and easy and quick to develop things in. This led me to look at NuxtJS, which is a meta framework built upon VueJS and which can act as a Static Site Generator using Nuxt Content. It looked like I could achieve what I wanted. I liked the idea of it in terms of using knowledge I already had, and I quickly ported my old site to NuxtJS.

After I had spent time building everything I wanted, in the way I wanted, I generated the static site and deployed, only to find that when I visited a post and refreshed, it 404'd. Searching Github, I saw others had the same issue. I couldn't quite figure out why something so simple wasn't working. Locally, in Dev mode it refreshed and worked fine (the typical, it works on my machine), but in production, it didn't. I spent a few days trying to figure it out, but I couldn't. I had to move on. I hid the blog, and left it for a few months, occasionally checking the Github issues for a simple fix which might resolve the issue. A few people solved the issue with changing some configuration related to how requests are proxied, but I couldn't get it to work. There seems to be no real reason why it loaded the data first time, but on refresh it 404'd.

Meanwhile I saw some GIF someone posted about Frontend Devs using a completely bloated meta framework to do a simple job, something to the effect of below of using the wrong tool, ill-suited to the task. It could do the job no doubt, but it was totally over-engineering it from my perspective.

<div style="width:100%;height:0;padding-bottom:56%;position:relative;margin-bottom:1em;"><iframe src="https://giphy.com/embed/3o6Zt8bRzXQvHMcQda" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>

The salient point was the same. I had wanted to use NuxtJS, because it was easy to use, and I was familiar with VueJS. But it was overkill for what I needed. I needed a simple blog. I didn't need a full-blown VueJS app. I didn't need to talk to an API. I didn't need to have dynamic content, at least for the moment anyways.

I looked at other SSGs out there, but the caveat I had is, I wanted one which generated the each of the files, and didn't create a cache of the content stored in a giant JSON file like Nuxt Content, and it had to have the ability to utilise different JS frameworks, or at least VueJS. A quick search and I found a Jamstack [website which compared such SSGs](https://jamstack.org/generators/), which is where I found [Astro](https://astro.build). I had heard of it when it first came out, but like everything I took a look and subsequently parked that knowledge of it's existence. Anyways, after a couple of hours of tinkering, I had a working blog. It was simple, and it was fast. It was what I needed. I was able to reuse the majority of the VueJS components I had built. I may simplify them and port these to purely Astro components, but for now, it works. It ticks all the boxes I needed.
