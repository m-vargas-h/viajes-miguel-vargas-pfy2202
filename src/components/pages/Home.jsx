import { Link } from 'react-router'
import { RUTAS, precargar } from '../../api/destinosApi'
import { useConsulta } from '../../hooks/useConsulta'
import Boton from '../Boton'
import MensajeError from '../MensajeError'

function Home() {
    // Misma consulta que la página de destinos: al navegar entre ambas se reutiliza la caché
    const { datos: destinos, cargando, error, recargar } = useConsulta(RUTAS.destinos)

    return (
        <main className="contenedor">
            <section className="tarjeta mb-8 bg-marca-50 p-8 text-center">
                <h2 className="mb-3 text-3xl font-bold text-marca-900">Planifica tu próximo viaje</h2>
                <p className="mx-auto mb-6 max-w-xl text-gray-700">
                    Explora nuestros destinos, conoce sus actividades más populares y revisa los vuelos
                    y hoteles disponibles para armar tu viaje.
                </p>
                <Boton to="/destinos">Explorar destinos</Boton>
            </section>

            <section>
                <h3 className="mb-3 text-lg font-semibold">Accesos rápidos</h3>

                {cargando && (
                    <div role="status" aria-label="Cargando destinos" className="flex animate-pulse flex-wrap gap-2">
                        {Array.from({ length: 6 }, (_, i) => (
                            <span key={i} className="h-9 w-28 rounded-full bg-gray-200" />
                        ))}
                    </div>
                )}

                {error && !destinos && <MensajeError error={error} onReintentar={recargar} />}

                {destinos && (
                    <ul className="flex flex-wrap gap-2">
                        {destinos.map(({ id, nombre, pais }) => (
                            <li key={id}>
                                <Link
                                    to={`/destinos/${id}`}
                                    onMouseEnter={() => precargar(RUTAS.destino(id))}
                                    className="block rounded-full border border-marca-300 bg-white px-4 py-2 text-sm font-medium text-marca-800 hover:bg-marca-50"
                                >
                                    {nombre}, {pais}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    )
}

export default Home
