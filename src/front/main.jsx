import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import SimpleRouter from './app'  // Change this from './routes' to './app'

import { StoreProvider } from './hooks/useGlobalReducer'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreProvider>
      <SimpleRouter />
    </StoreProvider>
  </React.StrictMode>
)