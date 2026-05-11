// === SELECCIÓN DE ELEMENTOS ===
const form = document.querySelector("#formBusqueda");
const nombre = document.querySelector("#nombre");
const email = document.querySelector("#email");
const telefono = document.querySelector("#telefono");
const web = document.querySelector("#web");
const btn = document.querySelector("#btnEnviar");

const estado = document.querySelector("#estado");

// errores
const errorNombre = document.querySelector("#errorNombre");
const errorEmail = document.querySelector("#errorEmail");
const errorTelefono = document.querySelector("#errorTelefono");
const errorWeb = document.querySelector("#errorWeb");


// === FUNCIONES DE VALIDACIÓN ===
function validar() {
  let valido = true;

  // ===== NOMBRE =====
  if (nombre.value.trim().length < 3) {
    errorNombre.textContent = "Debe tener al menos 3 caracteres";
    nombre.classList.add("error-input");
    nombre.classList.remove("valid");
    valido = false;
  } else {
    errorNombre.textContent = "";
    nombre.classList.remove("error-input");
    nombre.classList.add("valid");
  }

  // ===== EMAIL =====
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email.value.trim())) {
    errorEmail.textContent = "Ingrese un email válido (ej: usuario@dominio.com)";
    email.classList.add("error-input");
    email.classList.remove("valid");
    valido = false;
  } else {
    errorEmail.textContent = "";
    email.classList.remove("error-input");
    email.classList.add("valid");
  }

  // ===== TELÉFONO =====
  const regexTel = /^\d{7,10}$/;
  if (!regexTel.test(telefono.value.trim())) {
    errorTelefono.textContent = "Solo números (7 a 10 dígitos)";
    telefono.classList.add("error-input");
    telefono.classList.remove("valid");
    valido = false;
  } else {
    errorTelefono.textContent = "";
    telefono.classList.remove("error-input");
    telefono.classList.add("valid");
  }

  // ===== WEB =====
  if (web.value.trim() === "") {
    errorWeb.textContent = "";
    web.classList.remove("error-input", "valid");
  } else {
    const regexWeb = /^(https?:\/\/)?([\w\d]+\.)+\w{2,}(\/.+)?$/;
    if (!regexWeb.test(web.value.trim())) {
      errorWeb.textContent = "Ingrese una URL válida";
      web.classList.add("error-input");
      web.classList.remove("valid");
      valido = false;
    } else {
      errorWeb.textContent = "";
      web.classList.remove("error-input");
      web.classList.add("valid");
    }
  }

  // activar o desactivar botón
  btn.disabled = !valido;

  return valido;
}


// === FUNCIONES DE RENDERIZADO ===
function mostrarEstado(tipo, texto = "") {
  estado.classList.remove("inicial", "buscando", "resultado");
  estado.classList.add(tipo);

  estado.innerHTML = `<p>${texto}</p>`;
}


// === MANEJO DEL SUBMIT ===
function manejarSubmit(e) {
  e.preventDefault();

  if (!validar()) return;

  const valor = nombre.value.trim();

  // estado buscando
  mostrarEstado("buscando", `Buscando información de ${valor}...`);

  setTimeout(() => {
    // estado resultado
    mostrarEstado(
      "resultado",
      `Resultado encontrado para ${valor} 🌎<br>
       Te recomendamos explorar este destino en Ecuador ✈️`
    );

    // guardar búsqueda
    localStorage.setItem("ultimaBusqueda", valor);

    // reset del formulario
    form.reset();

    // limpiar estilos visuales
    [nombre, email, telefono, web].forEach(input => {
      input.classList.remove("error-input", "valid");
    });

    btn.disabled = true;

  }, 1500);
}


// === ESCUCHADORES DE EVENTOS ===
form.addEventListener("submit", manejarSubmit);

[nombre, email, telefono, web].forEach(input => {
  input.addEventListener("input", validar);
});


// === RECUPERAR ÚLTIMA BÚSQUEDA ===
window.addEventListener("load", () => {
  const ultima = localStorage.getItem("ultimaBusqueda");

  if (ultima) {
    mostrarEstado("resultado", `Última búsqueda realizada: ${ultima}`);
  }
});
