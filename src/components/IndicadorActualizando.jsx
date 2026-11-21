// Indicador pequeño mientras se actualizan datos que ya están en pantalla
function IndicadorActualizando() {
    return (
        <span role="status" className="flex items-center gap-2 text-sm text-gray-600">
            <span className="spinner size-4" /> Actualizando...
        </span>
    )
}

export default IndicadorActualizando
