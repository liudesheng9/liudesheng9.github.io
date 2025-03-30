const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');

// Configuration
const markdownDir = path.join(__dirname, 'markdown');
const outputDir = path.join(__dirname, 'blogs');
const blogConfigFile = path.join(__dirname, 'blog-config.json');

// Structure for blog configuration
const defaultConfig = {
    posts: []
};

// Read blog configuration
async function readBlogConfig() {
    try {
        if (await fs.pathExists(blogConfigFile)) {
            const configData = await fs.readFile(blogConfigFile, 'utf8');
            return JSON.parse(configData);
        } else {
            return defaultConfig;
        }
    } catch (error) {
        console.error('Error reading blog configuration:', error);
        return defaultConfig;
    }
}

// Save blog configuration
async function saveBlogConfig(config) {
    try {
        await fs.writeFile(blogConfigFile, JSON.stringify(config, null, 2), 'utf8');
        console.log('Blog configuration saved successfully!');
    } catch (error) {
        console.error('Error saving blog configuration:', error);
    }
}

// Generate date slug (YYYYMMDD)
function generateDateSlug(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}

// Format date for display (Month DD, YYYY)
function formatDisplayDate(date = new Date()) {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Add a new blog post
async function addBlogPost() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    try {
        // Load existing configuration
        const config = await readBlogConfig();

        // Get post title
        const title = await new Promise(resolve => {
            rl.question('Enter blog post title: ', answer => resolve(answer));
        });

        if (!title.trim()) {
            console.error('Title cannot be empty!');
            rl.close();
            return;
        }

        // Get custom date or use today
        const dateInput = await new Promise(resolve => {
            rl.question('Enter post date (YYYY-MM-DD) or leave blank for today: ', answer => resolve(answer));
        });

        let postDate = new Date();
        if (dateInput.trim()) {
            postDate = new Date(dateInput);
            if (isNaN(postDate.getTime())) {
                console.error('Invalid date format. Using today\'s date instead.');
                postDate = new Date();
            }
        }

        // Generate filenames and paths
        const dateSlug = generateDateSlug(postDate);
        const displayDate = formatDisplayDate(postDate);
        const year = postDate.getFullYear();

        // Create markdown filename
        const markdownFilename = title
            .toLowerCase()
            .replace(/\s+/g, '_')
            .replace(/[^\w_]/g, '')
            + '.md';

        const markdownPath = path.join(markdownDir, markdownFilename);
        const htmlFilename = `${dateSlug}_${path.basename(markdownFilename, '.md')}.html`;
        const htmlPath = path.join(outputDir, htmlFilename);

        // Check if file already exists
        if (await fs.pathExists(markdownPath)) {
            console.error(`File already exists: ${markdownPath}`);
            rl.close();
            return;
        }

        // Get markdown content or use template
        const useTemplate = await new Promise(resolve => {
            rl.question('Use template for new post? (Y/n): ', answer => resolve(answer.toLowerCase() !== 'n'));
        });

        let content;
        if (useTemplate) {
            content = createMarkdownTemplate(title, displayDate);
        } else {
            content = `# ${title}\n\n*${displayDate}*\n\n[[toc]]\n\n`;
        }

        // Ensure directories exist
        await fs.ensureDir(markdownDir);

        // Write markdown file
        await fs.writeFile(markdownPath, content, 'utf8');
        console.log(`Created new blog post: ${markdownPath}`);

        // Add to configuration
        config.posts.push({
            title,
            date: postDate.toISOString(),
            dateSlug,
            displayDate,
            year,
            markdownFile: markdownFilename,
            htmlFile: htmlFilename,
            markdownPath,
            htmlPath
        });

        // Sort posts by date (newest first)
        config.posts.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Save configuration
        await saveBlogConfig(config);

        console.log(`\nNext steps:`);
        console.log(`1. Edit your new post in ${markdownPath}`);
        console.log(`2. Run "npm run build" to generate the HTML file`);
        console.log(`3. View your post at http://localhost:55000/blogs/${htmlFilename}`);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        rl.close();
    }
}

// Create a new markdown file template
function createMarkdownTemplate(title, dateString) {
    return `# ${title}

*${dateString}*

[[toc]]

## Introduction

Your content here...

## Math Examples

### Inline Math 

Einstein's famous equation: $E = mc^2$

### Display Math

The Pythagorean theorem:

$$
a^2 + b^2 = c^2
$$

### Complex Equations

The quadratic formula:

$$
x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}
$$

### Matrices

A 2x2 matrix:

$$
\\begin{pmatrix}
a & b \\\\
c & d
\\end{pmatrix}
$$

## Lists and Formatting

### Bullet Points
- Item 1
- Item 2
- Item 3

### Numbered List
1. First item
2. Second item
3. Third item

### Code Block
\`\`\`javascript
function example() {
  console.log("Hello, world!");
}
\`\`\`
`;
}

