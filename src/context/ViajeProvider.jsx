import { useCallback, useEffect, useMemo, useState } from 'react'
import { LIMITES, NOCHES_POR_DEFECTO } from '../constants/viaje'
import { diasEntre } from '../utils/formato'
import { esHotel, esVuelo } from '../utils/validaciones'
import { ViajeContext } from './ViajeContext'

const CLAVE = 'plan-viaje'

const PLAN_VACIO = { destino: null, vuelo: null, hotel: null, pasajeros: 1, noches: NOCHES_POR_DEFECTO }

const limitar = (valor, { min, max }) => Math.min(max, Math.max(min, Math.round(Number(valor) || min)))

// Recupera el plan guardado; si no existe o tiene otro formato se parte con un plan vacío
function leerPlan() {
    try {
        const guardado = JSON.parse(localStorage.getItem(CLAVE))
        if (!guardado?.destino) return PLAN_VACIO
        return {
            destino: guardado.destino,
            vuelo: esVuelo(guardado.vuelo) ? guardado.vuelo : null,
            hotel: esHotel(guardado.hotel) ? guardado.hotel : null,
            pasajeros: limitar(guardado.pasajeros, LIMITES.pasajeros),
            noches: limitar(guardado.noches, LIMITES.noches),
        }
    } catch {
        return PLAN_VACIO
    }
}

export function ViajeProvider({ children }) {
    const [plan, setPlan] = useState(leerPlan)

    // Cada cambio del plan se guarda para mantenerlo al recargar la página
    useEffect(() => {
        try {
            localStorage.setItem(CLAVE, JSON.stringify(plan))
        } catch {
            // Sin acceso a localStorage: el plan solo dura mientras la página está abierta
        }
    }, [plan])

    // Elige (o quita, si ya estaba elegida) una opción de tipo "vuelo" u "hotel".
    // Si la opción es de otro destino, el plan anterior se reemplaza por uno nuevo.
    const alternarOpcion = useCallback((tipo, destino, opcion) => {
        setPlan(anterior => {
            const mismoDestino = anterior.destino?.id === destino.id
            const base = mismoDestino ? anterior : { ...PLAN_VACIO, pasajeros: anterior.pasajeros }
            const elegida = base[tipo]?.id === opcion.id ? null : opcion
            const nuevo = {
                ...base,
                destino: { id: destino.id, nombre: destino.nombre, pais: destino.pais },
                [tipo]: elegida,
            }
            // Al elegir un vuelo, las noches de hotel se ajustan a la duración del viaje
            if (tipo === 'vuelo' && elegida) {
                nuevo.noches = limitar(diasEntre(elegida.fechaSalida, elegida.fechaRegreso), LIMITES.noches)
            }
            return nuevo
        })
    }, [])

    const cambiarCantidad = useCallback((campo, valor) => {
        setPlan(anterior => ({ ...anterior, [campo]: limitar(valor, LIMITES[campo]) }))
    }, [])

    const vaciar = useCallback(() => setPlan(PLAN_VACIO), [])

    const valor = useMemo(() => ({
        plan,
        cantidadElegidos: Number(Boolean(plan.vuelo)) + Number(Boolean(plan.hotel)),
        alternarOpcion,
        cambiarCantidad,
        vaciar,
    }), [plan, alternarOpcion, cambiarCantidad, vaciar])

    return <ViajeContext.Provider value={valor}>{children}</ViajeContext.Provider>
}
