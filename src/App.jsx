import { BrowserRouter as Router } from 'react-router'
import { ApolloProvider } from '@apollo/client/react'
import { clienteApollo } from './graphql/cliente'
import AppRoutes from './routes/AppRoutes'

function App() {
    return (
        <ApolloProvider client={clienteApollo}>
            <Router basename={import.meta.env.BASE_URL}>
                <AppRoutes />
            </Router>
        </ApolloProvider>
    )
}

export default App
