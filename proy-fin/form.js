// Definición de un array 'menus' que contiene los elementos de navegación con sus nombres y URLs
const menus = [
    { nombre: "Inicio", url: "index.html" },         // Menú "Inicio"
    { nombre: "¿Quienes somos?", url: "quienes.html" }, // Menú "¿Quienes somos?"
    { nombre: "Contacto", url: "contacto.html" },    // Menú "Contacto"
    { nombre: "Carrito", url: "carrito.html" },      // Menú "Carrito"
];

// Función para cargar el menú dinámicamente en la página
function cargarmenu() {
    // Obtiene el elemento con el id "ulmenu", donde se insertarán los ítems del menú
    let enlaces = document.getElementById("ulmenu");

    // Si se encuentra el contenedor "ulmenu", se crean los ítems del menú
    if (enlaces) {
        // Recorre cada objeto del array 'menus' para crear un ítem de lista (<li>) con su respectivo enlace
        for (const menu of menus) {
            let lista = document.createElement("li"); // Crea un nuevo elemento de lista (<li>) para cada menú
            lista.innerHTML = `<a href="${menu.url}">${menu.nombre}</a>`; // Inserta un enlace (<a>) con la URL y el nombre del menú
            enlaces.appendChild(lista); // Añade el <li> creado al contenedor "ulmenu"
        }
    } else {
        console.error("No se encontró el elemento 'ulmenu'"); // Muestra un mensaje de error si no se encuentra el contenedor
    }
}

// Llama a la función cargarmenu para cargar el menú al cargar la página
cargarmenu();
