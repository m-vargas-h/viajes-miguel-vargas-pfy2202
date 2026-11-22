// Validaciones del formato de las respuestas de la API.
// Evitan que la interfaz falle si el backend envía datos incompletos o con otra estructura.
const esTexto = (valor) => typeof valor === 'string' && valor.trim() !== ''

export const esListaDe = (validar) => (lista) => Array.isArray(lista) && lista.every(validar)

export const esDestino = (destino) =>
    Boolean(destino)
    && esTexto(destino.id)
    && esTexto(destino.nombre)
    && esTexto(destino.pais)
    && esListaDe(esTexto)(destino.actividades)

const esNumeroPositivo = (valor) => Number.isFinite(valor) && valor >= 0
const esFecha = (valor) => esTexto(valor) && !Number.isNaN(Date.parse(valor))

export const esVuelo = (vuelo) =>
    Boolean(vuelo)
    && esTexto(vuelo.id)
    && esTexto(vuelo.aerolinea)
    && esFecha(vuelo.fechaSalida)
    && esFecha(vuelo.fechaRegreso)
    && esNumeroPositivo(vuelo.precio)
    && Number.isInteger(vuelo.asientosDisponibles)

export const esHotel = (hotel) =>
    Boolean(hotel)
    && esTexto(hotel.id)
    && esTexto(hotel.nombre)
    && esNumeroPositivo(hotel.precioNoche)
    && esFecha(hotel.disponibleDesde)
    && esFecha(hotel.disponibleHasta)
    && Number.isInteger(hotel.habitacionesDisponibles)
