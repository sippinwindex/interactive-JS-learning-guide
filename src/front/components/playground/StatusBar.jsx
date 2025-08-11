// src/front/components/playground/StatusBar.jsx
import React, { useState, useEffect } from 'react';
import { getLanguageFromExtension } from './utils/fileUtils';

const StatusBar = ({ activeFile, files, cursorPosition }) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [fileCount, setFileCount] = useState(0);
  const [totalSize, setTotalSize] = useState(0);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate file stats
  useEffect(() => {
    const count = Object.keys(files).length;
    const size = Object.values(files).reduce((total, file) => {
      return total + (file.content?.length || 0);
    }, 0);
    setFileCount(count);
    setTotalSize(size);
  }, [files]);

  // Format file size
  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Get current file info
  const currentFile = activeFile ? files[activeFile] : null;
  const language = activeFile ? getLanguageFromExtension(activeFile) : 'plaintext';
  const lineCount = currentFile ? (currentFile.content?.split('\n').length || 0) : 0;
  const charCount = currentFile ? (currentFile.content?.length || 0) : 0;

  return (
    <div className="bg-gray-800 border-t border-gray-700 px-4 py-1 flex items-center justify-between text-xs">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Status */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-gray-400">Ready</span>
        </div>

        {/* Git Branch (mock) */}
        <div className="flex items-center gap-1 text-gray-400">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 3.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM3 5c0-.736.265-1.41.707-1.932l-1.4-1.4A1 1 0 113.72 0.254l1.4 1.4A3.5 3.5 0 118.001 8.5H12a2 2 0 012 2v2.5a3.5 3.5 0 11-2 0V10.5a4 4 0 00-4-4H8a3.5 3.5 0 01-5-1.5z" />
          </svg>
          <span>main</span>
        </div>

        {/* File Info */}
        {activeFile && (
          <>
            <span className="text-gray-400">
              {activeFile}
            </span>
            <span className="text-gray-500">
              {lineCount} lines
            </span>
            <span className="text-gray-500">
              {formatSize(charCount)}
            </span>
          </>
        )}
      </div>

      {/* Center Section */}
      <div className="flex items-center gap-4">
        {/* Problems/Warnings */}
        <div className="flex items-center gap-2 text-gray-400">
          <span className="flex items-center gap-1">
            <span className="text-yellow-500">⚠</span> 0
          </span>
          <span className="flex items-center gap-1">
            <span className="text-red-500">✕</span> 0
          </span>
        </div>

        {/* File Stats */}
        <span className="text-gray-500">
          {fileCount} file{fileCount !== 1 ? 's' : ''}
        </span>
        <span className="text-gray-500">
          Total: {formatSize(totalSize)}
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Language */}
        <span className="text-gray-400">
          {language.charAt(0).toUpperCase() + language.slice(1)}
        </span>

        {/* Encoding */}
        <span className="text-gray-400">UTF-8</span>

        {/* Cursor Position */}
        <span className="text-gray-400">
          Ln {cursorPosition.line}, Col {cursorPosition.column}
        </span>

        {/* Indentation */}
        <span className="text-gray-400">Spaces: 2</span>

        {/* Time */}
        <span className="text-gray-500">{time}</span>
      </div>
    </div>
  );
};

export default StatusBar;