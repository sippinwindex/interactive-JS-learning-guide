// src/front/components/playground/FileExplorer.jsx
import React, { useState } from 'react';
import { getFileIcon, getLanguageFromExtension } from './utils/fileUtils';

const FileExplorer = ({ files, activeFile, dispatch }) => {
  const [showNewFileInput, setShowNewFileInput] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [renamingFile, setRenamingFile] = useState(null);
  const [renameValue, setRenameValue] = useState('');
  const [contextMenu, setContextMenu] = useState(null);

  const handleCreateFile = () => {
    if (newFileName.trim()) {
      const language = getLanguageFromExtension(newFileName);
      dispatch({
        type: 'CREATE_FILE',
        payload: {
          filename: newFileName.trim(),
          content: '',
          language
        }
      });
      setNewFileName('');
      setShowNewFileInput(false);
    }
  };

  const handleRename = (oldName) => {
    if (renameValue.trim() && renameValue !== oldName) {
      dispatch({
        type: 'RENAME_FILE',
        payload: { oldName, newName: renameValue.trim() }
      });
    }
    setRenamingFile(null);
    setRenameValue('');
  };

  const handleDelete = (filename) => {
    if (window.confirm(`Delete ${filename}?`)) {
      dispatch({ type: 'DELETE_FILE', payload: filename });
    }
    setContextMenu(null);
  };

  const handleContextMenu = (e, filename) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      filename
    });
  };

  const handleFileClick = (filename) => {
    dispatch({ type: 'SET_ACTIVE_FILE', payload: filename });
  };

  // Close context menu when clicking outside
  React.useEffect(() => {
    const handleClick = () => setContextMenu(null);
    if (contextMenu) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [contextMenu]);

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-gray-700 flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Explorer
        </span>
        <button
          onClick={() => setShowNewFileInput(true)}
          className="text-gray-400 hover:text-white p-1"
          title="New File"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-y-auto">
        {/* New File Input */}
        {showNewFileInput && (
          <div className="p-2 border-b border-gray-700">
            <input
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreateFile();
                if (e.key === 'Escape') {
                  setShowNewFileInput(false);
                  setNewFileName('');
                }
              }}
              onBlur={() => {
                if (!newFileName.trim()) {
                  setShowNewFileInput(false);
                }
              }}
              placeholder="filename.js"
              className="w-full px-2 py-1 text-sm bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              autoFocus
            />
          </div>
        )}

        {/* Files */}
        {Object.keys(files).sort().map(filename => (
          <div key={filename}>
            {renamingFile === filename ? (
              <div className="p-2">
                <input
                  type="text"
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleRename(filename);
                    if (e.key === 'Escape') {
                      setRenamingFile(null);
                      setRenameValue('');
                    }
                  }}
                  onBlur={() => handleRename(filename)}
                  className="w-full px-2 py-1 text-sm bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                  autoFocus
                />
              </div>
            ) : (
              <div
                className={`flex items-center px-3 py-1.5 hover:bg-gray-700 cursor-pointer transition-colors ${
                  activeFile === filename ? 'bg-gray-700 border-l-2 border-blue-500' : ''
                }`}
                onClick={() => handleFileClick(filename)}
                onContextMenu={(e) => handleContextMenu(e, filename)}
              >
                <span className="mr-2 text-lg">{getFileIcon(filename)}</span>
                <span className="text-sm text-gray-300 truncate">{filename}</span>
                {files[filename].modifiedAt && activeFile === filename && (
                  <span className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="fixed bg-gray-700 rounded shadow-lg py-1 z-50"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <button
            onClick={() => {
              setRenamingFile(contextMenu.filename);
              setRenameValue(contextMenu.filename);
              setContextMenu(null);
            }}
            className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-600"
          >
            Rename
          </button>
          <button
            onClick={() => handleDelete(contextMenu.filename)}
            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default FileExplorer;