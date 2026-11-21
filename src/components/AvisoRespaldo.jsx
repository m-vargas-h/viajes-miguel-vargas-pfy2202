// Aviso cuando la actualización falló y se muestran los últimos datos obtenidos
function AvisoRespaldo({ error, fecha, onReintentar }) {
    const hora = new Date(fecha).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })

    return (
        <div role="alert" className="alerta-advertencia mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm">
                <strong>{error.titulo}.</strong> Se muestran los datos obtenidos a las {hora} porque no se pudo actualizar la información.
            </p>
            {error.reintentable && (
                <button type="button" className="enlace text-sm" onClick={onReintentar}>Reintentar</button>
            )}
        </div>
    )
}

export default AvisoRespaldo
