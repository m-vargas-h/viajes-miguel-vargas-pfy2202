// Tipos de error que puede devolver una petición, cada uno con su título y sugerencia para el usuario
export const TIPOS_ERROR = {
    noEncontrado: {
        titulo: 'No encontramos lo que buscas',
        sugerencia: 'Puede que el enlace esté mal escrito o que el recurso ya no exista. Vuelve al listado de destinos para seguir explorando.',
    },
    servidor: {
        titulo: 'El servidor tuvo un problema',
        sugerencia: 'Es un problema temporal de nuestro lado. Intenta nuevamente en unos segundos.',
    },
    red: {
        titulo: 'Sin conexión con el servidor',
        sugerencia: 'Revisa tu conexión a internet e intenta nuevamente.',
    },
    tiempoAgotado: {
        titulo: 'El servidor está tardando demasiado',
        sugerencia: 'La respuesta no llegó a tiempo. Intenta nuevamente en unos momentos.',
    },
    formatoInvalido: {
        titulo: 'Respuesta con formato inválido',
        sugerencia: 'El servidor envió datos que no se pueden mostrar. Intenta nuevamente más tarde.',
    },
    desconocido: {
        titulo: 'Ocurrió un error inesperado',
        sugerencia: 'Intenta nuevamente. Si el problema continúa, vuelve más tarde.',
    },
}

export class ErrorApi extends Error {
    constructor(tipo, mensaje, status = null) {
        super(mensaje)
        this.name = 'ErrorApi'
        this.tipo = tipo
        this.status = status
    }

    get titulo() {
        return TIPOS_ERROR[this.tipo].titulo
    }

    get sugerencia() {
        return TIPOS_ERROR[this.tipo].sugerencia
    }

    // Reintentar no sirve si el recurso no existe
    get reintentable() {
        return this.tipo !== 'noEncontrado'
    }
}

// Convierte una respuesta HTTP con error en un ErrorApi con mensaje específico
export function errorDesdeRespuesta(status, cuerpo) {
    if (status === 404) {
        return new ErrorApi('noEncontrado', cuerpo?.mensaje ?? 'El recurso solicitado no existe.', status)
    }
    if (status >= 500) {
        return new ErrorApi('servidor', `Error ${status}: el servidor no pudo procesar la solicitud.`, status)
    }
    return new ErrorApi('desconocido', `Error ${status}: ${cuerpo?.mensaje ?? 'la solicitud no pudo completarse.'}`, status)
}
