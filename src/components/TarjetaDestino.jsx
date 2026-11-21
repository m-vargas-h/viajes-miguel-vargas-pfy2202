import { Link } from 'react-router'
import { RUTAS, precargar } from '../api/destinosApi'

// Tarjeta de un destino: nombre, país, descripción y actividades populares
function TarjetaDestino({ destino }) {
    const { id, nombre, pais, continente, descripcion, actividades } = destino
    // Al pasar el mouse (o enfocar con teclado) se pide el destino por adelantado
    const precargarDestino = () => precargar(RUTAS.destino(id))

    return (
        <article className="tarjeta flex flex-col p-5 transition-shadow hover:border-marca-300 hover:shadow-md">
            <p className="text-xs font-semibold uppercase tracking-wide text-marca-700">{continente}</p>
            <h3 className="text-lg font-semibold">{nombre}</h3>
            <p className="mb-2 text-sm text-gray-600">{pais}</p>
            <p className="mb-4 text-sm text-gray-700">{descripcion}</p>

            <h4 className="mb-2 text-sm font-semibold">Actividades populares</h4>
            <ul className="mb-4 flex flex-wrap gap-2">
                {actividades.map(actividad => (
                    <li key={actividad} className="rounded-full bg-marca-50 px-3 py-1 text-xs text-marca-800">
                        {actividad}
                    </li>
                ))}
            </ul>

            <Link
                to={`/destinos/${id}`}
                onMouseEnter={precargarDestino}
                onFocus={precargarDestino}
                className="btn btn-primario mt-auto"
            >
                Ver vuelos y hoteles
            </Link>
        </article>
    )
}

export default TarjetaDestino