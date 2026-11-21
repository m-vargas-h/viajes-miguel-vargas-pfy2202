import { useCallback, useEffect, useState } from 'react'
import { consultarApi, leerCache } from '../api/destinosApi'

// Consulta una ruta de la API y entrega su estado:
// - datos: respuesta del servidor (o la última guardada si la petición falló)
// - cargando: no hay datos que mostrar y la petición está en curso
// - actualizando: se muestran datos guardados mientras llega la respuesta nueva
// - error: ErrorApi de la última petición
// - desdeRespaldo: la petición falló y se muestran los datos guardados el fechaRespaldo
// - recargar(): vuelve a pedir la ruta ignorando la caché
export function useConsulta(ruta) {
    const [recarga, setRecarga] = useState({ ruta, numero: 0 })
    const [resultado, setResultado] = useState({ clave: null })

    // Al cambiar de ruta el contador de recargas vuelve a 0
    const numero = recarga.ruta === ruta ? recarga.numero : 0
    const clave = `${ruta}#${numero}`
    const enCache = leerCache(ruta)
    // Primera consulta de la ruta con datos vigentes en caché: no se hace la petición
    const usarCache = numero === 0 && Boolean(enCache?.vigente)

    useEffect(() => {
        if (usarCache) return

        let activo = true
        const { promesa, liberar } = consultarApi(ruta)
        promesa
            .then(datos => {
                if (activo) setResultado({ clave, datos, error: null })
            })
            .catch(error => {
                if (activo && error.name !== 'AbortError') setResultado({ clave, datos: null, error })
            })

        return () => {
            activo = false
            liberar()
        }
    }, [ruta, clave, usarCache])

    const recargar = useCallback(() => {
        setRecarga(anterior => ({ ruta, numero: (anterior.ruta === ruta ? anterior.numero : 0) + 1 }))
    }, [ruta])

    const base = { datos: null, cargando: false, actualizando: false, error: null, desdeRespaldo: false, fechaRespaldo: null, recargar }

    // Ya llegó la respuesta de esta consulta
    if (resultado.clave === clave) {
        if (!resultado.error) return { ...base, datos: resultado.datos }
        return {
            ...base,
            datos: enCache?.datos ?? null,
            error: resultado.error,
            desdeRespaldo: Boolean(enCache),
            fechaRespaldo: enCache?.fecha ?? null,
        }
    }

    if (usarCache) return { ...base, datos: enCache.datos }

    // Petición en curso: si hay datos guardados se siguen mostrando
    return { ...base, datos: enCache?.datos ?? null, cargando: !enCache, actualizando: Boolean(enCache) }
}
