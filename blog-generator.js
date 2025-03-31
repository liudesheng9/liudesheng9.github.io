const fs = require('fs-extra');
const path = require('path');
const MarkdownIt = require('markdown-it');
const texmath = require('markdown-it-texmath');
const anchor = require('markdown-it-anchor');
const toc = require('markdown-it-toc-done-right');
const katex = require('katex');

// Configuration
const markdownDir = path.join(__dirname, 'markdown');
const outputDir = path.join(__dirname, 'blogs');
const blogsJsonFile = path.join(__dirname, 'blogs.json');

// Create a markdown-it instance with texmath support
const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
})
    .use(texmath, {
        engine: katex,
        delimiters: [
            'dollars', 'inlineDollars'
        ],
        katexOptions: {
            macros: {
                "\\R": "\\mathbb{R}",
                "\\N": "\\mathbb{N}"
            },
            throwOnError: false
        }
    })
    .use(anchor, {
        permalink: anchor.permalink.ariaHidden({
            placement: 'after',
            class: 'header-anchor',
            symbol: '#',
            ariaHidden: true,
        })
    })
    .use(toc, {
        listType: 'ol',
        level: [2, 3]
    });

// Blog template function
function createBlogTemplate(title, content, date) {
    return `<!doctype html>
<html lang="en-US">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital@0;1&display=swap" rel="stylesheet">
  <link href="../styles/style.css" rel="stylesheet" />
  <link href="../styles/math.css" rel="stylesheet" />
  <!-- KaTeX CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
    integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV" crossorigin="anonymous">
  <script src="../href_motion.js"></script>
  <title>${title}</title>
</head>

<body class="blog_subpage_body">
  <nav class="outer_links">
    <ol>
      <li class="outer_link"><a class="scale_bigger" href="https://github.com/liudesheng9/" target="_blank" rel="noopener">Github</a></li>
      <li class="outer_link"><a class="scale_bigger" href="../personal_space.html" target="_top">Personal Space</a></li>
      <li class="outer_link"><a class="scale_bigger" href="../sub_pages/blog_subpage.html" target="_top">My Blogs</a></li>
    </ol>
  </nav>
  
  <div class="content">
    <p class="blog-date">${date}</p>
    ${content}
  </div>
</body>
</html>`;
}

// Read blogs data
async function readBlogsData() {
    try {
        if (await fs.pathExists(blogsJsonFile)) {
            const blogsData = await fs.readFile(blogsJsonFile, 'utf8');
            return JSON.parse(blogsData);
        } else {
            return { blogs: [] };
        }
    } catch (error) {
        console.error('Error reading blogs data:', error);
        return { blogs: [] };
    }
}

