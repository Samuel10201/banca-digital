/* ============================================================================
   navegacion.js — El motor del prototipo.
   Resuelve la pantalla pedida, la compone en el marco del canal activo, lleva
   el historial y simula los flujos (doble factor, latencia, comprobante).
   Consume: datos.js y pantallas.js.
   Expone al HTML una sola funcion de navegacion: ir(id, flujo).
   ============================================================================ */

/* Estado vivo del prototipo. Las pantallas LEEN estado.flujo (la operacion en
   curso); solo el motor lo escribe. */
const estado = {
  canal: 'phone',      // phone | web | pda — lo fija el shell con data-canal
  pantalla: null,
  flujo: {},           // la operacion en curso: producto, monto, resumen...
  historial: [],
  anotado: false
};

const CANAL_POR_DEFECTO = 'phone';

/* Las cuatro raices de la navegacion, en orden. Se calculan del registro para
   que añadir una raiz sea declarar nav:true y nada mas. */
function raices() {
  return Object.keys(PANTALLAS).filter(id => PANTALLAS[id].nav);
}

/* -------------------------------------------------------------- Arranque -- */

document.addEventListener('DOMContentLoaded', function () {
  const marco = document.querySelector('[data-canal]');
  if (!marco) {
    console.error('No hay elemento con data-canal: el shell del canal esta mal armado.');
    return;
  }
  estado.canal = marco.dataset.canal || CANAL_POR_DEFECTO;

  // ?anotado enciende la trazabilidad desde la URL: es lo que permite capturar
  // en lote las versiones anotadas para el informe sin tocar el teclado.
  if (location.search.indexOf('anotado') !== -1) { alternarAnotado(); }

  // ?limpio esconde la consola del prototipo. Es lo que se usa para las
  // capturas del informe: el mando de sustentacion no es parte de la solucion.
  if (location.search.indexOf('limpio') !== -1) { document.body.classList.add('limpio'); }

  // ?flujo=<clave> siembra una operacion de demostracion, para entrar directo a
  // una pantalla de cierre (terminos, doble factor, comprobante) con datos.
  const claveFlujo = (location.search.match(/flujo=([a-z]+)/) || [])[1];
  if (claveFlujo) {
    if (FLUJOS_DEMO[claveFlujo]) {
      estado.flujo = FLUJOS_DEMO[claveFlujo];
    } else {
      console.error('Flujo de demostracion inexistente:', claveFlujo);
    }
  }

  const inicial = (location.hash || '').replace('#', '') || marco.dataset.inicio || 'bienvenida';
  ir(inicial);

  // Alt+A alterna el modo anotado: es lo que se captura para sustentar la
  // trazabilidad al punto 1 y al punto 3 sin ensuciar las capturas limpias.
  document.addEventListener('keydown', function (e) {
    if (e.altKey && (e.key === 'a' || e.key === 'A')) { alternarAnotado(); }
    if (e.key === 'Escape') { atras(); }
  });
});

/* ------------------------------------------------------------- Navegacion - */

/* Navega a una pantalla. Es la UNICA funcion que los onclick del prototipo
   pueden llamar para moverse (convenciones.md). */
function ir(id, flujo) {
  const def = PANTALLAS[id];
  if (!def) {
    console.error('Pantalla inexistente:', id);
    pintarError(id, 'Esa pantalla no existe en el registro de pantallas.');
    return;
  }
  if (flujo) { estado.flujo = flujo; }

  // El historial solo crece hacia adelante y nunca repite la pantalla actual.
  if (estado.pantalla && estado.pantalla !== id) { estado.historial.push(estado.pantalla); }
  estado.pantalla = id;

  try {
    pintar(def);
  } catch (err) {
    console.error('Fallo al renderizar la pantalla', id, err);
    pintarError(id, err.message);
  }
  history.replaceState(null, '', '#' + id);
}

/* Navega arrastrando datos de la operacion en curso. */
function irConFlujo(id, flujo) { ir(id, flujo); }

