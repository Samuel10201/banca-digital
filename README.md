# Prototipo de la plataforma de banca digital

Punto 5 del Parcial 1 — *Una compañía financiera Fintech, banca digital*.
Diseño de Software I, NRC 2429, Universidad del Norte.

Prototipo navegable de la experiencia del **usuario final (externo)** en los tres canales que
exige el caso: **app-phone**, **app-web** y **app-pda**.

---

## Cómo se abre

Doble clic en `index.html`. No hay instalación, ni servidor, ni conexión: son archivos
estáticos y todas las imágenes son SVG dentro del propio código.

```powershell
start index.html          # portada, con el mapa y los tres canales
start app-phone.html      # canal 1 — teléfono
start app-web.html        # canal 2 — navegador de escritorio
start app-pda.html        # canal 3 — terminal dedicado
```

Se puede entrar directo a una pantalla con su ancla: `app-web.html#solicitar-prestamo`.

## Cómo se maneja

| Gesto | Qué hace |
|---|---|
| **Alt+A** o el interruptor de la consola | Enciende el **modo anotado** |
| **Esc** | Vuelve atrás |
| Consola de la izquierda | Salta de canal, salta de pantalla y abre la portada |
| `?anotado` en la URL | Arranca ya anotado, para capturar en lote |

La **consola de la izquierda no es parte de la solución**: es el mando para sustentar y
capturar. No aparece en ninguna captura del informe.

## Qué muestra el modo anotado

Una cinta al pie con la trazabilidad de la pantalla que se esté viendo:

- el **caso de uso** del punto 3 que realiza, con su estereotipo (`«include»` / `«extend»`),
- la **capa de la arquitectura** del punto 1 que la atiende,
- la **entidad de datos** que persiste y su operación (`prestamo (C)`),
- el **actor externo** que invoca, si invoca alguno.

Es lo que responde a *"alineado y ajustado a la arquitectura propuesta"* sin ensuciar las
capturas limpias.

---

## Qué cubre

**Los 11 casos de uso principales** del § 3.4, todos alcanzables desde el inicio:

| # | Caso de uso | Pantalla | Secundarios que dispara |
|---|---|---|---|
| CU1 | Registrar al cliente | `registro` | Validar identidad `«include»`, Vincular dispositivo `«extend»` |
| CU2 | Abrir la cuenta de ahorro | `abrir-ahorro` | Aceptar términos `«include»` |
| CU3 | Abrir el depósito a término fijo | `abrir-cdt` | Simular rendimiento `«include»`, Aceptar términos `«include»` |
| CU4 | Abrir la inversión | `abrir-inversion` | Definir perfil `«include»`, Aceptar términos `«include»` |
| CU5 | Solicitar el préstamo | `solicitar-prestamo` | Historial crediticio `«include»`, Simular cuota `«extend»`, Aceptar términos `«include»` |
| CU6 | Solicitar la tarjeta de crédito | `solicitar-tarjeta` | Historial crediticio `«include»`, Asignar cupo `«include»`, Aceptar términos `«include»` |
| CU7 | Comprar la divisa digital | `comprar-divisa` | Tasa de cambio `«include»`, Doble factor `«include»` |
| CU8 | Vender la divisa digital | `vender-divisa` | Tasa de cambio `«include»`, Liquidar en cuenta `«include»`, Doble factor `«include»` |
| CU9 | Retirar el efectivo | `retirar` | Verificar saldo `«include»`, Doble factor `«include»` |
| CU10 | Pagar el servicio | `pagar-servicio` | Consultar factura `«include»`, Doble factor `«include»` |
| CU11 | Transferir los fondos | `transferir` | Verificar saldo `«include»`, Registrar cuenta destino `«extend»`, Doble factor `«include»` |

**El prototipo no dibuja los estereotipos: los demuestra.** Un `«include»` es un paso por el
que hay que pasar (no se abre un CDT sin simular su rendimiento); un `«extend»` trae siempre
la salida *"Ahora no"* y el flujo continúa igual.

**Los 5 actores externos** del § 3.3 aparecen en la pantalla que los invoca, rotulados como
llamada `API`: validación de identidad, central de riesgo, proveedor de divisas digitales,
pasarela de recaudo PSE y red de transferencias interbancarias.

**Las rutas** del § 3.7 se ven literales en la barra de direcciones del canal web.

---

## Cómo está hecho

Una pantalla se define **una sola vez**, en `js/pantallas.js`, y los tres canales la muestran.
Lo único que cambia entre canales es el CSS que la compone:

| Canal | Composición |
|---|---|
| `app-phone` | Una columna de 390×844. Navegación inferior con botón central, acciones ancladas en la zona del pulgar. La barra inferior solo existe en las pantallas raíz. |
| `app-web` | Dos columnas con menú lateral y barra de direcciones. Los formularios reparten sus campos solos; el teclado numérico desaparece (hay teclado físico). |
| `app-pda` | Terminal apaisado de 1024×600 operado de pie y con el dedo: todo objetivo táctil crece y baja la densidad por pantalla. |

```
index.html          portada y trazabilidad (sus tablas se GENERAN del registro)
app-phone.html      \
app-web.html         >  shells: declaran su canal y cargan el mismo motor
app-pda.html        /
css/tokens.css      única fuente de color, tipografía, espaciado, radio y sombra
css/base.css        reset, utilidades y la consola del prototipo
css/componentes.css el catálogo de piezas — idéntico en los tres canales
css/canal-*.css     la composición de cada canal
css/portada.css     la composición de index.html
js/datos.js         datos de demostración, capas, casos de uso y actores externos
js/pantallas.js     el registro: 33 pantallas, cada una con su trazabilidad
js/navegacion.js    el motor: render, historial, flujos y modo anotado
```

El contrato entre los tres módulos JS está en `..\plan-reglas\convenciones.md`. La regla que lo
sostiene todo: `render()` devuelve **contenido semántico** y nunca decide anchos ni columnas.

## Cómo se captura para el informe

```bash
# Una pantalla, canal teléfono
msedge --headless=new --window-size=1500,1000 --virtual-time-budget=2500 \
  --screenshot=salida.png "file:///.../app-phone.html#abrir-cdt"

# La misma, anotada
... "file:///.../app-phone.html?anotado#abrir-cdt"
```

## Qué deja fuera, declarado

- **El usuario interno y el administrador.** Los excluye la rúbrica del punto 3
  (*"la experiencia del usuario final -únicamente-"*) y el punto 5 (*"externo"*).
- **El back real.** No hay servidor, base de datos ni API: es un prototipo de UX. Los
  microservicios, el bus de eventos y el OLTP se modelan en el punto 1 y se construyen en los
  siete *sprints* del punto 4.
- **La analítica.** Data Warehouse, Data Lake y modelos de ML están en la capa de datos de la
  arquitectura, pero son la segunda fase declarada en el alcance del punto 1.
- **El perfil personal en `app-pda`.** El terminal es un punto de atención presencial y
  compartido: no expone la configuración personal del cliente. Es una decisión de canal.
- **Las capas de negocio e infraestructura no tienen pantalla**, y el mapa de la portada lo
  dice: se modelan, no se prototipan. Un prototipo de UX no las representa.

## Referencia visual

El lenguaje visual del canal móvil se toma de
`..\referencia-ux\Hybrid Mobile UI_ Mallet Toolkit.jpeg`: fondo claro, tarjetas blancas de
esquina muy redondeada, acento morado, ilustraciones planas de acento naranja y menta, botones
*pill* y navegación inferior con botón central. Los otros dos canales aplican **el mismo
sistema** con su propia composición.
