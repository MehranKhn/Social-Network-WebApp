import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthProvider from './contextApi/authProvider.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
          <App />
        </AuthProvider>
    </StrictMode>,
)
  
