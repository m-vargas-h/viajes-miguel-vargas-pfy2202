import { Link } from 'react-router'

const VARIANTES = {
    primario: 'btn-primario',
    secundario: 'btn-secundario',
}

// Botón reutilizable: se renderiza como Link si recibe "to"
function Boton({ variante = 'primario', to, type = 'button', className = '', children, ...props }) {
    const clases = ['btn', VARIANTES[variante], className].filter(Boolean).join(' ')

    if (to) {
        return <Link to={to} className={clases} {...props}>{children}</Link>
    }

    return <button type={type} className={clases} {...props}>{children}</button>
}

export default Boton
