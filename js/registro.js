// Capturar elementos del DOM
const formRegistro = document.getElementById('form-registro');
const inputFecha = document.getElementById('birthdate');
const inputEmail = document.getElementById('email');
const cajaAlerta = document.getElementById('alerta-registro');

// Función para calcular si tiene 18 años o más
function esMayorDeEdad(fechaNacimientoStr) {
  if (!fechaNacimientoStr) return false;

  const fechaNac = new Date(fechaNacimientoStr);
  const hoy = new Date();

  let edad = hoy.getFullYear() - fechaNac.getFullYear();
  const mesActual = hoy.getMonth();
  const mesNac = fechaNac.getMonth();

  // Ajuste si aún no ha cumplido años en el mes en curso
  if (mesActual < mesNac || (mesActual === mesNac && hoy.getDate() < fechaNac.getDate())) {
    edad--;
  }

  return edad >= 18;
}

// Función para verificar si el correo es institucional Duoc
function esCorreoDuoc(email) {
  const emailLimpio = email.trim().toLowerCase();
  return emailLimpio.endsWith('@duocuc.cl') || emailLimpio.endsWith('@profesor.duoc.cl');
}

// Manejo del evento de envío (Submit)
formRegistro.addEventListener('submit', function (evento) {
  evento.preventDefault(); // Detiene el envío automático para validar primero

  const emailValor = inputEmail.value.trim();
  const fechaValor = inputFecha.value;

  // 1. Validar mayoría de edad
  if (!esMayorDeEdad(fechaValor)) {
    mostrarAlerta('Debes ser mayor de 18 años para registrarte en Level-Up Gamer.', 'error');
    inputFecha.focus();
    return;
  }

  // 2. Comprobar si aplica el beneficio Duoc
  if (esCorreoDuoc(emailValor)) {
    mostrarAlerta('¡Registro exitoso! Se ha validado tu correo institucional. Se aplicó tu 20% de descuento vitalicio.', 'exito');
  } else {
    mostrarAlerta('¡Registro exitoso! Bienvenido a la comunidad Level-Up Gamer.', 'exito');
  }

  // Opcional: limpiar el formulario tras un envío correcto
  // formRegistro.reset();
});

// Función utilitaria para estilizar los avisos dinámicos
function mostrarAlerta(mensaje, tipo) {
  cajaAlerta.textContent = mensaje;
  cajaAlerta.style.display = 'block';

  if (tipo === 'error') {
    cajaAlerta.className = 'alerta-box alerta-error';
  } else {
    cajaAlerta.className = 'alerta-box alerta-exito';
  }
}