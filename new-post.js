#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Get current date in YYYYMMDD format
function getTodayDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}

// Create a new markdown file template
function createMarkdownTemplate(title) {
    const today = new Date();
    const dateString = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

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

// Create a new blog post
async function createNewPost() {
    console.log('Creating a new blog post...');

    // Get title from user
    rl.question('Enter the blog post title: ', async (title) => {
        if (!title.trim()) {
            console.error('Title cannot be empty!');
            rl.close();
            return;
        }

        // Create filename from title
        const filename = title
            .toLowerCase()
            .replace(/\s+/g, '_')
            .replace(/[^\w_]/g, '')
            + '.md';

        const markdownDir = path.join(__dirname, 'markdown');
        const filePath = path.join(markdownDir, filename);

        // Check if file already exists
        if (await fs.pathExists(filePath)) {
            console.error(`File already exists: ${filePath}`);
            rl.close();
            return;
        }

        // Create markdown content
        const content = createMarkdownTemplate(title);

        // Ensure directory exists
        await fs.ensureDir(markdownDir);

        // Write file
        await fs.writeFile(filePath, content);
        console.log(`Created new blog post: ${filePath}`);

        // Generate date for HTML file
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const htmlFilename = `${year}${month}${day}.html`;

        console.log(`\nNext steps:`);
        console.log(`1. Edit your new post in ${filePath}`);
        console.log(`2. Add the following to build.js in the build function:`);
        console.log(`
  await processMarkdownFile(
    path.join(markdownDir, '${filename}'),
    path.join(outputDir, '${htmlFilename}')
  );`);
        console.log(`3. Add a link to your blog archive in sub_pages/blog_subpage.html`);
        console.log(`4. Run "npm run build" to generate the HTML file`);

        rl.close();
    });
}

// Run the script
createNewPost().catch(err => {
    console.error('Error:', err);
    rl.close();
    process.exit(1);
}); 