// Array de frutas
let arrayFrutas = [
    {
        id: 1,
        nombre: "anana",
        precio: 100,
        imagen: "./img/anana.jpg"
    },
    {
        id: 2,
        nombre: "Anadanos",
        precio: 15,
        imagen: "./img/arandano.jpg"
    },
    {
        id: 3,
        nombre: "banana",
        precio: 20,
        imagen: "./img/banana.jpg"
    },
    {
        id: 4,
        nombre: "frambuesa",
        precio: 30,
        imagen: "./img/frambuesa.png"
    },
    {
        id: 5,
        nombre: "kiwi",
        precio: 400,
        imagen: "./img/kiwi.jpg"
    },
    {
        id: 6,
        nombre: "frutilla",
        precio: 60,
        imagen: "./img/frutilla.jpg"
    },
    {
        id: 7,
        nombre: "mandarina",
        precio: 23,
        imagen: "./img/mandarina.jpg"
    },
    {
        id: 8,
        nombre: "pomelo-amarillo",
        precio: 70,
        imagen: "./img/pomelo-amarillo.jpg"
    },
    {
        id: 9,
        nombre: "naranja",
        precio: 29,
        imagen: "./img/naranja.jpg"
    },
    {
        id: 10,
        nombre: "manzana",
        precio: 45,
        imagen: "./img/manzana.jpg"
    },
    {
        id: 11,
        nombre: "pera",
        precio: 68,
        imagen: "./img/pera.jpg"
    },
    {
        id: 12,
        nombre: "sandia",
        precio: 90,
        imagen: "./img/sandia.jpg"
    },
    {
        id: 13,
        nombre: "pomelo-rojo",
        precio: 40,
        imagen: "./img/pomelo-rojo.jpg"
    }
]

// Array de alumnos
let alumno = [
    {
        nombre: "Juan Pablo",
        apellido: "Gonzalez",
        dni: 43979037
    }
]

// Declaracion de variables en donde se obtienen los elementos del HTML
let contenedorFrutas = document.getElementById("contenedor-productos");
let contenedorDatosAlumno = document.getElementById("nombreAlumno");
let contenedorCarrito = document.getElementById("items-carrito");
let inputBuscar = document.getElementById("input-buscar");

// Declaracion de eventos
inputBuscar.addEventListener("keyup", filtrarFruta);

// Declaracion de variables
let carrito = [];

/**
 * En la siguiente funcion lo que hice fue recorrer el array de frutas y mostrarlas en el HTML de manera dinamica utilizando un forEach
 * @param {Array} array 
 */
function mostrarFrutas(array) {
    let innerHtml = "";
    array.forEach(fruta => {
        innerHtml += `
            <div class="card-producto">
                <img src="${fruta.imagen}" alt="${fruta.nombre}">
                <h3>${fruta.nombre}</h3>
                <p>$${fruta.precio}</p>
                <button class="boton-agregar" onclick="agregarProducto(${fruta.id})">Agregar al carrito</button>
            </div>
        `
    });
    contenedorFrutas.innerHTML = innerHtml;
}

/**
 * Esta funcion itera sobre el array de objetos alumno y muestra en pantalla 
 * en el elemento con id "nombreAlumno" el nombre y apellido del alumno. 
 * Ademas, muestra en consola el nombre, apellido y DNI del alumno.
 * @param {Array} array - array de objetos alumno 
 */
function imprimirDatosAlumno(array) {
    let innerHTML = "";
    array.forEach(alumno => {
        console.log(`Mi nombre es ${alumno.nombre} ${alumno.apellido} y mi DNI es ${alumno.dni}`);
        innerHTML += `
            <nav>
                    <p>${alumno.nombre} ${alumno.apellido}</p>
            </nav>
        `;
    });
    contenedorDatosAlumno.innerHTML = innerHTML;
}

/**
 * Muestra en pantalla el array de objetos que se le pasa como parametro 
 * en el elemento con id "items-carrito" en el HTML. 
 * Si el array esta vacio, muestra un mensaje que indica que no hay elementos en el carrito.
 * @param {Array} array - array de objetos que se mostrara en el HTML
 */
function mostrarCarrito(array) {
    let innerHTML = "";

    if(array.length === 0) {
        innerHTML = `<p>No hay elementos en el carrito.</p>`;
    }
    else {
        array.forEach(fruta => {
        innerHTML += `
                <li class="bloque-item">
                    <p class="nombre-item">${fruta.nombre} - $${fruta.precio}</p>
                    <button class="boton-eliminar" onclick="eliminarProducto(${fruta.id})">Eliminar</button>
                </li>
            `;
    });
    }
    contenedorCarrito.innerHTML = innerHTML;
    actualizarContadorCarrito();
    actualizarTotalCarrito();
}

