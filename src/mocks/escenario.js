// Escenario de respuesta del backend mock, elegido desde el simulador del pie de página.
// Se guarda en sessionStorage para mantenerlo al recargar la página.
export const ESCENARIOS = {
    normal: 'Normal',
    error500: 'Error 500 del servidor',
    sinConexion: 'Sin conexión (falla de red)',
    lento: 'Respuesta lenta (tiempo de espera agotado)',
    formatoInvalido: 'Respuesta con formato inválido',
}

const CLAVE = 'escenario-mock'

let escenarioActual = (() => {
    try {
        const guardado = sessionStorage.getItem(CLAVE)
        return guardado in ESCENARIOS ? guardado : 'normal'
    } catch {
        return 'normal'
    }
})()

export const obtenerEscenario = () => escenarioActual

export function cambiarEscenario(escenario) {
    if (!(escenario in ESCENARIOS)) return
    escenarioActual = escenario
    try {
        sessionStorage.setItem(CLAVE, escenario)
    } catch {
        // Sin acceso a sessionStorage: el escenario solo dura hasta recargar
    }
}
