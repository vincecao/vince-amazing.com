import fs from 'fs';
import path from 'path';

const POSTS_DIR = path.join(process.cwd(), 'app/blog/_posts');
const OUTPUT_FILE = path.join(process.cwd(), 'helpers/posts-map.ts');

function generatePostsMap() {
  const files = fs.readdirSync(POSTS_DIR);
  const markdownFiles = files.filter(file => file.endsWith('.md'));

  const imports = markdownFiles.map(file => {
    const key = file.replace('.md', '');
    return `  '${key}': require('../app/blog/_posts/${file}'),`;
  }).join('\n');

  const content = `// This file is auto-generated. Do not edit manually.
export const posts = {
${imports}
};
`;

  fs.writeFileSync(OUTPUT_FILE, content);
  console.log('Posts map generated successfully!');
}

generatePostsMap(); 