import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { RUTAS } from '../../api/destinosApi'
import { useConsulta } from '../../hooks/useConsulta'
import AvisoRespaldo from '../AvisoRespaldo'
import Boton from '../Boton'
import Cargando from '../Cargando'
import FiltroOpciones from '../FiltroOpciones'
import HotelesDestino from '../HotelesDestino'
import IndicadorActualizando from '../IndicadorActualizando'
import ListaEtiquetas from '../ListaEtiquetas'
import MensajeError from '../MensajeError'
import VuelosDestino from '../VuelosDestino'

const PESTANAS = ['Vuelos', 'Hoteles']

// Detalle de un destino: su información llega por REST y sus vuelos y hoteles por GraphQL
function DetalleDestino() {
    const { destinoId } = useParams()
    const { datos: destino, cargando, actualizando, error, desdeRespaldo, fechaRespaldo, recargar } = useConsulta(RUTAS.destino(destinoId))
    const [pestana, setPestana] = useState(PESTANAS[0])

    const volver = <Boton variante="secundario" to="/destinos">Volver a destinos</Boton>

    if (cargando) {
        return <main className="contenedor"><Cargando mensaje="Cargando destino..." /></main>
    }

    if (error && !destino) {
        return (
            <main className="contenedor">
                <MensajeError error={error} onReintentar={recargar}>{volver}</MensajeError>
            </main>
        )
    }

    return (
        <main className="contenedor">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <nav aria-label="Ruta de navegación" className="text-sm text-gray-600">
                    <Link to="/destinos" className="enlace">Destinos</Link>
                    {' / '}
                    <span>{destino.nombre}</span>
                </nav>
                {actualizando && <IndicadorActualizando />}
            </div>

            {desdeRespaldo && <AvisoRespaldo error={error} fecha={fechaRespaldo} onReintentar={recargar} />}

            <section className="tarjeta mb-8 overflow-hidden">
                <div className="bg-marca-700 px-5 py-4 text-white">
                    <p className="text-xs font-semibold uppercase tracking-wide text-marca-100">{destino.continente}</p>
                    <h2 className="text-2xl font-bold">{destino.nombre}</h2>
                    <p className="text-marca-100">{destino.pais}</p>
                </div>
                <div className="p-5">
                    <p className="mb-4 text-gray-700">{destino.descripcion}</p>
                    <h3 className="mb-2 text-sm font-semibold">Actividades populares</h3>
                    <ListaEtiquetas elementos={destino.actividades} />
                </div>
            </section>

            <section aria-labelledby="titulo-planificacion">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <h3 id="titulo-planificacion" className="text-xl font-semibold">Planifica tu viaje</h3>
                    <FiltroOpciones
                        etiqueta="Tipo de opción de viaje"
                        opciones={PESTANAS}
                        seleccionada={pestana}
                        onSeleccionar={setPestana}
                    />
                </div>

                {pestana === 'Vuelos'
                    ? <VuelosDestino destinoId={destinoId} />
                    : <HotelesDestino destinoId={destinoId} />}
            </section>

            <div className="mt-8">{volver}</div>
        </main>
    )
}

export default DetalleDestino
