import { formatearFecha, formatearPrecio, pluralizar } from '../utils/formato'
import EtiquetaDisponibilidad from './EtiquetaDisponibilidad'

function TarjetaVuelo({ vuelo }) {
    const {
        aerolinea, numeroVuelo, origen, llegada, fechaSalida, fechaRegreso,
        escalas, duracion, precio, asientosDisponibles,
    } = vuelo

    return (
        <article className={`tarjeta flex flex-col p-5 ${asientosDisponibles === 0 ? 'opacity-70' : ''}`}>
            <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                <div>
                    <h4 className="text-lg font-semibold">{aerolinea}</h4>
                    <p className="text-sm text-gray-600">Vuelo {numeroVuelo}</p>
                </div>
                <EtiquetaDisponibilidad cantidad={asientosDisponibles} singular="asiento" plural="asientos" />
            </div>

            <p className="mb-3 text-sm font-medium">{origen} → {llegada}</p>

            <dl className="mb-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div>
                    <dt className="text-gray-500">Ida</dt>
                    <dd>{formatearFecha(fechaSalida)}</dd>
                </div>
                <div>
                    <dt className="text-gray-500">Regreso</dt>
                    <dd>{formatearFecha(fechaRegreso)}</dd>
                </div>
                <div>
                    <dt className="text-gray-500">Duración</dt>
                    <dd>{duracion}</dd>
                </div>
                <div>
                    <dt className="text-gray-500">Escalas</dt>
                    <dd>{escalas === 0 ? 'Directo' : pluralizar(escalas, 'escala', 'escalas')}</dd>
                </div>
            </dl>

            <div className="mt-auto border-t border-gray-200 pt-3">
                <p className="text-xl font-bold text-marca-800">{formatearPrecio(precio)}</p>
                <p className="text-xs text-gray-500">por persona, ida y vuelta</p>
            </div>
        </article>
    )
}

export default TarjetaVuelo
