import { useState } from 'react'
import { ESCENARIOS, cambiarEscenario, obtenerEscenario } from '../mocks/escenario'

// Permite elegir cómo responde el backend mock para probar los estados de error y carga
function SimuladorBackend() {
    const [escenario, setEscenario] = useState(obtenerEscenario)

    const handleCambiar = (e) => {
        cambiarEscenario(e.target.value)
        setEscenario(e.target.value)
    }

    return (
        <label className="flex flex-wrap items-center justify-center gap-2">
            <span>Simular respuesta del servidor:</span>
            <select
                value={escenario}
                onChange={handleCambiar}
                className="rounded-md border border-gray-600 bg-gray-700 px-2 py-1 text-white"
            >
                {Object.entries(ESCENARIOS).map(([valor, texto]) => (
                    <option key={valor} value={valor}>{texto}</option>
                ))}
            </select>
        </label>
    )
}

export default SimuladorBackend
