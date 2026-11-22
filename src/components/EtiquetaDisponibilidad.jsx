// Indica cuántos cupos quedan: verde si hay varios, ámbar si quedan pocos y rojo si está agotado
const POCOS = 3

function EtiquetaDisponibilidad({ cantidad, singular, plural }) {
    let clases = 'bg-green-100 text-green-800'
    let texto = `${cantidad} ${plural} disponibles`

    if (cantidad === 0) {
        clases = 'bg-red-100 text-red-800'
        texto = 'Agotado'
    } else if (cantidad <= POCOS) {
        clases = 'bg-amber-100 text-amber-900'
        texto = cantidad === 1 ? `Queda 1 ${singular}` : `Quedan ${cantidad} ${plural}`
    }

    return (
        <span className={`inline-block whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${clases}`}>
            {texto}
        </span>
    )
}

export default EtiquetaDisponibilidad
