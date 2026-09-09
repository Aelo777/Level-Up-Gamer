/* ============================================================
   LEVEL-UP GAMER — Carrito de compras
   Persistencia mediante localStorage (requerimiento EV1)
   ============================================================ */

const CARRITO_KEY = "levelup_carrito";
const DESCUENTO_DUOC = 0.2; // 20% de por vida para correos @duoc.cl / @duocuc.cl

/** Lee el carrito desde localStorage */
function leerCarrito() {
  try {
    const data = localStorage.getItem(CARRITO_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("No se pudo leer el carrito guardado:", e);
    return [];
  }
}

/** Guarda el carrito en localStorage */
function guardarCarrito(carrito) {
  localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
  actualizarContadorCarrito();
}

/** Agrega un producto al carrito (o suma cantidad si ya existe) */
function agregarAlCarrito(codigo, cantidad = 1) {
  const producto = PRODUCTOS.find(p => p.codigo === codigo);
  if (!producto) return;

  const carrito = leerCarrito();
  const item = carrito.find(i => i.codigo === codigo);

  if (item) {
    item.cantidad += cantidad;
  } else {
    carrito.push({ codigo, cantidad });
  }

  guardarCarrito(carrito);
  mostrarToast(`${producto.nombre} se agregó al carrito`);
}

/** Cambia la cantidad de un ítem del carrito */
function cambiarCantidad(codigo, nuevaCantidad) {
  let carrito = leerCarrito();
  const item = carrito.find(i => i.codigo === codigo);
  if (!item) return;

  nuevaCantidad = Math.max(1, Math.min(99, parseInt(nuevaCantidad) || 1));
  item.cantidad = nuevaCantidad;

  guardarCarrito(carrito);
  renderizarCarrito();
}

/** Elimina un ítem del carrito */
function eliminarDelCarrito(codigo) {
  let carrito = leerCarrito().filter(i => i.codigo !== codigo);
  guardarCarrito(carrito);
  renderizarCarrito();
}

/** Vacía el carrito completo */
function vaciarCarrito() {
  guardarCarrito([]);
  renderizarCarrito();
}

/** Suma la cantidad total de ítems en el carrito */
function totalItemsCarrito() {
  return leerCarrito().reduce((acc, i) => acc + i.cantidad, 0);
}

/** Calcula el subtotal del carrito en CLP */
function calcularSubtotal(carrito) {
  return carrito.reduce((acc, item) => {
    const producto = PRODUCTOS.find(p => p.codigo === item.codigo);
    return producto ? acc + producto.precio * item.cantidad : acc;
  }, 0);
}

/** Actualiza el contador visual del carrito en el header (todas las páginas) */
function actualizarContadorCarrito() {
  const contador = document.querySelector("[data-cart-count]");
  if (contador) contador.textContent = totalItemsCarrito();
}

/** Muestra una notificación flotante breve */
function mostrarToast(mensaje) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = mensaje;
  toast.classList.add("visible");
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => toast.classList.remove("visible"), 2400);
}

/** Determina si el usuario tiene el descuento Duoc activo (guardado desde registro.html) */
function tieneDescuentoDuoc() {
  return localStorage.getItem("levelup_descuento_duoc") === "true";
}

/* ---------- Renderizado de la página carrito.html ---------- */

function renderizarCarrito() {
  const cuerpo = document.querySelector("[data-cart-body]");
  const vacio = document.querySelector("[data-cart-empty]");
  const tabla = document.querySelector("[data-cart-table]");
  const resumen = document.querySelector("[data-cart-summary]");
  if (!cuerpo) return; // no estamos en carrito.html

  const carrito = leerCarrito();

  if (carrito.length === 0) {
    tabla.style.display = "none";
    resumen.style.display = "none";
    vacio.style.display = "block";
    return;
  }

  vacio.style.display = "none";
  tabla.style.display = "table";
  resumen.style.display = "block";

  cuerpo.innerHTML = carrito.map(item => {
    const p = PRODUCTOS.find(pr => pr.codigo === item.codigo);
    if (!p) return "";
    const subtotal = p.precio * item.cantidad;
    return `
      <tr>
        <td>
          <div class="cart-item-info">
            <img src="${p.img}" alt="${p.nombre}">
            <div>
              <div>${p.nombre}</div>
              <div class="product-category">${p.categoria}</div>
            </div>
          </div>
        </td>
        <td>${formatearCLP(p.precio)}</td>
        <td>
          <div class="qty-control">
            <button type="button" aria-label="Restar" data-qty-minus="${p.codigo}">−</button>
            <input type="number" min="1" max="99" value="${item.cantidad}" aria-label="Cantidad" data-qty-input="${p.codigo}">
            <button type="button" aria-label="Sumar" data-qty-plus="${p.codigo}">+</button>
          </div>
        </td>
        <td>${formatearCLP(subtotal)}</td>
        <td><button type="button" class="btn-danger" data-remove="${p.codigo}">Eliminar</button></td>
      </tr>
    `;
  }).join("");

  const subtotal = calcularSubtotal(carrito);
  const conDescuento = tieneDescuentoDuoc();
  const descuento = conDescuento ? subtotal * DESCUENTO_DUOC : 0;
  const total = subtotal - descuento;

  resumen.innerHTML = `
    <div class="cart-summary-row"><span>Subtotal</span><span>${formatearCLP(subtotal)}</span></div>
    ${conDescuento ? `<div class="cart-summary-row"><span class="discount-note">Descuento Duoc (20%)</span><span class="discount-note">−${formatearCLP(descuento)}</span></div>` : ""}
    <div class="cart-summary-row total"><span>Total</span><span>${formatearCLP(total)}</span></div>
    <button type="button" class="btn btn-accent btn-block mt-32" data-checkout>Proceder al pago</button>
    <button type="button" class="btn btn-outline btn-block mt-32" data-vaciar>Vaciar carrito</button>
  `;

  // Delegación de eventos para los controles recién insertados
  cuerpo.querySelectorAll("[data-qty-minus]").forEach(btn => {
    btn.addEventListener("click", () => {
      const codigo = btn.dataset.qtyMinus;
      const actual = leerCarrito().find(i => i.codigo === codigo);
      cambiarCantidad(codigo, (actual?.cantidad || 1) - 1);
    });
  });
  cuerpo.querySelectorAll("[data-qty-plus]").forEach(btn => {
    btn.addEventListener("click", () => {
      const codigo = btn.dataset.qtyPlus;
      const actual = leerCarrito().find(i => i.codigo === codigo);
      cambiarCantidad(codigo, (actual?.cantidad || 1) + 1);
    });
  });
  cuerpo.querySelectorAll("[data-qty-input]").forEach(input => {
    input.addEventListener("change", () => cambiarCantidad(input.dataset.qtyInput, input.value));
  });
  cuerpo.querySelectorAll("[data-remove]").forEach(btn => {
    btn.addEventListener("click", () => eliminarDelCarrito(btn.dataset.remove));
  });

  resumen.querySelector("[data-vaciar]").addEventListener("click", vaciarCarrito);
  resumen.querySelector("[data-checkout]").addEventListener("click", () => {
    mostrarToast("¡Gracias por tu compra! (simulación — EV1 no incluye pago real)");
    vaciarCarrito();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorCarrito();
  renderizarCarrito();
});
