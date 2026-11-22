import { CombinedGraphQLErrors, ServerError, ServerParseError } from '@apollo/client'
import { ErrorApi, errorDesdeRespuesta } from '../api/errores'

// Traduce los errores de Apollo al mismo ErrorApi que usa el cliente REST,
// así la interfaz muestra ambos con los mismos componentes y mensajes
export function errorDesdeGraphql(error) {
    // Errores informados por el servidor GraphQL en el arreglo "errors"
    if (CombinedGraphQLErrors.is(error)) {
        const [primero] = error.errors
        const tipo = primero?.extensions?.code === 'NOT_FOUND' ? 'noEncontrado' : 'desconocido'
        return new ErrorApi(tipo, primero?.message ?? 'La consulta GraphQL no pudo completarse.')
    }
    // Respuesta HTTP con error, o estado 200 sin "data" ni "errors"
    if (ServerError.is(error)) {
        if (error.statusCode < 400) {
            return new ErrorApi('formatoInvalido', 'La respuesta GraphQL no tiene la estructura esperada.', error.statusCode)
        }
        return errorDesdeRespuesta(error.statusCode, null)
    }
    if (ServerParseError.is(error)) {
        return new ErrorApi('formatoInvalido', 'La respuesta del servidor no es un JSON válido.')
    }
    if (error?.name === 'TimeoutError') {
        return new ErrorApi('tiempoAgotado', 'La respuesta superó el tiempo de espera.')
    }
    if (error?.name === 'TypeError') {
        return new ErrorApi('red', 'No se pudo conectar con el servidor.')
    }
    return new ErrorApi('desconocido', error?.message ?? 'Ocurrió un error inesperado.')
}
