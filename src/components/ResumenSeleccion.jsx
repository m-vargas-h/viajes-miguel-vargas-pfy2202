import { Link } from 'react-router'
import { useViaje } from '../hooks/useViaje'

// Aviso con lo elegido para el destino actual y acceso a la página "Mi viaje"
function ResumenSeleccion({ destino }) {
    const { plan } = useViaje()
    if (plan.destino?.id !== destino.id || (!plan.vuelo && !plan.hotel)) return null

    const estado = (elegido) => (elegido ? '✓' : '—')

    return (
        <div className="alerta-info mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm">
                <strong>Tu viaje a {destino.nombre}:</strong>{' '}
                vuelo {estado(plan.vuelo)} · hotel {estado(plan.hotel)}
            </p>
            <Link to="/mi-viaje" className="enlace text-sm">Ver mi viaje →</Link>
        </div>
    )
}

export default ResumenSeleccion
