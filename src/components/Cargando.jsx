// Indicador de carga con mensaje configurable
function Cargando({ mensaje = 'Cargando...' }) {
    return (
        <div role="status" className="flex items-center justify-center gap-3 py-10 text-gray-600">
            <span className="spinner size-5" />
            <span>{mensaje}</span>
        </div>
    )
}

export default Cargando
