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
const blogConfigFile = path.join(__dirname, 'blog-config.json');

// Create a markdown-it instance with texmath support
const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
})
    .use(texmath, {
        engine: katex,
        delimiters: 'dollars',
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
function createBlogTemplate(title, content) {
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
    ${content}
  </div>
</body>
</html>`;
}

// Read blog configuration
async function readBlogConfig() {
    try {
        if (await fs.pathExists(blogConfigFile)) {
            const configData = await fs.readFile(blogConfigFile, 'utf8');
            return JSON.parse(configData);
        } else {
            return { posts: [] };
        }
    } catch (error) {
        console.error('Error reading blog configuration:', error);
        return { posts: [] };
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

// Process a single markdown file
async function processMarkdownFile(mdFilePath, outputHtmlPath, customTitle = null) {
    try {
        console.log(`Processing ${mdFilePath}...`);
        let mdContent = await fs.readFile(mdFilePath, 'utf8');

        // Extract title from the markdown or use custom title
        const title = customTitle || extractTitle(mdContent);

        // Add TOC if needed
        mdContent = addTocIfNeeded(mdContent);

        // Render markdown with KaTeX support
        const htmlContent = md.render(mdContent);

        // Create final HTML with template
        const finalHtml = createBlogTemplate(title, htmlContent);

        // Ensure output directory exists
        await fs.ensureDir(path.dirname(outputHtmlPath));

        // Write the output HTML file
        await fs.writeFile(outputHtmlPath, finalHtml);
        console.log(`Generated ${outputHtmlPath}`);
    } catch (error) {
        console.error(`Error processing ${mdFilePath}:`, error);
    }
}

// Process multiple markdown files and combine them
async function processMultiMarkdownFile(mdFilePaths, outputHtmlPath, title) {
    try {
        console.log(`Processing multiple files to ${outputHtmlPath}...`);

        let combinedHtmlContent = '';

        for (let i = 0; i < mdFilePaths.length; i++) {
            const mdFilePath = mdFilePaths[i];
            let mdContent = await fs.readFile(mdFilePath, 'utf8');

            // Add TOC if needed (for each file)
            mdContent = addTocIfNeeded(mdContent);

            // Render markdown with KaTeX support
            const htmlContent = md.render(mdContent);

            // Add to combined content
            combinedHtmlContent += htmlContent;

            // Add separator between articles except for the last one
            if (i < mdFilePaths.length - 1) {
                combinedHtmlContent += '<hr>';
            }
        }

        // Create final HTML with template
        const finalHtml = createBlogTemplate(title, combinedHtmlContent);

        // Ensure output directory exists
        await fs.ensureDir(path.dirname(outputHtmlPath));

        // Write the output HTML file
        await fs.writeFile(outputHtmlPath, finalHtml);
        console.log(`Generated ${outputHtmlPath}`);
    } catch (error) {
        console.error(`Error processing files for ${outputHtmlPath}:`, error);
    }
}

// Find posts by date (used for multiple posts per day)
function findPostsByDate(posts, dateSlug) {
    return posts.filter(post => post.dateSlug === dateSlug);
}

// Check if a post is a multi-markdown post (has markdown files separated by comma)
function isMultiMarkdownPost(post) {
    return post.markdownFile.includes(',');
}

// Main build function
async function build() {
    try {
        // Ensure output directory exists
        await fs.ensureDir(outputDir);

        // First, process test file if it exists
        const testMarkdownPath = path.join(markdownDir, 'test_math_rendering.md');
        if (await fs.pathExists(testMarkdownPath)) {
            await processMarkdownFile(
                testMarkdownPath,
                path.join(outputDir, 'test_math.html')
            );
        }

        // Read blog configuration
        const blogConfig = await readBlogConfig();
        const posts = blogConfig.posts || [];

        // Map to keep track of dates that have been processed (for multiple posts per day)
        const processedDateGroups = new Map();

        // Process each post
        for (const post of posts) {
            const mdFilePath = path.join(markdownDir, post.markdownFile);
            const htmlPath = path.join(outputDir, post.htmlFile);

            // Check if this is a multi-markdown post
            if (isMultiMarkdownPost(post)) {
                const mdFilePaths = post.markdownFile.split(',').map(file =>
                    path.join(markdownDir, file.trim())
                );
                await processMultiMarkdownFile(mdFilePaths, htmlPath, post.title);
            }
            // Check if there are multiple posts for the same date that should be combined
            else if (!processedDateGroups.has(post.dateSlug)) {
                const postsForSameDate = findPostsByDate(posts, post.dateSlug);

                // If there are multiple posts for the same date, process them together
                if (postsForSameDate.length > 1) {
                    const mdFilePaths = postsForSameDate.map(p =>
                        path.join(markdownDir, p.markdownFile)
                    );
                    const combinedTitle = `${post.displayDate} - Multiple Posts`;
                    const combinedHtmlPath = path.join(outputDir, `${post.dateSlug}.html`);

                    await processMultiMarkdownFile(mdFilePaths, combinedHtmlPath, combinedTitle);

                    // Mark this date as processed
                    processedDateGroups.set(post.dateSlug, true);
                }
                // Single post for this date
                else {
                    await processMarkdownFile(mdFilePath, htmlPath, post.title);
                }
            }
        }

        // Legacy posts (if not using the blog-config.json system yet)
        // These are the existing hard-coded blog entries
        if (posts.length === 0) {
            // These are the existing hard-coded blog entries
            // Process March 30, 2025 blog post (combines two markdown files)
            const march30Files = [
                path.join(markdownDir, 'Debt_overhang.md'),
                path.join(markdownDir, 'Model_Writeup_Twisting_Pecking_Order_Theory.md')
            ];

            if (await fs.pathExists(march30Files[0]) && await fs.pathExists(march30Files[1])) {
                await processMultiMarkdownFile(
                    march30Files,
                    path.join(outputDir, '20250330.html'),
                    'Debt Overhang & Twisting Pecking Order Theory'
                );
            }

            // Process January 7, 2025 blog post
            const jan7File = path.join(markdownDir, 'Lian_Chen_Credit_Cycle_2024_Part1_Basic_Ideas.md');
            if (await fs.pathExists(jan7File)) {
                await processMarkdownFile(
                    jan7File,
                    path.join(outputDir, '20250107.html')
                );
            }

            // Process November 29, 2024 blog post
            const nov29File = path.join(markdownDir, 'Company_utility_function_with_2_interventions.md');
            if (await fs.pathExists(nov29File)) {
                await processMarkdownFile(
                    nov29File,
                    path.join(outputDir, '20241129.html')
                );
            }
        }

        console.log('Build completed successfully!');
    } catch (error) {
        console.error('Build process error:', error);
    }
}

// Run the build process
build().catch(err => {
    console.error('Build failed:', err);
    process.exit(1);
}); 