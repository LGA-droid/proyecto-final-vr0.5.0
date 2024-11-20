const menus = [
    {nombre: "Inicio", url: "index.html"},
   
    {nombre: "Contacto", url: "contacto.html"},
    {nombre: "Carrito", url: "carrito.html"},
];

function cargarmenu() {
    let enlaces = document.getElementById("ulmenu");
    for (const menu of menus) {
        let lista = document.createElement("li");
        lista.innerHTML = `<a href="${menu.url}">${menu.nombre}</a>`;
        enlaces.appendChild(lista);
    }
}
cargarmenu()

const productos = [
    {
        id: 1,
        nombre: "",
        urlImagen: "",
        precio: 0,
        descripcion: "",
        stock: 15
    },
    {
        id: 2,
        nombre: "",
        urlImagen: "",
        precio: 1700,
        descripcion: "",
        stock: 8
    },
    {
        id: 3,
        nombre: "",
        urlImagen: "",
        precio: 1100,
        descripcion: "",
        stock: 25
    },
    {
        id: 4,
        nombre: "",
        urlImagen: "",
        precio: 1100,
        descripcion: "",
        stock: 25
    },
    {
        id:5,
        nombre: "",
        urlImagen: "",
        precio: 60,
        descripcion: "",
        stock: 25
    },
    {
        id: 6,
        nombre: "",
        urlImagen: "",
        precio: 1100,
        descripcion: "",
        stock: 10
    },
    {
        id: 7,
        nombre: "",
        urlImagen: "",
        precio: 1100,
        descripcion: "",
        stock: 6
    },
    {
        id: 8,
        nombre: "",
        urlImagen: "",
        precio: 1100,
        descripcion: " ",
        stock: 25
    },
    {
        id: 9,
        nombre: " ",
        urlImagen: "",
        precio: 1100,
        descripcion: " ",
        stock: 25
    },
    {
        id: 10,
        nombre: "",
        urlImagen: "",
        precio: 1100,
        descripcion: " ",
        stock: 25
    },

    
];

function cargarproductos() {
    let enlaces = document.getElementById("boxproductos");
    for (const producto of productos) {
        let lista = document.createElement("div");
        lista.classList.add('producto-card');
        lista.innerHTML = `
            <h3>${producto.nombre}</h3>
            <img src="${producto.urlImagen}" alt="${producto.nombre}">
            <p class="precio">$${producto.precio}</p>
            <button onclick="verdetalle(${producto.id})">Detalles</button>
        `;
        enlaces.appendChild(lista);
    }
}
cargarproductos();

function verdetalle(idproducto) {
    // Se guarda el producto que se desea ver en localStorage
    const buscarProducto = productos.find(producto => producto.id === idproducto);
    if (buscarProducto) {
        const enJSON = JSON.stringify(buscarProducto);
        localStorage.setItem("detalleproducto", enJSON);
        window.location.href = "detalle.html";
    } else {
        console.error("Producto no encontrado");
    }
}
