
function enviarFormulario() {
  const nombreInput = document.querySelector('input[name="nombre"]');
  const correoInput = document.querySelector('input[name="email"]');
  const mensajeInput = document.querySelector('textarea[name="message"]');

  const nombre = nombreInput.value.trim();
  const correo = correoInput.value.trim();
  const mensaje = mensajeInput.value.trim();

  const errorName = document.getElementById("error_name");
  const errorEmail = document.getElementById("error_email");
  const errorMessage = document.getElementById("error_message");

  // Limpiar errores anteriores
  errorName.textContent = "";
  errorEmail.textContent = "";
  errorMessage.textContent = "";

  errorName.style.display = "none";
  errorEmail.style.display = "none";
  errorMessage.style.display = "none";

  nombreInput.style.border = "";
  correoInput.style.border = "";
  mensajeInput.style.border = "";

  let valido = true;

  if (nombre.length < 3) {
    errorName.textContent = "El nombre debe tener al menos 3 caracteres.";
    errorName.style.display = "block";
    nombreInput.style.border = "2px solid red";
    valido = false;
  }

  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  if (!correoValido) {
    errorEmail.textContent = "El correo electrónico no es válido.";
    errorEmail.style.display = "block";
    correoInput.style.border = "2px solid red";
    valido = false;
  }

  if (mensaje.length < 10) {
    errorMessage.textContent = "El mensaje debe tener al menos 10 caracteres.";
    errorMessage.style.display = "block";
    mensajeInput.style.border = "2px solid red";
    valido = false;
  }

 if (valido) {
    emailjs.send("service_cippl45", "template_86h1ogm", {
      nombre: nombre,
      email: correo,
      mensaje: mensaje
    }).then(() => {
      // Limpiar campos
      document.querySelector("form").reset();

      // Evitar mensaje duplicado
      let mensajeExito = document.getElementById("mensaje_exito");
      if (mensajeExito) mensajeExito.remove();

      // Crear mensaje
      mensajeExito = document.createElement("p");
      mensajeExito.id = "mensaje_exito";
      mensajeExito.textContent = "✅ Tu mensaje fue enviado con éxito.";
      mensajeExito.style.color = "green";
      mensajeExito.style.marginTop = "1rem";

      const boton = document.querySelector("form button[type='submit']");
      boton.insertAdjacentElement("afterend", mensajeExito);

      // Eliminar después de 5 segundos (opcional)
      setTimeout(() => mensajeExito.remove(), 5000);

    }).catch((error) => {
      console.error("Error al enviar:", error);
      alert("❌ Ocurrió un error al enviar el mensaje. Inténtalo más tarde.");
    });
  }

  return false;
}

