/* ============================================================================
   datos.js — Datos de demostracion, catalogo de capas de la arquitectura y
   catalogo de casos de uso del punto 3.
   Expone (solo lectura): DATOS, CAPAS, CASOS, ACTORES_EXTERNOS.
   Lo consumen pantallas.js (para pintar) y navegacion.js (para la anotacion).
   ============================================================================ */

/* Las seis capas horizontales y las dos verticales de la arquitectura del
   punto 1 (§ 1.4). Cada pantalla del prototipo declara cual la atiende: eso es
   lo que el enunciado pide cuando dice "alineado y ajustado a la arquitectura
   propuesta". */
const CAPAS = {
  negocio:   'Negocio de TI y estrategia',
  ux:        'UX y canales de entrega',
  logica:    'Logica del negocio (RF / RNF)',
  apps:      'Aplicaciones de TI e IA integrada',
  datos:     'Datos de TI y analitica moderna',
  infra:     'Infraestructura de TI y plataforma cloud',
  ciber:     'Ciberseguridad (vertical)',
  privacidad:'Privacidad y proteccion de datos (vertical)'
};

/* Los cinco sistemas externos del § 3.3, modelados como actor fuera de la
   frontera. El prototipo los muestra como llamada saliente rotulada API. */
const ACTORES_EXTERNOS = {
  identidad:  'Servicio de validacion de identidad',
  riesgo:     'Central de riesgo',
  divisas:    'Proveedor de divisas digitales',
  pse:        'Pasarela de recaudo (PSE)',
  ach:        'Red de transferencias interbancarias'
};

/* Los 11 casos de uso principales del § 3.4 con sus secundarios del § 3.5.
   Alimenta el mapa de trazabilidad de la portada (index.html). */
const CASOS = [
  { id: 'CU1',  nombre: 'Registrar al cliente',            familia: 'Vinculacion', pantalla: 'registro',
    secundarios: [ { n: 'Validar la identidad del cliente', e: 'include' },
                   { n: 'Vincular el dispositivo personal', e: 'extend' } ] },
  { id: 'CU2',  nombre: 'Abrir la cuenta de ahorro',       familia: 'Captacion', pantalla: 'abrir-ahorro',
    secundarios: [ { n: 'Aceptar los terminos del producto', e: 'include' } ] },
  { id: 'CU3',  nombre: 'Abrir el deposito a termino fijo', familia: 'Captacion', pantalla: 'abrir-cdt',
    secundarios: [ { n: 'Simular el rendimiento del deposito', e: 'include' },
                   { n: 'Aceptar los terminos del producto', e: 'include' } ] },
  { id: 'CU4',  nombre: 'Abrir la inversion',              familia: 'Captacion', pantalla: 'abrir-inversion',
    secundarios: [ { n: 'Definir el perfil de inversion', e: 'include' },
                   { n: 'Aceptar los terminos del producto', e: 'include' } ] },
  { id: 'CU5',  nombre: 'Solicitar el prestamo',           familia: 'Colocacion', pantalla: 'solicitar-prestamo',
    secundarios: [ { n: 'Consultar el historial crediticio', e: 'include' },
                   { n: 'Simular la cuota del prestamo', e: 'extend' },
                   { n: 'Aceptar los terminos del producto', e: 'include' } ] },
  { id: 'CU6',  nombre: 'Solicitar la tarjeta de credito', familia: 'Colocacion', pantalla: 'solicitar-tarjeta',
    secundarios: [ { n: 'Consultar el historial crediticio', e: 'include' },
                   { n: 'Asignar el cupo de la tarjeta', e: 'include' },
                   { n: 'Aceptar los terminos del producto', e: 'include' } ] },
  { id: 'CU7',  nombre: 'Comprar la divisa digital',       familia: 'Divisas', pantalla: 'comprar-divisa',
    secundarios: [ { n: 'Consultar la tasa de cambio', e: 'include' },
                   { n: 'Autorizar la operacion con doble factor', e: 'include' } ] },
  { id: 'CU8',  nombre: 'Vender la divisa digital',        familia: 'Divisas', pantalla: 'vender-divisa',
    secundarios: [ { n: 'Consultar la tasa de cambio', e: 'include' },
                   { n: 'Liquidar la operacion en la cuenta', e: 'include' },
                   { n: 'Autorizar la operacion con doble factor', e: 'include' } ] },
  { id: 'CU9',  nombre: 'Retirar el efectivo',             familia: 'Debito', pantalla: 'retirar',
    secundarios: [ { n: 'Verificar el saldo disponible', e: 'include' },
                   { n: 'Autorizar la operacion con doble factor', e: 'include' } ] },
  { id: 'CU10', nombre: 'Pagar el servicio',               familia: 'Debito', pantalla: 'pagar-servicio',
    secundarios: [ { n: 'Consultar la factura del servicio', e: 'include' },
                   { n: 'Autorizar la operacion con doble factor', e: 'include' } ] },
  { id: 'CU11', nombre: 'Transferir los fondos',           familia: 'Debito', pantalla: 'transferir',
    secundarios: [ { n: 'Verificar el saldo disponible', e: 'include' },
                   { n: 'Registrar la cuenta destino', e: 'extend' },
                   { n: 'Autorizar la operacion con doble factor', e: 'include' } ] }
];