/**
 * Filtra el array de frutas por el valor ingresado en el input de busqueda.
 * Muestra en el HTML el array de frutas filtrado o un mensaje de no se encontraron frutas
 * si el array filtrado esta vacio.
 * @param {String} busqueda - Valor ingresado en el input de busqueda.
 */
function filtrarFruta() {
    let busqueda = inputBuscar.value.toLowerCase();

    console.log(busqueda);

    let arrayFiltrado = arrayFrutas.filter(fruta => fruta.nombre.toLowerCase().includes(busqueda));

    if (arrayFiltrado.length === 0) {
        document.getElementById("contenedor-productos").innerHTML = `<h2>No se encontraron frutas</h2>`
    } else {
        mostrarFrutas(arrayFiltrado);
    }
}

/**
 * Agrega un producto al carrito utilizando su ID.
 * Busca el producto en el array de frutas, lo añade al carrito
 * y actualiza la visualización del carrito en el HTML.
 * 
 * @param {number} id - El identificador único del producto.
 */

function agregarProducto(id) {
    console.log(`Se agrego la fruta ${id} al carrito`);
    let objeto = arrayFrutas.find(fruta => fruta.id === id);
    carrito.push(objeto);
    mostrarCarrito(carrito);
    guardarLocalStorage(carrito)
}

/**
 * Elimina un producto del carrito por su ID.
 * Busca el producto en el array de frutas y lo elimina del carrito
 * y actualiza la visualización del carrito en el HTML.
 * 
 * @param {number} id - El identificador único del producto a eliminar.
 */
function eliminarProducto(id) {
    let objeto = arrayFrutas.find(fruta => fruta.id === id);
    if (objeto !== -1) {
        carrito.splice(objeto, 1);
        mostrarCarrito(carrito);
        guardarLocalStorage(carrito)
    }
    console.log(`Se elimino la fruta ${id} del carrito`);
}

/**
 * Guarda en localStorage el valor del carrito.
 * @param {Array} valor - Array de objetos con los productos del carrito.
 */
function guardarLocalStorage(valor) {
    localStorage.setItem("carrito", JSON.stringify(valor));
}

/**
 * Obtiene el valor del carrito guardado en localStorage
 * y lo devuelve como un array de objetos.
 * Si no hay valor guardado, devuelve un array vacio.
 * @returns {Array} Valor del carrito guardado en localStorage.
 */
function obtenerLocalStorage() {
    let carritoLocalStorage = localStorage.getItem("carrito");
    return carritoLocalStorage ? JSON.parse(carritoLocalStorage) : [];
}

/**
 * Actualiza el contador de productos en el carrito en el HTML.
 * Utiliza el valor actual del array de carrito y actualiza el texto
 * del elemento con id "contador-carrito" en el HTML.
 */
function actualizarContadorCarrito() {
    let contador = document.getElementById("contador-carrito");
    contador.textContent = `Carrito: ${carrito.length} productos${carrito.length !== 1 ? "s" : ""}`;
}

/**
 * Calcula el total del carrito.
 * Utiliza el metodo reduce() para sumar los precios de los productos del carrito.
 * @returns {number} El total del carrito.
 */
function calcularTotalCarrito() {
    return carrito.reduce((total, fruta) => total + fruta.precio, 0);
}

/**
 * Actualiza el total del carrito en el HTML.
 * Calcula el total del carrito con la funcion calcularTotalCarrito()
 * y actualiza el texto del elemento con id "total-carrito" en el HTML.
 */
function actualizarTotalCarrito() {
    let total = calcularTotalCarrito();
    let totalCarrito = document.getElementById("precio-total");
    totalCarrito.textContent = `Total: $${total}`;
}

document.getElementById("boton-limpiar").addEventListener('click', () => {
    if (carrito.length === 0) {
        alert("Carrito vacio");
    }
    else {
        if (confirm("¿Desea vaciar el carrito?")) {
            carrito = [];
            mostrarCarrito(carrito);
            guardarLocalStorage(carrito);        
        }
    }
});

document.getElementById("boton-ordenar-nombre"). addEventListener('click', () => {
    let ordenarNombre = [...arrayFrutas].sort((a, b) => a.nombre.localeCompare(b.nombre));
    mostrarFrutas(ordenarNombre);
});

document.getElementById("boton-ordenar-precio"). addEventListener('click', () => {
    let ordenarPrecio = [...arrayFrutas].sort((a, b) => a.precio - b.precio);
    mostrarFrutas(ordenarPrecio);
});

/**
 * Inicializa la aplicacion.
 * Muestra en pantalla el array de frutas y los datos del alumno.
 */
function init() {
    mostrarFrutas(arrayFrutas);
    imprimirDatosAlumno(alumno);
    carrito = obtenerLocalStorage();
    mostrarCarrito(carrito);
}

init();