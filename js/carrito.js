// ==========================================
// 1. FUNCIONES BÁSICAS DE MEMORIA (LocalStorage)
// ==========================================

// Obtener la lista de productos guardados en el navegador
function obtenerCarrito() {
  const carritoGuardado = localStorage.getItem("carrito_levelup");
  
  if (carritoGuardado) {
    return JSON.parse(carritoGuardado); // Convierte el texto guardado a lista JS
  } else {
    return []; // Si no hay nada, devuelve una lista vacía
  }
}

// Guardar la lista actualizada en el navegador y actualizar el contador del header
function guardarCarrito(listaProductos) {
  localStorage.setItem("carrito_levelup", JSON.stringify(listaProductos));
  actualizarContadorHeader();
}

// Actualizar el número del icono del carrito 🛒 en la barra superior
function actualizarContadorHeader() {
  const carrito = obtenerCarrito();
  
  // Sumamos la cantidad de todos los productos
  let totalArticulos = 0;
  for (let i = 0; i < carrito.length; i++) {
    totalArticulos += carrito[i].cantidad;
  }

  // Buscamos los elementos del HTML donde se muestra el número
  const contadores = document.querySelectorAll("[data-cart-count]");
  contadores.forEach(function (elemento) {
    elemento.textContent = totalArticulos;
  });
}

// ==========================================
// 2. AGREGAR PRODUCTOS (Para usar desde el catálogo)
// ==========================================

function agregarAlCarrito(idProducto) {
  let carrito = obtenerCarrito();

  // Buscamos si el producto existe en el archivo data.js
  let productoEncontrado = null;
  if (typeof productos !== "undefined") {
    productoEncontrado = productos.find(function (p) {
      return p.id === idProducto;
    });
  }

  if (!productoEncontrado) {
    alert("Error: No se encontró la información del producto.");
    return;
  }

  // Revisamos si el producto ya está en el carrito
  let existeEnCarrito = carrito.find(function (p) {
    return p.id === idProducto;
  });

  if (existeEnCarrito) {
    // Si ya existe, le sumamos 1 a la cantidad
    existeEnCarrito.cantidad = existeEnCarrito.cantidad + 1;
  } else {
    // Si es nuevo, lo agregamos a la lista
    carrito.push({
      id: productoEncontrado.id,
      nombre: productoEncontrado.nombre,
      precio: productoEncontrado.precio,
      imagen: productoEncontrado.imagen || "img/placeholder.svg",
      cantidad: 1
    });
  }

  guardarCarrito(carrito);
  alert("¡" + productoEncontrado.nombre + " agregado al carrito!");
}

// ==========================================
// 3. MOSTRAR EL CARRITO EN EL HTML (carrito.html)
// ==========================================

