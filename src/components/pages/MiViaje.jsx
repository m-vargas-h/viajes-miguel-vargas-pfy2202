import { Link } from 'react-router'
import { LIMITES } from '../../constants/viaje'
import { useViaje } from '../../hooks/useViaje'
import { formatearFecha, formatearPrecio, pluralizar } from '../../utils/formato'
import Boton from '../Boton'

// Campo numérico con límites (pasajeros y noches)
function CampoCantidad({ id, etiqueta, valor, limites, onCambiar }) {
    return (
        <label htmlFor={id} className="flex items-center justify-between gap-3 text-sm">
            <span>{etiqueta}</span>
            <input
                id={id}
                type="number"
                min={limites.min}
                max={limites.max}
                value={valor}
                onChange={(e) => onCambiar(e.target.value)}
                className="w-20 rounded-md border border-gray-300 bg-white px-2 py-1 text-right focus:border-marca-600 focus:outline-none focus:ring-2 focus:ring-marca-300"
            />
        </label>
    )
}

// Bloque del resumen para el vuelo o el hotel; si falta, invita a elegirlo
function BloqueOpcion({ titulo, opcion, destinoId, children }) {
    return (
        <section className="tarjeta p-5">
            <h3 className="mb-3 text-lg font-semibold">{titulo}</h3>
            {opcion ? children : (
                <p className="text-sm text-gray-600">
                    Aún no eliges una opción.{' '}
                    <Link to={`/destinos/${destinoId}`} className="enlace">Ver opciones del destino</Link>
                </p>
            )}
        </section>
    )
}

function MiViaje() {
    const { plan, cambiarCantidad, vaciar } = useViaje()
    const { destino, vuelo, hotel, pasajeros, noches } = plan

    if (!destino || (!vuelo && !hotel)) {
        return (
            <main className="contenedor">
                <h2 className="titulo-pagina">Mi viaje</h2>
                <div className="alerta-info mb-6">
                    Todavía no tienes un viaje planificado. Elige un destino y selecciona un vuelo y un hotel para ver aquí el resumen y el costo total.
                </div>
                <Boton to="/destinos">Explorar destinos</Boton>
            </main>
        )
    }

    const totalVuelo = vuelo ? vuelo.precio * pasajeros : 0
    const totalHotel = hotel ? hotel.precioNoche * noches : 0
    // Las fechas del vuelo deben estar dentro del período disponible del hotel (fechas AAAA-MM-DD comparables como texto)
    const fechasNoCalzan = vuelo && hotel
        && (vuelo.fechaSalida < hotel.disponibleDesde || vuelo.fechaRegreso > hotel.disponibleHasta)

    return (
        <main className="contenedor">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h2 className="text-2xl font-bold">Mi viaje a {destino.nombre}</h2>
                    <p className="text-gray-600">{destino.pais}</p>
                </div>
                <button type="button" className="enlace text-sm" onClick={vaciar}>Vaciar plan</button>
            </div>

            {fechasNoCalzan && (
                <div role="alert" className="alerta-advertencia mb-6 text-sm">
                    Las fechas del vuelo no están dentro del período disponible del hotel
                    ({formatearFecha(hotel.disponibleDesde)} al {formatearFecha(hotel.disponibleHasta)}). Revisa otra combinación.
                </div>
            )}

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="flex flex-col gap-4 lg:col-span-2">
                    <BloqueOpcion titulo="Vuelo" opcion={vuelo} destinoId={destino.id}>
                        {vuelo && (
                            <ul className="space-y-1 text-sm">
                                <li><strong>{vuelo.aerolinea}</strong> · Vuelo {vuelo.numeroVuelo}</li>
                                <li>{vuelo.origen} → {vuelo.llegada}</li>
                                <li>Ida {formatearFecha(vuelo.fechaSalida)} · Regreso {formatearFecha(vuelo.fechaRegreso)}</li>
                                <li>{formatearPrecio(vuelo.precio)} por persona</li>
                            </ul>
                        )}
                    </BloqueOpcion>

                    <BloqueOpcion titulo="Hotel" opcion={hotel} destinoId={destino.id}>
                        {hotel && (
                            <ul className="space-y-1 text-sm">
                                <li><strong>{hotel.nombre}</strong> · {'★'.repeat(hotel.estrellas)}</li>
                                <li>{hotel.ubicacion}</li>
                                <li>{formatearPrecio(hotel.precioNoche)} por noche (1 habitación)</li>
                            </ul>
                        )}
                    </BloqueOpcion>
                </div>

                <aside className="tarjeta h-fit p-5">
                    <h3 className="mb-4 text-lg font-semibold">Resumen</h3>
                    <div className="mb-4 space-y-3">
                        <CampoCantidad
                            id="pasajeros"
                            etiqueta="Pasajeros"
                            valor={pasajeros}
                            limites={LIMITES.pasajeros}
                            onCambiar={(valor) => cambiarCantidad('pasajeros', valor)}
                        />
                        <CampoCantidad
                            id="noches"
                            etiqueta="Noches de hotel"
                            valor={noches}
                            limites={LIMITES.noches}
                            onCambiar={(valor) => cambiarCantidad('noches', valor)}
                        />
                    </div>

                    <dl className="space-y-2 border-t border-gray-200 pt-4 text-sm">
                        <div className="flex justify-between gap-3">
                            <dt>Vuelo ({pluralizar(pasajeros, 'pasajero', 'pasajeros')})</dt>
                            <dd>{vuelo ? formatearPrecio(totalVuelo) : '—'}</dd>
                        </div>
                        <div className="flex justify-between gap-3">
                            <dt>Hotel ({pluralizar(noches, 'noche', 'noches')})</dt>
                            <dd>{hotel ? formatearPrecio(totalHotel) : '—'}</dd>
                        </div>
                        <div className="flex justify-between gap-3 border-t border-gray-200 pt-2 text-base font-bold text-marca-800">
                            <dt>Total</dt>
                            <dd>{formatearPrecio(totalVuelo + totalHotel)}</dd>
                        </div>
                    </dl>

                    <Boton variante="secundario" to={`/destinos/${destino.id}`} className="mt-4 w-full">
                        Cambiar vuelo u hotel
                    </Boton>
                </aside>
            </div>
        </main>
    )
}

export default MiViaje
