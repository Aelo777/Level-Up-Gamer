document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-login");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const errorEmail = document.getElementById("error-email");
  const errorPassword = document.getElementById("error-password");
  const feedback = document.getElementById("login-feedback");

  const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let esValido = true;

    // Resetear mensajes
    errorEmail.style.display = "none";
    errorPassword.style.display = "none";
    feedback.style.display = "none";

    const emailVal = emailInput.value.trim();
    const passVal = passwordInput.value.trim();

    // 1. Validar Correo
    const dominioValido = dominiosPermitidos.some(dom => emailVal.toLowerCase().endsWith(dom));
    if (!emailVal) {
      errorEmail.textContent = "El correo electrónico es requerido.";
      errorEmail.style.display = "block";
      esValido = false;
    } else if (!dominioValido) {
      errorEmail.textContent = "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
      errorEmail.style.display = "block";
      esValido = false;
    }

    // 2. Validar Contraseña (entre 4 y 10 caracteres)
    if (!passVal) {
      errorPassword.textContent = "La contraseña es requerida.";
      errorPassword.style.display = "block";
      esValido = false;
    } else if (passVal.length < 4 || passVal.length > 10) {
      errorPassword.textContent = "La contraseña debe tener entre 4 y 10 caracteres.";
      errorPassword.style.display = "block";
      esValido = false;
    }

    // 3. Si todo está correcto -> Guardar sesión
    if (esValido) {
      // Extraemos el nombre antes del @ para mostrar como usuario
      const nombreUsuario = emailVal.split("@")[0];
      const sesion = {
        usuario: nombreUsuario,
        correo: emailVal
      };

      localStorage.setItem("sesionActiva", JSON.stringify(sesion));

      feedback.textContent = "¡Ingreso exitoso! Redirigiendo...";
      feedback.style.color = "#39FF14"; // Verde Neón
      feedback.style.display = "block";

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    }
  });
});