// Add a TOC placeholder to markdown content if not exists
function addTocIfNeeded(content) {
    // Check if TOC placeholder exists
    if (!content.includes('[[toc]]')) {
        // Find the first heading
        const firstHeadingMatch = content.match(/^#\s+(.+)$/m);
        if (firstHeadingMatch) {
            // Add TOC after the first heading
            const index = content.indexOf(firstHeadingMatch[0]) + firstHeadingMatch[0].length;
            return content.slice(0, index) + '\n\n[[toc]]\n\n' + content.slice(index);
        }
    }
    return content;
}

// Function to extract title from markdown content
function extractTitle(content) {
    const titleMatch = content.match(/^#\s+(.+)$/m);
    return titleMatch ? titleMatch[1] : 'Blog Post';
}

// Format date as Month DD, YYYY
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Process a single markdown file
async function processMarkdownFile(mdFilePath, outputHtmlPath, title, date) {
    try {
        console.log(`Processing ${mdFilePath}...`);
        let mdContent = await fs.readFile(mdFilePath, 'utf8');

        // Add TOC if needed
        mdContent = addTocIfNeeded(mdContent);

        // Render markdown with KaTeX support
        const htmlContent = md.render(mdContent);

        // Format the date
        const formattedDate = formatDate(date);

        // Create final HTML with template
        const finalHtml = createBlogTemplate(title, htmlContent, formattedDate);

        // Ensure output directory exists
        await fs.ensureDir(path.dirname(outputHtmlPath));

        // Write the output HTML file
        await fs.writeFile(outputHtmlPath, finalHtml);
        console.log(`Generated ${outputHtmlPath}`);
        return true;
    } catch (error) {
        console.error(`Error processing ${mdFilePath}:`, error);
        return false;
    }
}

// Group blogs by date
function groupBlogsByDate(blogs) {
    const groupedBlogs = {};

    blogs.forEach(blog => {
        if (!groupedBlogs[blog.date]) {
            groupedBlogs[blog.date] = [];
        }
        groupedBlogs[blog.date].push(blog);
    });

    return groupedBlogs;
}

// Generate blog HTML pages
async function generateBlogPages() {
    try {
        console.log('Generating blog pages...');

        // Ensure output directory exists
        await fs.ensureDir(outputDir);

        // Read blogs data
        const blogsData = await readBlogsData();
        const blogs = blogsData.blogs || [];

        if (blogs.length === 0) {
            console.warn('No blogs found in blogs.json');
            return;
        }

        // Track processed blogs to avoid duplicates
        const processedBlogs = new Set();

        // First, specifically handle the Debt_overhang.md and Model_Writeup_Twisting_Pecking_Order_Theory.md files
        const debtOverhangBlog = blogs.find(blog => blog.fileName === 'Debt_overhang.md');
        const pecking_orderBlog = blogs.find(blog => blog.fileName === 'Model_Writeup_Twisting_Pecking_Order_Theory.md');

        if (debtOverhangBlog) {
            console.log('\nSpecifically processing Debt_overhang.md...');
            const mdFilePath = path.join(markdownDir, debtOverhangBlog.fileName);
            const htmlPath = path.join(outputDir, `${debtOverhangBlog.slug}.html`);

            await processMarkdownFile(mdFilePath, htmlPath, debtOverhangBlog.title, debtOverhangBlog.date);
            processedBlogs.add(debtOverhangBlog.slug);
        }

        if (pecking_orderBlog) {
            console.log('\nSpecifically processing Model_Writeup_Twisting_Pecking_Order_Theory.md...');
            const mdFilePath = path.join(markdownDir, pecking_orderBlog.fileName);
            const htmlPath = path.join(outputDir, `${pecking_orderBlog.slug}.html`);

            await processMarkdownFile(mdFilePath, htmlPath, pecking_orderBlog.title, pecking_orderBlog.date);
            processedBlogs.add(pecking_orderBlog.slug);
        }

        // Group blogs by date
        const groupedBlogs = groupBlogsByDate(blogs);

        // Process each date group
        for (const [date, blogsForDate] of Object.entries(groupedBlogs)) {
            console.log(`\nProcessing blogs for date: ${date}`);

            // If there's only one blog for this date
            if (blogsForDate.length === 1) {
                const blog = blogsForDate[0];
                const mdFilePath = path.join(markdownDir, blog.fileName);
                const htmlPath = path.join(outputDir, `${blog.slug}.html`);

                if (!processedBlogs.has(blog.slug)) {
                    console.log(`Processing ${blog.fileName}...`);
                    await processMarkdownFile(mdFilePath, htmlPath, blog.title, blog.date);
                    processedBlogs.add(blog.slug);
                }
            }
            // If there are multiple blogs for this date
            else {
                console.log(`Found ${blogsForDate.length} blogs for ${date}`);
                for (const blog of blogsForDate) {
                    const mdFilePath = path.join(markdownDir, blog.fileName);
                    const htmlPath = path.join(outputDir, `${blog.slug}.html`);

                    if (!processedBlogs.has(blog.slug)) {
                        console.log(`Processing ${blog.fileName}...`);
                        const fileExists = await fs.pathExists(mdFilePath);
                        if (fileExists) {
                            await processMarkdownFile(mdFilePath, htmlPath, blog.title, blog.date);
                            processedBlogs.add(blog.slug);
                        } else {
                            console.error(`File not found: ${mdFilePath}`);
                        }
                    }
                }
            }
        }

        console.log('\nBlog generation completed successfully!');
    } catch (error) {
        console.error('Blog generation error:', error);
    }
}

// Add a new blog post
async function addBlogPost(title, date, fileName) {
    try {
        // Read existing blogs data
        const blogsData = await readBlogsData();

        // Generate slug from title
        const slug = title
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, '');

        // Add new blog
        blogsData.blogs.push({
            title,
            date,
            fileName,
            slug
        });

        // Sort blogs by date (newest first)
        blogsData.blogs.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Save updated blogs data
        await fs.writeFile(blogsJsonFile, JSON.stringify(blogsData, null, 2), 'utf8');
        console.log(`Added new blog: ${title}`);

        // Regenerate blog pages
        await generateBlogPages();

        return true;
    } catch (error) {
        console.error('Error adding blog post:', error);
        return false;
    }
}

// Run the blog generation
if (require.main === module) {
    generateBlogPages().catch(err => {
        console.error('Blog generation failed:', err);
        process.exit(1);
    });
}

module.exports = {
    generateBlogPages,
    addBlogPost
}; 