const DATOS = {
  /* El cliente de la demostracion. Persona natural: es el usuario final al que
     la rubrica del punto 3 acota el modelo. */
  cliente: {
    nombre: 'Valeria Restrepo',
    iniciales: 'VR',
    documento: 'CC 1.045.882.310',
    correo: 'valeria.restrepo@correo.com',
    celular: '+57 300 412 8890',
    ciudad: 'Barranquilla, Atlantico',
    cliente_desde: 'marzo de 2026',
    dispositivo: 'iPhone 15 - iOS 18.4'
  },

  /* Productos ya abiertos. Los que faltan se abren desde el propio prototipo,
     que es lo que demuestra los casos de uso de captacion y colocacion. */
  productos: [
    { id: 'ahorro', tipo: 'Cuenta de ahorro', entidad: 'cuenta_de_ahorro',
      numero: '**** 4821', saldo: 8420350, tono: 'morado', abierto: true },
    { id: 'cdt', tipo: 'Deposito a termino', entidad: 'deposito_a_termino',
      numero: 'CDT-90-1177', saldo: 12000000, detalle: '180 dias - 11,25 % E.A.', tono: 'noche', abierto: true },
    { id: 'tarjeta', tipo: 'Tarjeta de credito', entidad: 'tarjeta_de_credito',
      numero: '**** 7702', saldo: 3500000, detalle: 'Cupo disponible', tono: 'naranja', abierto: false },
    { id: 'inversion', tipo: 'Inversion', entidad: 'inversion',
      numero: 'INV-0043', saldo: 0, detalle: 'Sin abrir', tono: 'menta', abierto: false }
  ],

  movimientos: [
    { fecha: 'Hoy, 10:32',        concepto: 'Transferencia a Andres Mejia', canal: 'app-phone', valor: -420000, tono: 'morado', icono: 'enviar' },
    { fecha: 'Hoy, 08:15',        concepto: 'Pago Electricaribe',           canal: 'app-web',   valor: -186400, tono: 'amarillo', icono: 'rayo' },
    { fecha: 'Ayer, 19:04',       concepto: 'Venta USDT',                   canal: 'app-phone', valor: 1240000, tono: 'menta', icono: 'divisa' },
    { fecha: 'Ayer, 12:41',       concepto: 'Retiro corresponsal Norte',    canal: 'app-pda',   valor: -300000, tono: 'naranja', icono: 'retiro' },
    { fecha: '31 de agosto',      concepto: 'Nomina Grupo Andino S.A.S.',   canal: 'ACH',       valor: 4850000, tono: 'azul', icono: 'entrar' },
    { fecha: '29 de agosto',      concepto: 'Compra BTC',                   canal: 'app-web',   valor: -2000000, tono: 'menta', icono: 'divisa' }
  ],

  /* Tasas que el prototipo pide al Proveedor de divisas digitales (actor
     externo del § 3.3) en el caso "Consultar la tasa de cambio". */
  tasas: [
    { simbolo: 'BTC',  nombre: 'Bitcoin',   precio: 268450000, variacion: 2.4,  tono: 'amarillo' },
    { simbolo: 'ETH',  nombre: 'Ethereum',  precio: 14820000,  variacion: -1.1, tono: 'morado' },
    { simbolo: 'USDT', nombre: 'Tether',    precio: 4128,      variacion: 0.1,  tono: 'menta' },
    { simbolo: 'USDC', nombre: 'USD Coin',  precio: 4126,      variacion: 0.0,  tono: 'azul' }
  ],

  /* Facturas que el prototipo pide a la Pasarela de recaudo PSE (actor externo)
     en el caso "Consultar la factura del servicio". */
  facturas: [
    { convenio: 'Electricaribe',    referencia: '900123-45', valor: 186400, vence: '12 de septiembre', tono: 'amarillo', icono: 'rayo' },
    { convenio: 'Triple A - agua',  referencia: '556001-02', valor: 74300,  vence: '15 de septiembre', tono: 'azul', icono: 'gota' },
    { convenio: 'Claro hogar',      referencia: '778220-91', valor: 129900, vence: '18 de septiembre', tono: 'naranja', icono: 'senal' },
    { convenio: 'Gases del Caribe', referencia: '330415-08', valor: 41200,  vence: '20 de septiembre', tono: 'menta', icono: 'llama' }
  ],

  /* Cuentas destino ya inscritas. Su existencia es lo que hace que
     "Registrar la cuenta destino" sea «extend» y no «include» (§ 3.5). */
  contactos: [
    { nombre: 'Andres Mejia',   banco: 'Banco Digital',  cuenta: '**** 3390', iniciales: 'AM', tono: 'morado' },
    { nombre: 'Camila Ordoñez', banco: 'Bancolombia',    cuenta: '**** 7714', iniciales: 'CO', tono: 'naranja' },
    { nombre: 'Jorge Ariza',    banco: 'Davivienda',     cuenta: '**** 1082', iniciales: 'JA', tono: 'menta' }
  ],

  /* Convenios de retiro sin tarjeta (canal app-pda). */
  corresponsales: [
    { nombre: 'Corresponsal Norte - Cra 51B', distancia: '340 m' },
    { nombre: 'Cajero Centro Comercial Buenavista', distancia: '1,2 km' },
    { nombre: 'Corresponsal Villa Country', distancia: '2,0 km' }
  ]
};

