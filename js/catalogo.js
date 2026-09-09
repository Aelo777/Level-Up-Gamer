document.addEventListener("DOMContentLoaded", () => {
  const containerCategorias = document.querySelector("[data-category-filters]");
  const gridProductos = document.querySelector("[data-product-grid]");
  const emptyState = document.querySelector("[data-empty-state]");
  const inputSearch = document.querySelector("[data-search]");
  const btnSelectAll = document.querySelector("[data-select-all]");
  const btnSelectNone = document.querySelector("[data-select-none]");

  if (!gridProductos || typeof productos === "undefined") return;

  // Renderizar Filtros de Categorías
  const categorias = [...new Set(productos.map(p => p.categoria))];
  if (containerCategorias) {
    containerCategorias.innerHTML = categorias.map(cat => `
      <label>
        <input type="checkbox" value="${cat}" checked>
        ${cat}
      </label>
    `).join("");
  }

  // Renderizar Lista de Productos
  function renderProductos() {
    const textoBusqueda = inputSearch ? inputSearch.value.toLowerCase() : "";
    const checkboxes = containerCategorias ? containerCategorias.querySelectorAll("input:checked") : [];
    const categoriasSeleccionadas = Array.from(checkboxes).map(cb => cb.value);

    const filtrados = productos.filter(p => {
      const coincideNombre = p.nombre.toLowerCase().includes(textoBusqueda);
      const coincideCategoria = categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.includes(p.categoria);
      return coincideNombre && coincideCategoria;
    });

    if (filtrados.length === 0) {
      gridProductos.innerHTML = "";
      if (emptyState) emptyState.style.display = "block";
    } else {
      if (emptyState) emptyState.style.display = "none";
      gridProductos.innerHTML = filtrados.map(p => `
        <article class="product-card">
          <img src="${p.imagen}" alt="${p.nombre}">
          <p class="category-tag" style="color:var(--accent-neon); font-size:0.8rem; font-weight:bold; margin-top:5px;">${p.categoria}</p>
          <h4>${p.nombre}</h4>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin:5px 0;">${p.descripcion}</p>
          <p class="price">$${p.precio.toLocaleString("es-CL")}</p>
          <button type="button" class="btn btn-primary" style="width:100%; margin-top:10px;" onclick="agregarAlCarrito('${p.id}')">Agregar al carrito</button>
        </article>
      `).join("");
    }
  }

  // Listeners de eventos
  if (inputSearch) inputSearch.addEventListener("input", renderProductos);
  if (containerCategorias) containerCategorias.addEventListener("change", renderProductos);

  if (btnSelectAll) {
    btnSelectAll.addEventListener("click", () => {
      containerCategorias.querySelectorAll("input").forEach(cb => cb.checked = true);
      renderProductos();
    });
  }

  if (btnSelectNone) {
    btnSelectNone.addEventListener("click", () => {
      containerCategorias.querySelectorAll("input").forEach(cb => cb.checked = false);
      renderProductos();
    });
  }

  renderProductos();
});