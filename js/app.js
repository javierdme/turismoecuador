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
   DESTINOS ECUADOR
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

    "Puerto López"

];

/* =========================================
   BUSQUEDA DINAMICA
========================================= */

inputPais.addEventListener("input", () => {

    const texto =
    inputPais.value.toLowerCase();

    if (texto.length === 0) {

        contenedor.innerHTML = "";

        estado.innerHTML = "";

        return;
    }

    const filtrados =
    destinosEcuador.filter(destino =>

        destino.toLowerCase().includes(texto)

    );

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

            /* =================================
               PRIMER FETCH
            ================================= */

            const response =
            await fetch(
            `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(destino)}`
            );

            if (!response.ok) {

                throw new Error("404");
            }

            const data =
            await response.json();

            const tarjeta =
            document.createElement("article");

            tarjeta.classList.add("tarjeta-pais");

            tarjeta.innerHTML = `

                <img
                    src="${data.thumbnail?.source || 'img/default.jpg'}"
                    alt="${data.title}"
                >

                <div class="tarjeta-contenido">

                    <h3>${data.title}</h3>

                    <p class="descripcion-pais">

                        ${data.extract.substring(0, 140)}...

                    </p>

                </div>
            `;

            tarjeta.addEventListener("click", () => {

                obtenerDetalle(destino);

            });

            fragment.appendChild(tarjeta);

        } catch (error) {

            console.log(error);
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
        `https://es.wikipedia.org/api/rest_v1/page/mobile-sections/${encodeURIComponent(destino)}`
        );

        if (!response.ok) {

            throw new Error("404");
        }

        const data =
        await response.json();

        mostrarDetalle(data);

        estado.innerHTML = "";

    } catch (error) {

        manejarErrores(error);
    }
}

/* =========================================
   MOSTRAR MODAL
========================================= */

function mostrarDetalle(data) {

    modal.classList.remove("oculto");

    const imagen =
    data.lead?.sections?.[0]?.thumbnail?.source
    || "img/default.jpg";

    const titulo =
    data.lead?.displaytitle || "Destino";

    const descripcion =
    data.lead?.sections?.[0]?.text
    || "Información no disponible.";

    detallePais.innerHTML = `

        <img
            src="${imagen}"
            class="detalle-img"
        >

        <div class="detalle-info">

            <h2>${titulo}</h2>

            <div>

                ${descripcion}

            </div>

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
