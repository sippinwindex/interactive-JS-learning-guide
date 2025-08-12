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
    <div className="h-full bg-gray-800 flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-gray-700 flex items-center justify-between bg-gray-800">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Explorer
        </span>
        <button
          onClick={() => setShowNewFileInput(true)}
          className="text-gray-400 hover:text-white p-1 rounded hover:bg-gray-700 transition-colors"
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
          <div className="p-3 border-b border-gray-700 bg-gray-750">
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
              className="w-full px-2 py-1 text-sm bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              autoFocus
            />
          </div>
        )}

        {/* Files */}
        <div className="py-1">
          {Object.keys(files).sort().map(filename => (
            <div key={filename}>
              {renamingFile === filename ? (
                <div className="px-3 py-1">
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
                <button
                  className={`w-full flex items-center px-3 py-2 hover:bg-gray-700 cursor-pointer transition-colors text-left ${
                    activeFile === filename 
                      ? 'bg-gray-700 border-l-2 border-blue-500 text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                  onClick={() => handleFileClick(filename)}
                  onContextMenu={(e) => handleContextMenu(e, filename)}
                >
                  <span className="mr-2 text-base flex-shrink-0">{getFileIcon(filename)}</span>
                  <span className="text-sm truncate flex-1">{filename}</span>
                  {files[filename].modifiedAt && activeFile === filename && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2"></span>
                  )}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {Object.keys(files).length === 0 && (
          <div className="flex flex-col items-center justify-center p-8 text-center text-gray-500">
            <div className="text-3xl mb-3">📁</div>
            <p className="text-sm mb-3">No files yet</p>
            <button
              onClick={() => setShowNewFileInput(true)}
              className="text-xs text-blue-400 hover:text-blue-300 underline"
            >
              Create your first file
            </button>
          </div>
        )}
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setContextMenu(null)}
          ></div>
          
          {/* Menu */}
          <div
            className="fixed bg-gray-700 rounded-md shadow-lg py-1 z-50 border border-gray-600 min-w-[120px]"
            style={{ left: contextMenu.x, top: contextMenu.y }}
          >
            <button
              onClick={() => {
                setRenamingFile(contextMenu.filename);
                setRenameValue(contextMenu.filename);
                setContextMenu(null);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 transition-colors"
            >
              Rename
            </button>
            <button
              onClick={() => handleDelete(contextMenu.filename)}
              className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FileExplorer;