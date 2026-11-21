import { useState } from 'react'
import { RUTAS } from '../../api/destinosApi'
import { useConsulta } from '../../hooks/useConsulta'
import BarraConsulta from '../BarraConsulta'
import Boton from '../Boton'
import EsqueletoTarjetas from '../EsqueletoTarjetas'
import FiltroOpciones from '../FiltroOpciones'
import MensajeError from '../MensajeError'
import TarjetaDestino from '../TarjetaDestino'

const TODOS = 'Todos'

// Quita tildes y mayúsculas para que "peru" encuentre "Perú"
const normalizar = (texto) => texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

function Destinos() {
    const consulta = useConsulta(RUTAS.destinos)
    const { datos: destinos, cargando, error, recargar } = consulta

    const [continente, setContinente] = useState(TODOS)
    const [busqueda, setBusqueda] = useState('')

    // Los continentes se obtienen de los datos recibidos, sin repetir
    const continentes = destinos ? [TODOS, ...new Set(destinos.map(d => d.continente))] : []

    const termino = normalizar(busqueda.trim())
    const filtrados = (destinos ?? []).filter(destino =>
        (continente === TODOS || destino.continente === continente)
        && (termino === '' || normalizar(`${destino.nombre} ${destino.pais}`).includes(termino)),
    )

    const limpiarFiltros = () => {
        setContinente(TODOS)
        setBusqueda('')
    }

    return (
        <main className="contenedor">
            <h2 className="titulo-pagina">Destinos</h2>

            {cargando && <EsqueletoTarjetas cantidad={6} mensaje="Cargando destinos..." />}

            {error && !destinos && (
                <MensajeError error={error} onReintentar={recargar}>
                    <Boton variante="secundario" to="/">Volver al inicio</Boton>
                </MensajeError>
            )}

            {destinos && (
                <>
                    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <FiltroOpciones
                            etiqueta="Filtrar por continente"
                            opciones={continentes}
                            seleccionada={continente}
                            onSeleccionar={setContinente}
                        />
                        <label className="w-full md:w-72">
                            <span className="sr-only">Buscar destino o país</span>
                            <input
                                type="search"
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                placeholder="Buscar destino o país..."
                                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-marca-600 focus:outline-none focus:ring-2 focus:ring-marca-300"
                            />
                        </label>
                    </div>

                    <BarraConsulta
                        consulta={consulta}
                        texto={filtrados.length === 1 ? '1 destino encontrado' : `${filtrados.length} destinos encontrados`}
                    />

                    {filtrados.length === 0 ? (
                        <div className="alerta-info flex flex-wrap items-center justify-between gap-3">
                            <p>No hay destinos que coincidan con los filtros seleccionados.</p>
                            <button type="button" className="enlace text-sm" onClick={limpiarFiltros}>
                                Limpiar filtros
                            </button>
                        </div>
                    ) : (
                        <div className="grilla">
                            {filtrados.map(destino => <TarjetaDestino key={destino.id} destino={destino} />)}
                        </div>
                    )}
                </>
            )}
        </main>
    )
}

export default Destinos