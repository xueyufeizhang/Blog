# Paper digests feature boundary

This feature is intentionally isolated from Notes.

Owned paths:

- `src/content/papers/` — generated daily Markdown files
- `src/features/paper-digests/` — digest loading and validation
- `src/pages/papers/` — standalone list and detail routes
- the two `PAPERS` links in `src/components/Navbar.astro`

Notes, Topics, Archive, and the existing RSS feed only load `src/content/posts/`.

Generated digests use format version 2. Their frontmatter contains paired English and Chinese
titles and descriptions, while every substantive analysis section presents English first and a
corresponding Chinese version immediately after it. Papers-specific visual rules are scoped under
`.paper-digest-content`, so they do not alter Notes typography.

To remove Paper Monitor from the site, delete the first three paths above and remove the two
navigation links. No Notes content or shared post data needs to be migrated.
