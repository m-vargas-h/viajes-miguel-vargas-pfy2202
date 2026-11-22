import { useContext } from 'react'
import { ViajeContext } from '../context/ViajeContext'

// Acceso al plan de viaje desde cualquier componente dentro de ViajeProvider
export function useViaje() {
    const contexto = useContext(ViajeContext)
    if (!contexto) throw new Error('useViaje debe usarse dentro de ViajeProvider')
    return contexto
}
