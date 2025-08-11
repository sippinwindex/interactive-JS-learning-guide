// MonacoThemes.js - VS Code Theme Definitions for Monaco Editor

export const themeList = {
  'vs-dark': { name: 'Dark (Visual Studio)', icon: '🌑' },
  'vs': { name: 'Light (Visual Studio)', icon: '☀️' },
  'hc-black': { name: 'High Contrast', icon: '⚫' },
  'hc-light': { name: 'High Contrast Light', icon: '⚪' },
  'dracula': { name: 'Dracula', icon: '🧛' },
  'monokai': { name: 'Monokai Pro', icon: '🎨' },
  'cobalt2': { name: 'Cobalt2', icon: '💎' },
  'tokyo-night': { name: 'Tokyo Night', icon: '🌃' },
  'github-dark': { name: 'GitHub Dark', icon: '🐙' },
  'github-light': { name: 'GitHub Light', icon: '🐱' },
  'one-dark': { name: 'One Dark Pro', icon: '🔵' },
  'material': { name: 'Material Theme', icon: '🎭' },
  'nord': { name: 'Nord', icon: '❄️' },
  'solarized-dark': { name: 'Solarized Dark', icon: '🌒' },
  'solarized-light': { name: 'Solarized Light', icon: '🌞' },
  'synthwave': { name: 'SynthWave \'84', icon: '🌆' },
  'night-owl': { name: 'Night Owl', icon: '🦉' },
  'palenight': { name: 'Palenight', icon: '🌙' },
  'ayu-dark': { name: 'Ayu Dark', icon: '🍃' },
  'ayu-light': { name: 'Ayu Light', icon: '🌿' }
};

