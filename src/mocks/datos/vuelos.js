// Vuelos disponibles por destino (API GraphQL). Todos salen desde Santiago.
// Precios en CLP por persona, ida y vuelta.
export const vuelos = [
    { id: 'v-cus-1', destinoId: 'cusco', aerolinea: 'LATAM', numeroVuelo: 'LA 2455', origen: 'Santiago (SCL)', llegada: 'Cusco (CUZ)', fechaSalida: '2026-12-12', fechaRegreso: '2026-12-19', escalas: 1, duracion: '5h 40m', precio: 389900, asientosDisponibles: 14 },
    { id: 'v-cus-2', destinoId: 'cusco', aerolinea: 'Sky Airline', numeroVuelo: 'H2 515', origen: 'Santiago (SCL)', llegada: 'Cusco (CUZ)', fechaSalida: '2027-01-08', fechaRegreso: '2027-01-15', escalas: 1, duracion: '6h 10m', precio: 312500, asientosDisponibles: 3 },
    { id: 'v-cus-3', destinoId: 'cusco', aerolinea: 'JetSMART', numeroVuelo: 'JA 708', origen: 'Santiago (SCL)', llegada: 'Cusco (CUZ)', fechaSalida: '2027-02-05', fechaRegreso: '2027-02-12', escalas: 1, duracion: '6h 35m', precio: 274900, asientosDisponibles: 0 },

    { id: 'v-ctg-1', destinoId: 'cartagena', aerolinea: 'Avianca', numeroVuelo: 'AV 162', origen: 'Santiago (SCL)', llegada: 'Cartagena (CTG)', fechaSalida: '2026-12-20', fechaRegreso: '2026-12-28', escalas: 1, duracion: '8h 15m', precio: 529900, asientosDisponibles: 9 },
    { id: 'v-ctg-2', destinoId: 'cartagena', aerolinea: 'LATAM', numeroVuelo: 'LA 572', origen: 'Santiago (SCL)', llegada: 'Cartagena (CTG)', fechaSalida: '2027-01-15', fechaRegreso: '2027-01-24', escalas: 1, duracion: '7h 50m', precio: 568000, asientosDisponibles: 21 },
    { id: 'v-ctg-3', destinoId: 'cartagena', aerolinea: 'Copa Airlines', numeroVuelo: 'CM 276', origen: 'Santiago (SCL)', llegada: 'Cartagena (CTG)', fechaSalida: '2027-02-10', fechaRegreso: '2027-02-17', escalas: 1, duracion: '9h 05m', precio: 489500, asientosDisponibles: 2 },

    { id: 'v-tdp-1', destinoId: 'torres-del-paine', aerolinea: 'LATAM', numeroVuelo: 'LA 097', origen: 'Santiago (SCL)', llegada: 'Puerto Natales (PNT)', fechaSalida: '2026-12-05', fechaRegreso: '2026-12-11', escalas: 0, duracion: '3h 25m', precio: 259900, asientosDisponibles: 18 },
    { id: 'v-tdp-2', destinoId: 'torres-del-paine', aerolinea: 'Sky Airline', numeroVuelo: 'H2 129', origen: 'Santiago (SCL)', llegada: 'Punta Arenas (PUQ)', fechaSalida: '2027-01-03', fechaRegreso: '2027-01-10', escalas: 0, duracion: '3h 20m', precio: 198700, asientosDisponibles: 6 },
    { id: 'v-tdp-3', destinoId: 'torres-del-paine', aerolinea: 'JetSMART', numeroVuelo: 'JA 251', origen: 'Santiago (SCL)', llegada: 'Punta Arenas (PUQ)', fechaSalida: '2027-02-14', fechaRegreso: '2027-02-21', escalas: 0, duracion: '3h 30m', precio: 169900, asientosDisponibles: 0 },

    { id: 'v-rom-1', destinoId: 'roma', aerolinea: 'Iberia', numeroVuelo: 'IB 6830', origen: 'Santiago (SCL)', llegada: 'Roma (FCO)', fechaSalida: '2027-01-10', fechaRegreso: '2027-01-24', escalas: 1, duracion: '17h 40m', precio: 1189000, asientosDisponibles: 11 },
    { id: 'v-rom-2', destinoId: 'roma', aerolinea: 'Air France', numeroVuelo: 'AF 401', origen: 'Santiago (SCL)', llegada: 'Roma (FCO)', fechaSalida: '2027-02-02', fechaRegreso: '2027-02-16', escalas: 1, duracion: '18h 20m', precio: 1245500, asientosDisponibles: 4 },
    { id: 'v-rom-3', destinoId: 'roma', aerolinea: 'LATAM', numeroVuelo: 'LA 8070', origen: 'Santiago (SCL)', llegada: 'Roma (FCO)', fechaSalida: '2027-03-06', fechaRegreso: '2027-03-20', escalas: 1, duracion: '17h 55m', precio: 1099900, asientosDisponibles: 25 },

    { id: 'v-bcn-1', destinoId: 'barcelona', aerolinea: 'Iberia', numeroVuelo: 'IB 6834', origen: 'Santiago (SCL)', llegada: 'Barcelona (BCN)', fechaSalida: '2026-12-18', fechaRegreso: '2027-01-02', escalas: 1, duracion: '15h 50m', precio: 1159000, asientosDisponibles: 0 },
    { id: 'v-bcn-2', destinoId: 'barcelona', aerolinea: 'LATAM', numeroVuelo: 'LA 704', origen: 'Santiago (SCL)', llegada: 'Barcelona (BCN)', fechaSalida: '2027-01-20', fechaRegreso: '2027-02-03', escalas: 1, duracion: '16h 10m', precio: 1078500, asientosDisponibles: 13 },
    { id: 'v-bcn-3', destinoId: 'barcelona', aerolinea: 'Level', numeroVuelo: 'IB 2602', origen: 'Santiago (SCL)', llegada: 'Barcelona (BCN)', fechaSalida: '2027-03-01', fechaRegreso: '2027-03-15', escalas: 0, duracion: '13h 45m', precio: 899900, asientosDisponibles: 7 },

    { id: 'v-kyo-1', destinoId: 'kioto', aerolinea: 'Qatar Airways', numeroVuelo: 'QR 772', origen: 'Santiago (SCL)', llegada: 'Osaka Kansai (KIX)', fechaSalida: '2027-03-25', fechaRegreso: '2027-04-08', escalas: 2, duracion: '32h 15m', precio: 1689000, asientosDisponibles: 5 },
    { id: 'v-kyo-2', destinoId: 'kioto', aerolinea: 'Emirates', numeroVuelo: 'EK 264', origen: 'Santiago (SCL)', llegada: 'Osaka Kansai (KIX)', fechaSalida: '2027-04-10', fechaRegreso: '2027-04-24', escalas: 2, duracion: '33h 40m', precio: 1595500, asientosDisponibles: 16 },
    { id: 'v-kyo-3', destinoId: 'kioto', aerolinea: 'Air Canada', numeroVuelo: 'AC 093', origen: 'Santiago (SCL)', llegada: 'Osaka Kansai (KIX)', fechaSalida: '2027-05-02', fechaRegreso: '2027-05-16', escalas: 1, duracion: '29h 50m', precio: 1749900, asientosDisponibles: 1 },

    { id: 'v-cpt-1', destinoId: 'ciudad-del-cabo', aerolinea: 'LATAM', numeroVuelo: 'LA 8064', origen: 'Santiago (SCL)', llegada: 'Ciudad del Cabo (CPT)', fechaSalida: '2027-01-12', fechaRegreso: '2027-01-26', escalas: 1, duracion: '16h 30m', precio: 1329000, asientosDisponibles: 8 },
    { id: 'v-cpt-2', destinoId: 'ciudad-del-cabo', aerolinea: 'Turkish Airlines', numeroVuelo: 'TK 800', origen: 'Santiago (SCL)', llegada: 'Ciudad del Cabo (CPT)', fechaSalida: '2027-02-08', fechaRegreso: '2027-02-22', escalas: 2, duracion: '27h 10m', precio: 1189500, asientosDisponibles: 12 },
    { id: 'v-cpt-3', destinoId: 'ciudad-del-cabo', aerolinea: 'South African Airways', numeroVuelo: 'SA 223', origen: 'Santiago (SCL)', llegada: 'Ciudad del Cabo (CPT)', fechaSalida: '2027-03-15', fechaRegreso: '2027-03-29', escalas: 1, duracion: '18h 05m', precio: 1259900, asientosDisponibles: 0 },
]
