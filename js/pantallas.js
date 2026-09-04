/* ============================================================================
   pantallas.js — El registro de pantallas del prototipo.
   Expone: ICONOS, escena(), los ayudantes de bloque y PANTALLAS.
   Lo consume navegacion.js.

   CONTRATO (convenciones.md): render() devuelve CONTENIDO SEMANTICO y jamas
   decide anchos, columnas ni posiciones. La composicion es del CSS del canal.
   Es lo que permite que las tres pantallas de un mismo caso de uso sean LA
   MISMA pantalla en app-phone, app-web y app-pda.
   ============================================================================ */

/* ------------------------------------------------------------- Iconografia */
/* Trazos de 24x24 sobre currentColor: heredan el tono del contenedor y salen
   nitidos en las capturas del informe sin pedir un solo byte a la red. */
const ICONOS = {
  casa:      '<path d="M3 10.5 12 3l9 7.5V20a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 20z"/><path d="M9 21.5v-7h6v7"/>',
  cartera:   '<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H18a2 2 0 0 1 2 2v1"/><path d="M3 7.5v11A2.5 2.5 0 0 0 5.5 21H19a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2H5.5A2.5 2.5 0 0 1 3 7.5z"/><path d="M17 14h.01"/>',
  lista:     '<path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/>',
  usuario:   '<path d="M20 21v-1.5a4.5 4.5 0 0 0-4.5-4.5h-7A4.5 4.5 0 0 0 4 19.5V21"/><circle cx="12" cy="7.5" r="4"/>',
  mas:       '<path d="M12 5v14M5 12h14"/>',
  atras:     '<path d="M19 12H5M12 19l-7-7 7-7"/>',
  flecha:    '<path d="M5 12h14M12 5l7 7-7 7"/>',
  buscar:    '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  campana:   '<path d="M18 8.5a6 6 0 0 0-12 0c0 6.5-2.5 8.5-2.5 8.5h17S18 15 18 8.5z"/><path d="M13.7 20.5a2 2 0 0 1-3.4 0"/>',
  enviar:    '<path d="M22 2 11 13"/><path d="M22 2l-7 20-4-9-9-4z"/>',
  entrar:    '<path d="M12 3v13M6.5 10.5 12 16l5.5-5.5"/><path d="M4 21h16"/>',
  retiro:    '<path d="M12 21V8M6.5 13.5 12 8l5.5 5.5"/><path d="M4 3.5h16"/>',
  rayo:      '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  gota:      '<path d="M12 2.7s6 6.3 6 10.3a6 6 0 0 1-12 0c0-4 6-10.3 6-10.3z"/>',
  senal:     '<path d="M2 9a15 15 0 0 1 20 0"/><path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 16a5 5 0 0 1 7 0"/><path d="M12 19.5h.01"/>',
  llama:     '<path d="M12 22c4 0 7-2.7 7-6.5 0-4.5-5-6.5-4-11.5-3 1-6 4.5-6 8 0-1.5-1-3-2-3.5-.7 1.4-2 3.4-2 7C5 19.3 8 22 12 22z"/>',
  divisa:    '<circle cx="12" cy="12" r="9"/><path d="M12 6.5v11"/><path d="M15 9.6c0-1.4-1.3-2.4-3-2.4s-3 1-3 2.4 1.3 2.4 3 2.4 3 1 3 2.4-1.3 2.4-3 2.4-3-1-3-2.4"/>',
  escudo:    '<path d="M12 2.5 4 6v6c0 5 3.4 8.6 8 9.5 4.6-.9 8-4.5 8-9.5V6z"/>',
  candado:   '<rect x="4.5" y="10" width="15" height="11" rx="2.5"/><path d="M8.5 10V7a3.5 3.5 0 0 1 7 0v3"/>',
  camara:    '<path d="M4 8h3l1.5-2.5h7L17 8h3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z"/><circle cx="12" cy="14" r="3.5"/>',
  documento: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
  cheque:    '<path d="M20 6 9 17l-5-5"/>',
  reloj:     '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.4 2"/>',
  qr:        '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><path d="M14 14h3v3h-3zM20 14h1M14 20h3M20 17v4"/>',
  telefono:  '<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M10.5 18.5h3"/>',
  monitor:   '<rect x="2" y="4" width="20" height="12.5" rx="2"/><path d="M8 20.5h8M12 16.5v4"/>',
  terminal:  '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M8 6h8M8 10h3M13 10h3M8 14h3M13 14h3M8 18h8"/>',
  alerta:    '<path d="M12 3 2 20.5h20z"/><path d="M12 10v4.5M12 17.5h.01"/>',
  nube:      '<path d="M7 18.5h10a4.2 4.2 0 0 0 .5-8.4A6.2 6.2 0 0 0 5.9 11.4 3.6 3.6 0 0 0 7 18.5z"/>',
  mundo:     '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"/>',
  grafico:   '<path d="M3 17.5 8.5 11l4 3L20 6"/><path d="M15.5 6H20v4.5"/>',
  barras:    '<path d="M4 20V13M9.5 20V7M15 20v-4M20.5 20V4"/>',
  sobre:     '<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  cerrar:    '<path d="M18 6 6 18M6 6l12 12"/>',
  ojo:       '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  personas:  '<path d="M16.5 21v-1.5a4 4 0 0 0-4-4h-6a4 4 0 0 0-4 4V21"/><circle cx="9.5" cy="7.5" r="3.5"/><path d="M22 21v-1.5a4 4 0 0 0-3-3.85M16 3.6a4 4 0 0 1 0 7.75"/>',
  ajustes:   '<path d="M4 7h9M17.5 7H20M4 17h4M12.5 17H20M4 12h13M21 12h-1"/><circle cx="15" cy="7" r="2.2"/><circle cx="10" cy="17" r="2.2"/><circle cx="19" cy="12" r="2.2"/>',
  ubicacion: '<path d="M12 21.5s7-5.9 7-11.5a7 7 0 1 0-14 0c0 5.6 7 11.5 7 11.5z"/><circle cx="12" cy="10" r="2.5"/>',
  calculadora:'<rect x="4.5" y="2.5" width="15" height="19" rx="2.5"/><path d="M8 7h8M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16.5h.01M12 16.5h.01M15.5 16.5h.01"/>',
  refrescar: '<path d="M20.5 12a8.5 8.5 0 1 1-2.6-6.1"/><path d="M20.5 3.5V9h-5.5"/>',
  huella:    '<path d="M12 2.5a8 8 0 0 0-8 8v2.5"/><path d="M20 12.5v-2a8 8 0 0 0-3.2-6.4"/><path d="M8 10.5a4 4 0 0 1 8 0v3.5c0 2-.5 4-1.6 5.6"/><path d="M12 10.5V15c0 3 1 4.7 2.6 5.8"/><path d="M11.5 21.5c-1.8-1-3-3.2-3-6"/>',
  billete:   '<rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.8"/><path d="M6 9.5h.01M18 14.5h.01"/>',
  api:       '<path d="M9 3H5.5A2.5 2.5 0 0 0 3 5.5V9M15 3h3.5A2.5 2.5 0 0 1 21 5.5V9M9 21H5.5A2.5 2.5 0 0 1 3 18.5V15M15 21h3.5a2.5 2.5 0 0 0 2.5-2.5V15"/><path d="M8 12h8M12 8v8"/>',
  mapa:      '<path d="M9 3 3 5.5v15L9 18l6 3 6-2.5v-15L15 6z"/><path d="M9 3v15M15 6v15"/>'
};

/* Devuelve el SVG del icono. tam en px; hereda el color del contenedor. */
function ico(nombre, tam) {
  const d = ICONOS[nombre];
  if (!d) { console.error('Icono inexistente:', nombre); return ''; }
  const s = tam || 20;
  return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
    stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
}

/* ------------------------------------------------------------ Ilustracion */
/* Escenas planas de 240x160 con la paleta de tokens.css. Sustituyen a las
   ilustraciones de la referencia sin imagenes externas. */
