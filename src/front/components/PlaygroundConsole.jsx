// src/front/components/PlaygroundConsole.jsx
import React, { useEffect, useRef } from 'react';

const PlaygroundConsole = ({ logs = [], onClear, theme = 'dark' }) => {
  const consoleRef = useRef(null);

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  const themeStyles = {
    dark: {
      bg: '#1a1a1a',
      headerBg: '#2d2d2d',
      text: '#d4d4d4',
      logText: '#00ff00',
      errorText: '#ff6b6b',
      warnText: '#ffd93d',
      infoText: '#6bcfff',
      border: '#404040'
    },
    light: {
      bg: '#ffffff',
      headerBg: '#f5f5f5',
      text: '#333333',
      logText: '#008000',
      errorText: '#dc3545',
      warnText: '#ffc107',
      infoText: '#0dcaf0',
      border: '#e0e0e0'
    }
  };

  const colors = themeStyles[theme] || themeStyles.dark;

  const getLogColor = (method) => {
    switch (method) {
      case 'error': return colors.errorText;
      case 'warn': return colors.warnText;
      case 'info': return colors.infoText;
      default: return colors.logText;
    }
  };

  const getLogIcon = (method) => {
    switch (method) {
      case 'error': return '❌';
      case 'warn': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '▶';
    }
  };

  const formatValue = (value) => {
    if (typeof value === 'object') {
      try {
        return JSON.stringify(value, null, 2);
      } catch {
        return String(value);
      }
    }
    return String(value);
  };

  return (
    <div 
      className="playground-console"
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.bg,
        borderRadius: '8px',
        overflow: 'hidden',
        border: `1px solid ${colors.border}`
      }}
    >
      {/* Console Header */}
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 12px',
          backgroundColor: colors.headerBg,
          borderBottom: `1px solid ${colors.border}`
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px' }}>📟</span>
          <span style={{ 
            color: colors.text, 
            fontWeight: '500', 
            fontSize: '14px' 
          }}>
            Console
          </span>
          {logs.length > 0 && (
            <span style={{
              backgroundColor: colors.border,
              color: colors.text,
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '12px'
            }}>
              {logs.length}
            </span>
          )}
        </div>
        
        <button 
          onClick={onClear}
          style={{
            background: 'none',
            border: 'none',
            color: colors.text,
            opacity: 0.7,
            cursor: 'pointer',
            fontSize: '12px',
            padding: '4px 8px',
            borderRadius: '4px',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.target.style.opacity = '1';
            e.target.style.backgroundColor = colors.border;
          }}
          onMouseOut={(e) => {
            e.target.style.opacity = '0.7';
            e.target.style.backgroundColor = 'transparent';
          }}
        >
          Clear
        </button>
      </div>

      {/* Console Output */}
      <div 
        ref={consoleRef}
        style={{
          flex: 1,
          padding: '12px',
          overflowY: 'auto',
          fontFamily: "'Fira Code', 'Consolas', monospace",
          fontSize: '13px'
        }}
      >
        {logs.length === 0 ? (
          <div style={{ 
            color: colors.text, 
            opacity: 0.5,
            fontStyle: 'italic' 
          }}>
            Console output will appear here...
          </div>
        ) : (
          logs.map((log, index) => (
            <div 
              key={index} 
              style={{
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                animation: 'slideIn 0.2s ease-out'
              }}
            >
              {/* Log Icon */}
              <span style={{ fontSize: '12px', marginTop: '2px' }}>
                {getLogIcon(log.method)}
              </span>
              
              {/* Timestamp */}
              <span style={{ 
                color: colors.text, 
                opacity: 0.5,
                fontSize: '11px',
                minWidth: '70px',
                marginTop: '2px'
              }}>
                {log.timestamp}
              </span>
              
              {/* Log Content */}
              <div style={{ 
                flex: 1,
                color: getLogColor(log.method),
                wordBreak: 'break-all',
                whiteSpace: 'pre-wrap'
              }}>
                {log.args ? log.args.map((arg, i) => (
                  <span key={i}>
                    {formatValue(arg)}
                    {i < log.args.length - 1 ? ' ' : ''}
                  </span>
                )) : log.message}
              </div>
            </div>
          ))
        )}
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .playground-console ::-webkit-scrollbar {
          width: 8px;
        }
        
        .playground-console ::-webkit-scrollbar-track {
          background: ${colors.bg};
        }
        
        .playground-console ::-webkit-scrollbar-thumb {
          background: ${colors.border};
          border-radius: 4px;
        }
        
        .playground-console ::-webkit-scrollbar-thumb:hover {
          background: ${colors.text}40;
        }
      `}</style>
    </div>
  );
};

export default PlaygroundConsole;