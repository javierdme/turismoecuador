// js/app.js

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
   DESTINOS TURISTICOS ECUADOR
========================================= */

const destinosEcuador = [

    "Quito",

    "Baños de Agua Santa",

    "Cuenca",

    "Montañita",

    "Galápagos",

    "Otavalo",

    "Mindo",

    "Cotopaxi",

    "Papallacta",

    "Puerto López",

    "Tena",

    "Vilcabamba",

    "Salinas",

    "Atacames",

    "Riobamba"

];

/* =========================================
   BUSQUEDA DINAMICA
========================================= */

inputPais.addEventListener("input", () => {

    const texto =
    inputPais.value.toLowerCase().trim();

    if (texto.length === 0) {

        contenedor.innerHTML = "";

        estado.innerHTML = "";

        return;
    }

    const filtrados =
    destinosEcuador.filter(destino =>

        destino
        .toLowerCase()
        .includes(texto)

    );

    if (filtrados.length === 0) {

        contenedor.innerHTML = "";

        estado.innerHTML = `

            <div class="spinner">

                No se encontraron destinos.

            </div>
        `;

        return;
    }

    renderizarDestinos(filtrados);

});

/* =========================================
   RENDERIZAR TARJETAS
========================================= */

async function renderizarDestinos(destinos) {

    contenedor.innerHTML = "";

    estado.innerHTML = `

        <div class="spinner">

            Buscando destinos...

        </div>
    `;

    const fragment =
    document.createDocumentFragment();

    for (const destino of destinos) {

        try {

            /* =============================
               PRIMER FETCH
            ============================== */

            const response =
            await fetch(
                `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(destino)}`
            );

            if (!response.ok) {

                throw new Error(
                    `Error HTTP ${response.status}`
                );
            }

            const data =
            await response.json();

            const tarjeta =
            document.createElement("article");

            tarjeta.classList.add("tarjeta-pais");

            tarjeta.innerHTML = `

                <img
                    src="${
                        data.thumbnail?.source
                        || 'img/default.jpg'
                    }"

                    alt="${data.title}"
                >

                <div class="tarjeta-contenido">

                    <h3>
                        ${data.title}
                    </h3>

                    <p class="descripcion-pais">

                        ${
                            data.extract
                            ? data.extract.substring(0, 140)
                            : "Información turística no disponible."
                        }...

                    </p>

                </div>
            `;

            /* =============================
               SEGUNDO FETCH
            ============================== */

            tarjeta.addEventListener("click", () => {

                obtenerDetalle(destino);

            });

            fragment.appendChild(tarjeta);

        } catch (error) {

            console.error(error);
        }
    }

    estado.innerHTML = "";

    contenedor.appendChild(fragment);
}

/* =========================================
   SEGUNDO FETCH
========================================= */

async function obtenerDetalle(destino) {

    try {

        estado.innerHTML = `

            <div class="spinner">

                Cargando detalle...

            </div>
        `;

        const response =
        await fetch(
            `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(destino)}`
        );

        if (!response.ok) {

            throw new Error(
                `Error HTTP ${response.status}`
            );
        }

        const data =
        await response.json();

        mostrarDetalle(data);

        estado.innerHTML = "";

        /* =============================
           LOCAL STORAGE
        ============================== */

        localStorage.setItem(
            "ultimaBusqueda",
            destino
        );

    } catch (error) {

        console.error(error);

        manejarErrores(error);
    }
}

/* =========================================
   MOSTRAR MODAL
========================================= */

function mostrarDetalle(data) {

    modal.classList.remove("oculto");

    const imagen =
    data.thumbnail?.source
    || "img/default.jpg";

    const titulo =
    data.title || "Destino";

    const descripcion =
    data.extract
    || "Información no disponible.";

    const url =
    data.content_urls?.desktop?.page || "#";

    detallePais.innerHTML = `

        <img
            src="${imagen}"
            class="detalle-img"
            alt="${titulo}"
        >

        <div class="detalle-info">

            <h2>
                ${titulo}
            </h2>

            <p>
                ${descripcion}
            </p>

            <a
                href="${url}"
                target="_blank"
                class="btn-wiki"
            >

                Ver más en Wikipedia

            </a>

        </div>
    `;
}

/* =========================================
   CERRAR MODAL
========================================= */

cerrarModal.addEventListener("click", () => {

    modal.classList.add("oculto");

});

/* =========================================
   CERRAR MODAL HACIENDO CLICK AFUERA
========================================= */

window.addEventListener("click", (e) => {

    if (e.target === modal) {

        modal.classList.add("oculto");
    }
});

/* =========================================
   MANEJO ERRORES
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
