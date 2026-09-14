document.addEventListener("DOMContentLoaded", () => {
  const userNav = document.getElementById("user-nav");
  if (!userNav) return;

  const sesionRaw = localStorage.getItem("sesionActiva");

  if (sesionRaw) {
    try {
      const sesion = JSON.parse(sesionRaw);
      const nombreMostrar = sesion.usuario || "Gamer";

      // Renderiza saludo, enlace al perfil y botón de salida
      userNav.innerHTML = `
        <span style="color: #39FF14; font-weight: bold; margin-right: 8px;">
          ¡Hola, @${nombreMostrar}!
        </span>
        <button id="btn-logout" style="background: none; border: 1px solid #ff4d4d; color: #ff4d4d; padding: 2px 8px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
          Salir
        </button>
      `;

      // Evento para cerrar sesión
      document.getElementById("btn-logout").addEventListener("click", () => {
        localStorage.removeItem("sesionActiva");
        window.location.reload();
      });
    } catch (e) {
      console.error("Error al procesar sesión:", e);
      localStorage.removeItem("sesionActiva");
    }
  }
});