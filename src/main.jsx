import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Analytics } from './components/Analytics'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Analytics />
    <App />
  </StrictMode>,
)

// Service Worker Registration for PWA
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // SW registration failed silently
    });
  });
}
