import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './app.jsx'  // Fixed: changed from App.jsx to app.jsx (lowercase)
import { StoreProvider } from './hooks/useGlobalReducer'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
)