const inputPais = document.getElementById("inputPais");
const btnBuscar = document.getElementById("btnBuscar");

const contenedor = document.getElementById("contenedorTarjetas");

const estado = document.getElementById("estado");

const modal = document.getElementById("modal");

const detallePais = document.getElementById("detallePais");

const cerrarModal = document.getElementById("cerrarModal");

btnBuscar.addEventListener("click", () => {

    const pais = inputPais.value.trim();

    buscarPais(pais);

});

async function buscarPais(nombrePais){

    contenedor.innerHTML = "";

    estado.innerHTML = `
        <div class="spinner">
            Cargando...
        </div>
    `;

    try{

        const url =
        `https://restcountries.com/v3.1/name/${nombrePais}`;

        const response = await fetch(url);

        if(!response.ok){

            if(response.status === 404){

                throw new Error("404");

            }

            if(response.status >= 500){

                throw new Error("500");

            }

            throw new Error("general");
        }

        const data = await response.json();

        estado.innerHTML = "";

        renderizarTarjetas(data);

    }catch(error){

        manejarErrores(error);

    }
}


function renderizarTarjetas(paises){

    contenedor.innerHTML = "";

    if(paises.length === 0){

        estado.innerHTML =
        "<p>No se encontraron resultados</p>";

        return;
    }

    const fragment =
    document.createDocumentFragment();

    paises.forEach(pais => {

        const tarjeta =
        document.createElement("div");

        tarjeta.classList.add("tarjeta");

        tarjeta.innerHTML = `
            <img src="${pais.flags.png}">

            <h2>${pais.name.common}</h2>

            <p>
                Capital:
                ${pais.capital?.[0] || "No disponible"}
            </p>

            <p>
                Población:
                ${pais.population.toLocaleString()}
            </p>
        `;

        tarjeta.addEventListener("click", () => {

            obtenerDetalle(pais.name.common);

        });

        fragment.appendChild(tarjeta);

    });

    contenedor.appendChild(fragment);
}

async function obtenerDetalle(nombre){

    try{

        const response =
        await fetch(
        `https://restcountries.com/v3.1/name/${nombre}`
        );

        const data = await response.json();

        mostrarDetalle(data[0]);

    }catch(error){

        alert("Error cargando detalle");

    }
}

function mostrarDetalle(pais){

    modal.classList.remove("oculto");

    detallePais.innerHTML = `
        <h2>${pais.name.common}</h2>

        <img
            src="${pais.flags.png}"
            width="100%"
        >

        <p>
            Región:
            ${pais.region}
        </p>

        <p>
            Subregión:
            ${pais.subregion}
        </p>

        <p>
            Área:
            ${pais.area.toLocaleString()} km²
        </p>

        <p>
            Continente:
            ${pais.continents[0]}
        </p>
    `;
}

cerrarModal.addEventListener("click", () => {

    modal.classList.add("oculto");

});

function manejarErrores(error){

    contenedor.innerHTML = "";

    if(error.message === "404"){

        estado.innerHTML = `
            <p>
                No se encontraron países
            </p>

            <button onclick="reintentar()">
                Reintentar
            </button>
        `;

        return;
    }

    if(error.message === "500"){

        estado.innerHTML = `
            <p>
                Error del servidor
            </p>
        `;

        return;
    }

    estado.innerHTML = `
        <p>
            Sin conexión a internet
        </p>
    `;
}

function reintentar(){

    estado.innerHTML = "";

}

<li>
    <a href="explorar.html">
        Explorar Países
    </a>
</li>

