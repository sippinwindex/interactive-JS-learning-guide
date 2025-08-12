// src/front/components/playground/utils/fileUtils.js
import React from 'react';
import { 
  FileTextIcon, 
  FileCodeIcon, 
  FolderIcon,
  DocumentTextIcon 
} from '../../ui/Icons';

export const getFileIcon = (filename, isFolder = false) => {
  if (isFolder) {
    return <FolderIcon className="w-4 h-4 text-blue-500" />;
  }

  const ext = filename.split('.').pop()?.toLowerCase();
  const iconClass = "w-4 h-4";
  
  switch (ext) {
    case 'html':
    case 'htm':
      return <FileTextIcon className={`${iconClass} text-orange-500`} />;
    case 'css':
    case 'scss':
    case 'sass':
    case 'less':
      return <FileCodeIcon className={`${iconClass} text-blue-500`} />;
    case 'js':
    case 'jsx':
      return <FileCodeIcon className={`${iconClass} text-yellow-500`} />;
    case 'ts':
    case 'tsx':
      return <FileCodeIcon className={`${iconClass} text-blue-600`} />;
    case 'json':
      return <FileTextIcon className={`${iconClass} text-green-500`} />;
    case 'md':
    case 'markdown':
      return <DocumentTextIcon className={`${iconClass} text-gray-600`} />;
    case 'py':
      return <FileCodeIcon className={`${iconClass} text-blue-600`} />;
    case 'java':
      return <FileCodeIcon className={`${iconClass} text-red-500`} />;
    case 'c':
    case 'cpp':
    case 'c++':
      return <FileCodeIcon className={`${iconClass} text-purple-600`} />;
    case 'php':
      return <FileCodeIcon className={`${iconClass} text-indigo-600`} />;
    case 'rb':
    case 'ruby':
      return <FileCodeIcon className={`${iconClass} text-red-600`} />;
    case 'go':
      return <FileCodeIcon className={`${iconClass} text-cyan-600`} />;
    case 'rs':
    case 'rust':
      return <FileCodeIcon className={`${iconClass} text-orange-600`} />;
    case 'swift':
      return <FileCodeIcon className={`${iconClass} text-orange-500`} />;
    case 'kt':
    case 'kotlin':
      return <FileCodeIcon className={`${iconClass} text-purple-500`} />;
    case 'xml':
      return <FileTextIcon className={`${iconClass} text-orange-400`} />;
    case 'yaml':
    case 'yml':
      return <FileTextIcon className={`${iconClass} text-orange-400`} />;
    case 'sql':
      return <FileCodeIcon className={`${iconClass} text-pink-600`} />;
    case 'sh':
    case 'bash':
      return <FileCodeIcon className={`${iconClass} text-gray-600`} />;
    case 'dockerfile':
      return <FileTextIcon className={`${iconClass} text-blue-400`} />;
    case 'env':
      return <FileTextIcon className={`${iconClass} text-gray-500`} />;
    case 'txt':
      return <FileTextIcon className={`${iconClass} text-gray-500`} />;
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'svg':
    case 'webp':
    case 'ico':
      return <FileTextIcon className={`${iconClass} text-purple-500`} />;
    case 'pdf':
      return <FileTextIcon className={`${iconClass} text-red-600`} />;
    default:
      return <FileTextIcon className={`${iconClass} text-gray-500`} />;
  }
};

export const getLanguageFromExtension = (filename) => {
  const ext = filename.split('.').pop()?.toLowerCase();
  
  switch (ext) {
    case 'html':
    case 'htm':
      return 'html';
    case 'css':
      return 'css';
    case 'scss':
      return 'scss';
    case 'sass':
      return 'sass';
    case 'less':
      return 'less';
    case 'js':
    case 'jsx':
    case 'mjs':
    case 'cjs':
      return 'javascript';
    case 'ts':
    case 'tsx':
      return 'typescript';
    case 'vue':
      return 'vue';
    case 'svelte':
      return 'svelte';
    case 'json':
      return 'json';
    case 'xml':
      return 'xml';
    case 'yaml':
    case 'yml':
      return 'yaml';
    case 'toml':
      return 'toml';
    case 'csv':
      return 'csv';
    case 'py':
    case 'pyw':
      return 'python';
    case 'java':
      return 'java';
    case 'c':
      return 'c';
    case 'cpp':
    case 'c++':
    case 'cc':
    case 'cxx':
      return 'cpp';
    case 'cs':
      return 'csharp';
    case 'php':
      return 'php';
    case 'rb':
      return 'ruby';
    case 'go':
      return 'go';
    case 'rs':
      return 'rust';
    case 'swift':
      return 'swift';
    case 'kt':
      return 'kotlin';
    case 'scala':
      return 'scala';
    case 'r':
      return 'r';
    case 'lua':
      return 'lua';
    case 'dart':
      return 'dart';
    case 'sh':
    case 'bash':
    case 'zsh':
    case 'fish':
      return 'shell';
    case 'ps1':
      return 'powershell';
    case 'bat':
    case 'cmd':
      return 'bat';
    case 'sql':
    case 'mysql':
    case 'pgsql':
    case 'sqlite':
      return 'sql';
    case 'env':
      return 'dotenv';
    case 'config':
    case 'conf':
      return 'plaintext';
    case 'ini':
      return 'ini';
    case 'dockerfile':
      return 'dockerfile';
    case 'nginx':
      return 'nginx';
    case 'md':
    case 'mdx':
      return 'markdown';
    case 'txt':
      return 'plaintext';
    case 'rst':
      return 'restructuredtext';
    case 'tex':
      return 'latex';
    default:
      return 'plaintext';
  }
};