const ESCENAS = {
  bienvenida: `
    <circle cx="52" cy="44" r="30" fill="#FFE9E1"/>
    <circle cx="196" cy="118" r="24" fill="#DFF5EA"/>
    <rect x="86" y="20" width="70" height="122" rx="16" fill="#14142B"/>
    <rect x="93" y="27" width="56" height="108" rx="11" fill="#F7F7FC"/>
    <rect x="101" y="44" width="40" height="26" rx="7" fill="#7B61FF"/>
    <rect x="106" y="60" width="14" height="3" rx="1.5" fill="#FFFFFF" opacity=".7"/>
    <rect x="101" y="80" width="40" height="6" rx="3" fill="#D9DBE9"/>
    <rect x="101" y="92" width="26" height="6" rx="3" fill="#D9DBE9"/>
    <circle cx="60" cy="108" r="16" fill="#FFC64D"/>
    <path d="M60 101v14M63.5 104.6c0-1.6-1.6-2.6-3.5-2.6s-3.5 1-3.5 2.6 1.6 2.6 3.5 2.6 3.5 1 3.5 2.6-1.6 2.6-3.5 2.6-3.5-1-3.5-2.6" stroke="#7A5200" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <circle cx="186" cy="42" r="12" fill="#FF7A59"/>
    <path d="M181 42h10M186 37v10" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`,

  identidad: `
    <circle cx="196" cy="36" r="26" fill="#EDE9FE"/>
    <rect x="30" y="38" width="150" height="94" rx="14" fill="#FFFFFF" stroke="#D9DBE9" stroke-width="2"/>
    <circle cx="66" cy="72" r="18" fill="#FFE9E1"/>
    <circle cx="66" cy="66" r="7" fill="#FF7A59"/>
    <path d="M54 86a12 12 0 0 1 24 0z" fill="#FF7A59"/>
    <rect x="94" y="58" width="66" height="7" rx="3.5" fill="#14142B"/>
    <rect x="94" y="72" width="52" height="6" rx="3" fill="#D9DBE9"/>
    <rect x="94" y="85" width="40" height="6" rx="3" fill="#D9DBE9"/>
    <rect x="46" y="104" width="118" height="6" rx="3" fill="#EFF0F6"/>
    <circle cx="166" cy="118" r="22" fill="#34C77B"/>
    <path d="m157 118 6.5 6.5L176 112" stroke="#fff" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,

  dispositivo: `
    <circle cx="46" cy="118" r="26" fill="#FFF3D8"/>
    <rect x="88" y="16" width="64" height="128" rx="15" fill="#14142B"/>
    <rect x="94" y="22" width="52" height="116" rx="10" fill="#FFFFFF"/>
    <circle cx="120" cy="76" r="26" fill="#EDE9FE"/>
    <path d="M113 76.5a7 7 0 0 1 7-7 7 7 0 0 1 7 7" stroke="#6C4FE0" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <rect x="111" y="76" width="18" height="14" rx="3.5" fill="#6C4FE0"/>
    <path d="M46 60c10-14 26-22 44-22M194 100c-10 14-26 22-44 22" stroke="#7B61FF" stroke-width="2.4" stroke-dasharray="5 6" stroke-linecap="round" fill="none"/>
    <circle cx="196" cy="52" r="14" fill="#34C77B"/>
    <path d="m190 52 4 4 8-8" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,

  ahorro: `
    <circle cx="188" cy="46" r="28" fill="#EDE9FE"/>
    <path d="M52 62h136v58a14 14 0 0 1-14 14H66a14 14 0 0 1-14-14z" fill="#7B61FF"/>
    <path d="M52 62h136l-10-16H62z" fill="#4A31B8"/>
    <rect x="96" y="86" width="48" height="34" rx="8" fill="#FFFFFF" opacity=".92"/>
    <path d="M120 92v22M126 97.5c0-2.4-2.7-4-6-4s-6 1.6-6 4 2.7 4 6 4 6 1.6 6 4-2.7 4-6 4-6-1.6-6-4" stroke="#6C4FE0" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <circle cx="70" cy="34" r="15" fill="#FFC64D"/>
    <circle cx="104" cy="24" r="11" fill="#FF7A59"/>
    <circle cx="146" cy="32" r="9" fill="#34C77B"/>`,

  cdt: `
    <circle cx="44" cy="40" r="24" fill="#FFE9E1"/>
    <rect x="46" y="34" width="112" height="106" rx="14" fill="#FFFFFF" stroke="#D9DBE9" stroke-width="2"/>
    <rect x="46" y="34" width="112" height="26" rx="14" fill="#6C4FE0"/>
    <rect x="46" y="50" width="112" height="10" fill="#6C4FE0"/>
    <path d="M70 28v12M134 28v12" stroke="#4A31B8" stroke-width="5" stroke-linecap="round"/>
    <g fill="#EFF0F6"><rect x="60" y="72" width="18" height="14" rx="4"/><rect x="84" y="72" width="18" height="14" rx="4"/><rect x="108" y="72" width="18" height="14" rx="4"/><rect x="60" y="94" width="18" height="14" rx="4"/></g>
    <rect x="84" y="94" width="18" height="14" rx="4" fill="#34C77B"/>
    <rect x="108" y="94" width="18" height="14" rx="4" fill="#EFF0F6"/>
    <rect x="60" y="116" width="66" height="12" rx="6" fill="#EFF0F6"/>
    <path d="M164 122 180 96l8 12 12-24" stroke="#34C77B" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="200" cy="84" r="7" fill="#34C77B"/>`,

  inversion: `
    <circle cx="42" cy="36" r="22" fill="#DFF5EA"/>
    <rect x="36" y="102" width="30" height="42" rx="8" fill="#EDE9FE"/>
    <rect x="80" y="76" width="30" height="68" rx="8" fill="#B9A8FF"/>
    <rect x="124" y="88" width="30" height="56" rx="8" fill="#7B61FF"/>
    <rect x="168" y="46" width="30" height="98" rx="8" fill="#6C4FE0"/>
    <path d="M42 84 96 58l44 16 52-42" stroke="#FF7A59" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="192" cy="32" r="9" fill="#FF7A59"/>
    <circle cx="96" cy="58" r="6" fill="#FFFFFF" stroke="#FF7A59" stroke-width="3"/>`,

  prestamo: `
    <circle cx="192" cy="122" r="26" fill="#FFF3D8"/>
    <rect x="46" y="20" width="106" height="122" rx="13" fill="#FFFFFF" stroke="#D9DBE9" stroke-width="2"/>
    <rect x="64" y="40" width="70" height="8" rx="4" fill="#14142B"/>
    <rect x="64" y="58" width="54" height="6" rx="3" fill="#D9DBE9"/>
    <rect x="64" y="72" width="62" height="6" rx="3" fill="#D9DBE9"/>
    <rect x="64" y="94" width="70" height="30" rx="8" fill="#EDE9FE"/>
    <path d="M99 100v18M105 105c0-2-2.7-3.4-6-3.4s-6 1.4-6 3.4 2.7 3.4 6 3.4 6 1.4 6 3.4-2.7 3.4-6 3.4-6-1.4-6-3.4" stroke="#6C4FE0" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <rect x="140" y="72" width="72" height="46" rx="10" fill="#34C77B" transform="rotate(-10 176 95)"/>
    <circle cx="176" cy="93" r="12" fill="#DFF5EA" transform="rotate(-10 176 93)"/>`,

  tarjeta: `
    <circle cx="46" cy="34" r="24" fill="#FFE9E1"/>
    <rect x="34" y="58" width="132" height="82" rx="14" fill="#FFC64D" transform="rotate(-8 100 99)"/>
    <rect x="62" y="42" width="132" height="82" rx="14" fill="#6C4FE0"/>
    <rect x="76" y="58" width="30" height="20" rx="5" fill="#FFC64D"/>
    <rect x="76" y="94" width="76" height="6" rx="3" fill="#FFFFFF" opacity=".65"/>
    <rect x="76" y="106" width="42" height="6" rx="3" fill="#FFFFFF" opacity=".4"/>
    <circle cx="166" cy="70" r="11" fill="#FF7A59"/>
    <circle cx="152" cy="70" r="11" fill="#FFFFFF" opacity=".55"/>`,

  divisas: `
    <circle cx="196" cy="120" r="24" fill="#EDE9FE"/>
    <circle cx="74" cy="60" r="34" fill="#FFC64D"/>
    <path d="M74 44v32M81 50c0-3.4-3.2-5.6-7-5.6s-7 2.2-7 5.6 3.2 5.6 7 5.6 7 2.2 7 5.6-3.2 5.6-7 5.6-7-2.2-7-5.6" stroke="#7A5200" stroke-width="2.8" fill="none" stroke-linecap="round"/>
    <circle cx="160" cy="102" r="34" fill="#34C77B"/>
    <path d="M160 86v32M167 92c0-3.4-3.2-5.6-7-5.6s-7 2.2-7 5.6 3.2 5.6 7 5.6 7 2.2 7 5.6-3.2 5.6-7 5.6-7-2.2-7-5.6" stroke="#0F6B41" stroke-width="2.8" fill="none" stroke-linecap="round"/>
    <path d="M112 46c18-6 34 2 40 18" stroke="#7B61FF" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M152 64l4-14 12 8z" fill="#7B61FF"/>
    <path d="M122 118c-18 6-34-2-40-18" stroke="#FF7A59" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M82 100l-4 14-12-8z" fill="#FF7A59"/>`,

  seguridad: `
    <circle cx="46" cy="118" r="24" fill="#EDE9FE"/>
    <circle cx="196" cy="40" r="20" fill="#DFF5EA"/>
    <path d="M120 16 62 40v40c0 34 24 58 58 66 34-8 58-32 58-66V40z" fill="#6C4FE0"/>
    <rect x="100" y="76" width="40" height="32" rx="8" fill="#FFFFFF"/>
    <path d="M108 76v-8a12 12 0 0 1 24 0v8" stroke="#FFFFFF" stroke-width="5" fill="none" stroke-linecap="round"/>
    <circle cx="120" cy="90" r="5" fill="#6C4FE0"/>
    <path d="M120 93v7" stroke="#6C4FE0" stroke-width="3.4" stroke-linecap="round"/>`,

  pagos: `
    <circle cx="190" cy="42" r="24" fill="#FFF3D8"/>
    <path d="M56 22h108v112l-13.5-9-13.5 9-13.5-9-13.5 9-13.5-9-13.5 9-13.5-9-13.5 9z" fill="#FFFFFF" stroke="#D9DBE9" stroke-width="2"/>
    <rect x="74" y="42" width="72" height="8" rx="4" fill="#14142B"/>
    <rect x="74" y="62" width="50" height="6" rx="3" fill="#D9DBE9"/>
    <rect x="74" y="76" width="62" height="6" rx="3" fill="#D9DBE9"/>
    <rect x="74" y="96" width="40" height="10" rx="5" fill="#FFC64D"/>
    <circle cx="170" cy="104" r="24" fill="#FFC64D"/>
    <path d="M172 92 160 108h9l-1.5 12 12-16h-9z" fill="#FFFFFF"/>`,

  transferir: `
    <circle cx="120" cy="30" r="20" fill="#EDE9FE"/>
    <circle cx="52" cy="96" r="30" fill="#7B61FF"/>
    <circle cx="52" cy="88" r="11" fill="#FFFFFF"/>
    <path d="M34 112a18 18 0 0 1 36 0z" fill="#FFFFFF"/>
    <circle cx="188" cy="96" r="30" fill="#FF7A59"/>
    <circle cx="188" cy="88" r="11" fill="#FFFFFF"/>
    <path d="M170 112a18 18 0 0 1 36 0z" fill="#FFFFFF"/>
    <path d="M92 88h50" stroke="#14142B" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M136 78l14 10-14 10z" fill="#14142B"/>
    <circle cx="120" cy="132" r="8" fill="#34C77B"/>`,

  retiro: `
    <circle cx="46" cy="40" r="22" fill="#FFE9E1"/>
    <rect x="62" y="18" width="116" height="90" rx="14" fill="#14142B"/>
    <rect x="74" y="30" width="92" height="44" rx="8" fill="#7B61FF"/>
    <rect x="86" y="44" width="44" height="6" rx="3" fill="#FFFFFF" opacity=".7"/>
    <rect x="86" y="56" width="26" height="6" rx="3" fill="#FFFFFF" opacity=".45"/>
    <rect x="88" y="84" width="64" height="10" rx="5" fill="#4E4B66"/>
    <rect x="76" y="112" width="112" height="30" rx="8" fill="#34C77B" transform="rotate(6 132 127)"/>
    <rect x="60" y="106" width="112" height="30" rx="8" fill="#4FDC97"/>
    <circle cx="116" cy="121" r="9" fill="#DFF5EA"/>`,

  exito: `
    <circle cx="120" cy="80" r="52" fill="#DFF5EA"/>
    <circle cx="120" cy="80" r="36" fill="#34C77B"/>
    <path d="m104 80 11 11 22-24" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="46" cy="40" r="7" fill="#FFC64D"/>
    <circle cx="196" cy="52" r="9" fill="#7B61FF"/>
    <circle cx="184" cy="126" r="6" fill="#FF7A59"/>
    <circle cx="56" cy="124" r="8" fill="#B9A8FF"/>
    <path d="M30 84h10M204 92h10" stroke="#D9DBE9" stroke-width="4" stroke-linecap="round"/>`,

  perfilRiesgo: `
    <circle cx="52" cy="42" r="24" fill="#FFF3D8"/>
    <path d="M40 128a80 80 0 0 1 160 0z" fill="#EFF0F6"/>
    <path d="M40 128a80 80 0 0 1 23.4-56.6l56.6 56.6z" fill="#34C77B"/>
    <path d="M63.4 71.4A80 80 0 0 1 120 48v80z" fill="#FFC64D"/>
    <path d="M120 48a80 80 0 0 1 56.6 23.4L120 128z" fill="#FF7A59"/>
    <circle cx="120" cy="128" r="12" fill="#14142B"/>
    <path d="M120 128 168 74" stroke="#14142B" stroke-width="7" stroke-linecap="round"/>`
};

