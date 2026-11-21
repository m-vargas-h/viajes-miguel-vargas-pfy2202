import { http, HttpResponse, delay } from 'msw'
import { destinos } from './datos/destinos'
import { obtenerEscenario } from './escenario'

// Retraso simulado del servidor (ms) para poder ver los indicadores de carga
const RETRASO = 800
// Retraso del escenario "lento": supera el tiempo de espera del cliente
const RETRASO_LENTO = 8000

const noEncontrado = (mensaje) => HttpResponse.json({ mensaje }, { status: 404 })

// Envuelve cada handler para aplicar el escenario elegido en el simulador
const conEscenario = (resolver) => async (info) => {
    const escenario = obtenerEscenario()

    if (escenario === 'sinConexion') return HttpResponse.error()

    await delay(escenario === 'lento' ? RETRASO_LENTO : RETRASO)

    if (escenario === 'error500') {
        return HttpResponse.json({ mensaje: 'Error interno del servidor' }, { status: 500 })
    }
    if (escenario === 'formatoInvalido') {
        // Respuesta 200 con una estructura distinta a la esperada por el frontend
        return HttpResponse.json({ resultado: 'estructura inesperada' })
    }
    return resolver(info)
}

// API REST: destinos
const handlersRest = [
    // GET /api/destinos -> lista de destinos con país y actividades populares
    http.get('/api/destinos', conEscenario(() => HttpResponse.json(destinos))),

    // GET /api/destinos/:id -> un destino
    http.get('/api/destinos/:id', conEscenario(({ params }) => {
        const destino = destinos.find(d => d.id === params.id)
        if (!destino) return noEncontrado(`El destino "${params.id}" no existe`)
        return HttpResponse.json(destino)
    })),
]

// API GraphQL: vuelos y hoteles (avance 2)
const handlersGraphql = []

export const handlers = [...handlersRest, ...handlersGraphql]
