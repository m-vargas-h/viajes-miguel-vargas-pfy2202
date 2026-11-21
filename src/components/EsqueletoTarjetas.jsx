// Tarjetas de carga con la misma forma que el contenido final, para que la página no "salte" al llegar los datos
function EsqueletoTarjetas({ cantidad = 3, mensaje = 'Cargando...' }) {
    return (
        <div role="status" aria-label={mensaje}>
            <p className="mb-3 flex items-center gap-2 text-sm text-gray-600">
                <span className="spinner size-4" /> {mensaje}
            </p>
            <div className="grilla">
                {Array.from({ length: cantidad }, (_, i) => (
                    <div key={i} className="tarjeta animate-pulse p-5">
                        <div className="mb-3 h-5 w-2/3 rounded bg-gray-200" />
                        <div className="mb-2 h-3 w-full rounded bg-gray-200" />
                        <div className="mb-4 h-3 w-4/5 rounded bg-gray-200" />
                        <div className="h-3 w-1/4 rounded bg-gray-200" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EsqueletoTarjetas
