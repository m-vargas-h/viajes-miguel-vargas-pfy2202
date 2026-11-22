import { useState } from 'react'
import { useConsultaGraphql } from '../hooks/useConsultaGraphql'
import { pluralizar } from '../utils/formato'
import BarraConsulta from './BarraConsulta'
import EsqueletoTarjetas from './EsqueletoTarjetas'
import MensajeError from './MensajeError'

// Listado genérico de opciones de un destino obtenidas por GraphQL (vuelos u hoteles):
// estados de carga y error, filtro de disponibilidad y orden por precio
function OpcionesViaje({ consulta, campo, validar, destinoId, textos, disponibles, precio, renderTarjeta }) {
    const resultado = useConsultaGraphql(consulta, { variables: { destinoId }, campo, validar })
    const { datos, cargando, error, recargar } = resultado
    const [soloDisponibles, setSoloDisponibles] = useState(false)

    if (cargando) return <EsqueletoTarjetas cantidad={3} mensaje={textos.cargando} />
    if (error) return <MensajeError error={error} onReintentar={recargar} />

    const lista = datos
        .filter(elemento => !soloDisponibles || disponibles(elemento) > 0)
        .sort((a, b) => precio(a) - precio(b))

    return (
        <>
            <label className="mb-3 inline-flex cursor-pointer items-center gap-2 text-sm">
                <input
                    type="checkbox"
                    checked={soloDisponibles}
                    onChange={(e) => setSoloDisponibles(e.target.checked)}
                    className="size-4 accent-marca-600"
                />
                Mostrar solo opciones con disponibilidad
            </label>

            <BarraConsulta
                consulta={resultado}
                texto={`${pluralizar(lista.length, textos.singular, textos.plural)} · ordenados por precio`}
            />

            {lista.length === 0 ? (
                <div className="alerta-info">{datos.length === 0 ? textos.vacio : textos.agotado}</div>
            ) : (
                <div className="grilla">{lista.map(renderTarjeta)}</div>
            )}
        </>
    )
}

export default OpcionesViaje
