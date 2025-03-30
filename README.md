# Personal Website

This is my personal website hosted on GitHub Pages.

## Features

- Markdown-based blog content
- KaTeX math expression rendering
- Node.js build system
- Automatic blog archive generation

## Development Setup

1. Install Node.js and npm if not already installed
2. Clone this repository
3. Install dependencies:
   ```
   npm run install-deps
   ```

## Blog Management

The website includes a comprehensive blog management system that makes it easy to add, organize, and display blog posts.

### Adding a new blog post

To create a new blog post:

```
npm run new-post
```

This will:
1. Prompt you for a title and date (or use today's date)
2. Create a new markdown file in the `markdown/` directory
3. Add the post to `blog-config.json`
4. Provide next steps for editing and building

### Viewing your posts

To list all your blog posts:

```
npm run list-posts
```

### Updating the blog archive

To update the blog archive page (after adding new posts):

```
npm run update-archive
```

This will generate the `sub_pages/blog_subpage.html` file based on your posts in `blog-config.json`.

### Multiple posts per day

The system supports multiple posts per day and will automatically group them:

1. If multiple posts have the same date, they'll be combined into a single HTML file
2. You can also manually create multi-file posts by specifying multiple markdown files separated by commas in the config

## Build Process

To build the site:

```
npm run build
```

This will:
1. Process all markdown files defined in `blog-config.json`
2. Convert them to HTML with proper KaTeX math rendering
3. Generate HTML files in the `blogs/` directory

## Testing locally

To test the site locally, you have two options:

1. Build first, then serve:
```
npm run build
npm run serve
```

2. Or use the start command to do both in one step:
```
npm start
```

Then open http://localhost:55000 in your browser.

## Deployment

To prepare for deployment to GitHub Pages:

```
npm run deploy
```

This will build all blog posts and update the blog archive page.

## Math Expression Support

This site supports LaTeX math expressions using KaTeX. You can use:

- Inline math with `$...$` or `\(...\)`
- Display math with `$$...$$` or `\[...\]`

## File Structure

- `markdown/` - Markdown source files for blog posts
- `blogs/` - Generated HTML files
- `sub_pages/` - Subpages including the blog archive
- `styles/` - CSS files
- `build.js` - Main build script
- `blog-manager.js` - Blog management utilities
- `blog-config.json` - Configuration for blog posts 