// Barra de progreso superior mientras se descarga el código de una página (fallback de Suspense).
// Es discreta para no duplicar el indicador de carga de datos que muestra la página al abrirse.
function CargandoPagina() {
    return (
        <div role="status" aria-label="Cargando página" className="h-1 w-full overflow-hidden bg-marca-100">
            <div className="h-full w-1/3 animate-progreso bg-marca-600" />
        </div>
    )
}

export default CargandoPagina
