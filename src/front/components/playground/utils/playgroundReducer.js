// src/front/components/playground/utils/playgroundReducer.js

export const initialState = {
  files: {},
  openTabs: [],
  activeFile: null,
  autoRun: true,
  cursorPosition: { line: 1, column: 1 },
  unsavedChanges: {}
};

export const playgroundReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_FILE':
      return {
        ...state,
        files: {
          ...state.files,
          [action.payload.filename]: {
            content: action.payload.content || '',
            language: action.payload.language || 'plaintext',
            createdAt: Date.now(),
            modifiedAt: Date.now()
          }
        }
      };

    case 'DELETE_FILE':
      const { [action.payload]: deleted, ...remainingFiles } = state.files;
      return {
        ...state,
        files: remainingFiles,
        openTabs: state.openTabs.filter(tab => tab !== action.payload),
        activeFile: state.activeFile === action.payload ? 
          state.openTabs[0] || null : state.activeFile
      };

    case 'UPDATE_FILE':
      return {
        ...state,
        files: {
          ...state.files,
          [action.payload.filename]: {
            ...state.files[action.payload.filename],
            content: action.payload.content,
            modifiedAt: Date.now()
          }
        },
        unsavedChanges: {
          ...state.unsavedChanges,
          [action.payload.filename]: true
        }
      };

    case 'RENAME_FILE':
      const file = state.files[action.payload.oldName];
      const { [action.payload.oldName]: _, ...otherFiles } = state.files;
      return {
        ...state,
        files: {
          ...otherFiles,
          [action.payload.newName]: file
        },
        openTabs: state.openTabs.map(tab => 
          tab === action.payload.oldName ? action.payload.newName : tab
        ),
        activeFile: state.activeFile === action.payload.oldName ? 
          action.payload.newName : state.activeFile
      };

    case 'OPEN_TAB':
      if (state.openTabs.includes(action.payload)) {
        return { ...state, activeFile: action.payload };
      }
      return {
        ...state,
        openTabs: [...state.openTabs, action.payload],
        activeFile: action.payload
      };

    case 'CLOSE_TAB':
      const newTabs = state.openTabs.filter(tab => tab !== action.payload);
      const tabIndex = state.openTabs.indexOf(action.payload);
      let newActiveFile = state.activeFile;
      
      if (state.activeFile === action.payload) {
        if (newTabs.length > 0) {
          newActiveFile = newTabs[Math.min(tabIndex, newTabs.length - 1)];
        } else {
          newActiveFile = null;
        }
      }
      
      return {
        ...state,
        openTabs: newTabs,
        activeFile: newActiveFile
      };

    case 'SET_ACTIVE_FILE':
      if (!state.openTabs.includes(action.payload)) {
        return {
          ...state,
          openTabs: [...state.openTabs, action.payload],
          activeFile: action.payload
        };
      }
      return { ...state, activeFile: action.payload };

    case 'SET_CURSOR_POSITION':
      return {
        ...state,
        cursorPosition: action.payload
      };

    case 'TOGGLE_AUTO_RUN':
      return {
        ...state,
        autoRun: !state.autoRun
      };

    case 'SAVE_FILE':
      return {
        ...state,
        unsavedChanges: {
          ...state.unsavedChanges,
          [action.payload]: false
        }
      };

    case 'LOAD_TEMPLATE':
      return {
        ...state,
        files: action.payload.files,
        openTabs: Object.keys(action.payload.files).slice(0, 3),
        activeFile: Object.keys(action.payload.files)[0]
      };

    default:
      return state;
  }
};