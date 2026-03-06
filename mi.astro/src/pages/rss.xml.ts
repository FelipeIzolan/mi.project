import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

// documentation:
// https://docs.astro.build/en/recipes/rss/

// by default, 'rss.xml.ts' only uses the blog collection to generate the RSS feed.
// you can create additional generators or include more collections/items in the 'items' field.
export const title = "your-rss-feed-title"; // <- must edit!
export const description = "your-rss-feed-description"; // <- must edit!
export async function GET(ctx: APIContext) {
  let blog = await getCollection('blog');
  return rss({
    title,
    description,
    site: ctx.site as URL,
    items: blog.map(post => ({
      link: `/blog/${post.id}`,
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(post.data.date)
    }))
  })
}
