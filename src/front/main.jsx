import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import SimpleRouter from './routes'  // Use the updated routes.jsx
import { StoreProvider } from './hooks/useGlobalReducer'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreProvider>
      <SimpleRouter />
    </StoreProvider>
  </React.StrictMode>
)