export const formatearPrecio = (precio) => `$ ${precio.toLocaleString('es-CL')}`

// Fechas en formato AAAA-MM-DD: se interpretan en UTC para que no cambie el día según la zona horaria
export const formatearFecha = (fecha) =>
    new Date(`${fecha}T00:00:00Z`).toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })

// Devuelve "1 vuelo" / "3 vuelos"
export const pluralizar = (cantidad, singular, plural) => `${cantidad} ${cantidad === 1 ? singular : plural}`