function atras() {
  const previa = estado.historial.pop();
  if (!previa) { return; }
  // Se pinta sin pasar por ir(), justamente para NO volver a apilar la pantalla
  // actual: volver atras no es navegar hacia adelante.
  const def = PANTALLAS[previa];
  estado.pantalla = previa;
  try { pintar(def); } catch (err) { pintarError(previa, err.message); }
  history.replaceState(null, '', '#' + previa);
}

/* -------------------------------------------------------------- Pintado --- */

function pintar(def) {
  const cuerpo = document.getElementById('cuerpo');
  const cabecera = document.getElementById('cabecera');
  const rutaUrl = document.getElementById('ruta');

  // 1. Cabecera: la pantalla raiz no lleva boton de volver.
  if (cabecera) {
    const esRaiz = !!def.nav;
    const hayVuelta = estado.historial.length > 0 && !esRaiz;
    cabecera.innerHTML = def.portada ? '' : `
      ${hayVuelta ? `<button class="cabecera__volver" onclick="atras()" aria-label="Volver">${ico('atras', 18)}</button>` : ''}
      <span class="cabecera__titulo">${esRaiz ? '' : def.titulo}</span>
      ${esRaiz ? `<button class="cabecera__volver" aria-label="Notificaciones">${ico('campana', 18)}</button>
                  <span class="cabecera__avatar">${DATOS.cliente.iniciales}</span>` : ''}`;
  }

  // 2. La ruta del § 3.7, literal en la barra de URL del canal web.
  if (rutaUrl) { rutaUrl.textContent = def.ruta; }

  // 3. El contenido, que lo produce la propia pantalla.
  cuerpo.className = 'cuerpo scroll anima pantalla--' + estado.pantalla;
  cuerpo.innerHTML = def.render(estado) + cintaAnotacion(def);
  cuerpo.scrollTop = 0;

  // 4. La navegacion del canal marca la raiz activa. En el telefono, ademas,
  // la barra inferior SOLO existe en las raices: en una pantalla de flujo el
  // pie lo ocupa la accion principal, que es el patron de la referencia.
  document.body.classList.toggle('en-raiz', !!def.nav);
  marcarNavegacion();

  // 5. El comprobante rotula el canal desde el que se hizo la operacion.
  const et = document.getElementById('canal-comprobante');
  if (et) { et.textContent = 'app-' + estado.canal; }

  // 6. La cinta de anotacion tiene alto variable (depende de cuantos datos
  // declare la pantalla y de lo ancho que sea el canal). Se MIDE y se publica
  // como variable CSS, en vez de adivinar un valor que tapa los botones.
  medirCinta();
}

function pintarError(id, mensaje) {
  const cuerpo = document.getElementById('cuerpo');
  if (!cuerpo) { return; }
  cuerpo.innerHTML = `
    <div class="error-pantalla">
      <div class="ilustracion ilustracion--hueso" style="margin-bottom:var(--e-5)">${escena('identidad')}</div>
      <h2 class="titulo">Esta pantalla fallo</h2>
      <p class="menor apagado" style="margin-top:var(--e-3)">
        El prototipo no se queda en blanco: reporta el fallo y sigue navegable.
      </p>
      <div class="error-pantalla__codigo">${id} — ${mensaje}</div>
      <div style="margin-top:var(--e-5)">
        <button class="boton boton--principal" onclick="ir('inicio')">Volver al inicio</button>
      </div>
    </div>`;
}

/* La cinta de trazabilidad: caso de uso, capa de la arquitectura, entidad que
   persiste y actor externo invocado. Solo se ve en modo anotado. */
function cintaAnotacion(def) {
  const partes = [];
  if (def.caso) {
    partes.push(`<span class="anotacion__dato"><span class="anotacion__clave">CU</span>
      <span class="anotacion__valor anotacion__valor--caso">${def.caso}</span></span>`);
  }
  partes.push(`<span class="anotacion__dato"><span class="anotacion__clave">capa</span>
    <span class="anotacion__valor anotacion__valor--capa">${CAPAS[def.capa]}</span></span>`);
  if (def.entidad) {
    partes.push(`<span class="anotacion__dato"><span class="anotacion__clave">entidad</span>
      <span class="anotacion__valor anotacion__valor--entidad">${def.entidad}</span></span>`);
  }
  if (def.externo) {
    partes.push(`<span class="anotacion__dato"><span class="anotacion__clave">actor externo</span>
      <span class="anotacion__valor anotacion__valor--externo">${ACTORES_EXTERNOS[def.externo]}</span></span>`);
  }
  return `<div class="anotacion"><div class="anotacion__cinta">${partes.join('')}</div></div>`;
}

