import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AppQueryClientProvider } from './utils/query-client.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppQueryClientProvider>
      <App />
    </AppQueryClientProvider>
  </StrictMode>
)
