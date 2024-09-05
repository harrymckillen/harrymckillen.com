---
title: "Adding Reading Time to an Astro Blog"
description: "First off, I've seen a few rip-offs of this explainer from the recipes section of the Astro site, and this isn't a verbatim copy of that. Their solution didn't work out of the box for me, so I had to tweak it a bit."
pubDate: "25 Aug 2024"
tags: ["Astro", "Tips"]
---

I followed the [Astro Reading Time recipe](https://docs.astro.build/en/recipes/reading-time/) and it absolutely got me 90% of the way there. Being fresh to Astro, I assumed that magically it would all work as per the recipe. But the reading time appeared in the CLI when I ran `astro build` (as I'd console.log'd it to see why it wasn't magically appearing).

Clearly, it was something to do with the frontmatter, but I couldn't figure out what from the recipe itself, I guess it assumed a bit more knowledge than I had starting off. I searched a bit online and found a few articles people had largely copied the Astro recipe (verbatim), with no further explanation or troubleshooting. I don't like that aspect of churning out content, just taking credit for someone else's work.

So I thought I'd write this up in case anyone else has had the same issue. I found a Github issue that achieved the same thing with an alternative approach, but I wanted to stick with the recipe as much as possible.

`[...slug].astro`

```jsx
const { Content, remarkPluginFrontmatter } = await post.render();
post.data.minutesRead =
remarkPluginFrontmatter.minutesRead; 👈 the issue was I was rendering the post via a Layout
---

<BlogPost {...post.data} prevPost={post.prevPost} nextPost={post.nextPost}>
  <Content />
</BlogPost>
```

In the snippet above, I was passing the `post.data` to the `BlogPost` component, but I was not passing the frontmatter property to the `BlogPost` via `post.data`. So here I imported the `remarkPluginFrontmatter` (as the recipe described) and assigned the `minutesRead` to the `post.data.minutesRead` property. This was the missing link for me, it wasn't being passed automagically.

So this may help someone else who is having the same issue, or is fresh to Astro like me.

You will also need to add the `minutesRead` to the schema in `config.ts` as it might be complain about it being an unknown property of the `blog` data collection, as it did in my case, for my particular setup.

`config.ts`

```ts
export const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  minutesRead: z.string().optional(), 👈 I added this to the schema
  // Transform string to Date object
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  tags: z.array(z.string()).optional(),
});
```

I hope this helps someone else out there.
