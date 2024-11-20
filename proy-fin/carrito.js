const menus = [
    { nombre: "Inicio", url: "index.html" },
    { nombre: "¿Quienes somos?", url: "quienes.html" },
    { nombre: "Contacto", url: "contacto.html" },
    { nombre: "Carrito", url: "carrito.html" },
];

function cargarmenu() {
    let enlaces = document.getElementById("ulmenu");
    if (enlaces) {
        for (const menu of menus) {
            let lista = document.createElement("li");
            lista.innerHTML = `<a href="${menu.url}">${menu.nombre}</a>`;
            enlaces.appendChild(lista);
        }
    } else {
        console.error("No se encontró el elemento 'ulmenu'");
    }
}

cargarmenu();

// Obtener el carrito almacenado en localStorage
let productocarritos = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para cargar el carrito en la página
// Función para cargar el carrito en la página
function cargarCarrito() {
    let enlaces = document.getElementById("tablacarrito");
    enlaces.innerHTML = ""; // Limpiar tabla antes de cargar productos

    if (productocarritos.length > 0) {
        // Agrupar productos repetidos y sumar sus cantidades como números
        let productosAgrupados = {};

        productocarritos.forEach(producto => {
            producto.cantidad = parseInt(producto.cantidad, 10); // Convertir a número

            if (productosAgrupados[producto.id]) {
                productosAgrupados[producto.id].cantidad += producto.cantidad;
            } else {
                productosAgrupados[producto.id] = { ...producto }; // Copia del producto
            }
        });

        // Mostrar los productos agrupados en la tabla
        for (const id in productosAgrupados) {
            let productocarrito = productosAgrupados[id];
            let lista = document.createElement("tr");
            lista.id = `producto-${productocarrito.id}`;
            lista.innerHTML = `
                <td><img src="${productocarrito.urlImagen}" width="50"></td>
                <td>${productocarrito.cantidad}</td>
                <td>${productocarrito.nombre}</td>
                <td>$${productocarrito.precio}</td>
                <td>$${productocarrito.cantidad * productocarrito.precio}</td>
                <td><button onclick="eliminarProducto(${productocarrito.id})">Eliminar</button></td>
            `;
            enlaces.appendChild(lista);
        }

        // Calcular el total y la cantidad total de productos
        let total = 0;
        let cantidadTotal = 0;

        for (const id in productosAgrupados) {
            let producto = productosAgrupados[id];
            total += producto.cantidad * producto.precio;
            cantidadTotal += producto.cantidad;
        }

        // Mostrar el total final
       // Mostrar el total final con el botón de pago
        let totalFila = document.createElement("tr");
        totalFila.innerHTML = `
        <td colspan="5" style="text-align: right;">Total Final: $${total}</td>
        <td>
            <button onclick="window.location.href='pagar.html'">Ir a pagar</button>
        </td>
        `;
        enlaces.appendChild(totalFila);


        // Actualizar el número total de productos en el carrito (en el ícono)
        actualizarCarrito(cantidadTotal);

    } else {
        let mensaje = document.createElement("tr");
        mensaje.innerHTML = "<td colspan='6'>No hay productos en el carrito</td>";
        enlaces.appendChild(mensaje);

        // Restablecer el contador del carrito
        actualizarCarrito(0);
    }
}


// Llamar la función de cargar carrito al cargar la página
cargarCarrito();

// Función para actualizar el contador de productos en el carrito (ícono)
function actualizarCarrito(totalProductos) {
    totalProductos = parseInt(totalProductos, 10); // Convertir a número entero

    // Actualizar el contador en el ícono del carrito
    const cantidadCarritoElement = document.getElementById("cantidad-carrito");
    if (cantidadCarritoElement) {
        cantidadCarritoElement.textContent = totalProductos;
    }
}

// Función para eliminar un producto del carrito
function eliminarProducto(id) {
    let nodo = document.getElementById(`producto-${id}`);
    if (nodo) {
        nodo.remove();
    }

    // Filtrar el producto del carrito
    productocarritos = productocarritos.filter(producto => producto.id !== id);

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem("carrito", JSON.stringify(productocarritos));

    // Recargar carrito
    cargarCarrito();
}

// Función para finalizar la compra
function finalizarCompra() {
    alert("Procediendo con la compra.");
    // Aquí podrías abrir un formulario de pago o redirigir a otra página
}

document.addEventListener('DOMContentLoaded', () => {
    const formPago = document.getElementById('formPago');

    formPago.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita la recarga de la página al enviar el formulario

        // Validaciones simples de los campos
        const nombre = document.getElementById('nombre').value.trim();
        const direccion = document.getElementById('direccion').value.trim();
        const tarjeta = document.getElementById('tarjeta').value.trim();
        const fechaVencimiento = document.getElementById('fecha-vencimiento').value.trim();
        const cvv = document.getElementById('cvv').value.trim();

        if (nombre === '' || direccion === '' || tarjeta === '' || fechaVencimiento === '' || cvv === '') {
            alert('Por favor, complete todos los campos.');
            return;
        }

        if (!/^\d{16}$/.test(tarjeta)) {
            alert('El número de tarjeta debe contener 16 dígitos.');
            return;
        }

        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(fechaVencimiento)) {
            alert('La fecha de vencimiento debe tener el formato MM/AA.');
            return;
        }

        if (!/^\d{3}$/.test(cvv)) {
            alert('El código CVV debe contener 3 dígitos.');
            return;
        }

        alert('Pago realizado con éxito. ¡Gracias por tu compra!');
        formPago.reset(); // Limpia los campos del formulario
    });
});
