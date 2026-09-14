// Capturar elementos del DOM
const formRegistro = document.getElementById('form-registro');
const inputFecha = document.getElementById('birthdate');
const inputEmail = document.getElementById('email');
const cajaAlerta = document.getElementById('alerta-registro');

// Función para validar el RUT chileno
function validarRut(rutInput) {
    // Limpiar y dejar la letra K en mayúscula
    const rutLimpio = rutInput.trim().toUpperCase();
    
    // Validar longitud (8 a 9 caracteres) y patrón (números + posible K al final)
    const regex = /^[0-9]{7,8}[0-9K]$/;
    if (!regex.test(rutLimpio)) {
        return "El formato debe ser de 8 a 9 caracteres, solo números y K al final.";
    }

    // Extraer la parte numérica para validar que sea menor a 30 millones
    const cuerpo = parseInt(rutLimpio.slice(0, -1), 10);
    if (cuerpo >= 30000000) {
        return "El RUT ingresado corresponde a una empresa.";
    }

    return null; // Todo OK
}

// Función para calcular si tiene 18 años o más
function esMayorDeEdad(fechaNacimientoStr) {
  if (!fechaNacimientoStr) return false;

  const fechaNac = new Date(fechaNacimientoStr);
  const hoy = new Date();

  let edad = hoy.getFullYear() - fechaNac.getFullYear();
  const mesActual = hoy.getMonth();
  const mesNac = fechaNac.getMonth();

  if (mesActual < mesNac || (mesActual === mesNac && hoy.getDate() < fechaNac.getDate())) {
    edad--;
  }

  return edad >= 18;
}

// Función 1: Verificar si el correo es válido según la pauta (@duoc.cl, @profesor.duoc.cl, @gmail.com)[cite: 1, 6]
function esCorreoValido(email) {
  const emailLimpio = email.trim().toLowerCase();
  return emailLimpio.endsWith('@duoc.cl') || 
  emailLimpio.endsWith('@profesor.duoc.cl') || 
  emailLimpio.endsWith('@gmail.com') ||
  emailLimpio.endsWith('@duocuc.cl');
}

// Función 2: Verificar si aplica el beneficio institucional Duoc
function esCorreoDuoc(email) {
  const emailLimpio = email.trim().toLowerCase();
  return emailLimpio.endsWith('@duoc.cl') || 
  emailLimpio.endsWith('@profesor.duoc.cl') || 
  emailLimpio.endsWith('@duocuc.cl');
}

// Manejo del evento de envío (Submit)
formRegistro.addEventListener('submit', function (evento) {
  evento.preventDefault();

  const emailValor = inputEmail.value.trim();
  const fechaValor = inputFecha.value;

  // 1. Validar formato de correo permitido
  if (!esCorreoValido(emailValor)) {
    mostrarAlerta('Error: Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com[cite: 1, 6].', 'error');
    inputEmail.focus();
    return;
  }

  // 2. Validar mayoría de edad[cite: 6]
  if (!esMayorDeEdad(fechaValor)) {
    mostrarAlerta('Debes ser mayor de 18 años para registrarte en Level-Up Gamer[cite: 6].', 'error');
    inputFecha.focus();
    return;
  }

  // 3. Comprobar si aplica el beneficio Duoc
  if (esCorreoDuoc(emailValor)) {
    mostrarAlerta('¡Registro exitoso! Se ha validado tu correo institucional. Se aplicó tu 20% de descuento vitalicio[cite: 6].', 'exito');
  } else {
    mostrarAlerta('¡Registro exitoso! Bienvenido a la comunidad Level-Up Gamer.', 'exito');
  }

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