/* Publica el alto real de la cinta de anotacion como --alto-cinta. Vale 0px
   cuando el modo anotado esta apagado, y entonces ninguna regla de canal la
   descuenta. */
function medirCinta() {
  const cinta = document.querySelector('.anotacion__cinta');
  const alto = (estado.anotado && cinta) ? cinta.offsetHeight : 0;
  document.documentElement.style.setProperty('--alto-cinta', alto + 'px');
}

function marcarNavegacion() {
  document.querySelectorAll('[data-raiz]').forEach(function (b) {
    b.setAttribute('aria-current', b.dataset.raiz === estado.pantalla ? 'page' : 'false');
  });
}

/* Construye la barra de navegacion del canal a partir de las raices. La pintan
   los tres shells; cada CSS de canal decide si va abajo (phone), a la
   izquierda (web) o en un riel ancho (pda). */
function montarNavegacion(contenedorId, conBotonCentral) {
  const cont = document.getElementById(contenedorId);
  if (!cont) { return; }
  const ids = raices();
  const izquierda = ids.slice(0, 2);
  const derecha = ids.slice(2);
  const boton = id => `
    <button class="nav__item" data-raiz="${id}" onclick="ir('${id}')">
      ${ico(PANTALLAS[id].icono, 21)}
      <span class="nav__texto">${PANTALLAS[id].titulo}</span>
    </button>`;
  cont.innerHTML = conBotonCentral
    ? izquierda.map(boton).join('') +
      `<button class="nav__central" onclick="ir('transferir')" aria-label="Transferir">${ico('mas', 24)}</button>` +
      derecha.map(boton).join('')
    : ids.map(boton).join('');
  marcarNavegacion();
}

/* ---------------------------------------------------------------- Flujos -- */
/* Los flujos existen para que el prototipo DEMUESTRE los estereotipos del
   punto 3 en vez de solo dibujarlos: un «include» no se puede saltar y un
   «extend» si. */

/* Cierra la apertura de un producto de captacion (CU2, CU3, CU4) o de
   colocacion (CU5, CU6) despues del «include» de aceptar terminos. */
function confirmarApertura() {
  const f = estado.flujo;
  estado.flujo = Object.assign({}, f, { titulo: f.producto || 'Producto abierto' });
  ir('comprobante');
}

/* Despues de consultar la central de riesgo: la tarjeta pasa por asignar cupo
   («include» propio de CU6); el prestamo va directo a aceptar terminos. */
function continuarColocacion() {
  ir(estado.flujo.siguiente || 'aceptar-terminos');
}

/* Despues de verificar el saldo («include» de CU9 y CU11). */
function continuarDebito() {
  ir('doble-factor');
}

/* Compra: tras consultar la tasa va al doble factor. Venta: pasa antes por la
   liquidacion en cuenta, que es su «include» propio (CU8.2). */
function continuarDivisa() {
  const f = estado.flujo;
  if (f.operacion === 'venta') { ir('liquidar-operacion'); return; }
  estado.flujo = Object.assign({}, f, {
    titulo: 'Compra de BTC',
    resumen: [['Operacion', 'Compra de BTC'], ['Debitado', '$2.000.000'],
              ['Recibes', '0,00745 BTC'], ['Tasa', '$268.450.000 / BTC']]
  });
  ir('doble-factor');
}

/* Paga la factura consultada al actor externo PSE (CU10). */
function pagarFactura() {
  const f = estado.flujo;
  estado.flujo = Object.assign({}, f, {
    titulo: 'Pago de ' + f.convenio,
    resumen: [['Operacion', 'Pago de servicio'], ['Convenio', f.convenio],
              ['Referencia', f.referencia], ['Valor', pesos(f.monto)]]
  });
  ir('doble-factor');
}

