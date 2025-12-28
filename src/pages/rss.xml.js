import rss from '@astrojs/rss';

export async function GET(context) {
  // 1. 获取新路径下的所有文章
  const postImportResult = import.meta.glob('../content/posts/**/index.md', { eager: true });
  const posts = Object.values(postImportResult);

  return rss({
    title: "Arvin's Blog",
    description: 'A blog sharing my study path for LLMs.',
    site: context.site, // 这会用到你 astro.config.mjs 里的 site 属性
    // 2. 手动映射文章字段
    items: posts.map((post) => {
      // 从路径提取 slug，保持和 [slug].astro 一致
      const slug = post.file.split('/').slice(-2, -1)[0];
      
      return {
        title: post.frontmatter.title,
        pubDate: post.frontmatter.date,
        description: post.frontmatter.description,
        // 这里的链接必须手动指向你现在的路由地址
        link: `/posts/${slug}/`, 
      };
    }),
    customData: `<language>en-us</language>`,
  });
}