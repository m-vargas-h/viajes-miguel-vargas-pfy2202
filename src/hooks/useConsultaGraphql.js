import { useCallback } from 'react'
import { useQuery } from '@apollo/client/react'
import { ErrorApi } from '../api/errores'
import { errorDesdeGraphql } from '../graphql/errores'

// Ejecuta una consulta GraphQL con Apollo y entrega el mismo formato que useConsulta (REST):
// - datos: el campo pedido de la respuesta (por ejemplo "vuelos"), solo si tiene el formato esperado
// - cargando / actualizando / error (ErrorApi) / recargar()
export function useConsultaGraphql(consulta, { variables, campo, validar }) {
    const { data, loading, error, refetch } = useQuery(consulta, {
        variables,
        notifyOnNetworkStatusChange: true,
    })

    // El error de la recarga ya se refleja en "error", la promesa se descarta
    const recargar = useCallback(() => {
        refetch().catch(() => {})
    }, [refetch])

    const base = { datos: null, cargando: false, actualizando: false, error: null, desdeRespaldo: false, recargar }
    const valor = data?.[campo]
    const valido = validar(valor)

    if (error) return { ...base, error: errorDesdeGraphql(error) }
    if (loading) return { ...base, datos: valido ? valor : null, cargando: !valido, actualizando: valido }
    if (!valido) {
        return { ...base, error: new ErrorApi('formatoInvalido', 'Los datos recibidos no tienen la estructura esperada.') }
    }
    return { ...base, datos: valor }
}
