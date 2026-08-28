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
    theme: {
        light: 'github-light',
        dark: 'github-dark'
    },
    keepBackground: false,
    defaultLang: {
        block: 'plaintext'
    },
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
    site: 'https://zxyf.it',

    markdown: {
        syntaxHighlight: false,
		// Disable Astro's built-in highlighting and compose all Markdown plugins once.
		remarkPlugins: [
			remarkReadingTime,
			[remarkAutolinkHeadings, { behavior: 'wrap' }],
			remarkMath
		],
		rehypePlugins: [[rehypePrettyCode, options], rehypeSlug, rehypeKatex]
    },

	integrations: [
		react(),
		sitemap(),
		pagefind({
			indexConfig: {
				rootSelector: '[data-pagefind-body]',
				excludeSelectors: ['.katex']
			}
		})
	],
    output: 'static',

    adapter: vercelStatic(),
    vite: {
        plugins: [tailwindcss()]
    }
});
