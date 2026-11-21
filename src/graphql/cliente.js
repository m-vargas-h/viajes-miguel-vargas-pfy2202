import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { URL_GRAPHQL } from '../constants/api'

// Cliente Apollo: las consultas GraphQL se envían a /graphql, donde las responde el mock MSW
export const clienteApollo = new ApolloClient({
    link: new HttpLink({ uri: URL_GRAPHQL }),
    cache: new InMemoryCache(),
})