/* Operaciones de demostracion, para entrar DIRECTO a una pantalla de flujo con
   datos coherentes: app-phone.html?flujo=prestamo#aceptar-terminos.
   Sin esto, una pantalla de cierre abierta por su ancla no tiene que mostrar
   (el flujo lo trae quien viene navegando). Se usa para capturar y para
   retomar una pantalla suelta durante la sustentacion. */
const FLUJOS_DEMO = {
  prestamo: {
    producto: 'Prestamo de libre inversion',
    titulo: 'Prestamo de libre inversion',
    origen: 'solicitar-prestamo',
    entidad: 'prestamo',
    resumen: [['Producto', 'Prestamo libre inversion'], ['Monto', '$8.000.000'],
              ['Plazo', '24 meses'], ['Cuota', '$389.400']]
  },
  cdt: {
    producto: 'Deposito a termino fijo',
    titulo: 'Deposito a termino fijo',
    origen: 'abrir-cdt',
    entidad: 'deposito_a_termino',
    resumen: [['Producto', 'CDT 180 dias'], ['Capital', '$12.000.000'],
              ['Tasa', '11,25 % E.A.'], ['Vence', '2 de marzo de 2027']]
  },
  transferencia: {
    titulo: 'Transferencia',
    monto: 420000,
    entidad: 'transferencia',
    destino: 'transferir',
    beneficiario: 'Andres Mejia',
    resumen: [['Operacion', 'Transferencia'], ['Beneficiario', 'Andres Mejia'],
              ['Banco', 'Banco Digital'], ['Cuenta', '**** 3390'], ['Valor', '$420.000']]
  },
  pago: {
    convenio: 'Electricaribe',
    referencia: '900123-45',
    monto: 186400,
    vence: '12 de septiembre',
    titulo: 'Pago de Electricaribe',
    entidad: 'pago_de_servicio',
    resumen: [['Operacion', 'Pago de servicio'], ['Convenio', 'Electricaribe'],
              ['Referencia', '900123-45'], ['Valor', '$186.400']]
  }
};

/* Formato de moneda colombiana. Vive aqui porque es una regla del dato, no de
   la pantalla: los tres canales tienen que mostrar el mismo peso igual. */
function pesos(valor, conSigno) {
  const signo = conSigno && valor > 0 ? '+' : (valor < 0 ? '-' : '');
  const n = Math.abs(valor).toLocaleString('es-CO', { maximumFractionDigits: 0 });
  return signo + '$' + n;
}
