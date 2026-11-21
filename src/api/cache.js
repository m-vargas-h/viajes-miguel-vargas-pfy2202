import { VIGENCIA_CACHE } from '../constants/api'

// Caché en memoria de respuestas de la API.
// - Guarda cada respuesta por ruta durante VIGENCIA_CACHE ms para no repetir peticiones.
// - Comparte una misma petición en curso entre todos los componentes que la piden (sin duplicados).
// - Cancela la petición si todos los componentes que la esperaban se desmontan.

const respuestas = new Map()   // ruta -> { datos, fecha }
const enCurso = new Map()      // ruta -> { promesa, controlador, suscriptores }

export function leerCache(ruta) {
    const entrada = respuestas.get(ruta)
    if (!entrada) return null
    return { ...entrada, vigente: Date.now() - entrada.fecha < VIGENCIA_CACHE }
}

export function guardarEnCache(ruta, datos) {
    respuestas.set(ruta, { datos, fecha: Date.now() })
}

// solicitar(signal) debe devolver una promesa con los datos
export function consultar(ruta, solicitar) {
    let peticion = enCurso.get(ruta)

    if (!peticion) {
        const controlador = new AbortController()
        const promesa = solicitar(controlador.signal)
            .then(datos => {
                guardarEnCache(ruta, datos)
                return datos
            })
            .finally(() => {
                if (enCurso.get(ruta) === peticion) enCurso.delete(ruta)
            })
        peticion = { promesa, controlador, suscriptores: 0 }
        enCurso.set(ruta, peticion)
    }

    const actual = peticion
    actual.suscriptores++
    let liberada = false

    const liberar = () => {
        if (liberada) return
        liberada = true
        actual.suscriptores--
        // Se espera un ciclo: en StrictMode el componente se vuelve a montar de inmediato y reutiliza la petición
        setTimeout(() => {
            if (actual.suscriptores === 0 && enCurso.get(ruta) === actual) {
                actual.controlador.abort()
                enCurso.delete(ruta)
            }
        }, 0)
    }

    return { promesa: actual.promesa, liberar }
}
