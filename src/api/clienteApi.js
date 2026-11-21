import { TIEMPO_ESPERA, URL_BASE_API } from '../constants/api'
import { ErrorApi, errorDesdeRespuesta } from './errores'

// Realiza un GET a la API y traduce cualquier falla a un ErrorApi.
// "signal" permite cancelar la petición cuando ya nadie necesita la respuesta.
export async function pedir(ruta, signal) {
    const senal = AbortSignal.any([signal, AbortSignal.timeout(TIEMPO_ESPERA)])
    let respuesta

    try {
        respuesta = await fetch(`${URL_BASE_API}${ruta}`, { signal: senal })
    } catch (error) {
        // Cancelación intencional: se propaga tal cual para que se ignore
        if (signal.aborted) throw error
        if (error.name === 'TimeoutError') {
            throw new ErrorApi('tiempoAgotado', `La respuesta superó los ${TIEMPO_ESPERA / 1000} segundos de espera.`)
        }
        throw new ErrorApi('red', 'No se pudo conectar con el servidor.')
    }

    if (!respuesta.ok) {
        const cuerpo = await respuesta.json().catch(() => null)
        throw errorDesdeRespuesta(respuesta.status, cuerpo)
    }

    try {
        return await respuesta.json()
    } catch {
        throw new ErrorApi('formatoInvalido', 'La respuesta del servidor no es un JSON válido.')
    }
}
