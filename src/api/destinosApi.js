import { pedir } from './clienteApi'
import { consultar, guardarEnCache, leerCache } from './cache'
import { ErrorApi } from './errores'
import { esDestino, esListaDe } from '../utils/validaciones'

// Rutas de la API REST de destinos (servida por el mock MSW)
export const RUTAS = {
    destinos: '/destinos',
    destino: (id) => `/destinos/${id}`,
}

// Formato esperado de la respuesta de cada ruta
const VALIDACIONES = [
    { patron: /^\/destinos$/, validar: esListaDe(esDestino) },
    { patron: /^\/destinos\/[^/]+$/, validar: esDestino },
]

function validarRespuesta(ruta, datos) {
    const validacion = VALIDACIONES.find(({ patron }) => patron.test(ruta))
    if (validacion && !validacion.validar(datos)) {
        throw new ErrorApi('formatoInvalido', 'Los datos recibidos no tienen la estructura esperada.')
    }
}

// Al recibir la lista de destinos se guarda también cada destino por separado,
// así la página de un destino no vuelve a pedir datos que ya se tienen
const PROCESAR = {
    [RUTAS.destinos]: (destinos) => {
        destinos.forEach(destino => guardarEnCache(RUTAS.destino(destino.id), destino))
    },
}

function solicitar(ruta, signal) {
    return pedir(ruta, signal).then(datos => {
        // Se valida antes de guardar: datos con formato inválido nunca llegan a la caché
        validarRespuesta(ruta, datos)
        PROCESAR[ruta]?.(datos)
        return datos
    })
}

export const consultarApi = (ruta) => consultar(ruta, signal => solicitar(ruta, signal))

// Pide una ruta por adelantado (por ejemplo, al pasar el mouse sobre un enlace) si no está en caché
export function precargar(ruta) {
    if (leerCache(ruta)?.vigente) return
    consultarApi(ruta).promesa.catch(() => {
        // Una precarga fallida no se muestra: la página la volverá a pedir al abrirse
    })
}

export { leerCache }
