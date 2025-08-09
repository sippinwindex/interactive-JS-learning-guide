import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'  // Added .jsx extension to be explicit
import { StoreProvider } from './hooks/useGlobalReducer'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
)