function mostrarCarritoEnPantalla() {
  // Elementos principales de carrito.html
  const mensajeVacio = document.querySelector("[data-cart-empty]");
  const tablaCarrito = document.querySelector("[data-cart-table]");
  const cuerpoTabla = document.querySelector("[data-cart-body]");
  const resumenCarrito = document.querySelector("[data-cart-summary]");

  // Si no estamos en la página del carrito (por ejemplo si estamos en el catálogo), se interrumpe la función
  if (!cuerpoTabla) return;

  const carrito = obtenerCarrito();

  // Si el carrito está vacío:
  if (carrito.length === 0) {
    if (mensajeVacio) mensajeVacio.style.display = "block";
    if (tablaCarrito) tablaCarrito.style.display = "none";
    if (resumenCarrito) resumenCarrito.style.display = "none";
    return;
  }

  // Si el carrito TIENE productos:
  if (mensajeVacio) mensajeVacio.style.display = "none";
  if (tablaCarrito) tablaCarrito.style.display = "table";
  if (resumenCarrito) resumenCarrito.style.display = "block";

  // Limpiamos la tabla antes de dibujar
  cuerpoTabla.innerHTML = "";
  let precioTotalAcumulado = 0;

  // Recorremos los productos para crear las filas de la tabla
  carrito.forEach(function (producto) {
    const subtotal = producto.precio * producto.cantidad;
    precioTotalAcumulado += subtotal;

    // Crear la fila de la tabla
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td class="cart-product-info">
        <img src="${producto.imagen}" alt="${producto.nombre}" class="cart-img">
        <span>${producto.nombre}</span>
      </td>
      <td>$${producto.precio.toLocaleString("es-CL")}</td>
      <td>
        <input type="number" min="1" value="${producto.cantidad}" class="cart-qty-input" data-id="${producto.id}">
      </td>
      <td>$${subtotal.toLocaleString("es-CL")}</td>
      <td>
        <button class="btn-delete" data-id="${producto.id}">✕</button>
      </td>
    `;

    cuerpoTabla.appendChild(fila);
  });

  // Mostrar el cuadro de resumen y total
  resumenCarrito.innerHTML = `
    <div class="summary-box">
      <h3>Resumen del Pedido</h3>
      <div class="summary-row">
        <span>Total:</span>
        <span class="summary-total">$${precioTotalAcumulado.toLocaleString("es-CL")}</span>
      </div>
      <button class="btn btn-primary btn-block" id="btn-pagar">Pagar Ahora</button>
      <button class="btn btn-outline btn-block mt-8" id="btn-vaciar">Vaciar Carrito</button>
    </div>
  `;

  // --- EVENTOS DE LOS BOTONES Y ENTRADAS ---

  // Evento 1: Cambiar cantidad de productos
  document.querySelectorAll(".cart-qty-input").forEach(function (input) {
    input.addEventListener("change", function (e) {
      const id = parseInt(e.target.dataset.id);
      const nuevaCantidad = parseInt(e.target.value);
      if (nuevaCantidad > 0) {
        cambiarCantidad(id, nuevaCantidad);
      }
    });
  });

  // Evento 2: Eliminar un solo producto
  document.querySelectorAll(".btn-delete").forEach(function (boton) {
    boton.addEventListener("click", function (e) {
      const id = parseInt(e.target.dataset.id);
      eliminarUnProducto(id);
    });
  });

  // Evento 3: Vaciar todo el carrito
  const botonVaciar = document.getElementById("btn-vaciar");
  if (botonVaciar) {
    botonVaciar.addEventListener("click", vaciarTodoElCarrito);
  }

  // Evento 4: Pagar (Mensaje personalizable aquí)
  const botonPagar = document.getElementById("btn-pagar");
  if (botonPagar) {
    botonPagar.addEventListener("click", function () {
      // Puedes cambiar la frase de aquí por la que tú quieras
      alert("¡Gracias por tu compra! Tu pedido ha sido procesado con éxito.");
      vaciarTodoElCarrito();
    });
  }
}

// ==========================================
// 4. ACCIONES DEL CARRITO (Modificar / Eliminar)
// ==========================================

// Cambiar la cantidad de un producto específico
function cambiarCantidad(idProducto, nuevaCantidad) {
  let carrito = obtenerCarrito();
  const producto = carrito.find(function (p) {
    return p.id === idProducto;
  });

  if (producto) {
    producto.cantidad = nuevaCantidad;
    guardarCarrito(carrito);
    mostrarCarritoEnPantalla();
  }
}

// Eliminar un solo producto de la lista
function eliminarUnProducto(idProducto) {
  let carrito = obtenerCarrito();
  
  // Guardamos todos los productos EXCEPTO el que queremos borrar
  let carritoNuevo = carrito.filter(function (p) {
    return p.id !== idProducto;
  });

  guardarCarrito(carritoNuevo);
  mostrarCarritoEnPantalla();
}

// Vaciar por completo el carrito
function vaciarTodoElCarrito() {
  localStorage.removeItem("carrito_levelup");
  actualizarContadorHeader();
  mostrarCarritoEnPantalla();
}

// ==========================================
// 5. INICIALIZACIÓN AL CARGAR LA PÁGINA
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
  actualizarContadorHeader();
  mostrarCarritoEnPantalla();
});