// Grupo de botones para elegir una opción (por ejemplo, un continente)
function FiltroOpciones({ etiqueta, opciones, seleccionada, onSeleccionar }) {
    const clases = (activa) =>
        'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ' +
        (activa
            ? 'border-marca-600 bg-marca-600 text-white'
            : 'border-gray-300 bg-white text-gray-700 hover:border-marca-300 hover:bg-marca-50')

    return (
        <div role="group" aria-label={etiqueta} className="flex flex-wrap gap-2">
            {opciones.map(opcion => (
                <button
                    key={opcion}
                    type="button"
                    aria-pressed={opcion === seleccionada}
                    className={clases(opcion === seleccionada)}
                    onClick={() => onSeleccionar(opcion)}
                >
                    {opcion}
                </button>
            ))}
        </div>
    )
}

export default FiltroOpciones