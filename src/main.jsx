import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Activa el backend mock (MSW) antes de renderizar la aplicación.
// Se habilita también en producción porque el sitio publicado no cuenta con un backend real.
async function enableMocking() {
  const { worker } = await import('./mocks/browser')
  await worker.start({
    // El sitio se sirve bajo un subdirectorio (base de Vite), el worker debe registrarse ahí
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
    // Solo se interceptan las rutas /api y /graphql, el resto de recursos pasa sin avisos
    onUnhandledRequest: 'bypass',
  })
  mantenerMockActivo()
}

// En Android el navegador detiene el service worker cuando la pestaña pasa a segundo plano.
// Al reiniciarse, el worker de MSW olvida qué páginas tenían el mock activo y deja pasar las
// peticiones a la red (GitHub Pages responde 405 a los POST de GraphQL). Para evitarlo, se le
// vuelve a avisar al worker que esta página usa el mock al volver a la pestaña y cada 5 segundos.
function mantenerMockActivo() {
  const reactivar = () => {
    if (document.visibilityState === 'visible') {
      navigator.serviceWorker?.controller?.postMessage('MOCK_ACTIVATE')
    }
  }
  document.addEventListener('visibilitychange', reactivar)
  window.addEventListener('pageshow', reactivar)
  setInterval(reactivar, 5000)
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})