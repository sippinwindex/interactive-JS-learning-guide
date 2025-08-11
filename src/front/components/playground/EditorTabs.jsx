// src/front/components/playground/EditorTabs.jsx
import React from 'react';
import { getFileIcon } from './utils/fileUtils';

const EditorTabs = ({ files, openTabs, activeFile, dispatch }) => {
  const handleCloseTab = (e, filename) => {
    e.stopPropagation();
    dispatch({ type: 'CLOSE_TAB', payload: filename });
  };

  const handleTabClick = (filename) => {
    dispatch({ type: 'SET_ACTIVE_FILE', payload: filename });
  };

  if (openTabs.length === 0) {
    return (
      <div className="bg-gray-800 px-4 py-2 text-gray-500 text-sm border-b border-gray-700">
        No files open
      </div>
    );
  }

  return (
    <div className="bg-gray-800 flex items-center overflow-x-auto border-b border-gray-700">
      <div className="flex">
        {openTabs.map(filename => (
          <div
            key={filename}
            className={`flex items-center px-3 py-2 text-sm cursor-pointer transition-all group ${
              activeFile === filename
                ? 'bg-gray-900 text-white border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
            onClick={() => handleTabClick(filename)}
          >
            <span className="mr-2">{getFileIcon(filename)}</span>
            <span className="max-w-[120px] truncate">{filename}</span>
            {files[filename]?.unsaved && (
              <span className="ml-1 text-white">•</span>
            )}
            <button
              onClick={(e) => handleCloseTab(e, filename)}
              className="ml-2 opacity-0 group-hover:opacity-100 hover:bg-gray-600 rounded p-0.5 transition-opacity"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
      
      {/* Add new file button */}
      <button
        onClick={() => dispatch({ type: 'SHOW_NEW_FILE_DIALOG' })}
        className="px-2 py-2 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
        title="New File"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};

export default EditorTabs;