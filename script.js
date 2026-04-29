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

  // nombre
  if (nombre.value.length < 3) {
    errorNombre.textContent = "Mínimo 3 caracteres";
    nombre.classList.add("error-input");
    valido = false;
  } else {
    errorNombre.textContent = "";
    nombre.classList.remove("error-input");
  }

  // email
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email.value)) {
    errorEmail.textContent = "Email inválido";
    valido = false;
  } else {
    errorEmail.textContent = "";
  }

  // telefono
  const regexTel = /^\d{7,10}$/;
  if (!regexTel.test(telefono.value)) {
    errorTelefono.textContent = "Solo números (7-10 dígitos)";
    valido = false;
  } else {
    errorTelefono.textContent = "";
  }

  // web
  if (web.value !== "") {
    const regexWeb = /^(https?:\/\/)?([\w\d]+\.)+\w{2,}(\/.+)?$/;
    if (!regexWeb.test(web.value)) {
      errorWeb.textContent = "URL inválida";
      valido = false;
    } else {
      errorWeb.textContent = "";
    }
  }

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

  const valor = nombre.value;

  mostrarEstado("buscando", `Buscando información de ${valor}...`);

  setTimeout(() => {
    mostrarEstado(
      "resultado",
      `Resultado encontrado para ${valor} 🌎 (simulado)`
    );

    localStorage.setItem("ultimaBusqueda", valor);

    form.reset();
    btn.disabled = true;

  }, 1500);
}


// === ESCUCHADORES DE EVENTOS ===
form.addEventListener("submit", manejarSubmit);

[nombre, email, telefono, web].forEach(input => {
  input.addEventListener("input", validar);
});


// recuperar última búsqueda
window.addEventListener("load", () => {
  const ultima = localStorage.getItem("ultimaBusqueda");

  if (ultima) {
    mostrarEstado("resultado", `Última búsqueda: ${ultima}`);
  }
});
