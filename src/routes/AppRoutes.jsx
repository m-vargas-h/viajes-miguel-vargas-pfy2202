import { lazy } from 'react'
import { Routes, Route } from 'react-router'
import Layout from '../components/Layout'

const Home = lazy(() => import('../components/pages/Home'))
const Destinos = lazy(() => import('../components/pages/Destinos'))
const DetalleDestino = lazy(() => import('../components/pages/DetalleDestino'))
const MiViaje = lazy(() => import('../components/pages/MiViaje'))
const NoEncontrada = lazy(() => import('../components/pages/NoEncontrada'))

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="destinos" element={<Destinos />} />
                <Route path="destinos/:destinoId" element={<DetalleDestino />} />
                <Route path="mi-viaje" element={<MiViaje />} />
                <Route path="*" element={<NoEncontrada />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes
