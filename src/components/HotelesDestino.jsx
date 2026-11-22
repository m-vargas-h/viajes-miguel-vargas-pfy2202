import { OBTENER_HOTELES } from '../graphql/consultas'
import { useViaje } from '../hooks/useViaje'
import { esHotel, esListaDe } from '../utils/validaciones'
import OpcionesViaje from './OpcionesViaje'
import TarjetaHotel from './TarjetaHotel'

const validarHoteles = esListaDe(esHotel)

const TEXTOS = {
    singular: 'hotel',
    plural: 'hoteles',
    cargando: 'Cargando hoteles...',
    vacio: 'Por ahora no hay hoteles registrados en este destino.',
    agotado: 'Todos los hoteles de este destino están sin habitaciones disponibles.',
}

// Hoteles de un destino obtenidos desde la API GraphQL, con opción de elegirlos para el plan de viaje
function HotelesDestino({ destino }) {
    const { plan, alternarOpcion } = useViaje()
    const elegidoId = plan.destino?.id === destino.id ? plan.hotel?.id : null

    return (
        <OpcionesViaje
            consulta={OBTENER_HOTELES}
            campo="hoteles"
            validar={validarHoteles}
            destinoId={destino.id}
            textos={TEXTOS}
            disponibles={hotel => hotel.habitacionesDisponibles}
            precio={hotel => hotel.precioNoche}
            renderTarjeta={hotel => (
                <TarjetaHotel
                    key={hotel.id}
                    hotel={hotel}
                    seleccionado={hotel.id === elegidoId}
                    onAlternar={() => alternarOpcion('hotel', destino, hotel)}
                />
            )}
        />
    )
}

export default HotelesDestino
