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
