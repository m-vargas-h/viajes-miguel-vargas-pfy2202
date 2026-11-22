import { BrowserRouter as Router } from 'react-router'
import { ApolloProvider } from '@apollo/client/react'
import { ViajeProvider } from './context/ViajeProvider'
import { clienteApollo } from './graphql/cliente'
import AppRoutes from './routes/AppRoutes'

function App() {
    return (
        <ApolloProvider client={clienteApollo}>
            <ViajeProvider>
                <Router basename={import.meta.env.BASE_URL}>
                    <AppRoutes />
                </Router>
            </ViajeProvider>
        </ApolloProvider>
    )
}

export default App
