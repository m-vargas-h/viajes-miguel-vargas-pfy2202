import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Activa el backend mock (MSW) antes de renderizar la aplicación.
// Se habilita también en producción porque el sitio publicado no cuenta con un backend real.
async function enableMocking() {
  const { worker } = await import('./mocks/browser')
  return worker.start({
    // El sitio se sirve bajo un subdirectorio (base de Vite), el worker debe registrarse ahí
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
    // Solo se interceptan las rutas /api, el resto de recursos pasa sin avisos
    onUnhandledRequest: 'bypass',
  })
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
