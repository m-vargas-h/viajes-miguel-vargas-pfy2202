import { gql } from '@apollo/client'

// Vuelos disponibles hacia un destino
export const OBTENER_VUELOS = gql`
    query ObtenerVuelos($destinoId: ID!) {
        vuelos(destinoId: $destinoId) {
            id
            aerolinea
            numeroVuelo
            origen
            llegada
            fechaSalida
            fechaRegreso
            escalas
            duracion
            precio
            asientosDisponibles
        }
    }
`

// Hoteles disponibles en un destino
export const OBTENER_HOTELES = gql`
    query ObtenerHoteles($destinoId: ID!) {
        hoteles(destinoId: $destinoId) {
            id
            nombre
            estrellas
            ubicacion
            precioNoche
            disponibleDesde
            disponibleHasta
            habitacionesDisponibles
            servicios
        }
    }
`
