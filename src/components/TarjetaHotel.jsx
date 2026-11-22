import { formatearFecha, formatearPrecio } from '../utils/formato'
import EtiquetaDisponibilidad from './EtiquetaDisponibilidad'
import ListaEtiquetas from './ListaEtiquetas'

function TarjetaHotel({ hotel }) {
    const {
        nombre, estrellas, ubicacion, precioNoche, disponibleDesde,
        disponibleHasta, habitacionesDisponibles, servicios,
    } = hotel

    return (
        <article className={`tarjeta flex flex-col p-5 ${habitacionesDisponibles === 0 ? 'opacity-70' : ''}`}>
            <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                <div>
                    <h4 className="text-lg font-semibold">{nombre}</h4>
                    <p className="text-amber-500" aria-label={`${estrellas} estrellas`}>
                        {'★'.repeat(estrellas)}
                        <span className="text-gray-300">{'★'.repeat(5 - estrellas)}</span>
                    </p>
                </div>
                <EtiquetaDisponibilidad cantidad={habitacionesDisponibles} singular="habitación" plural="habitaciones" />
            </div>

            <p className="mb-3 text-sm text-gray-600">{ubicacion}</p>
            <ListaEtiquetas elementos={servicios} className="mb-3" />
            <p className="mb-4 text-sm">
                <span className="text-gray-500">Disponible: </span>
                del {formatearFecha(disponibleDesde)} al {formatearFecha(disponibleHasta)}
            </p>

            <div className="mt-auto border-t border-gray-200 pt-3">
                <p className="text-xl font-bold text-marca-800">{formatearPrecio(precioNoche)}</p>
                <p className="text-xs text-gray-500">por noche</p>
            </div>
        </article>
    )
}

export default TarjetaHotel