function escena(nombre) {
  const s = ESCENAS[nombre];
  if (!s) { console.error('Escena inexistente:', nombre); return ''; }
  return `<svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${s}</svg>`;
}

/* -------------------------------------------------------- Bloques (piezas) */
/* Devuelven HTML de COMPONENTES, no de layout. Los usan las pantallas. */

function bloqueIlustracion(nombreEscena, texto, fondo) {
  return `
    <figure class="bloque bloque--figura">
      <div class="ilustracion ilustracion--${fondo || 'lila'}">${escena(nombreEscena)}</div>
      ${texto ? `<figcaption class="menor apagado centrado" style="margin-top:var(--e-4)">${texto}</figcaption>` : ''}
    </figure>`;
}

function campo(id, etiqueta, valor, pista, iconoNombre) {
  return `
    <label class="campo">
      <span class="campo__etiqueta">${etiqueta}</span>
      <span class="campo__caja">
        ${iconoNombre ? `<span class="tenue">${ico(iconoNombre, 18)}</span>` : ''}
        <input id="${id}" value="${valor || ''}" placeholder="${pista || ''}">
      </span>
    </label>`;
}

function campoMonto(id, etiqueta, valor, pista) {
  return `
    <label class="campo campo--monto">
      <span class="campo__etiqueta">${etiqueta}</span>
      <span class="campo__caja">
        <span class="campo__moneda">$</span>
        <input id="${id}" value="${valor.toLocaleString('es-CO')}" inputmode="numeric">
      </span>
      ${pista ? `<span class="campo__pista">${pista}</span>` : ''}
    </label>`;
}

/* opciones: [{t:'180 dias', s:'11,25 % E.A.'}] — activa la de indice activo. */
function campoOpciones(etiqueta, opciones, activo) {
  const items = opciones.map((o, i) => `
    <button class="opcion" aria-selected="${i === activo}" onclick="elegir(this)">
      ${o.t}${o.s ? `<span class="opcion__sub">${o.s}</span>` : ''}
    </button>`).join('');
  return `
    <div class="campo">
      <span class="campo__etiqueta">${etiqueta}</span>
      <div class="opciones">${items}</div>
    </div>`;
}

function casilla(texto, marcada) {
  return `
    <div class="casilla" role="checkbox" aria-checked="${!!marcada}" tabindex="0" onclick="marcar(this)">
      <span class="casilla__marca">${ico('cheque', 14)}</span>
      <span class="menor apagado">${texto}</span>
    </div>`;
}

function item(iconoNombre, tono, titulo, sub, valor, accion) {
  const et = accion ? 'button' : 'div';
  return `
    <${et} class="lista__item" ${accion ? `onclick="${accion}"` : ''}>
      <span class="lista__icono tono--${tono}">${ico(iconoNombre, 19)}</span>
      <span class="lista__cuerpo">
        <span class="lista__titulo">${titulo}</span>
        ${sub ? `<span class="lista__sub">${sub}</span>` : ''}
      </span>
      ${valor ? `<span class="lista__valor">${valor}</span>` : `<span class="tenue">${ico('flecha', 16)}</span>`}
    </${et}>`;
}

function tarjetaProducto(p) {
  return `
    <article class="producto producto--${p.tono}">
      <div>
        <div class="producto__etiqueta">${p.tipo}</div>
        <div class="producto__saldo">${pesos(p.saldo)}</div>
      </div>
      <div class="producto__pie">
        <span class="producto__numero">${p.numero}</span>
        <span class="menor" style="opacity:.8">${p.detalle || 'Disponible'}</span>
      </div>
    </article>`;
}

function aviso(tipo, iconoNombre, texto) {
  return `<div class="aviso aviso--${tipo}"><span class="aviso__icono">${ico(iconoNombre, 18)}</span><span>${texto}</span></div>`;
}

/* Llamada a un actor externo del § 3.3. Es lo que en el diagrama de casos de
   uso es una asociacion rotulada API hacia un actor fuera de la frontera. */
function llamadaExterna(actor, texto) {
  return `
    <div class="aviso aviso--api">
      <span class="aviso__icono">${ico('api', 18)}</span>
      <span><span class="etiqueta etiqueta--externo">API</span>
      <strong>${ACTORES_EXTERNOS[actor]}</strong><br>${texto}</span>
    </div>`;
}

function acciones(botones) {
  return `<div class="bloque bloque--acciones acciones">${botones.map(b => `
    <button class="boton boton--${b.estilo || 'principal'}" onclick="${b.accion}">
      ${b.texto}${b.estilo === 'principal' || !b.estilo ? `<span class="boton__flecha">${ico('flecha', 17)}</span>` : ''}
    </button>`).join('')}</div>`;
}

function pasos(total, actual) {
  let h = '';
  for (let i = 0; i < total; i++) {
    h += `<span class="paso ${i < actual ? 'paso--hecho' : (i === actual ? 'paso--activo' : '')}"></span>`;
  }
  return `<div class="bloque bloque--pasos"><div class="pasos">${h}</div></div>`;
}

function seccion(titulo, contenido, accion) {
  return `
    <section class="bloque bloque--seccion">
      <div class="tarjeta__cabecera">
        <h3 class="seccion">${titulo}</h3>
        ${accion ? `<button class="menor acento fuerte" onclick="${accion.hacer}">${accion.texto}</button>` : ''}
      </div>
      ${contenido}
    </section>`;
}

function teclado(destino) {
  const t = ['1','2','3','4','5','6','7','8','9','','0','borrar'];
  return `<div class="bloque bloque--teclado"><div class="teclado">${t.map(k => {
    if (k === '') return '<span></span>';
    if (k === 'borrar') return `<button class="tecla" onclick="borrarDigito('${destino}')">${ico('atras', 20)}</button>`;
    return `<button class="tecla" onclick="teclear('${destino}','${k}')">${k}</button>`;
  }).join('')}</div></div>`;
}

/* ========================================================================== */
/*                          EL REGISTRO DE PANTALLAS                          */
/* ========================================================================== */

