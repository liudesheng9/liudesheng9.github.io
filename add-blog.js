#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');
const { addBlogPost, generateBlogPages } = require('./blog-generator');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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

// Format date as Month DD, YYYY
function formatDisplayDate(date) {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Create a new blog post
async function createNewBlogPost() {
    console.log('Creating a new blog post...');

    try {
        // Get title from user
        const title = await new Promise(resolve => {
            rl.question('Enter the blog post title: ', answer => resolve(answer));
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

        // Format date for file
        const year = postDate.getFullYear();
        const month = String(postDate.getMonth() + 1).padStart(2, '0');
        const day = String(postDate.getDate()).padStart(2, '0');
        const dateString = `${year}-${month}-${day}`;
        const displayDate = formatDisplayDate(postDate);

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
        const content = createMarkdownTemplate(title, displayDate);

        // Ensure directory exists
        await fs.ensureDir(markdownDir);

        // Write file
        await fs.writeFile(filePath, content);
        console.log(`Created new blog post: ${filePath}`);

        // Add to blogs.json
        await addBlogPost(title, dateString, filename);

        console.log(`\nNext steps:`);
        console.log(`1. Edit your new post in ${filePath}`);
        console.log(`2. Run "node blog-generator.js" to generate the HTML file`);

        rl.close();
    } catch (error) {
        console.error('Error:', error);
        rl.close();
    }
}

// Run the script
createNewBlogPost().catch(err => {
    console.error('Error:', err);
    rl.close();
    process.exit(1);
}); 