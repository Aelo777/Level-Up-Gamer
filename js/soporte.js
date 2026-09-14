document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-soporte");
  const nombreInput = document.getElementById("nombre");
  const emailInput = document.getElementById("email");
  const comentarioInput = document.getElementById("comentario");

  const errorNombre = document.getElementById("error-nombre");
  const errorEmail = document.getElementById("error-email");
  const errorComentario = document.getElementById("error-comentario");
  const feedback = document.getElementById("soporte-feedback");

  const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let esValido = true;

    // Limpiar errores previos
    errorNombre.style.display = "none";
    errorEmail.style.display = "none";
    errorComentario.style.display = "none";
    feedback.style.display = "none";

    const nombreVal = nombreInput.value.trim();
    const emailVal = emailInput.value.trim();
    const comentarioVal = comentarioInput.value.trim();

    // 1. Validar Nombre (Requerido, máx 100 caracteres)[cite: 1]
    if (!nombreVal) {
      errorNombre.textContent = "El nombre es requerido.";
      errorNombre.style.display = "block";
      esValido = false;
    } else if (nombreVal.length > 100) {
      errorNombre.textContent = "El nombre no puede superar los 100 caracteres.";
      errorNombre.style.display = "block";
      esValido = false;
    }

    // 2. Validar Correo (Requerido, máx 100 caracteres, dominios específicos)[cite: 1]
    const dominioValido = dominiosPermitidos.some(dom => emailVal.toLowerCase().endsWith(dom));
    if (!emailVal) {
      errorEmail.textContent = "El correo electrónico es requerido.";
      errorEmail.style.display = "block";
      esValido = false;
    } else if (emailVal.length > 100) {
      errorEmail.textContent = "El correo no puede superar los 100 caracteres.";
      errorEmail.style.display = "block";
      esValido = false;
    } else if (!dominioValido) {
      errorEmail.textContent = "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
      errorEmail.style.display = "block";
      esValido = false;
    }

    // 3. Validar Comentario (Requerido, máx 500 caracteres)[cite: 1]
    if (!comentarioVal) {
      errorComentario.textContent = "El comentario es requerido.";
      errorComentario.style.display = "block";
      esValido = false;
    } else if (comentarioVal.length > 500) {
      errorComentario.textContent = "El comentario no puede superar los 500 caracteres.";
      errorComentario.style.display = "block";
      esValido = false;
    }

    // 4. Éxito
    if (esValido) {
      feedback.textContent = "¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.";
      feedback.style.color = "#39FF14"; // Verde Neón
      feedback.style.display = "block";
      form.reset();
    }
  });
});
