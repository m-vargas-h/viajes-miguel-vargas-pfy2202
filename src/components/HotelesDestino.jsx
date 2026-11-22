import { OBTENER_HOTELES } from '../graphql/consultas'
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

// Hoteles de un destino obtenidos desde la API GraphQL
function HotelesDestino({ destinoId }) {
    return (
        <OpcionesViaje
            consulta={OBTENER_HOTELES}
            campo="hoteles"
            validar={validarHoteles}
            destinoId={destinoId}
            textos={TEXTOS}
            disponibles={hotel => hotel.habitacionesDisponibles}
            precio={hotel => hotel.precioNoche}
            renderTarjeta={hotel => <TarjetaHotel key={hotel.id} hotel={hotel} />}
        />
    )
}

export default HotelesDestino
