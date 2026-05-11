const inputPais = document.querySelector("#inputPais");

const btnBuscar = document.querySelector("#btnBuscar");

const contenedor = document.querySelector("#contenedorTarjetas");

const estado = document.querySelector("#estado");

const modal = document.querySelector("#modal");

const detallePais = document.querySelector("#detallePais");

const cerrarModal = document.querySelector("#cerrarModal");

/* =========================================
   EVENTO BUSCAR
========================================= */

btnBuscar.addEventListener("click", () => {

    const pais = inputPais.value.trim();

    if (pais === "") {

        estado.innerHTML = `
            <div class="spinner">
                Escribe un país para buscar
            </div>
        `;

        return;
    }

    localStorage.setItem("ultimaBusqueda", pais);

    buscarPais(pais);
});

/* =========================================
   BUSCAR PAÍS
========================================= */

async function buscarPais(nombrePais) {

    contenedor.innerHTML = "";

    estado.innerHTML = `
        <div class="spinner">
            <i class="fas fa-spinner fa-spin"></i>
            Buscando países...
        </div>
    `;

    try {

        const url =
        `https://restcountries.com/v3.1/name/${nombrePais}`;

        const response = await fetch(url);

        if (!response.ok) {

            if (response.status === 404) {
                throw new Error("404");
            }

            if (response.status >= 500) {
                throw new Error("500");
            }

            throw new Error("general");
        }

        const data = await response.json();

        estado.innerHTML = "";

        renderizarTarjetas(data);

    } catch (error) {

        manejarErrores(error);
    }
}

/* =========================================
   RENDERIZADO
========================================= */

function renderizarTarjetas(paises) {

    contenedor.innerHTML = "";

    if (paises.length === 0) {

        estado.innerHTML = `
            <div class="spinner">
                No se encontraron resultados
            </div>
        `;

        return;
    }

    const fragment =
    document.createDocumentFragment();

    paises.forEach(pais => {

        const tarjeta =
        document.createElement("article");

        tarjeta.classList.add("tarjeta-pais");

        tarjeta.innerHTML = `
            <img src="${pais.flags.png}" alt="${pais.name.common}">

            <div class="tarjeta-contenido">

                <h3>${pais.name.common}</h3>

                <p>
                    <strong>Capital:</strong>
                    ${pais.capital?.[0] || "No disponible"}
                </p>

                <p>
                    <strong>Región:</strong>
                    ${pais.region}
                </p>

                <p>
                    <strong>Población:</strong>
                    ${pais.population.toLocaleString()}
                </p>

            </div>
        `;

        tarjeta.addEventListener("click", () => {

            obtenerDetalle(pais.name.common);

        });

        fragment.appendChild(tarjeta);

    });

    contenedor.appendChild(fragment);
}

/* =========================================
   DETALLE
========================================= */

async function obtenerDetalle(nombre) {

    try {

        const response =
        await fetch(
        `https://restcountries.com/v3.1/name/${nombre}`
        );

        const data = await response.json();

        mostrarDetalle(data[0]);

    } catch (error) {

        alert("Error cargando detalle");
    }
}

/* =========================================
   MODAL
========================================= */

function mostrarDetalle(pais) {

    modal.classList.remove("oculto");

    detallePais.innerHTML = `
        <img
            src="${pais.flags.png}"
            class="detalle-img"
        >

        <div class="detalle-info">

            <h2>${pais.name.common}</h2>

            <p>
                <strong>Capital:</strong>
                ${pais.capital?.[0]}
            </p>

            <p>
                <strong>Región:</strong>
                ${pais.region}
            </p>

            <p>
                <strong>Subregión:</strong>
                ${pais.subregion || "No disponible"}
            </p>

            <p>
                <strong>Población:</strong>
                ${pais.population.toLocaleString()}
            </p>

            <p>
                <strong>Área:</strong>
                ${pais.area.toLocaleString()} km²
            </p>

            <p>
                <strong>Continente:</strong>
                ${pais.continents[0]}
            </p>

        </div>
    `;
}

cerrarModal.addEventListener("click", () => {

    modal.classList.add("oculto");

});

/* =========================================
   ERRORES
========================================= */

function manejarErrores(error) {

    contenedor.innerHTML = "";

    if (error.message === "404") {

        estado.innerHTML = `
            <div class="spinner">

                No se encontraron países

                <br><br>

                <button class="btn" onclick="reintentar()">
                    Reintentar
                </button>

            </div>
        `;

        return;
    }

    if (error.message === "500") {

        estado.innerHTML = `
            <div class="spinner">
                Error del servidor
            </div>
        `;

        return;
    }

    estado.innerHTML = `
        <div class="spinner">
            Sin conexión a internet
        </div>
    `;
}

function reintentar() {

    estado.innerHTML = "";

    inputPais.focus();
}

