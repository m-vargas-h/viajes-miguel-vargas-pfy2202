// Lista de etiquetas redondeadas (actividades de un destino, servicios de un hotel, etc.)
function ListaEtiquetas({ elementos, className = '' }) {
    return (
        <ul className={`flex flex-wrap gap-2 ${className}`}>
            {elementos.map(elemento => (
                <li key={elemento} className="rounded-full bg-marca-50 px-3 py-1 text-xs text-marca-800">
                    {elemento}
                </li>
            ))}
        </ul>
    )
}

export default ListaEtiquetas
