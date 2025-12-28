import { defineConfig } from 'astro/config';
import { remarkReadingTime } from './src/utils/readingTime';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkAutolinkHeadings from 'remark-autolink-headings';
import vercelStatic from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';
const options = {
    // Specify the theme to use or a custom theme json, in our case
    // it will be a moonlight-II theme from
    // https://github.com/atomiks/moonlight-vscode-theme/blob/master/src/moonlight-ii.json
    // Callbacks to customize the output of the nodes
    //theme: json,
    onVisitLine(node) {
        // Prevent lines from collapsing in `display: grid` mode, and
        // allow empty lines to be copy/pasted
        if (node.children.length === 0) {
            node.children = [
                {
                    type: 'text',
                    value: ' '
                }
            ];
        }
    },
    onVisitHighlightedLine(node) {
        // Adding a class to the highlighted line
        node.properties.className = ['highlighted'];
    }
};

// https://astro.build/config
export default defineConfig({
    site: 'https://zxyf.top',

    markdown: {
        syntaxHighlight: false,
        // Disable syntax built-in syntax hightlighting from astro
        rehypePlugins: [[rehypePrettyCode, options], rehypeSlug],
        remarkPlugins: [remarkReadingTime, [remarkAutolinkHeadings, { behavior: 'wrap' }]],
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex]
    },

    integrations: [react(), sitemap(), pagefind()],
    output: 'static',

    adapter: vercelStatic({
        webAnalytics: {
            enabled: true
        }
    }),
    vite: {
        plugins: [tailwindcss()]
    }
});