/* ------------------------------------------------------- Micro-interaccion */

/* Selecciona una opcion dentro de su grupo (plazo, perfil, tipo de cuenta). */
function elegir(el) {
  const grupo = el.parentElement.querySelectorAll('.opcion');
  grupo.forEach(o => o.setAttribute('aria-selected', 'false'));
  el.setAttribute('aria-selected', 'true');
}

/* Marca o desmarca una casilla (aceptacion de contratos y de Habeas Data). */
function marcar(el) {
  el.setAttribute('aria-checked', el.getAttribute('aria-checked') === 'true' ? 'false' : 'true');
}

/* Teclado numerico de los codigos OTP. */
function teclear(destinoId, digito) {
  const cont = document.getElementById(destinoId);
  if (!cont) { return; }
  const vacio = cont.querySelector('.punto:not(.punto--lleno)');
  if (!vacio) { return; }
  vacio.textContent = digito;
  vacio.classList.add('punto--lleno');
}

function borrarDigito(destinoId) {
  const cont = document.getElementById(destinoId);
  if (!cont) { return; }
  const llenos = cont.querySelectorAll('.punto--lleno');
  const ultimo = llenos[llenos.length - 1];
  if (!ultimo) { return; }
  ultimo.textContent = '';
  ultimo.classList.remove('punto--lleno');
}

/* ---------------------------------------------------------- Modo anotado -- */

function alternarAnotado() {
  estado.anotado = !estado.anotado;
  document.body.classList.toggle('anotado', estado.anotado);
  const b = document.getElementById('boton-anotado');
  if (b) { b.setAttribute('aria-pressed', String(estado.anotado)); }
  medirCinta();
}

/* ------------------------------------------- Consola del prototipo -------- */
/* NO ES PRODUCTO: es el mando para sustentar y capturar. Salta entre canales,
   entre pantallas y enciende la trazabilidad. */
function montarConsola(canalActivo) {
  const cont = document.getElementById('consola');
  if (!cont) { return; }
  const canales = [
    { id: 'phone', archivo: 'app-phone.html', icono: 'telefono', texto: 'app-phone' },
    { id: 'web',   archivo: 'app-web.html',   icono: 'monitor',  texto: 'app-web' },
    { id: 'pda',   archivo: 'app-pda.html',   icono: 'terminal', texto: 'app-pda' }
  ];
  const opciones = Object.keys(PANTALLAS).map(function (id) {
    const p = PANTALLAS[id];
    return `<option value="${id}">${p.caso ? p.caso + ' — ' : ''}${p.titulo}</option>`;
  }).join('');

  cont.innerHTML = `
    <div class="consola__grupo">
      <div class="consola__titulo">Canal</div>
      <div class="consola__canales">
        ${canales.map(c => `
          <a class="consola__canal" href="${c.archivo}"
             aria-current="${c.id === canalActivo ? 'page' : 'false'}">
            ${ico(c.icono, 18)}<span>${c.texto}</span>
          </a>`).join('')}
      </div>
    </div>
    <div class="consola__grupo">
      <div class="consola__titulo">Trazabilidad</div>
      <button class="consola__interruptor" id="boton-anotado" aria-pressed="false" onclick="alternarAnotado()">
        <span>Modo anotado</span><span class="consola__led"></span>
      </button>
      <p class="consola__pista">Muestra el caso de uso, la capa de la arquitectura, la entidad de datos y el actor externo de cada pantalla. Atajo: Alt+A.</p>
    </div>
    <div class="consola__grupo">
      <div class="consola__titulo">Ir a la pantalla</div>
      <select onchange="ir(this.value)">${opciones}</select>
      <p class="consola__pista">Esc vuelve atras. La consola no forma parte de la solucion: no sale en las capturas del informe.</p>
    </div>
    <div class="consola__grupo">
      <div class="consola__titulo">Mapa</div>
      <a class="consola__interruptor" href="index.html"><span>Portada y trazabilidad</span>${ico('flecha', 16)}</a>
    </div>`;
}
