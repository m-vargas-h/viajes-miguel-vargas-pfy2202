import { http, graphql, HttpResponse, delay } from 'msw'
import { destinos } from './datos/destinos'
import { vuelos } from './datos/vuelos'
import { hoteles } from './datos/hoteles'
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

// Error GraphQL: se responde con estado 200 y el arreglo "errors", como lo hace un servidor GraphQL real
const destinoNoEncontrado = (destinoId) => HttpResponse.json({
    errors: [{ message: `El destino "${destinoId}" no existe`, extensions: { code: 'NOT_FOUND' } }],
})

// Agrega __typename a cada elemento para que Apollo pueda normalizarlo en su caché
const conTipo = (tipo, lista) => lista.map(elemento => ({ __typename: tipo, ...elemento }))

// API GraphQL: vuelos y hoteles de un destino
const handlersGraphql = [
    // query ObtenerVuelos($destinoId: ID!) { vuelos(destinoId: $destinoId) { ... } }
    graphql.query('ObtenerVuelos', conEscenario(({ variables }) => {
        const { destinoId } = variables
        if (!destinos.some(d => d.id === destinoId)) return destinoNoEncontrado(destinoId)
        return HttpResponse.json({
            data: { vuelos: conTipo('Vuelo', vuelos.filter(vuelo => vuelo.destinoId === destinoId)) },
        })
    })),

    // query ObtenerHoteles($destinoId: ID!) { hoteles(destinoId: $destinoId) { ... } }
    graphql.query('ObtenerHoteles', conEscenario(({ variables }) => {
        const { destinoId } = variables
        if (!destinos.some(d => d.id === destinoId)) return destinoNoEncontrado(destinoId)
        return HttpResponse.json({
            data: { hoteles: conTipo('Hotel', hoteles.filter(hotel => hotel.destinoId === destinoId)) },
        })
    })),
]

export const handlers = [...handlersRest, ...handlersGraphql]
