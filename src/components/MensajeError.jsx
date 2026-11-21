import Boton from './Boton'

// Mensaje de error de una petición con título, detalle, sugerencia y acciones alternativas
function MensajeError({ error, onReintentar, children }) {
    return (
        <div role="alert" className="alerta-error">
            <p className="font-semibold">{error.titulo}</p>
            <p className="text-sm">{error.message}</p>
            <p className="mt-1 text-sm text-red-700">{error.sugerencia}</p>
            <div className="mt-3 flex flex-wrap gap-2">
                {error.reintentable && onReintentar && (
                    <Boton onClick={onReintentar}>Reintentar</Boton>
                )}
                {children}
            </div>
        </div>
    )
}

export default MensajeError