export const getDefaultContent = (filename) => {
  const ext = filename.split('.').pop()?.toLowerCase();
  
  switch (ext) {
    case 'html':
    case 'htm':
      return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Hello World</h1>
    <p>Start building your project here...</p>
</body>
</html>`;
    
    case 'css':
      return `/* CSS Styles */
body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}`;
    
    case 'js':
      return `// JavaScript Code
console.log('Hello, World!');

// Example function
function greetUser(name) {
    return \`Hello, \${name}! Welcome to the playground.\`;
}

// Call the function
console.log(greetUser('Developer'));`;
    
    case 'jsx':
      return `import React from 'react';

const Component = () => {
    const [count, setCount] = React.useState(0);
    
    return (
        <div>
            <h1>React Component</h1>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
        </div>
    );
};

export default Component;`;
    
    case 'ts':
      return `// TypeScript Code
interface User {
    id: number;
    name: string;
    email: string;
}

function createUser(name: string, email: string): User {
    return {
        id: Math.floor(Math.random() * 1000),
        name,
        email
    };
}

const user = createUser('John Doe', 'john@example.com');
console.log(user);`;
    
    case 'tsx':
      return `import React from 'react';

interface Props {
    title: string;
    count?: number;
}

const TypeScriptComponent: React.FC<Props> = ({ title, count = 0 }) => {
    const [value, setValue] = React.useState<number>(count);
    
    return (
        <div>
            <h1>{title}</h1>
            <p>Value: {value}</p>
            <button onClick={() => setValue(value + 1)}>
                Increment
            </button>
        </div>
    );
};

export default TypeScriptComponent;`;
    
    case 'py':
      return `# Python Script
def main():
    """Main function to demonstrate Python basics."""
    name = "World"
    message = f"Hello, {name}!"
    print(message)
    
    # List comprehension example
    numbers = [x**2 for x in range(1, 6)]
    print(f"Squares: {numbers}")

if __name__ == "__main__":
    main()`;
    
    case 'java':
      return `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Create an instance and call method
        HelloWorld app = new HelloWorld();
        app.greetUser("Developer");
    }
    
    public void greetUser(String name) {
        System.out.println("Hello, " + name + "!");
    }
}`;
    
    case 'json':
      return `{
  "name": "my-project",
  "version": "1.0.0",
  "description": "A sample project",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "keywords": ["javascript", "playground"],
  "author": "Developer",
  "license": "MIT"
}`;
    
    case 'md':
    case 'markdown':
      return `# Project Title

## Description

A brief description of what this project does and who it's for.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository
\`\`\`bash
git clone <repository-url>
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Start the development server
\`\`\`bash
npm start
\`\`\`

## Usage

Explain how to use your project here.

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

## License

This project is licensed under the MIT License.`;
    
    case 'env':
      return `# Environment Variables
NODE_ENV=development
PORT=3000
API_URL=http://localhost:3001

# API Keys (never commit real keys)
API_KEY=your_api_key_here
SECRET_KEY=your_secret_key_here`;
    
    default:
      return '// Start coding here...\n';
  }
};

// Utility function to check if file is binary
export const isBinaryFile = (filename) => {
  const binaryExtensions = [
    'png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'ico', 'bmp', 'tiff',
    'pdf', 'zip', 'rar', '7z', 'tar', 'gz', 'bz2',
    'mp3', 'wav', 'flac', 'aac', 'ogg',
    'mp4', 'avi', 'mkv', 'mov', 'wmv', 'webm',
    'exe', 'dmg', 'deb', 'rpm'
  ];
  
  const ext = filename.split('.').pop()?.toLowerCase();
  return binaryExtensions.includes(ext);
};

// Get file size category for styling
export const getFileSizeCategory = (content) => {
  const size = content?.length || 0;
  if (size < 1000) return 'small';
  if (size < 10000) return 'medium';
  if (size < 100000) return 'large';
  return 'very-large';
};

// Validate filename
export const isValidFilename = (filename) => {
  // Check for invalid characters
  const invalidChars = /[<>:"|?*\x00-\x1f]/;
  if (invalidChars.test(filename)) return false;
  
  // Check for reserved names (Windows)
  const reservedNames = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(\.|$)/i;
  if (reservedNames.test(filename)) return false;
  
  // Check length
  if (filename.length === 0 || filename.length > 255) return false;
  
  // Check for leading/trailing spaces or periods
  if (filename.trim() !== filename || filename.endsWith('.')) return false;
  
  return true;
};

// Get appropriate Monaco editor language
export const getMonacoLanguage = (filename) => {
  const ext = filename.split('.').pop()?.toLowerCase();
  
  switch (ext) {
    case 'html':
    case 'htm':
      return 'html';
    case 'css':
      return 'css';
    case 'scss':
      return 'scss';
    case 'sass':
      return 'scss'; // Monaco uses scss for sass
    case 'less':
      return 'less';
    case 'js':
    case 'jsx':
      return 'javascript';
    case 'ts':
    case 'tsx':
      return 'typescript';
    case 'json':
      return 'json';
    case 'xml':
      return 'xml';
    case 'yaml':
    case 'yml':
      return 'yaml';
    case 'py':
      return 'python';
    case 'java':
      return 'java';
    case 'c':
      return 'c';
    case 'cpp':
    case 'c++':
      return 'cpp';
    case 'cs':
      return 'csharp';
    case 'php':
      return 'php';
    case 'rb':
      return 'ruby';
    case 'go':
      return 'go';
    case 'rs':
      return 'rust';
    case 'swift':
      return 'swift';
    case 'kt':
      return 'kotlin';
    case 'sql':
      return 'sql';
    case 'sh':
    case 'bash':
      return 'shell';
    case 'dockerfile':
      return 'dockerfile';
    case 'md':
    case 'mdx':
      return 'markdown';
    default:
      return 'plaintext';
  }
};