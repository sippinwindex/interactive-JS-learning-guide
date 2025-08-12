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

  const handleNewFile = () => {
    dispatch({ type: 'SHOW_NEW_FILE_DIALOG' });
  };

  if (openTabs.length === 0) {
    return (
      <div className="bg-gray-800 px-4 py-3 text-gray-500 text-sm border-b border-gray-700 flex items-center justify-between">
        <span>No files open</span>
        <button
          onClick={handleNewFile}
          className="text-gray-400 hover:text-white transition-colors"
          title="New File"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 flex items-center overflow-x-auto border-b border-gray-700 min-h-[40px]">
      {/* Tabs Container */}
      <div className="flex flex-1 min-w-0">
        {openTabs.map(filename => (
          <button
            key={filename}
            className={`flex items-center px-4 py-2 text-sm cursor-pointer transition-all group min-w-0 border-r border-gray-700 ${
              activeFile === filename
                ? 'bg-gray-900 text-white border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
            onClick={() => handleTabClick(filename)}
            title={filename}
          >
            {/* File Icon */}
            <span className="mr-2 flex-shrink-0 text-base">{getFileIcon(filename)}</span>
            
            {/* File Name */}
            <span className="truncate max-w-[120px] flex-1">{filename}</span>
            
            {/* Unsaved Indicator */}
            {files[filename]?.unsaved && (
              <span className="ml-1 text-white flex-shrink-0">•</span>
            )}
            
            {/* Close Button */}
            <button
              onClick={(e) => handleCloseTab(e, filename)}
              className="ml-2 opacity-0 group-hover:opacity-100 hover:bg-gray-600 rounded p-0.5 transition-all flex-shrink-0"
              title="Close file"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </button>
        ))}
      </div>
      
      {/* Add New File Button */}
      <div className="flex-shrink-0 border-l border-gray-700">
        <button
          onClick={handleNewFile}
          className="px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
          title="New File"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EditorTabs;