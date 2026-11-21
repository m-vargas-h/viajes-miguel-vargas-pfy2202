import AvisoRespaldo from './AvisoRespaldo'
import IndicadorActualizando from './IndicadorActualizando'

// Botón "Actualizar" con indicador de actualización y aviso de datos de respaldo
function BarraConsulta({ consulta, texto }) {
    const { actualizando, desdeRespaldo, error, fechaRespaldo, recargar } = consulta

    return (
        <>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-gray-600">{texto}</p>
                <div className="flex items-center gap-3">
                    {actualizando && <IndicadorActualizando />}
                    <button type="button" className="enlace text-sm" onClick={recargar} disabled={actualizando}>
                        ↻ Actualizar
                    </button>
                </div>
            </div>
            {desdeRespaldo && <AvisoRespaldo error={error} fecha={fechaRespaldo} onReintentar={recargar} />}
        </>
    )
}

export default BarraConsulta
