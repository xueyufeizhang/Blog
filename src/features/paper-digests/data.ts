import type { MarkdownInstance } from 'astro';

export interface PaperDigestFrontmatter {
	title: string;
	titleZh: string;
	pubDate: string | Date;
	description: string;
	descriptionZh: string;
	paperCount: number;
	generatedAt?: string;
	language?: string;
	formatVersion: number;
	draft?: boolean;
}

export type PaperDigest = MarkdownInstance<PaperDigestFrontmatter>;

const digestFiles = import.meta.glob('../../content/papers/*.md', { eager: true });
const digestSlugPattern = /^\d{4}-\d{2}-\d{2}$/;

export function getPaperDigestSlug(digest: PaperDigest): string {
	const filename = digest.file.split('/').pop();
	const slug = filename?.replace(/\.md$/, '') ?? '';

	if (!digestSlugPattern.test(slug)) {
		throw new Error(
			`Paper digest filenames must use YYYY-MM-DD.md; received ${filename ?? 'unknown file'}.`
		);
	}

	return slug;
}

export function getPaperDigestDate(digest: PaperDigest): Date {
	const date = new Date(digest.frontmatter.pubDate);

	if (Number.isNaN(date.getTime())) {
		throw new Error(`Paper digest ${digest.file} has an invalid pubDate.`);
	}

	return date;
}

function validatePaperDigest(digest: PaperDigest): PaperDigest {
	const { title, titleZh, description, descriptionZh, paperCount, formatVersion } =
		digest.frontmatter;

	if (!title || !titleZh || !description || !descriptionZh) {
		throw new Error(`Paper digest ${digest.file} must define bilingual titles and descriptions.`);
	}
	if (!Number.isInteger(paperCount) || paperCount < 0) {
		throw new Error(`Paper digest ${digest.file} must define a non-negative paperCount.`);
	}
	if (formatVersion !== 2) {
		throw new Error(`Paper digest ${digest.file} must use formatVersion 2.`);
	}

	getPaperDigestSlug(digest);
	getPaperDigestDate(digest);
	return digest;
}

export function loadPaperDigests(): PaperDigest[] {
	return (Object.values(digestFiles) as PaperDigest[])
		.filter((digest) => digest.frontmatter.draft !== true)
		.map(validatePaperDigest)
		.sort((a, b) => getPaperDigestDate(b).getTime() - getPaperDigestDate(a).getTime());
}

export function formatPaperDigestDate(value: string | Date): string {
	return new Date(value).toLocaleDateString('en-GB', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}

export function formatPaperDigestDateZh(value: string | Date): string {
	return new Date(value).toLocaleDateString('zh-CN', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}
