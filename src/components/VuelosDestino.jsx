import { OBTENER_VUELOS } from '../graphql/consultas'
import { useViaje } from '../hooks/useViaje'
import { esListaDe, esVuelo } from '../utils/validaciones'
import OpcionesViaje from './OpcionesViaje'
import TarjetaVuelo from './TarjetaVuelo'

const validarVuelos = esListaDe(esVuelo)

const TEXTOS = {
    singular: 'vuelo',
    plural: 'vuelos',
    cargando: 'Cargando vuelos...',
    vacio: 'Por ahora no hay vuelos programados hacia este destino.',
    agotado: 'Todos los vuelos hacia este destino están agotados.',
}

// Vuelos de un destino obtenidos desde la API GraphQL, con opción de elegirlos para el plan de viaje
function VuelosDestino({ destino }) {
    const { plan, alternarOpcion } = useViaje()
    const elegidoId = plan.destino?.id === destino.id ? plan.vuelo?.id : null

    return (
        <OpcionesViaje
            consulta={OBTENER_VUELOS}
            campo="vuelos"
            validar={validarVuelos}
            destinoId={destino.id}
            textos={TEXTOS}
            disponibles={vuelo => vuelo.asientosDisponibles}
            precio={vuelo => vuelo.precio}
            renderTarjeta={vuelo => (
                <TarjetaVuelo
                    key={vuelo.id}
                    vuelo={vuelo}
                    seleccionado={vuelo.id === elegidoId}
                    onAlternar={() => alternarOpcion('vuelo', destino, vuelo)}
                />
            )}
        />
    )
}

export default VuelosDestino
