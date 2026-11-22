// Botón para agregar o quitar una opción del plan de viaje
function BotonElegir({ seleccionado, agotado, onClick, texto }) {
    if (agotado && !seleccionado) {
        return <button type="button" className="btn btn-secundario mt-3 w-full" disabled>Sin disponibilidad</button>
    }

    return (
        <button
            type="button"
            aria-pressed={seleccionado}
            onClick={onClick}
            className={`btn mt-3 w-full ${seleccionado ? 'btn-primario' : 'btn-secundario'}`}
        >
            {seleccionado ? '✓ Elegido · Quitar' : texto}
        </button>
    )
}

export default BotonElegir
