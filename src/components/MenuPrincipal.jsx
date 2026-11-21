import { NavLink } from 'react-router'

const enlaces = [
    { ruta: '/', texto: 'Inicio', end: true },
    { ruta: '/destinos', texto: 'Destinos' },
]

function MenuPrincipal() {
    const clasesEnlace = ({ isActive }) =>
        'rounded-md px-3 py-2 text-sm font-medium text-white transition-colors ' +
        (isActive ? 'bg-marca-900' : 'hover:bg-marca-800')

    return (
        <nav>
            <ul className="flex flex-wrap gap-2">
                {enlaces.map(enlace => (
                    <li key={enlace.ruta}>
                        <NavLink to={enlace.ruta} end={enlace.end} className={clasesEnlace}>
                            {enlace.texto}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default MenuPrincipal
