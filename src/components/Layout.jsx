import { Suspense } from 'react'
import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './Footer'
import CargandoPagina from './CargandoPagina'

function Layout() {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50 text-gray-800">
            <Header />
            <Suspense fallback={<CargandoPagina />}>
                <Outlet />
            </Suspense>
            <Footer />
        </div>
    )
}

export default Layout