const PANTALLAS = {

  /* ------------------------------------------- VINCULACION (familia CU1) -- */

  // Puerta de entrada del canal. No es un caso de uso: es la capa de UX.
  'bienvenida': {
    titulo: 'Banca Digital', caso: null, ruta: 'www.bancodigital.com.co',
    capa: 'ux', entidad: null, externo: null, nav: false, portada: true,
    render() {
      return `
        ${bloqueIlustracion('bienvenida', null, 'hueso')}
        <div class="bloque bloque--texto">
          <h1 class="display">Tu banco,<br>donde estes</h1>
          <p class="cuerpo apagado" style="margin-top:var(--e-3)">
            Abre productos, invierte y transa desde cualquier lugar y en cualquier
            momento. Once operaciones bancarias en un solo lugar.
          </p>
        </div>
        ${acciones([
          { texto: 'Crear mi cuenta', accion: "ir('registro')" },
          { texto: 'Ya soy cliente', estilo: 'fantasma', accion: "ir('ingresar')" }
        ])}`;
    }
  },

  'ingresar': {
    titulo: 'Iniciar sesion', caso: null, ruta: 'www.bancodigital.com.co/ingreso',
    capa: 'ciber', entidad: null, externo: null, nav: false,
    render() {
      return `
        ${bloqueIlustracion('seguridad', null, 'lila')}
        <div class="bloque bloque--texto">
          <h1 class="titulo">Hola de nuevo</h1>
          <p class="menor apagado" style="margin-top:6px">Entra con tu documento y tu clave.</p>
        </div>
        <div class="bloque bloque--formulario">
          ${campo('doc', 'Documento', DATOS.cliente.documento, '', 'usuario')}
          ${campo('clave', 'Clave', '••••••••', '', 'candado')}
        </div>
        <div class="bloque bloque--centro">
          <button class="fila" style="gap:var(--e-2);color:var(--morado-600)" onclick="ir('inicio')">
            ${ico('huella', 22)}<span class="menor fuerte">Entrar con biometria</span>
          </button>
        </div>
        ${acciones([{ texto: 'Entrar', accion: "ir('inicio')" }])}`;
    }
  },

  // CU1 — "un cliente... pueda acceder a operaciones bancarias, mediante una
  // plataforma digital". Entidad cliente (CRUD).
  'registro': {
    titulo: 'Crear mi cuenta', caso: 'CU1', ruta: 'www.bancodigital.com.co/registro',
    capa: 'logica', entidad: 'cliente (CRUD)', externo: null, nav: false,
    render() {
      return `
        ${pasos(4, 0)}
        <div class="bloque bloque--texto">
          <h1 class="titulo">Tus datos</h1>
          <p class="menor apagado" style="margin-top:6px">Solo pedimos lo que la vinculacion exige.</p>
        </div>
        <div class="bloque bloque--formulario">
          ${campo('nombre', 'Nombre completo', DATOS.cliente.nombre, '', 'usuario')}
          ${campo('documento', 'Documento de identidad', DATOS.cliente.documento, '', 'documento')}
          ${campo('correo', 'Correo electronico', DATOS.cliente.correo, '', 'sobre')}
          ${campo('celular', 'Celular', DATOS.cliente.celular, '', 'telefono')}
          ${campo('ciudad', 'Ciudad', DATOS.cliente.ciudad, '', 'ubicacion')}
        </div>
        <div class="bloque bloque--nota">
          ${casilla('Autorizo el tratamiento de mis datos personales conforme a la Ley 1581 de 2012 (Habeas Data).', true)}
        </div>
        ${acciones([{ texto: 'Continuar', accion: "ir('validar-identidad')" }])}`;
    }
  },

  // CU1 «include» — obligatorio: sin identidad validada no hay vinculacion.
  // Invoca al actor externo Servicio de validacion de identidad (§ 3.3).
  'validar-identidad': {
    titulo: 'Validar identidad', caso: 'CU1.1 «include»', ruta: 'www.bancodigital.com.co/registro/identidad',
    capa: 'ciber', entidad: 'verificacion_identidad (C)', externo: 'identidad', nav: false,
    render() {
      return `
        ${pasos(4, 1)}
        ${bloqueIlustracion('identidad', null, 'lila')}
        <div class="bloque bloque--texto">
          <h1 class="titulo">Validemos que eres tu</h1>
          <p class="menor apagado" style="margin-top:6px">
            Toma una foto de tu documento y una selfie. La verificacion es obligatoria.
          </p>
        </div>
        <div class="bloque bloque--lista">
          <div class="lista">
            ${item('documento', 'morado', 'Cedula por ambas caras', 'Capturada correctamente', `<span class="positivo">${ico('cheque', 18)}</span>`)}
            ${item('camara', 'naranja', 'Selfie con prueba de vida', 'Capturada correctamente', `<span class="positivo">${ico('cheque', 18)}</span>`)}
          </div>
        </div>
        <div class="bloque bloque--nota">
          ${llamadaExterna('identidad', 'La verificacion biometrica y documental la presta un tercero: la plataforma la consume, no la implementa.')}
        </div>
        ${acciones([{ texto: 'Verificar identidad', accion: "ir('vincular-dispositivo')" }])}`;
    }
  },

  // CU1 «extend» — OPCIONAL: el cliente puede vincular el dispositivo despues.
  // El prototipo demuestra el estereotipo dejando saltar el paso.
  'vincular-dispositivo': {
    titulo: 'Vincular dispositivo', caso: 'CU1.2 «extend»', ruta: 'www.bancodigital.com.co/registro/dispositivo',
    capa: 'ciber', entidad: 'dispositivo (CRUD)', externo: null, nav: false,
    render() {
      return `
        ${pasos(4, 2)}
        ${bloqueIlustracion('dispositivo', null, 'hueso')}
        <div class="bloque bloque--texto">
          <h1 class="titulo">Vincula este dispositivo</h1>
          <p class="menor apagado" style="margin-top:6px">
            Quedara como dispositivo de confianza para autorizar tus operaciones.
          </p>
        </div>
        <div class="bloque bloque--lista">
          <div class="tarjeta tarjeta--contorno">
            <div class="fila">
              <span class="lista__icono tono--morado">${ico('telefono', 19)}</span>
              <span class="crece">
                <div class="lista__titulo">${DATOS.cliente.dispositivo}</div>
                <div class="lista__sub">Este dispositivo</div>
              </span>
              <span class="etiqueta etiqueta--extend">Opcional</span>
            </div>
          </div>
        </div>
        <div class="bloque bloque--nota">
          ${aviso('ojo', 'alerta', '<strong>Paso opcional.</strong> Es un <em>extend</em>: el registro termina sin el, y el dispositivo se puede vincular mas tarde desde tu perfil.')}
        </div>
        ${acciones([
          { texto: 'Vincular', accion: "ir('codigo-verificacion')" },
          { texto: 'Ahora no', estilo: 'fantasma', accion: "ir('codigo-verificacion')" }
        ])}`;
    }
  },

  'codigo-verificacion': {
    titulo: 'Codigo de verificacion', caso: null, ruta: 'www.bancodigital.com.co/registro/codigo',
    capa: 'ciber', entidad: null, externo: null, nav: false,
    render() {
      return `
        ${pasos(4, 3)}
        <div class="bloque bloque--texto">
          <h1 class="titulo">Escribe el codigo</h1>
          <p class="menor apagado" style="margin-top:6px">
            Lo enviamos por SMS a ${DATOS.cliente.celular}.
          </p>
        </div>
        <div class="bloque bloque--codigo">
          <div class="puntos" id="otp-registro">
            <span class="punto punto--lleno">4</span>
            <span class="punto punto--lleno">7</span>
            <span class="punto punto--lleno">1</span>
            <span class="punto"></span>
          </div>
        </div>
        ${teclado('otp-registro')}
        <div class="bloque bloque--centro">
          <button class="menor acento fuerte">Reenviar codigo en 00:24</button>
        </div>
        ${acciones([{ texto: 'Confirmar', accion: "ir('inicio')" }])}`;
    }
  },

  /* ---------------------------------------------------- RAICES DEL CANAL -- */

  'inicio': {
    titulo: 'Inicio', caso: null, ruta: 'www.bancodigital.com.co/inicio',
    capa: 'ux', entidad: null, externo: null, nav: true, icono: 'casa',
    render() {
      const ahorro = DATOS.productos[0];
      const accesos = [
        { i: 'enviar',    t: 'Transferir',   n: 'morado',   p: 'transferir' },
        { i: 'rayo',      t: 'Pagar',        n: 'amarillo', p: 'pagar-servicio' },
        { i: 'retiro',    t: 'Retirar',      n: 'naranja',  p: 'retirar' },
        { i: 'divisa',    t: 'Divisas',      n: 'menta',    p: 'comprar-divisa' },
        { i: 'cartera',   t: 'Ahorro',       n: 'morado',   p: 'abrir-ahorro' },
        { i: 'candado',   t: 'CDT',          n: 'azul',     p: 'abrir-cdt' },
        { i: 'barras',    t: 'Inversion',    n: 'menta',    p: 'abrir-inversion' },
        { i: 'billete',   t: 'Prestamo',     n: 'rosa',     p: 'solicitar-prestamo' }
      ];
      return `
        <div class="bloque bloque--saludo">
          <p class="menor apagado">Buenos dias,</p>
          <h1 class="titulo">${DATOS.cliente.nombre.split(' ')[0]}</h1>
        </div>
        <div class="bloque bloque--destacado">
          ${tarjetaProducto(ahorro)}
        </div>
        <div class="bloque bloque--accesos">
          <div class="chips">
            ${accesos.map(a => `
              <button class="chip" onclick="ir('${a.p}')">
                <span class="chip__icono tono--${a.n}">${ico(a.i, 21)}</span>
                <span class="chip__texto">${a.t}</span>
              </button>`).join('')}
          </div>
        </div>
        ${seccion('Movimientos recientes', `
          <div class="lista">
            ${DATOS.movimientos.slice(0, 4).map(m => item(
              m.icono, m.tono, m.concepto, m.fecha + ' · ' + m.canal,
              `<span class="${m.valor > 0 ? 'positivo' : ''}">${pesos(m.valor, true)}</span>`
            )).join('')}
          </div>`, { texto: 'Ver todo', hacer: "ir('movimientos')" })}
        ${seccion('Te falta abrir', `
          <div class="lista">
            ${item('billete', 'rosa', 'Tarjeta de credito', 'Cupo preaprobado segun tu perfil', null, "ir('solicitar-tarjeta')")}
            ${item('barras', 'menta', 'Inversion', 'Define tu perfil y empieza', null, "ir('abrir-inversion')")}
          </div>`)}`;
    }
  },

  'productos': {
    titulo: 'Mis productos', caso: null, ruta: 'www.bancodigital.com.co/productos',
    capa: 'ux', entidad: null, externo: null, nav: true, icono: 'cartera',
    render() {
      const abiertos = DATOS.productos.filter(p => p.abierto);
      return `
        <div class="bloque bloque--texto">
          <h1 class="titulo">Mis productos</h1>
          <p class="menor apagado" style="margin-top:6px">Captacion, colocacion y divisas en un solo lugar.</p>
        </div>
        <div class="bloque bloque--rejilla">
          ${abiertos.map(tarjetaProducto).join('')}
        </div>
        ${seccion('Captacion', `
          <div class="lista">
            ${item('cartera', 'morado', 'Abrir cuenta de ahorro', 'CU2 · sin cuota de manejo', null, "ir('abrir-ahorro')")}
            ${item('candado', 'azul', 'Abrir deposito a termino fijo', 'CU3 · desde 11,25 % E.A.', null, "ir('abrir-cdt')")}
            ${item('barras', 'menta', 'Abrir inversion', 'CU4 · segun tu perfil de riesgo', null, "ir('abrir-inversion')")}
          </div>`)}
        ${seccion('Colocacion', `
          <div class="lista">
            ${item('billete', 'rosa', 'Solicitar prestamo', 'CU5 · respuesta en minutos', null, "ir('solicitar-prestamo')")}
            ${item('cartera', 'naranja', 'Solicitar tarjeta de credito', 'CU6 · cupo segun tu historial', null, "ir('solicitar-tarjeta')")}
          </div>`)}
        ${seccion('Divisas digitales', `
          <div class="lista">
            ${item('divisa', 'menta', 'Comprar divisa digital', 'CU7 · tasa del mercado', null, "ir('comprar-divisa')")}
            ${item('divisa', 'amarillo', 'Vender divisa digital', 'CU8 · liquidacion inmediata', null, "ir('vender-divisa')")}
          </div>`)}`;
    }
  },

  'movimientos': {
    titulo: 'Movimientos', caso: null, ruta: 'www.bancodigital.com.co/movimientos',
    capa: 'datos', entidad: 'movimiento (R)', externo: null, nav: true, icono: 'lista',
    render() {
      return `
        <div class="bloque bloque--texto">
          <h1 class="titulo">Movimientos</h1>
          <p class="menor apagado" style="margin-top:6px">
            Cada movimiento guarda el canal desde el que se hizo: app-phone, app-web o app-pda.
          </p>
        </div>
        <div class="bloque bloque--formulario">
          ${campo('buscar-mov', 'Buscar', '', 'Concepto, valor o fecha', 'buscar')}
        </div>
        ${seccion('Septiembre de 2026', `
          <div class="lista">
            ${DATOS.movimientos.map(m => item(
              m.icono, m.tono, m.concepto, m.fecha + ' · ' + m.canal,
              `<span class="${m.valor > 0 ? 'positivo' : ''}">${pesos(m.valor, true)}</span>`
            )).join('')}
          </div>`)}
        <div class="bloque bloque--nota">
          ${aviso('info', 'nube', 'La consulta se sirve del <strong>almacenamiento intermedio</strong> de la capa de datos: es la que sostiene la latencia con 100.000 clientes proyectados a 2028.')}
        </div>`;
    }
  },

  'perfil': {
    titulo: 'Mi perfil', caso: null, ruta: 'www.bancodigital.com.co/perfil',
    capa: 'privacidad', entidad: 'cliente (R)', externo: null, nav: true, icono: 'usuario',
    render() {
      const c = DATOS.cliente;
      return `
        <div class="bloque bloque--perfil">
          <div class="tarjeta">
            <div class="fila">
              <span class="cabecera__avatar" style="width:56px;height:56px;border-radius:19px;font-size:17px">${c.iniciales}</span>
              <span class="crece">
                <div class="seccion">${c.nombre}</div>
                <div class="lista__sub">${c.documento} · cliente desde ${c.cliente_desde}</div>
              </span>
            </div>
          </div>
        </div>
        ${seccion('Seguridad', `
          <div class="lista">
            ${item('huella', 'morado', 'Biometria y clave', 'Activas', null, "ir('inicio')")}
            ${item('escudo', 'menta', 'Doble factor de autenticacion', 'Obligatorio en operaciones que mueven dinero', null, "ir('doble-factor')")}
            ${item('telefono', 'azul', 'Dispositivos vinculados', c.dispositivo, null, "ir('vincular-dispositivo')")}
          </div>`)}
        ${seccion('Privacidad y datos', `
          <div class="lista">
            ${item('documento', 'naranja', 'Tratamiento de datos personales', 'Ley 1581 de 2012 - Habeas Data', null, "ir('perfil')")}
            ${item('ojo', 'amarillo', 'Quien consulta mis datos', 'Trazabilidad de accesos', null, "ir('perfil')")}
          </div>`)}
        <div class="bloque bloque--nota">
          ${aviso('info', 'escudo', 'Esta pantalla es la cara visible de la <strong>vertical de privacidad y proteccion de datos</strong> de la arquitectura: consentimiento, trazabilidad y ciclo de vida del dato.')}
        </div>`;
    }
  },

  /* ------------------------------------------------- CAPTACION (CU2-CU4) -- */

  // CU2 — "abrir una cuenta ahorro".
  'abrir-ahorro': {
    titulo: 'Cuenta de ahorro', caso: 'CU2', ruta: 'www.bancodigital.com.co/ahorro',
    capa: 'logica', entidad: 'cuenta_de_ahorro (C)', externo: null, nav: false,
    render() {
      return `
        ${bloqueIlustracion('ahorro', null, 'lila')}
        <div class="bloque bloque--texto">
          <h1 class="titulo">Abre tu cuenta de ahorro</h1>
          <p class="menor apagado" style="margin-top:6px">Sin cuota de manejo y con retiros ilimitados.</p>
        </div>
        <div class="bloque bloque--formulario">
          ${campoOpciones('Tipo de cuenta', [
            { t: 'Ahorro', s: 'Uso diario' },
            { t: 'Ahorro meta', s: 'Con proposito' }
          ], 0)}
          ${campoMonto('deposito', 'Deposito inicial (opcional)', 200000, 'Puedes abrirla en cero.')}
        </div>
        <div class="bloque bloque--lista">
          <div class="tarjeta tarjeta--plana">
            <div class="lista">
              ${item('cheque', 'menta', 'Sin cuota de manejo', null, '')}
              ${item('cheque', 'menta', 'Retiros y transferencias ilimitados', null, '')}
              ${item('cheque', 'menta', 'Cobertura del seguro de depositos', null, '')}
            </div>
          </div>
        </div>
        ${acciones([{ texto: 'Continuar', accion: "irConFlujo('aceptar-terminos', { producto: 'Cuenta de ahorro', origen: 'abrir-ahorro', entidad: 'cuenta_de_ahorro', resumen: [['Producto','Cuenta de ahorro'],['Deposito inicial','$200.000'],['Cuota de manejo','$0']] })" }])}`;
    }
  },

  // Secundario «include» COMPARTIDO por los cinco productos (§ 3.5): ningun
  // producto financiero se abre sin aceptacion de condiciones. Es el ejemplo
  // de por que include factoriza en vez de repetir.
  'aceptar-terminos': {
    titulo: 'Terminos del producto', caso: 'Secundario «include»', ruta: 'www.bancodigital.com.co/contratos',
    capa: 'logica', entidad: 'contrato (C)', externo: null, nav: false,
    render() {
      const f = estado.flujo;
      return `
        <div class="bloque bloque--texto">
          <h1 class="titulo">Terminos de ${f.producto || 'tu producto'}</h1>
          <p class="menor apagado" style="margin-top:6px">
            Lee y acepta antes de continuar. Este paso es obligatorio.
          </p>
        </div>
        <div class="bloque bloque--contrato">
          <div class="tarjeta tarjeta--contorno scroll" style="max-height:190px">
            <p class="menor apagado">
              <strong>1. Objeto.</strong> El presente contrato regula la apertura y el uso de
              ${f.producto || 'el producto'} en la plataforma de banca digital.<br><br>
              <strong>2. Condiciones economicas.</strong> Las tasas, plazos y comisiones aplicables
              son las informadas en la pantalla anterior y hacen parte integral de este documento.<br><br>
              <strong>3. Tratamiento de datos.</strong> El titular autoriza el tratamiento de sus
              datos personales conforme a la Ley 1581 de 2012 y a la politica de privacidad de la
              entidad, vigilada por la Superintendencia Financiera de Colombia.<br><br>
              <strong>4. Seguridad.</strong> Las operaciones que mueven dinero exigen doble factor
              de autenticacion. El titular es responsable de custodiar sus credenciales.<br><br>
              <strong>5. Continuidad.</strong> La entidad garantiza la disponibilidad del servicio
              7x24, salvo las ventanas de mantenimiento informadas con antelacion.
            </p>
          </div>
        </div>
        <div class="bloque bloque--nota">
          ${casilla('He leido y acepto los terminos y condiciones del producto y el reglamento aplicable.', true)}
        </div>
        <div class="bloque bloque--nota">
          ${aviso('info', 'documento', 'Este paso persiste la entidad <strong>contrato</strong> y cuelga por <em>include</em> de los cinco productos: no se repite en cada uno, se reutiliza.')}
        </div>
        ${acciones([{ texto: 'Aceptar y abrir', accion: "confirmarApertura()" }])}`;
    }
  },

  // CU3 — "abrir deposito a termino fijo -CDT-".
  'abrir-cdt': {
    titulo: 'Deposito a termino', caso: 'CU3', ruta: 'www.bancodigital.com.co/cdt',
    capa: 'logica', entidad: 'deposito_a_termino (C)', externo: null, nav: false,
    render() {
      return `
        ${bloqueIlustracion('cdt', null, 'hueso')}
        <div class="bloque bloque--texto">
          <h1 class="titulo">Deposito a termino fijo</h1>
          <p class="menor apagado" style="margin-top:6px">
            Un CDT se define por su plazo y su tasa, y se pactan antes de abrirlo.
          </p>
        </div>
        <div class="bloque bloque--formulario">
          ${campoMonto('monto-cdt', 'Monto a constituir', 12000000, 'Desde $500.000')}
          ${campoOpciones('Plazo', [
            { t: '90 dias', s: '10,40 % E.A.' },
            { t: '180 dias', s: '11,25 % E.A.' },
            { t: '360 dias', s: '12,10 % E.A.' }
          ], 1)}
        </div>
        <div class="bloque bloque--nota">
          ${aviso('info', 'calculadora', 'Antes de abrirlo tienes que <strong>simular el rendimiento</strong>: es un paso obligatorio del producto, no una ayuda opcional.')}
        </div>
        ${acciones([{ texto: 'Simular el rendimiento', accion: "ir('simular-rendimiento')" }])}`;
    }
  },

  // CU3 «include» — un deposito A TERMINO se define por plazo y tasa: se pacta
  // ANTES de abrirlo, por eso es obligatorio y no extend.
  'simular-rendimiento': {
    titulo: 'Simulacion del CDT', caso: 'CU3.1 «include»', ruta: 'www.bancodigital.com.co/cdt/simulacion',
    capa: 'logica', entidad: null, externo: null, nav: false,
    render() {
      return `
        <div class="bloque bloque--texto">
          <h1 class="titulo">Asi rinde tu deposito</h1>
          <span class="etiqueta etiqueta--include" style="margin-top:var(--e-3)">${ico('cheque', 13)} include - paso obligatorio</span>
        </div>
        <div class="bloque bloque--destacado">
          <div class="producto producto--noche">
            <div>
              <div class="producto__etiqueta">Recibiras al vencimiento</div>
              <div class="producto__saldo">$12.664.000</div>
            </div>
            <div class="producto__pie">
              <span class="producto__numero">180 dias · 11,25 % E.A.</span>
              <span class="menor" style="opacity:.85">Rendimiento $664.000</span>
            </div>
          </div>
        </div>
        <div class="bloque bloque--lista">
          <div class="tarjeta">
            <div class="comprobante__filas">
              <div class="comprobante__fila"><span>Capital</span><span>$12.000.000</span></div>
              <div class="comprobante__fila"><span>Plazo pactado</span><span>180 dias</span></div>
              <div class="comprobante__fila"><span>Tasa efectiva anual</span><span>11,25 %</span></div>
              <div class="comprobante__fila"><span>Rendimiento bruto</span><span>$664.000</span></div>
              <div class="comprobante__fila"><span>Retencion en la fuente (4 %)</span><span>-$26.560</span></div>
              <div class="comprobante__fila"><span>Fecha de vencimiento</span><span>2 de marzo de 2027</span></div>
            </div>
          </div>
        </div>
        ${acciones([{ texto: 'Continuar', accion: "irConFlujo('aceptar-terminos', { producto: 'Deposito a termino fijo', origen: 'abrir-cdt', entidad: 'deposito_a_termino', resumen: [['Producto','CDT 180 dias'],['Capital','$12.000.000'],['Tasa','11,25 % E.A.'],['Vence','2 de marzo de 2027']] })" }])}`;
    }
  },

  // CU4 — "abrir una inversion".
  'abrir-inversion': {
    titulo: 'Inversion', caso: 'CU4', ruta: 'www.bancodigital.com.co/inversion',
    capa: 'logica', entidad: 'inversion (C)', externo: null, nav: false,
    render() {
      return `
        ${bloqueIlustracion('inversion', null, 'menta')}
        <div class="bloque bloque--texto">
          <h1 class="titulo">Empieza a invertir</h1>
          <p class="menor apagado" style="margin-top:6px">
            Antes de abrir la inversion hay que conocer tu perfil de riesgo.
          </p>
        </div>
        <div class="bloque bloque--formulario">
          ${campoMonto('monto-inv', 'Monto a invertir', 5000000, 'Desde $100.000')}
          ${campoOpciones('Aporte', [{ t: 'Unico' }, { t: 'Mensual' }], 0)}
        </div>
        <div class="bloque bloque--nota">
          ${aviso('ojo', 'alerta', 'No se abre una inversion sin <strong>perfil de riesgo</strong> del inversionista: es requisito del producto.')}
        </div>
        ${acciones([{ texto: 'Definir mi perfil', accion: "ir('perfil-inversion')" }])}`;
    }
  },

  // CU4 «include» — no se abre una inversion sin perfil de riesgo.
  'perfil-inversion': {
    titulo: 'Perfil de inversion', caso: 'CU4.1 «include»', ruta: 'www.bancodigital.com.co/inversion/perfil',
    capa: 'apps', entidad: null, externo: null, nav: false,
    render() {
      return `
        <div class="bloque bloque--texto">
          <h1 class="titulo">Tu perfil de inversion</h1>
          <span class="etiqueta etiqueta--include" style="margin-top:var(--e-3)">${ico('cheque', 13)} include - paso obligatorio</span>
        </div>
        ${bloqueIlustracion('perfilRiesgo', null, 'hueso')}
        <div class="bloque bloque--formulario">
          ${campoOpciones('Si tu inversion cae 10 % en un mes', [
            { t: 'Retiro todo' }, { t: 'Espero' }, { t: 'Compro mas' }
          ], 1)}
          ${campoOpciones('Horizonte', [
            { t: '< 1 año' }, { t: '1 a 3 años' }, { t: '> 3 años' }
          ], 1)}
        </div>
        <div class="bloque bloque--lista">
          <div class="tarjeta">
            <div class="tarjeta__cabecera">
              <h3 class="seccion">Perfil moderado</h3>
              <span class="etiqueta etiqueta--neutra">Resultado</span>
            </div>
            <div class="progreso"><span class="progreso__relleno" style="width:58%"></span></div>
            <p class="menor apagado" style="margin-top:var(--e-3)">
              Portafolio sugerido: 55 % renta fija, 35 % renta variable, 10 % liquidez.
              El <strong>modelo de scoring</strong> vive en la capa de aplicaciones (IA integrada).
            </p>
          </div>
        </div>
        ${acciones([{ texto: 'Continuar', accion: "irConFlujo('aceptar-terminos', { producto: 'Inversion', origen: 'abrir-inversion', entidad: 'inversion', resumen: [['Producto','Inversion perfil moderado'],['Monto','$5.000.000'],['Portafolio','55/35/10']] })" }])}`;
    }
  },

  /* ------------------------------------------------ COLOCACION (CU5-CU6) -- */

  // CU5 — "solicitar un prestamo".
  'solicitar-prestamo': {
    titulo: 'Prestamo', caso: 'CU5', ruta: 'www.bancodigital.com.co/prestamo',
    capa: 'logica', entidad: 'prestamo (C)', externo: null, nav: false,
    render() {
      return `
        ${bloqueIlustracion('prestamo', null, 'lila')}
        <div class="bloque bloque--texto">
          <h1 class="titulo">Solicita tu prestamo</h1>
          <p class="menor apagado" style="margin-top:6px">Respuesta en minutos, sin papeleo.</p>
        </div>
        <div class="bloque bloque--formulario">
          ${campoMonto('monto-prestamo', 'Monto solicitado', 8000000, 'Entre $1.000.000 y $50.000.000')}
          ${campoOpciones('Plazo', [{ t: '12 meses' }, { t: '24 meses' }, { t: '36 meses' }], 1)}
          ${campo('destino', 'Destino del credito', 'Libre inversion', '', 'documento')}
        </div>
        <div class="bloque bloque--nota">
          ${aviso('info', 'calculadora', '<strong>Simular la cuota</strong> es opcional (<em>extend</em>); <strong>consultar tu historial crediticio</strong> no lo es (<em>include</em>): ninguna entidad coloca sin consultar centrales de riesgo.')}
        </div>
        ${acciones([
          { texto: 'Simular la cuota', estilo: 'secundario', accion: "ir('simular-cuota')" },
          { texto: 'Continuar', accion: "irConFlujo('historial-crediticio', { producto: 'Prestamo de libre inversion', origen: 'solicitar-prestamo', entidad: 'prestamo', resumen: [['Producto','Prestamo libre inversion'],['Monto','$8.000.000'],['Plazo','24 meses'],['Cuota','$389.400']] })" }
        ])}`;
    }
  },

  // CU5 «extend» — es una AYUDA al cliente, no un paso obligado del tramite.
  'simular-cuota': {
    titulo: 'Simulacion de la cuota', caso: 'CU5.2 «extend»', ruta: 'www.bancodigital.com.co/prestamo/simulacion',
    capa: 'logica', entidad: null, externo: null, nav: false,
    render() {
      return `
        <div class="bloque bloque--texto">
          <h1 class="titulo">Tu cuota mensual</h1>
          <span class="etiqueta etiqueta--extend" style="margin-top:var(--e-3)">${ico('alerta', 13)} extend - paso opcional</span>
        </div>
        <div class="bloque bloque--destacado">
          <div class="producto producto--morado">
            <div>
              <div class="producto__etiqueta">Cuota mensual estimada</div>
              <div class="producto__saldo">$389.400</div>
            </div>
            <div class="producto__pie">
              <span class="producto__numero">24 meses · 1,65 % M.V.</span>
              <span class="menor" style="opacity:.85">Total $9.345.600</span>
            </div>
          </div>
        </div>
        <div class="bloque bloque--formulario">
          ${campoOpciones('Cambia el plazo y compara', [
            { t: '12 meses', s: '$728.100' },
            { t: '24 meses', s: '$389.400' },
            { t: '36 meses', s: '$281.900' }
          ], 1)}
        </div>
        <div class="bloque bloque--nota">
          ${aviso('ojo', 'alerta', 'Puedes volver y continuar sin simular: el <em>extend</em> no bloquea el tramite.')}
        </div>
        ${acciones([{ texto: 'Volver a la solicitud', estilo: 'fantasma', accion: "atras()" }])}`;
    }
  },

  // Secundario «include» de CU5 y CU6. Invoca al actor externo Central de
  // riesgo: el historial es de la central, no de la plataforma (§ 3.3).
  'historial-crediticio': {
    titulo: 'Historial crediticio', caso: 'CU5.1 / CU6.1 «include»', ruta: 'www.bancodigital.com.co/riesgo/consulta',
    capa: 'apps', entidad: 'consulta_de_riesgo (C)', externo: 'riesgo', nav: false,
    render() {
      return `
        <div class="bloque bloque--texto">
          <h1 class="titulo">Consultando tu historial</h1>
          <span class="etiqueta etiqueta--include" style="margin-top:var(--e-3)">${ico('cheque', 13)} include - paso obligatorio</span>
        </div>
        <div class="bloque bloque--nota">
          ${llamadaExterna('riesgo', 'Se consulta el historial en la central (DataCredito, TransUnion). La plataforma lo lee, no lo produce.')}
        </div>
        <div class="bloque bloque--destacado">
          <div class="tarjeta">
            <div class="tarjeta__cabecera">
              <h3 class="seccion">Puntaje 782</h3>
              <span class="etiqueta etiqueta--include">Riesgo bajo</span>
            </div>
            <div class="progreso"><span class="progreso__relleno" style="width:78%"></span></div>
            <div class="comprobante__filas">
              <div class="comprobante__fila"><span>Obligaciones vigentes</span><span>2</span></div>
              <div class="comprobante__fila"><span>Mora en los ultimos 24 meses</span><span>Ninguna</span></div>
              <div class="comprobante__fila"><span>Capacidad de endeudamiento</span><span>$14.200.000</span></div>
              <div class="comprobante__fila"><span>Consulta autorizada por el titular</span><span>Si</span></div>
            </div>
          </div>
        </div>
        <div class="bloque bloque--nota">
          ${aviso('ok', 'cheque', 'Solicitud <strong>preaprobada</strong>. El modelo de <em>scoring</em> que pondera esta consulta es una de las soluciones emergentes de la capa de aplicaciones.')}
        </div>
        ${acciones([{ texto: 'Continuar', accion: "continuarColocacion()" }])}`;
    }
  },

  // CU6 — "solicitar una tarjeta de credito".
  'solicitar-tarjeta': {
    titulo: 'Tarjeta de credito', caso: 'CU6', ruta: 'www.bancodigital.com.co/tarjeta',
    capa: 'logica', entidad: 'tarjeta_de_credito (C)', externo: null, nav: false,
    render() {
      return `
        ${bloqueIlustracion('tarjeta', null, 'hueso')}
        <div class="bloque bloque--texto">
          <h1 class="titulo">Solicita tu tarjeta</h1>
          <p class="menor apagado" style="margin-top:6px">Fisica y virtual, sin cuota de manejo el primer año.</p>
        </div>
        <div class="bloque bloque--formulario">
          ${campoOpciones('Tipo de tarjeta', [
            { t: 'Clasica', s: 'Cupo hasta $6M' },
            { t: 'Oro', s: 'Cupo hasta $18M' },
            { t: 'Platino', s: 'Cupo hasta $40M' }
          ], 1)}
          ${campo('ingresos', 'Ingresos mensuales declarados', '$6.400.000', '', 'billete')}
        </div>
        <div class="bloque bloque--nota">
          ${aviso('info', 'escudo', 'Igual que el prestamo, esta solicitud <strong>consulta la central de riesgo</strong> (<em>include</em>) y despues <strong>asigna el cupo</strong> (<em>include</em>): una tarjeta de credito no existe sin cupo asignado.')}
        </div>
        ${acciones([{ texto: 'Continuar', accion: "irConFlujo('historial-crediticio', { producto: 'Tarjeta de credito Oro', origen: 'solicitar-tarjeta', entidad: 'tarjeta_de_credito', siguiente: 'asignar-cupo', resumen: [['Producto','Tarjeta de credito Oro'],['Cupo asignado','$14.000.000'],['Cuota de manejo','$0 el primer año']] })" }])}`;
    }
  },

  // CU6 «include» — una tarjeta de credito no existe sin cupo asignado.
  'asignar-cupo': {
    titulo: 'Cupo asignado', caso: 'CU6.2 «include»', ruta: 'www.bancodigital.com.co/tarjeta/cupo',
    capa: 'apps', entidad: 'tarjeta_de_credito (C)', externo: null, nav: false,
    render() {
      return `
        <div class="bloque bloque--texto">
          <h1 class="titulo">Tu cupo aprobado</h1>
          <span class="etiqueta etiqueta--include" style="margin-top:var(--e-3)">${ico('cheque', 13)} include - paso obligatorio</span>
        </div>
        <div class="bloque bloque--destacado">
          <div class="producto producto--naranja">
            <div>
              <div class="producto__etiqueta">Cupo asignado</div>
              <div class="producto__saldo">$14.000.000</div>
            </div>
            <div class="producto__pie">
              <span class="producto__numero">Tarjeta Oro · **** 7702</span>
              <span class="menor" style="opacity:.85">Tasa 1,89 % M.V.</span>
            </div>
          </div>
        </div>
        <div class="bloque bloque--lista">
          <div class="tarjeta">
            <div class="comprobante__filas">
              <div class="comprobante__fila"><span>Puntaje de la central</span><span>782 - riesgo bajo</span></div>
              <div class="comprobante__fila"><span>Capacidad de endeudamiento</span><span>$14.200.000</span></div>
              <div class="comprobante__fila"><span>Cupo asignado por el modelo</span><span>$14.000.000</span></div>
              <div class="comprobante__fila"><span>Avances en efectivo</span><span>50 % del cupo</span></div>
            </div>
          </div>
        </div>
        ${acciones([{ texto: 'Continuar', accion: "irConFlujo('aceptar-terminos', estado.flujo)" }])}`;
    }
  },

  /* --------------------------------------------------- DIVISAS (CU7-CU8) -- */

  // CU7 — "comprar... divisas digitales".
  'comprar-divisa': {
    titulo: 'Comprar divisa', caso: 'CU7', ruta: 'www.bancodigital.com.co/divisas/compra',
    capa: 'logica', entidad: 'orden_de_divisa (C)', externo: null, nav: false,
    render() {
      return `
        ${bloqueIlustracion('divisas', null, 'menta')}
        <div class="bloque bloque--texto">
          <h1 class="titulo">Comprar divisa digital</h1>
          <p class="menor apagado" style="margin-top:6px">No hay operacion de cambio sin tasa: la consultamos primero.</p>
        </div>
        <div class="bloque bloque--formulario">
          ${campoMonto('monto-compra', 'Monto a invertir', 2000000, 'Se debita de tu cuenta de ahorro')}
        </div>
        ${seccion('Elige la divisa', `
          <div class="lista">
            ${DATOS.tasas.map(t => item(
              'divisa', t.tono, t.simbolo + ' · ' + t.nombre, pesos(t.precio) + ' por unidad',
              `<span class="${t.variacion >= 0 ? 'positivo' : 'negativo'}">${t.variacion >= 0 ? '+' : ''}${t.variacion.toFixed(1)} %</span>`
            )).join('')}
          </div>`)}
        ${acciones([{ texto: 'Consultar la tasa', accion: "irConFlujo('tasa-cambio', { operacion: 'compra', divisa: 'BTC', monto: 2000000, entidad: 'orden_de_divisa' })" }])}`;
    }
  },

  // Secundario «include» de CU7 y CU8. Invoca al Proveedor de divisas
  // digitales: la tasa y la liquidez las provee el mercado (§ 3.3).
  'tasa-cambio': {
    titulo: 'Tasa de cambio', caso: 'CU7.1 / CU8.1 «include»', ruta: 'www.bancodigital.com.co/divisas/tasa',
    capa: 'apps', entidad: 'tasa_de_cambio (R)', externo: 'divisas', nav: false,
    render() {
      const f = estado.flujo;
      const compra = f.operacion !== 'venta';
      return `
        <div class="bloque bloque--texto">
          <h1 class="titulo">Tasa del mercado</h1>
          <span class="etiqueta etiqueta--include" style="margin-top:var(--e-3)">${ico('cheque', 13)} include - paso obligatorio</span>
        </div>
        <div class="bloque bloque--nota">
          ${llamadaExterna('divisas', 'La tasa y la liquidez las provee el mercado. La plataforma las consume por API y las bloquea 30 segundos.')}
        </div>
        <div class="bloque bloque--destacado">
          <div class="producto producto--menta">
            <div>
              <div class="producto__etiqueta">1 BTC equivale a</div>
              <div class="producto__saldo">$268.450.000</div>
            </div>
            <div class="producto__pie">
              <span class="producto__numero">${ico('reloj', 13)} Tasa bloqueada 00:28</span>
              <span class="menor" style="opacity:.85">+2,4 % hoy</span>
            </div>
          </div>
        </div>
        <div class="bloque bloque--lista">
          <div class="tarjeta">
            <div class="comprobante__filas">
              <div class="comprobante__fila"><span>Operacion</span><span>${compra ? 'Compra' : 'Venta'} de BTC</span></div>
              <div class="comprobante__fila"><span>${compra ? 'Debitamos' : 'Entregas'}</span><span>${compra ? '$2.000.000' : '0,00745 BTC'}</span></div>
              <div class="comprobante__fila"><span>${compra ? 'Recibes' : 'Recibes'}</span><span>${compra ? '0,00745 BTC' : '$2.000.000'}</span></div>
              <div class="comprobante__fila"><span>Comision (0,5 %)</span><span>$10.000</span></div>
            </div>
          </div>
        </div>
        ${acciones([{ texto: compra ? 'Comprar' : 'Continuar', accion: 'continuarDivisa()' }])}`;
    }
  },

  // CU8 — "vender... divisas digitales".
  'vender-divisa': {
    titulo: 'Vender divisa', caso: 'CU8', ruta: 'www.bancodigital.com.co/divisas/venta',
    capa: 'logica', entidad: 'orden_de_divisa (C)', externo: null, nav: false,
    render() {
      return `
        <div class="bloque bloque--texto">
          <h1 class="titulo">Vender divisa digital</h1>
          <p class="menor apagado" style="margin-top:6px">El producido se abona a tu cuenta de ahorro.</p>
        </div>
        <div class="bloque bloque--destacado">
          <div class="producto producto--noche">
            <div>
              <div class="producto__etiqueta">Tu portafolio</div>
              <div class="producto__saldo">$4.860.200</div>
            </div>
            <div class="producto__pie">
              <span class="producto__numero">0,0181 BTC · 12 ETH · 420 USDT</span>
              <span class="menor" style="opacity:.85">+3,1 % mes</span>
            </div>
          </div>
        </div>
        <div class="bloque bloque--formulario">
          ${campoOpciones('Divisa a vender', [{ t: 'BTC' }, { t: 'ETH' }, { t: 'USDT' }], 0)}
          ${campoMonto('monto-venta', 'Monto a vender', 2000000, 'Equivale a 0,00745 BTC')}
        </div>
        ${acciones([{ texto: 'Consultar la tasa', accion: "irConFlujo('tasa-cambio', { operacion: 'venta', divisa: 'BTC', monto: 2000000, entidad: 'orden_de_divisa' })" }])}`;
    }
  },

  // CU8 «include» — la venta termina abonando el producido a la cuenta.
  'liquidar-operacion': {
    titulo: 'Liquidacion', caso: 'CU8.2 «include»', ruta: 'www.bancodigital.com.co/divisas/liquidacion',
    capa: 'apps', entidad: 'cuenta_de_ahorro (U)', externo: null, nav: false,
    render() {
      return `
        <div class="bloque bloque--texto">
          <h1 class="titulo">Liquidar en tu cuenta</h1>
          <span class="etiqueta etiqueta--include" style="margin-top:var(--e-3)">${ico('cheque', 13)} include - paso obligatorio</span>
          <p class="menor apagado" style="margin-top:var(--e-3)">
            La venta no termina en la orden: termina cuando el producido queda en tu cuenta.
          </p>
        </div>
        <div class="bloque bloque--lista">
          <div class="tarjeta">
            <div class="comprobante__filas">
              <div class="comprobante__fila"><span>Vendes</span><span>0,00745 BTC</span></div>
              <div class="comprobante__fila"><span>Producido bruto</span><span>$2.000.000</span></div>
              <div class="comprobante__fila"><span>Comision (0,5 %)</span><span>-$10.000</span></div>
              <div class="comprobante__fila"><span>Abono neto</span><span>$1.990.000</span></div>
              <div class="comprobante__fila"><span>Cuenta destino</span><span>Ahorro **** 4821</span></div>
            </div>
          </div>
        </div>
        <div class="bloque bloque--nota">
          ${aviso('info', 'nube', 'El abono viaja por el <strong>bus de eventos</strong> de la capa de aplicaciones: desacopla la transaccion de su liquidacion, que es lo que sostiene el 7x24.')}
        </div>
        ${acciones([{ texto: 'Confirmar la venta', accion: "irConFlujo('doble-factor', { titulo: 'Venta de BTC', entidad: 'orden_de_divisa', resumen: [['Operacion','Venta de BTC'],['Entregas','0,00745 BTC'],['Abono neto','$1.990.000'],['Cuenta destino','Ahorro **** 4821']] })" }])}`;
    }
  },

  /* --------------------------------------------------- DEBITO (CU9-CU11) -- */

  // CU9 — "operaciones Debito (retiro...)".
  'retirar': {
    titulo: 'Retirar efectivo', caso: 'CU9', ruta: 'www.bancodigital.com.co/retiro',
    capa: 'logica', entidad: 'movimiento (C)', externo: null, nav: false,
    render() {
      return `
        ${bloqueIlustracion('retiro', null, 'hueso')}
        <div class="bloque bloque--texto">
          <h1 class="titulo">Retirar sin tarjeta</h1>
          <p class="menor apagado" style="margin-top:6px">Generamos un codigo QR para el cajero o el corresponsal.</p>
        </div>
        <div class="bloque bloque--formulario">
          ${campoOpciones('Monto', [
            { t: '$100.000' }, { t: '$200.000' }, { t: '$300.000' }, { t: 'Otro' }
          ], 2)}
        </div>
        ${seccion('Puntos cerca de ti', `
          <div class="lista">
            ${DATOS.corresponsales.map(c => item('ubicacion', 'azul', c.nombre, 'A ' + c.distancia, null)).join('')}
          </div>`)}
        ${acciones([{ texto: 'Verificar el saldo', accion: "irConFlujo('verificar-saldo', { titulo: 'Retiro de efectivo', monto: 300000, entidad: 'movimiento', destino: 'retirar', resumen: [['Operacion','Retiro sin tarjeta'],['Monto','$300.000'],['Punto','Corresponsal Norte - Cra 51B'],['Vigencia del codigo','30 minutos']] })" }])}`;
    }
  },

  // Secundario «include» de CU9 y CU11 — sin saldo disponible no hay retiro
  // ni transferencia. LEE la misma entidad que CU2 crea (§ 3.6).
  'verificar-saldo': {
    titulo: 'Saldo disponible', caso: 'CU9.1 / CU11.1 «include»', ruta: 'www.bancodigital.com.co/cuenta/saldo',
    capa: 'datos', entidad: 'cuenta_de_ahorro (R)', externo: null, nav: false,
    render() {
      const f = estado.flujo;
      const disponible = DATOS.productos[0].saldo;
      const monto = f.monto || 0;
      return `
        <div class="bloque bloque--texto">
          <h1 class="titulo">Verificamos tu saldo</h1>
          <span class="etiqueta etiqueta--include" style="margin-top:var(--e-3)">${ico('cheque', 13)} include - paso obligatorio</span>
        </div>
        <div class="bloque bloque--destacado">
          <div class="producto producto--morado">
            <div>
              <div class="producto__etiqueta">Disponible en Ahorro **** 4821</div>
              <div class="producto__saldo">${pesos(disponible)}</div>
            </div>
            <div class="producto__pie">
              <span class="producto__numero">Despues de la operacion</span>
              <span class="menor" style="opacity:.85">${pesos(disponible - monto)}</span>
            </div>
          </div>
        </div>
        <div class="bloque bloque--nota">
          ${aviso('ok', 'cheque', `Saldo suficiente para ${pesos(monto)}. La lectura sale de la entidad <strong>cuenta_de_ahorro</strong>, la misma que crea el caso de uso de apertura: es la correspondencia que no es uno a uno del § 3.6.`)}
        </div>
        ${acciones([{ texto: 'Continuar', accion: "continuarDebito()" }])}`;
    }
  },

  // CU10 — "pago de servicios".
  'pagar-servicio': {
    titulo: 'Pagar servicios', caso: 'CU10', ruta: 'www.bancodigital.com.co/pagos',
    capa: 'logica', entidad: 'pago_de_servicio (C)', externo: null, nav: false,
    render() {
      return `
        ${bloqueIlustracion('pagos', null, 'hueso')}
        <div class="bloque bloque--texto">
          <h1 class="titulo">Paga tus servicios</h1>
          <p class="menor apagado" style="margin-top:6px">Se paga contra una factura: primero la consultamos.</p>
        </div>
        ${seccion('Tus convenios', `
          <div class="lista">
            ${DATOS.facturas.map(f => item(
              f.icono, f.tono, f.convenio, 'Ref. ' + f.referencia,
              `<span class="tenue">${ico('flecha', 16)}</span>`,
              `irConFlujo('consultar-factura', { convenio: '${f.convenio}', referencia: '${f.referencia}', monto: ${f.valor}, vence: '${f.vence}', entidad: 'pago_de_servicio' })`
            )).join('')}
          </div>`)}
        <div class="bloque bloque--nota">
          ${aviso('info', 'api', 'Los convenios los resuelve la <strong>pasarela de recaudo PSE</strong>, un actor externo: la plataforma tiene el convenio, no el sistema de facturacion del prestador.')}
        </div>`;
    }
  },

  // CU10 «include» — "pago de servicios": se paga CONTRA una factura.
  // Invoca a la Pasarela de recaudo PSE (§ 3.3).
  'consultar-factura': {
    titulo: 'Factura del servicio', caso: 'CU10.1 «include»', ruta: 'www.bancodigital.com.co/pagos/factura',
    capa: 'apps', entidad: null, externo: 'pse', nav: false,
    render() {
      const f = estado.flujo;
      return `
        <div class="bloque bloque--texto">
          <h1 class="titulo">${f.convenio || 'Factura'}</h1>
          <span class="etiqueta etiqueta--include" style="margin-top:var(--e-3)">${ico('cheque', 13)} include - paso obligatorio</span>
        </div>
        <div class="bloque bloque--nota">
          ${llamadaExterna('pse', 'La factura la devuelve el convenio de recaudo. La plataforma no la genera: la consulta y la paga.')}
        </div>
        <div class="bloque bloque--destacado">
          <div class="comprobante">
            <div class="comprobante__filas">
              <div class="comprobante__fila"><span>Convenio</span><span>${f.convenio || '-'}</span></div>
              <div class="comprobante__fila"><span>Referencia de pago</span><span class="mono">${f.referencia || '-'}</span></div>
              <div class="comprobante__fila"><span>Periodo facturado</span><span>Agosto de 2026</span></div>
              <div class="comprobante__fila"><span>Vence</span><span>${f.vence || '-'}</span></div>
              <div class="comprobante__fila"><span>Estado</span><span class="positivo">Pendiente</span></div>
            </div>
            <div class="comprobante__corte fila fila--sep">
              <span class="menor apagado">Total a pagar</span>
              <span class="titulo">${pesos(f.monto || 0)}</span>
            </div>
          </div>
        </div>
        ${acciones([{ texto: 'Pagar', accion: 'pagarFactura()' }])}`;
    }
  },

  // CU11 — "transferencias". Invoca al actor externo Red de transferencias
  // interbancarias: las transferencias entre entidades pasan por la ACH, que
  // la solucion consume pero no implementa (§ 3.3).
  'transferir': {
    titulo: 'Transferir', caso: 'CU11', ruta: 'www.bancodigital.com.co/transferencias',
    capa: 'logica', entidad: 'transferencia (C)', externo: 'ach', nav: false,
    render() {
      return `
        ${bloqueIlustracion('transferir', null, 'lila')}
        <div class="bloque bloque--texto">
          <h1 class="titulo">Transferir dinero</h1>
          <p class="menor apagado" style="margin-top:6px">A cuentas propias, de otros bancos o por llave.</p>
        </div>
        <div class="bloque bloque--formulario">
          ${campoMonto('monto-transf', 'Monto a transferir', 420000, 'Disponible ' + pesos(DATOS.productos[0].saldo))}
        </div>
        ${seccion('Cuentas inscritas', `
          <div class="lista">
            ${DATOS.contactos.map(c => item(
              'usuario', c.tono, c.nombre, c.banco + ' · ' + c.cuenta,
              `<span class="tenue">${ico('flecha', 16)}</span>`,
              `irConFlujo('verificar-saldo', { titulo: 'Transferencia', monto: 420000, entidad: 'transferencia', destino: 'transferir', beneficiario: '${c.nombre}', resumen: [['Operacion','Transferencia'],['Beneficiario','${c.nombre}'],['Banco','${c.banco}'],['Cuenta','${c.cuenta}'],['Valor','$420.000']] })`
            )).join('')}
          </div>`, { texto: 'Inscribir otra', hacer: "ir('registrar-cuenta')" })}
        <div class="bloque bloque--nota">
          ${aviso('ojo', 'alerta', '<strong>Inscribir una cuenta nueva es <em>extend</em></strong>: la cuenta destino puede estar ya inscrita de una transferencia anterior, y entonces el paso no ocurre.')}
        </div>
        <div class="bloque bloque--nota">
          ${llamadaExterna('ach', 'Si el beneficiario es de otro banco, la orden sale por la red interbancaria (ACH). Entre cuentas propias de la plataforma, no.')}
        </div>`;
    }
  },

  // CU11 «extend» — la cuenta destino PUEDE estar ya inscrita: por eso es
  // opcional y no obligatorio.
  'registrar-cuenta': {
    titulo: 'Inscribir cuenta', caso: 'CU11.2 «extend»', ruta: 'www.bancodigital.com.co/transferencias/inscribir',
    capa: 'logica', entidad: 'transferencia (C)', externo: null, nav: false,
    render() {
      return `
        <div class="bloque bloque--texto">
          <h1 class="titulo">Inscribir cuenta destino</h1>
          <span class="etiqueta etiqueta--extend" style="margin-top:var(--e-3)">${ico('alerta', 13)} extend - paso opcional</span>
        </div>
        <div class="bloque bloque--formulario">
          ${campo('benef', 'Nombre del beneficiario', '', 'Como aparece en su banco', 'usuario')}
          ${campo('banco', 'Banco', '', 'Selecciona el banco', 'cartera')}
          ${campo('cuenta', 'Numero de cuenta', '', '0000 0000 0000', 'documento')}
          ${campoOpciones('Tipo de cuenta', [{ t: 'Ahorros' }, { t: 'Corriente' }], 0)}
        </div>
        <div class="bloque bloque--nota">
          ${aviso('info', 'escudo', 'La cuenta queda inscrita despues de una validacion de <strong>doble factor</strong>. Si ya estaba inscrita, este paso sencillamente no ocurre.')}
        </div>
        ${acciones([{ texto: 'Inscribir', accion: "atras()" }])}`;
    }
  },

  /* ----------------------------------------------- TRANSVERSAL Y CIERRE -- */

  // Secundario «include» de CU7, CU8, CU9, CU10 y CU11 — LAS CINCO
  // OPERACIONES QUE MUEVEN DINERO (§ 3.5, nota). Se apoya en el requerimiento
  // "Garantizar Seguridad de las operaciones 99,999 %" y en el control de
  // acceso del WAF de la arquitectura: es donde el punto 3 y el punto 1 se
  // tocan.
  'doble-factor': {
    titulo: 'Autorizar operacion', caso: 'Secundario «include» de CU7-CU11', ruta: 'www.bancodigital.com.co/autorizacion',
    capa: 'ciber', entidad: null, externo: null, nav: false,
    render() {
      const f = estado.flujo;
      return `
        <div class="bloque bloque--texto">
          <h1 class="titulo">Autoriza la operacion</h1>
          <p class="menor apagado" style="margin-top:6px">
            Enviamos un codigo a ${DATOS.cliente.celular}. Toda operacion que mueve dinero lo exige.
          </p>
        </div>
        <div class="bloque bloque--destacado">
          <div class="tarjeta tarjeta--contorno">
            <div class="fila">
              <span class="lista__icono tono--morado">${ico('escudo', 19)}</span>
              <span class="crece">
                <div class="lista__titulo">${f.titulo || 'Operacion'}</div>
                <div class="lista__sub">${(f.resumen && f.resumen[f.resumen.length - 1]) ? f.resumen[f.resumen.length - 1][1] : ''}</div>
              </span>
              <span class="etiqueta etiqueta--include">2FA</span>
            </div>
          </div>
        </div>
        <div class="bloque bloque--codigo">
          <div class="puntos" id="otp-2fa">
            <span class="punto punto--lleno">9</span>
            <span class="punto punto--lleno">0</span>
            <span class="punto"></span>
            <span class="punto"></span>
          </div>
        </div>
        ${teclado('otp-2fa')}
        <div class="bloque bloque--nota">
          ${aviso('info', 'escudo', 'El segundo factor lo exige el <strong>control de acceso del WAF</strong> en la vertical de ciberseguridad, y es lo que sostiene el 99,999 % de seguridad de las operaciones.')}
        </div>
        ${acciones([{ texto: 'Autorizar', accion: "ir('comprobante')" }])}`;
    }
  },

  'comprobante': {
    titulo: 'Comprobante', caso: null, ruta: 'www.bancodigital.com.co/comprobante',
    capa: 'datos', entidad: null, externo: null, nav: false,
    render() {
      const f = estado.flujo;
      const filas = f.resumen || [['Operacion', 'Completada']];
      return `
        ${bloqueIlustracion('exito', null, 'menta')}
        <div class="bloque bloque--texto centrado">
          <h1 class="titulo">Operacion exitosa</h1>
          <p class="menor apagado" style="margin-top:6px">
            ${f.titulo || f.producto || 'Tu operacion'} quedo registrada.
          </p>
        </div>
        <div class="bloque bloque--destacado">
          <div class="comprobante">
            <div class="comprobante__filas">
              ${filas.map(r => `<div class="comprobante__fila"><span>${r[0]}</span><span>${r[1]}</span></div>`).join('')}
              <div class="comprobante__fila"><span>Fecha</span><span>3 de septiembre de 2026, 10:41</span></div>
              <div class="comprobante__fila"><span>Numero de aprobacion</span><span class="mono">80412977</span></div>
              <div class="comprobante__fila"><span>Canal</span><span id="canal-comprobante">app-phone</span></div>
            </div>
            <div class="comprobante__corte centrado">
              <span class="menor tenue">Conserva este comprobante. Tambien queda en tus movimientos.</span>
            </div>
          </div>
        </div>
        ${acciones([
          { texto: 'Compartir', estilo: 'secundario', accion: "ir('comprobante')" },
          { texto: 'Volver al inicio', accion: "ir('inicio')" }
        ])}`;
    }
  }
};
