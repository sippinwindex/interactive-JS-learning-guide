// src/front/components/playground/FileExplorer.jsx
import React, { useState, useRef, useEffect } from 'react';

const FileExplorer = ({ 
  fileTree, 
  activeFile, 
  onFileSelect, 
  onFileCreate, 
  onFileDelete, 
  onFileRename,
  onFolderCreate,
  onFolderDelete,
  theme = 'dark'
}) => {
  const [expandedFolders, setExpandedFolders] = useState(new Set(['root']));
  const [contextMenu, setContextMenu] = useState(null);
  const [renaming, setRenaming] = useState(null);
  const [newItemName, setNewItemName] = useState('');
  const [creatingIn, setCreatingIn] = useState(null);
  const [creatingType, setCreatingType] = useState(null);

  const contextMenuRef = useRef(null);

  // Close context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target)) {
        setContextMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleFolder = (path) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const handleContextMenu = (e, item, path) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      item,
      path
    });
  };

  const handleCreateNew = (type, parentPath) => {
    setCreatingIn(parentPath);
    setCreatingType(type);
    setNewItemName('');
    setContextMenu(null);
    
    // Expand parent folder if creating inside it
    if (parentPath) {
      const newExpanded = new Set(expandedFolders);
      newExpanded.add(parentPath);
      setExpandedFolders(newExpanded);
    }
  };

  const confirmCreate = () => {
    if (newItemName.trim()) {
      const fullPath = creatingIn ? `${creatingIn}/${newItemName}` : newItemName;
      
      if (creatingType === 'file') {
        onFileCreate(fullPath);
      } else {
        onFolderCreate(fullPath);
      }
      
      setCreatingIn(null);
      setCreatingType(null);
      setNewItemName('');
    }
  };

  const handleRename = (path, newName) => {
    if (newName.trim() && newName !== path.split('/').pop()) {
      const pathParts = path.split('/');
      pathParts[pathParts.length - 1] = newName;
      const newPath = pathParts.join('/');
      onFileRename(path, newPath);
    }
    setRenaming(null);
  };

  const getFileIcon = (name, isFolder) => {
    if (isFolder) return '📁';
    
    const ext = name.split('.').pop().toLowerCase();
    const icons = {
      html: '📄',
      css: '🎨',
      js: '📜',
      jsx: '⚛️',
      ts: '📘',
      tsx: '⚛️',
      json: '📊',
      md: '📝',
      txt: '📃',
      png: '🖼️',
      jpg: '🖼️',
      svg: '🎭',
      git: '🔧',
      env: '⚙️'
    };
    
    return icons[ext] || '📄';
  };

  const renderTree = (tree, parentPath = '') => {
    return Object.entries(tree).map(([name, content]) => {
      const currentPath = parentPath ? `${parentPath}/${name}` : name;
      const isFolder = typeof content === 'object' && !content.content;
      const isExpanded = expandedFolders.has(currentPath);
      const isActive = activeFile === currentPath;
      const isRenaming = renaming === currentPath;

      return (
        <div key={currentPath}>
          {/* File/Folder Item */}
          <div
            className={`file-item ${isActive ? 'active' : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '4px 8px',
              paddingLeft: `${(parentPath.split('/').filter(Boolean).length * 16) + 8}px`,
              cursor: 'pointer',
              backgroundColor: isActive ? (theme === 'dark' ? '#2d3748' : '#e2e8f0') : 'transparent',
              color: theme === 'dark' ? '#e2e8f0' : '#2d3748'
            }}
            onClick={() => {
              if (isFolder) {
                toggleFolder(currentPath);
              } else {
                onFileSelect(currentPath);
              }
            }}
            onContextMenu={(e) => handleContextMenu(e, { name, isFolder }, currentPath)}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = theme === 'dark' ? '#374151' : '#f3f4f6';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            {/* Expand/Collapse Arrow for Folders */}
            {isFolder && (
              <span 
                style={{ 
                  marginRight: '4px',
                  transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                  fontSize: '12px',
                  color: theme === 'dark' ? '#9ca3af' : '#6b7280'
                }}
              >
                ▶
              </span>
            )}
            
            {/* Icon */}
            <span style={{ marginRight: '6px', fontSize: '16px' }}>
              {getFileIcon(name, isFolder)}
            </span>
            
            {/* Name */}
            {isRenaming ? (
              <input
                type="text"
                defaultValue={name}
                autoFocus
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleRename(currentPath, e.target.value);
                  } else if (e.key === 'Escape') {
                    setRenaming(null);
                  }
                }}
                onBlur={(e) => handleRename(currentPath, e.target.value)}
                style={{
                  backgroundColor: theme === 'dark' ? '#1f2937' : 'white',
                  color: theme === 'dark' ? '#e2e8f0' : '#2d3748',
                  border: '1px solid',
                  borderColor: theme === 'dark' ? '#4b5563' : '#cbd5e0',
                  borderRadius: '2px',
                  padding: '0 4px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            ) : (
              <span style={{ fontSize: '14px', flex: 1 }}>{name}</span>
            )}
          </div>

          {/* Creating new item input */}
          {creatingIn === currentPath && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '4px 8px',
                paddingLeft: `${((currentPath.split('/').filter(Boolean).length + 1) * 16) + 8}px`,
              }}
            >
              <span style={{ marginRight: '6px', fontSize: '16px' }}>
                {creatingType === 'folder' ? '📁' : '📄'}
              </span>
              <input
                type="text"
                placeholder={`New ${creatingType} name...`}
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    confirmCreate();
                  } else if (e.key === 'Escape') {
                    setCreatingIn(null);
                    setCreatingType(null);
                  }
                }}
                onBlur={confirmCreate}
                autoFocus
                style={{
                  backgroundColor: theme === 'dark' ? '#1f2937' : 'white',
                  color: theme === 'dark' ? '#e2e8f0' : '#2d3748',
                  border: '1px solid',
                  borderColor: theme === 'dark' ? '#4b5563' : '#cbd5e0',
                  borderRadius: '2px',
                  padding: '2px 4px',
                  fontSize: '14px',
                  outline: 'none',
                  width: '100%'
                }}
              />
            </div>
          )}

          {/* Render children if folder is expanded */}
          {isFolder && isExpanded && content && (
            <div>
              {renderTree(content, currentPath)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div style={{ 
      height: '100%', 
      backgroundColor: theme === 'dark' ? '#374151' : '#f9fafb',
      color: theme === 'dark' ? '#e2e8f0' : '#2d3748',
      overflow: 'auto'
    }}>
      {/* Header */}
      <div style={{
        padding: '12px',
        borderBottom: '1px solid',
        borderColor: theme === 'dark' ? '#4b5563' : '#e5e7eb',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
          EXPLORER
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => handleCreateNew('file', '')}
            style={{
              background: 'none',
              border: 'none',
              color: theme === 'dark' ? '#9ca3af' : '#6b7280',
              cursor: 'pointer',
              fontSize: '16px',
              padding: '2px'
            }}
            title="New File"
          >
            📄+
          </button>
          <button
            onClick={() => handleCreateNew('folder', '')}
            style={{
              background: 'none',
              border: 'none',
              color: theme === 'dark' ? '#9ca3af' : '#6b7280',
              cursor: 'pointer',
              fontSize: '16px',
              padding: '2px'
            }}
            title="New Folder"
          >
            📁+
          </button>
        </div>
      </div>

      {/* File Tree */}
      <div style={{ padding: '8px 0' }}>
        {renderTree(fileTree)}
        
        {/* Creating new item at root */}
        {creatingIn === '' && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '4px 8px',
              paddingLeft: '8px',
            }}
          >
            <span style={{ marginRight: '6px', fontSize: '16px' }}>
              {creatingType === 'folder' ? '📁' : '📄'}
            </span>
            <input
              type="text"
              placeholder={`New ${creatingType} name...`}
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  confirmCreate();
                } else if (e.key === 'Escape') {
                  setCreatingIn(null);
                  setCreatingType(null);
                }
              }}
              onBlur={confirmCreate}
              autoFocus
              style={{
                backgroundColor: theme === 'dark' ? '#1f2937' : 'white',
                color: theme === 'dark' ? '#e2e8f0' : '#2d3748',
                border: '1px solid',
                borderColor: theme === 'dark' ? '#4b5563' : '#cbd5e0',
                borderRadius: '2px',
                padding: '2px 4px',
                fontSize: '14px',
                outline: 'none',
                width: '100%'
              }}
            />
          </div>
        )}
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          ref={contextMenuRef}
          style={{
            position: 'fixed',
            left: contextMenu.x,
            top: contextMenu.y,
            backgroundColor: theme === 'dark' ? '#1f2937' : 'white',
            border: '1px solid',
            borderColor: theme === 'dark' ? '#4b5563' : '#cbd5e0',
            borderRadius: '4px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            minWidth: '150px'
          }}
        >
          {contextMenu.item.isFolder ? (
            <>
              <button
                onClick={() => handleCreateNew('file', contextMenu.path)}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '8px 12px',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  color: theme === 'dark' ? '#e2e8f0' : '#2d3748',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = theme === 'dark' ? '#374151' : '#f3f4f6'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                📄 New File
              </button>
              <button
                onClick={() => handleCreateNew('folder', contextMenu.path)}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '8px 12px',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  color: theme === 'dark' ? '#e2e8f0' : '#2d3748',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = theme === 'dark' ? '#374151' : '#f3f4f6'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                📁 New Folder
              </button>
              <div style={{ height: '1px', backgroundColor: theme === 'dark' ? '#4b5563' : '#e5e7eb', margin: '4px 0' }} />
            </>
          ) : null}
          
          <button
            onClick={() => {
              setRenaming(contextMenu.path);
              setContextMenu(null);
            }}
            style={{
              display: 'block',
              width: '100%',
              padding: '8px 12px',
              textAlign: 'left',
              background: 'none',
              border: 'none',
              color: theme === 'dark' ? '#e2e8f0' : '#2d3748',
              cursor: 'pointer',
              fontSize: '14px'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = theme === 'dark' ? '#374151' : '#f3f4f6'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            ✏️ Rename
          </button>
          
          <button
            onClick={() => {
              if (confirm(`Delete ${contextMenu.item.name}?`)) {
                if (contextMenu.item.isFolder) {
                  onFolderDelete(contextMenu.path);
                } else {
                  onFileDelete(contextMenu.path);
                }
              }
              setContextMenu(null);
            }}
            style={{
              display: 'block',
              width: '100%',
              padding: '8px 12px',
              textAlign: 'left',
              background: 'none',
              border: 'none',
              color: '#ef4444',
              cursor: 'pointer',
              fontSize: '14px'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = theme === 'dark' ? '#374151' : '#f3f4f6'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default FileExplorer;