// List all blog posts
async function listBlogPosts() {
    try {
        const config = await readBlogConfig();

        if (config.posts.length === 0) {
            console.log('No blog posts found.');
            return;
        }

        console.log('\nBlog Posts:');
        console.log('===========');

        let currentYear = null;

        config.posts.forEach((post, index) => {
            const year = new Date(post.date).getFullYear();

            if (year !== currentYear) {
                console.log(`\n${year}:`);
                currentYear = year;
            }

            console.log(`${index + 1}. [${post.displayDate}] ${post.title}`);
            console.log(`   MD: ${post.markdownFile}`);
            console.log(`   HTML: ${post.htmlFile}`);
        });

    } catch (error) {
        console.error('Error listing blog posts:', error);
    }
}

// Generate blog archive HTML
async function generateBlogArchive() {
    try {
        const config = await readBlogConfig();
        const posts = config.posts;

        if (posts.length === 0) {
            console.log('No blog posts found. Archive not generated.');
            return;
        }

        // Group posts by year
        const postsByYear = {};
        posts.forEach(post => {
            const year = new Date(post.date).getFullYear();
            if (!postsByYear[year]) {
                postsByYear[year] = [];
            }
            postsByYear[year].push(post);
        });

        // Sort years in descending order
        const years = Object.keys(postsByYear).sort((a, b) => b - a);

        let archiveContent = '';

        years.forEach(year => {
            // Year section
            archiveContent += `
      <div class="section-container">
        <div class="title-bar">
          <div class="title-bar-line theme-${year}"></div>
          <div class="title-bar-spacer"></div>
          <div class="title-container theme-${year}">
            <h2 class="multiline_h2">${year}</h2>
          </div>
          <div class="title-bar-spacer"></div>
          <div class="title-bar-line theme-${year}"></div>
        </div>
      `;

            // Posts for this year
            postsByYear[year].forEach(post => {
                const dateParts = post.displayDate.split(' ');
                const month = dateParts[0];
                const day = dateParts[1].replace(',', '');

                archiveContent += `
        <div class="contain_box">
          <div class="blog-entry">
            <div class="blog-date">${month} ${day}, ${year}</div>
            <a href="../blogs/${post.htmlFile}" target="_top">${post.title}</a>
          </div>
        </div>
        `;
            });

            archiveContent += `</div>`;
        });

        // Generate the final HTML file path
        const archiveTemplatePath = path.join(__dirname, 'sub_pages', 'blog_archive_template.html');
        const archiveOutputPath = path.join(__dirname, 'sub_pages', 'blog_subpage.html');

        // Check if template exists, otherwise create basic template
        if (!await fs.pathExists(archiveTemplatePath)) {
            const basicTemplate = `<!doctype html>
<html lang="en-US">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital@0;1&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital@0;1&family=Teko:wght@300..700&display=swap"
    rel="stylesheet">
  <link href="../styles/style.css" rel="stylesheet" />
  <script src="../href_motion.js"></script>

  <title>Blog Archive</title>
</head>

<body class="blog_subpage_body">
  <nav class="outer_links">
    <ol>
      <li class="outer_link"><a class="scale_bigger" href="https://github.com/liudesheng9/" target="_blank"
          rel="noopener">Github</a>
      </li>
      <li class="outer_link"><a class="scale_bigger" href="../personal_space.html" target="_top">Personal Space</a></li>
      <li class="outer_link"><a class="scale_bigger" href="../index.html" target="_top">Home</a></li>
    </ol>
  </nav>
  <h1>My Blogs</h1>

  <div class="page-container">
    <div class="column" style="flex: 1;">
      <!-- BLOG_CONTENT_PLACEHOLDER -->
    </div>
  </div>
</body>

</html>`;
            await fs.writeFile(archiveTemplatePath, basicTemplate, 'utf8');
        }

        // Read the template
        let archiveTemplate = await fs.readFile(archiveTemplatePath, 'utf8');

        // Replace the placeholder with our blog content
        archiveTemplate = archiveTemplate.replace('<!-- BLOG_CONTENT_PLACEHOLDER -->', archiveContent);

        // Write the final archive
        await fs.writeFile(archiveOutputPath, archiveTemplate, 'utf8');
        console.log(`Blog archive generated: ${archiveOutputPath}`);

    } catch (error) {
        console.error('Error generating blog archive:', error);
    }
}

// Command line interface
function printUsage() {
    console.log('\nBlog Manager Usage:');
    console.log('  node blog-manager.js add     - Add a new blog post');
    console.log('  node blog-manager.js list    - List all blog posts');
    console.log('  node blog-manager.js archive - Generate blog archive page');
    console.log('  node blog-manager.js help    - Show this help message');
}

// Main
async function main() {
    const command = process.argv[2] || 'help';

    switch (command.toLowerCase()) {
        case 'add':
            await addBlogPost();
            break;
        case 'list':
            await listBlogPosts();
            break;
        case 'archive':
            await generateBlogArchive();
            break;
        case 'help':
        default:
            printUsage();
            break;
    }
}

// Run the script
main().catch(err => {
    console.error('Error:', err);
    process.exit(1);
}); 