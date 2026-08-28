import rss from '@astrojs/rss';
import { AppConfig } from '@/utils/AppConfig';
import { isPublishedPost } from '@/utils/data.util';

export async function GET(context) {
  const postImportResult = import.meta.glob('../content/posts/**/index.md', { eager: true });
  const posts = Object.values(postImportResult).filter(isPublishedPost);

  return rss({
    title: AppConfig.site_name,
    description: AppConfig.description,
    site: context.site,
    stylesheet: './rss/styles.xsl', // 确保 public 目录下有这个文件
    items: posts.map((post) => {
      const slug = post.file.split('/').slice(-2, -1)[0];
      return {
        title: post.frontmatter.title,
        // 核心修复 1：确保日期被正确传递，插件会自动生成 <pubDate>
        pubDate: post.frontmatter.pubDate || post.frontmatter.date || new Date(), 
        description: post.frontmatter.description,
        link: `/posts/${slug}/`, 
      };
    }),
    // 核心修复 2：暂时移除不规范的 customData 命名空间，先让页面跑通
    customData: `<language>en-us</language>`, 
  });
}
