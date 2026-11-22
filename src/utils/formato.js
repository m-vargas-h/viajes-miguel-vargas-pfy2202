export const formatearPrecio = (precio) => `$ ${precio.toLocaleString('es-CL')}`

// Fechas en formato AAAA-MM-DD: se interpretan en UTC para que no cambie el día según la zona horaria
export const formatearFecha = (fecha) =>
    new Date(`${fecha}T00:00:00Z`).toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })

// Devuelve "1 vuelo" / "3 vuelos"
export const pluralizar = (cantidad, singular, plural) => `${cantidad} ${cantidad === 1 ? singular : plural}`

// Días entre dos fechas AAAA-MM-DD (por ejemplo, noches entre la ida y el regreso)
export const diasEntre = (desde, hasta) =>
    Math.round((Date.parse(`${hasta}T00:00:00Z`) - Date.parse(`${desde}T00:00:00Z`)) / 86400000)
