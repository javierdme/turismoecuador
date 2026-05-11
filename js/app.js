const inputPais =
document.querySelector("#inputPais");

const contenedor =
document.querySelector("#contenedorTarjetas");

const estado =
document.querySelector("#estado");

const modal =
document.querySelector("#modal");

const detallePais =
document.querySelector("#detallePais");

const cerrarModal =
document.querySelector("#cerrarModal");

/* =========================================
   BUSQUEDA DINAMICA
========================================= */

inputPais.addEventListener("input", () => {

    const texto =
    inputPais.value.trim();

    if (texto.length < 2) {

        contenedor.innerHTML = "";

        estado.innerHTML = "";

        return;
    }

    buscarPais(texto);

});

/* =========================================
   PRIMER FETCH
========================================= */

async function buscarPais(nombrePais) {

    try {

        estado.innerHTML = `

            <div class="spinner">

                Buscando países...

            </div>
        `;

        contenedor.innerHTML = "";

        const response =
        await fetch(
            `https://restcountries.com/v3.1/name/${nombrePais}`
        );

        if (!response.ok) {

            throw new Error(
                `Error HTTP ${response.status}`
            );
        }

        const data =
        await response.json();

        renderizarTarjetas(data);

        estado.innerHTML = "";

    } catch (error) {

        console.error(error);

        manejarErrores(error);
    }
}

/* =========================================
   RENDERIZAR TARJETAS
========================================= */

function renderizarTarjetas(paises) {

    contenedor.innerHTML = "";

    const fragment =
    document.createDocumentFragment();

    paises.forEach(pais => {

        const tarjeta =
        document.createElement("article");

        tarjeta.classList.add("tarjeta-pais");

        tarjeta.innerHTML = `

            <img
                src="${pais.flags.svg}"
                alt="${pais.name.common}"
            >

            <div class="tarjeta-contenido">

                <h3>
                    ${pais.name.common}
                </h3>

                <p>

                    <strong>Capital:</strong>

                    ${pais.capital?.[0] || "N/A"}

                </p>

                <p>

                    <strong>Población:</strong>

                    ${pais.population.toLocaleString()}

                </p>

            </div>
        `;

        /* =============================
           SEGUNDO FETCH
        ============================== */

        tarjeta.addEventListener("click", () => {

            obtenerDetalle(
                pais.cca3
            );

        });

        fragment.appendChild(tarjeta);

    });

    contenedor.appendChild(fragment);
}

/* =========================================
   SEGUNDO FETCH
========================================= */

async function obtenerDetalle(codigoPais) {

    try {

        estado.innerHTML = `

            <div class="spinner">

                Cargando detalle...

            </div>
        `;

        const response =
        await fetch(
            `https://restcountries.com/v3.1/alpha/${codigoPais}`
        );

        if (!response.ok) {

            throw new Error(
                `Error HTTP ${response.status}`
            );
        }

        const data =
        await response.json();

        mostrarDetalle(data[0]);

        estado.innerHTML = "";

    } catch (error) {

        console.error(error);

        manejarErrores(error);
    }
}

/* =========================================
   MODAL
========================================= */

function mostrarDetalle(pais) {

    modal.classList.remove("oculto");

    detallePais.innerHTML = `

        <img
            src="${pais.flags.svg}"
            class="detalle-img"
            alt="${pais.name.common}"
        >

        <div class="detalle-info">

            <h2>

                ${pais.name.common}

            </h2>

            <p>

                <strong>Capital:</strong>

                ${pais.capital?.[0] || "N/A"}

            </p>

            <p>

                <strong>Región:</strong>

                ${pais.region}

            </p>

            <p>

                <strong>Subregión:</strong>

                ${pais.subregion || "N/A"}

            </p>

            <p>

                <strong>Población:</strong>

                ${pais.population.toLocaleString()}

            </p>

            <p>

                <strong>Área:</strong>

                ${pais.area.toLocaleString()} km²

            </p>

        </div>
    `;
}

/* =========================================
   CERRAR MODAL
========================================= */

cerrarModal.addEventListener("click", () => {

    modal.classList.add("oculto");

});

window.addEventListener("click", (e) => {

    if (e.target === modal) {

        modal.classList.add("oculto");
    }
});

/* =========================================
   ERRORES
========================================= */

function manejarErrores(error) {

    contenedor.innerHTML = "";

    estado.innerHTML = `

        <div class="spinner">

            Error cargando información.

            <br><br>

            Verifica conexión o intenta nuevamente.

        </div>
    `;
}