export const defineCustomThemes = (monaco) => {
  // Dracula Theme
  monaco.editor.defineTheme('dracula', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '6272a4', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'ff79c6' },
      { token: 'string', foreground: 'f1fa8c' },
      { token: 'number', foreground: 'bd93f9' },
      { token: 'regexp', foreground: 'ff79c6' },
      { token: 'operator', foreground: 'ff79c6' },
      { token: 'namespace', foreground: '8be9fd' },
      { token: 'type', foreground: '8be9fd' },
      { token: 'function', foreground: '50fa7b' },
      { token: 'variable', foreground: 'f8f8f2' },
      { token: 'constant', foreground: 'bd93f9' },
      { token: 'parameter', foreground: 'ffb86c' },
      { token: 'tag', foreground: 'ff79c6' },
      { token: 'attribute.name', foreground: '50fa7b' },
      { token: 'attribute.value', foreground: 'f1fa8c' }
    ],
    colors: {
      'editor.background': '#282a36',
      'editor.foreground': '#f8f8f2',
      'editor.lineHighlightBackground': '#44475a',
      'editor.selectionBackground': '#44475a',
      'editorCursor.foreground': '#f8f8f2',
      'editorWhitespace.foreground': '#44475a',
      'editorLineNumber.foreground': '#6272a4',
      'editorLineNumber.activeForeground': '#f8f8f2',
      'editor.selectionHighlightBackground': '#424450'
    }
  });

  // Monokai Pro Theme
  monaco.editor.defineTheme('monokai', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '75715e', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'f92672' },
      { token: 'string', foreground: 'e6db74' },
      { token: 'number', foreground: 'ae81ff' },
      { token: 'regexp', foreground: 'e6db74' },
      { token: 'operator', foreground: 'f92672' },
      { token: 'constant', foreground: 'ae81ff' },
      { token: 'function', foreground: 'a6e22e' },
      { token: 'variable', foreground: 'f8f8f2' },
      { token: 'type', foreground: '66d9ef' },
      { token: 'class', foreground: '66d9ef' },
      { token: 'tag', foreground: 'f92672' },
      { token: 'attribute.name', foreground: 'a6e22e' },
      { token: 'attribute.value', foreground: 'e6db74' }
    ],
    colors: {
      'editor.background': '#2d2a2e',
      'editor.foreground': '#fcfcfa',
      'editor.lineHighlightBackground': '#3e3d42',
      'editor.selectionBackground': '#535155',
      'editorCursor.foreground': '#fcfcfa',
      'editorLineNumber.foreground': '#90908a',
      'editorLineNumber.activeForeground': '#c3c3c1',
      'editor.selectionHighlightBackground': '#545053'
    }
  });

  // Cobalt2 Theme
  monaco.editor.defineTheme('cobalt2', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '0088ff', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'ff9d00' },
      { token: 'string', foreground: '3ad900' },
      { token: 'number', foreground: 'ff628c' },
      { token: 'regexp', foreground: '80ffbb' },
      { token: 'operator', foreground: 'ff9d00' },
      { token: 'function', foreground: 'ffee80' },
      { token: 'variable', foreground: 'ffffff' },
      { token: 'constant', foreground: 'ff628c' },
      { token: 'type', foreground: 'ffc600' },
      { token: 'tag', foreground: 'ff9d00' },
      { token: 'attribute.name', foreground: 'ffee80' },
      { token: 'attribute.value', foreground: '3ad900' }
    ],
    colors: {
      'editor.background': '#193549',
      'editor.foreground': '#ffffff',
      'editor.lineHighlightBackground': '#1f4662',
      'editor.selectionBackground': '#0050a4',
      'editorCursor.foreground': '#ffc600',
      'editorLineNumber.foreground': '#0088ff',
      'editorLineNumber.activeForeground': '#ffffff',
      'editor.selectionHighlightBackground': '#0050a480'
    }
  });

  // Tokyo Night Theme
  monaco.editor.defineTheme('tokyo-night', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '565f89', fontStyle: 'italic' },
      { token: 'keyword', foreground: '9d7cd8' },
      { token: 'string', foreground: '9ece6a' },
      { token: 'number', foreground: 'ff9e64' },
      { token: 'regexp', foreground: 'b4f9f8' },
      { token: 'operator', foreground: '89ddff' },
      { token: 'function', foreground: '7aa2f7' },
      { token: 'variable', foreground: 'c0caf5' },
      { token: 'constant', foreground: 'ff9e64' },
      { token: 'type', foreground: '2ac3de' },
      { token: 'tag', foreground: 'f7768e' },
      { token: 'attribute.name', foreground: '7aa2f7' },
      { token: 'attribute.value', foreground: '9ece6a' }
    ],
    colors: {
      'editor.background': '#1a1b26',
      'editor.foreground': '#a9b1d6',
      'editor.lineHighlightBackground': '#24283b',
      'editor.selectionBackground': '#364a82',
      'editorCursor.foreground': '#c0caf5',
      'editorLineNumber.foreground': '#3b4261',
      'editorLineNumber.activeForeground': '#737aa2',
      'editor.selectionHighlightBackground': '#364a8280'
    }
  });

  // GitHub Dark Theme
  monaco.editor.defineTheme('github-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '8b949e', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'ff7b72' },
      { token: 'string', foreground: 'a5d6ff' },
      { token: 'number', foreground: '79c0ff' },
      { token: 'regexp', foreground: 'd2a8ff' },
      { token: 'operator', foreground: 'ff7b72' },
      { token: 'function', foreground: 'd2a8ff' },
      { token: 'variable', foreground: 'ffa657' },
      { token: 'constant', foreground: '79c0ff' },
      { token: 'type', foreground: 'ffa657' },
      { token: 'tag', foreground: '7ee83f' },
      { token: 'attribute.name', foreground: '79c0ff' },
      { token: 'attribute.value', foreground: 'a5d6ff' }
    ],
    colors: {
      'editor.background': '#0d1117',
      'editor.foreground': '#c9d1d9',
      'editor.lineHighlightBackground': '#161b22',
      'editor.selectionBackground': '#3392ff44',
      'editorCursor.foreground': '#58a6ff',
      'editorLineNumber.foreground': '#8b949e',
      'editorLineNumber.activeForeground': '#c9d1d9'
    }
  });

  // GitHub Light Theme
  monaco.editor.defineTheme('github-light', {
    base: 'vs',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '6e7781', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'cf222e' },
      { token: 'string', foreground: '0a3069' },
      { token: 'number', foreground: '0550ae' },
      { token: 'regexp', foreground: '0a3069' },
      { token: 'operator', foreground: 'cf222e' },
      { token: 'function', foreground: '8250df' },
      { token: 'variable', foreground: '953800' },
      { token: 'constant', foreground: '0550ae' },
      { token: 'type', foreground: '953800' },
      { token: 'tag', foreground: '116329' },
      { token: 'attribute.name', foreground: '0550ae' },
      { token: 'attribute.value', foreground: '0a3069' }
    ],
    colors: {
      'editor.background': '#ffffff',
      'editor.foreground': '#24292f',
      'editor.lineHighlightBackground': '#f6f8fa',
      'editor.selectionBackground': '#0969da1a',
      'editorCursor.foreground': '#0969da',
      'editorLineNumber.foreground': '#8c959f',
      'editorLineNumber.activeForeground': '#24292f'
    }
  });

  // One Dark Pro Theme
  monaco.editor.defineTheme('one-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '5c6370', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'c678dd' },
      { token: 'string', foreground: '98c379' },
      { token: 'number', foreground: 'd19a66' },
      { token: 'regexp', foreground: '98c379' },
      { token: 'operator', foreground: '56b6c2' },
      { token: 'function', foreground: '61afef' },
      { token: 'variable', foreground: 'e06c75' },
      { token: 'constant', foreground: 'd19a66' },
      { token: 'type', foreground: 'e5c07b' },
      { token: 'tag', foreground: 'e06c75' },
      { token: 'attribute.name', foreground: 'd19a66' },
      { token: 'attribute.value', foreground: '98c379' }
    ],
    colors: {
      'editor.background': '#282c34',
      'editor.foreground': '#abb2bf',
      'editor.lineHighlightBackground': '#2c313c',
      'editor.selectionBackground': '#3e4451',
      'editorCursor.foreground': '#528bff',
      'editorLineNumber.foreground': '#5c6370',
      'editorLineNumber.activeForeground': '#abb2bf'
    }
  });

  // Material Theme
  monaco.editor.defineTheme('material', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '546e7a', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'c792ea' },
      { token: 'string', foreground: 'c3e88d' },
      { token: 'number', foreground: 'f78c6c' },
      { token: 'regexp', foreground: '89ddff' },
      { token: 'operator', foreground: '89ddff' },
      { token: 'function', foreground: '82aaff' },
      { token: 'variable', foreground: 'f07178' },
      { token: 'constant', foreground: 'f78c6c' },
      { token: 'type', foreground: 'ffcb6b' },
      { token: 'tag', foreground: 'f07178' },
      { token: 'attribute.name', foreground: 'c792ea' },
      { token: 'attribute.value', foreground: 'c3e88d' }
    ],
    colors: {
      'editor.background': '#263238',
      'editor.foreground': '#eeffff',
      'editor.lineHighlightBackground': '#00000050',
      'editor.selectionBackground': '#00000050',
      'editorCursor.foreground': '#ffcc00',
      'editorLineNumber.foreground': '#37474f',
      'editorLineNumber.activeForeground': '#607a86'
    }
  });

  // Nord Theme
  monaco.editor.defineTheme('nord', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '616e88', fontStyle: 'italic' },
      { token: 'keyword', foreground: '81a1c1' },
      { token: 'string', foreground: 'a3be8c' },
      { token: 'number', foreground: 'b48ead' },
      { token: 'regexp', foreground: 'ebcb8b' },
      { token: 'operator', foreground: '81a1c1' },
      { token: 'function', foreground: '88c0d0' },
      { token: 'variable', foreground: 'd8dee9' },
      { token: 'constant', foreground: 'b48ead' },
      { token: 'type', foreground: '8fbcbb' },
      { token: 'tag', foreground: '81a1c1' },
      { token: 'attribute.name', foreground: '8fbcbb' },
      { token: 'attribute.value', foreground: 'a3be8c' }
    ],
    colors: {
      'editor.background': '#2e3440',
      'editor.foreground': '#d8dee9',
      'editor.lineHighlightBackground': '#3b4252',
      'editor.selectionBackground': '#434c5e',
      'editorCursor.foreground': '#d8dee9',
      'editorLineNumber.foreground': '#4c566a',
      'editorLineNumber.activeForeground': '#d8dee9'
    }
  });

  // Solarized Dark Theme
  monaco.editor.defineTheme('solarized-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '586e75', fontStyle: 'italic' },
      { token: 'keyword', foreground: '859900' },
      { token: 'string', foreground: '2aa198' },
      { token: 'number', foreground: 'd33682' },
      { token: 'regexp', foreground: 'dc322f' },
      { token: 'operator', foreground: '859900' },
      { token: 'function', foreground: '268bd2' },
      { token: 'variable', foreground: '839496' },
      { token: 'constant', foreground: 'b58900' },
      { token: 'type', foreground: 'b58900' },
      { token: 'tag', foreground: '268bd2' },
      { token: 'attribute.name', foreground: '93a1a1' },
      { token: 'attribute.value', foreground: '2aa198' }
    ],
    colors: {
      'editor.background': '#002b36',
      'editor.foreground': '#839496',
      'editor.lineHighlightBackground': '#073642',
      'editor.selectionBackground': '#073642',
      'editorCursor.foreground': '#839496',
      'editorLineNumber.foreground': '#586e75',
      'editorLineNumber.activeForeground': '#839496'
    }
  });

  // Solarized Light Theme
  monaco.editor.defineTheme('solarized-light', {
    base: 'vs',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '93a1a1', fontStyle: 'italic' },
      { token: 'keyword', foreground: '859900' },
      { token: 'string', foreground: '2aa198' },
      { token: 'number', foreground: 'd33682' },
      { token: 'regexp', foreground: 'dc322f' },
      { token: 'operator', foreground: '859900' },
      { token: 'function', foreground: '268bd2' },
      { token: 'variable', foreground: '657b83' },
      { token: 'constant', foreground: 'b58900' },
      { token: 'type', foreground: 'b58900' },
      { token: 'tag', foreground: '268bd2' },
      { token: 'attribute.name', foreground: '586e75' },
      { token: 'attribute.value', foreground: '2aa198' }
    ],
    colors: {
      'editor.background': '#fdf6e3',
      'editor.foreground': '#657b83',
      'editor.lineHighlightBackground': '#eee8d5',
      'editor.selectionBackground': '#eee8d5',
      'editorCursor.foreground': '#657b83',
      'editorLineNumber.foreground': '#93a1a1',
      'editorLineNumber.activeForeground': '#657b83'
    }
  });

  // SynthWave '84 Theme
  monaco.editor.defineTheme('synthwave', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '848bbd', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'fede5d' },
      { token: 'string', foreground: 'ff8b39' },
      { token: 'number', foreground: 'f97e72' },
      { token: 'regexp', foreground: 'ff8b39' },
      { token: 'operator', foreground: 'fede5d' },
      { token: 'function', foreground: '36f9f6' },
      { token: 'variable', foreground: 'ff7edb' },
      { token: 'constant', foreground: 'f97e72' },
      { token: 'type', foreground: 'fe4450' },
      { token: 'tag', foreground: '72f1b8' },
      { token: 'attribute.name', foreground: 'fede5d' },
      { token: 'attribute.value', foreground: 'ff8b39' }
    ],
    colors: {
      'editor.background': '#2a2139',
      'editor.foreground': '#f0eff1',
      'editor.lineHighlightBackground': '#34294f',
      'editor.selectionBackground': '#463465',
      'editorCursor.foreground': '#fede5d',
      'editorLineNumber.foreground': '#848bbd',
      'editorLineNumber.activeForeground': '#f0eff1'
    }
  });

  // Night Owl Theme
  monaco.editor.defineTheme('night-owl', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '637777', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'c792ea' },
      { token: 'string', foreground: 'ecc48d' },
      { token: 'number', foreground: 'f78c6c' },
      { token: 'regexp', foreground: '5ca7e4' },
      { token: 'operator', foreground: 'c792ea' },
      { token: 'function', foreground: '82aaff' },
      { token: 'variable', foreground: 'd6deeb' },
      { token: 'constant', foreground: 'f78c6c' },
      { token: 'type', foreground: 'ffcb8b' },
      { token: 'tag', foreground: 'caece6' },
      { token: 'attribute.name', foreground: 'c792ea' },
      { token: 'attribute.value', foreground: 'ecc48d' }
    ],
    colors: {
      'editor.background': '#011627',
      'editor.foreground': '#d6deeb',
      'editor.lineHighlightBackground': '#01121f',
      'editor.selectionBackground': '#1d3b53',
      'editorCursor.foreground': '#80a4c2',
      'editorLineNumber.foreground': '#4b6479',
      'editorLineNumber.activeForeground': '#c5e4fd'
    }
  });

  // Palenight Theme
  monaco.editor.defineTheme('palenight', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '676e95', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'c792ea' },
      { token: 'string', foreground: 'c3e88d' },
      { token: 'number', foreground: 'f78c6c' },
      { token: 'regexp', foreground: '89ddff' },
      { token: 'operator', foreground: '89ddff' },
      { token: 'function', foreground: '82aaff' },
      { token: 'variable', foreground: 'f07178' },
      { token: 'constant', foreground: 'f78c6c' },
      { token: 'type', foreground: 'ffcb6b' },
      { token: 'tag', foreground: 'f07178' },
      { token: 'attribute.name', foreground: 'c792ea' },
      { token: 'attribute.value', foreground: 'c3e88d' }
    ],
    colors: {
      'editor.background': '#292d3e',
      'editor.foreground': '#a6accd',
      'editor.lineHighlightBackground': '#00000030',
      'editor.selectionBackground': '#717cb440',
      'editorCursor.foreground': '#ffcc00',
      'editorLineNumber.foreground': '#3a3f58',
      'editorLineNumber.activeForeground': '#676e95'
    }
  });

  // Ayu Dark Theme
  monaco.editor.defineTheme('ayu-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '5c6773', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'ffa759' },
      { token: 'string', foreground: 'bae67e' },
      { token: 'number', foreground: 'ffcc66' },
      { token: 'regexp', foreground: '95e6cb' },
      { token: 'operator', foreground: 'f29668' },
      { token: 'function', foreground: 'ffd580' },
      { token: 'variable', foreground: 'cbccc6' },
      { token: 'constant', foreground: 'ffcc66' },
      { token: 'type', foreground: '73d0ff' },
      { token: 'tag', foreground: '5ccfe6' },
      { token: 'attribute.name', foreground: 'ffa759' },
      { token: 'attribute.value', foreground: 'bae67e' }
    ],
    colors: {
      'editor.background': '#0a0e14',
      'editor.foreground': '#b3b1ad',
      'editor.lineHighlightBackground': '#00010a',
      'editor.selectionBackground': '#273747',
      'editorCursor.foreground': '#ff6a00',
      'editorLineNumber.foreground': '#3d424d',
      'editorLineNumber.activeForeground': '#626a73'
    }
  });

  // Ayu Light Theme
  monaco.editor.defineTheme('ayu-light', {
    base: 'vs',
    inherit: true,
    rules: [
      { token: 'comment', foreground: 'abb0b6', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'fa8d3e' },
      { token: 'string', foreground: '86b300' },
      { token: 'number', foreground: 'ff9940' },
      { token: 'regexp', foreground: '4cbf99' },
      { token: 'operator', foreground: 'ed9366' },
      { token: 'function', foreground: 'f2ae49' },
      { token: 'variable', foreground: '5c6773' },
      { token: 'constant', foreground: 'ff9940' },
      { token: 'type', foreground: '399ee6' },
      { token: 'tag', foreground: '55b4d4' },
      { token: 'attribute.name', foreground: 'fa8d3e' },
      { token: 'attribute.value', foreground: '86b300' }
    ],
    colors: {
      'editor.background': '#fafafa',
      'editor.foreground': '#5c6773',
      'editor.lineHighlightBackground': '#f2f2f2',
      'editor.selectionBackground': '#d1e4f4',
      'editorCursor.foreground': '#ff6a00',
      'editorLineNumber.foreground': '#abb0b6',
      'editorLineNumber.activeForeground': '#5c6773'
    }
  });
};

export default { themeList, defineCustomThemes };