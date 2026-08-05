export async function fetchGitHubRepoTree(owner, repo) {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  const headers = token ? { Authorization: `token ${token}` } : {};

  // First, fetch repo details to get the default branch
  const repoInfoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
  if (!repoInfoRes.ok) {
    throw new Error(`Failed to fetch repo info: ${repoInfoRes.statusText}`);
  }
  const repoInfo = await repoInfoRes.json();
  const branch = repoInfo.default_branch || 'main';

  // Fetch the entire tree recursively using the default branch
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`, { headers });
  if (!response.ok) {
    throw new Error(`Failed to fetch repo tree: ${response.statusText}`);
  }
  
  const data = await response.json();
  const tree = data.tree;

  // Filter out node_modules, dist, .git, and common cache files
  const ignorePatterns = [
    /^node_modules\//,
    /^\.git\//,
    /^dist\//,
    /^build\//,
    /\.DS_Store$/
  ];

  const filesToFetch = tree.filter(item => 
    item.type === 'blob' && 
    !ignorePatterns.some(pattern => pattern.test(item.path))
  );

  const fileSystemTree = {};

  // Helper to create nested directory structure
  const ensureDir = (pathParts) => {
    let current = fileSystemTree;
    for (const part of pathParts) {
      if (!current[part]) {
        current[part] = { directory: {} };
      }
      current = current[part].directory;
    }
    return current;
  };

  const isBinaryPattern = /\.(png|jpe?g|gif|ico|webp|mp4|webm|woff2?|eot|ttf|otf|pdf|zip)$/i;

  // Fetch file contents in chunks to avoid overwhelming the browser/API
  const chunkSize = 10;
  for (let i = 0; i < filesToFetch.length; i += chunkSize) {
    const chunk = filesToFetch.slice(i, i + chunkSize);
    
    await Promise.all(chunk.map(async (item) => {
      try {
        const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${item.path}`;
        const fileRes = await fetch(rawUrl);
        if (!fileRes.ok) return;
        
        let content;
        if (isBinaryPattern.test(item.path)) {
          const buffer = await fileRes.arrayBuffer();
          content = new Uint8Array(buffer);
        } else {
          content = await fileRes.text();
        }
        
        const parts = item.path.split('/');
        const fileName = parts.pop();
        const dir = ensureDir(parts);
        
        dir[fileName] = {
          file: {
            contents: content
          }
        };
      } catch (e) {
        console.error(`Failed to fetch ${item.path}`, e);
      }
    }));
  }

  // If no package.json exists, this is likely a static HTML/JS/CSS project.
  // We inject a basic express server to serve the static files so WebContainers can run it.
  if (!fileSystemTree['package.json']) {
    fileSystemTree['package.json'] = {
      file: {
        contents: JSON.stringify({
          name: "static-server",
          type: "module",
          dependencies: { "express": "latest" },
          scripts: { "dev": "node server.js" }
        }, null, 2)
      }
    };
    fileSystemTree['server.js'] = {
      file: {
        contents: `
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(__dirname));

app.listen(3000, () => {
  console.log('Static server listening on port 3000');
});
        `
      }
    };
  }

  return fileSystemTree;
}
