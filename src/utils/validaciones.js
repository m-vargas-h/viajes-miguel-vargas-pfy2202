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
