import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { TIEMPO_ESPERA, URL_GRAPHQL } from '../constants/api'

// Igual que en el cliente REST: si la respuesta no llega en TIEMPO_ESPERA ms la petición se cancela
const fetchConTiempoLimite = (uri, opciones = {}) => {
    const limite = AbortSignal.timeout(TIEMPO_ESPERA)
    const signal = opciones.signal ? AbortSignal.any([opciones.signal, limite]) : limite
    return fetch(uri, { ...opciones, signal })
}

// Cliente Apollo: las consultas GraphQL se envían a /graphql, donde las responde el mock MSW
export const clienteApollo = new ApolloClient({
    link: new HttpLink({ uri: URL_GRAPHQL, fetch: fetchConTiempoLimite }),
    cache: new InMemoryCache(),
})
