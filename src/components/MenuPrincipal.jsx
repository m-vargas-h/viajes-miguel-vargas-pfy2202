import { NavLink } from 'react-router'
import { useViaje } from '../hooks/useViaje'

const enlaces = [
    { ruta: '/', texto: 'Inicio', end: true },
    { ruta: '/destinos', texto: 'Destinos' },
    { ruta: '/mi-viaje', texto: 'Mi viaje', contador: true },
]

function MenuPrincipal() {
    const { cantidadElegidos } = useViaje()

    const clasesEnlace = ({ isActive }) =>
        'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white transition-colors ' +
        (isActive ? 'bg-marca-900' : 'hover:bg-marca-800')

    return (
        <nav>
            <ul className="flex flex-wrap gap-2">
                {enlaces.map(enlace => (
                    <li key={enlace.ruta}>
                        <NavLink to={enlace.ruta} end={enlace.end} className={clasesEnlace}>
                            {enlace.texto}
                            {enlace.contador && cantidadElegidos > 0 && (
                                <span
                                    aria-label={`${cantidadElegidos} opciones elegidas`}
                                    className="rounded-full bg-white px-2 text-xs font-bold text-marca-800"
                                >
                                    {cantidadElegidos}
                                </span>
                            )}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default MenuPrincipal
