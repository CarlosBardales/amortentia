// Función para mostrar el carrito de compras con todos los detalles
function mostrarCarritoDeCompras() {

    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Verifica si 'carrito' no es un array
    if (!Array.isArray(carrito)) {
        carrito = []; // Si no es un array válido, inicializarlo como un array vacío
        localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar el array vacío en localStorage
    }

    const carritoContainer = document.getElementById('carrito-items');
    const totalContainer = document.getElementById('total');

    carritoContainer.innerHTML = '';  // Limpiar el contenedor antes de renderizar
    let total = 0;

    // Agrupar los productos directamente usando la cantidad existente
    carrito.forEach(item => {
        const producto = productos.find(p => p.id === item.id);
        if (producto) {
            total += producto.precio * item.cantidad;

            const itemContainer = document.createElement('li');
            itemContainer.classList.add('producto-carrito');

            itemContainer.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <div>
                        <h3>${producto.nombre}</h3>
                        <p>Cantidad: ${item.cantidad}</p>
                        <p><strong>Precio: </strong>S/${producto.precio * item.cantidad}</p>
                        <p><strong>Mensaje para la tarjeta:</strong> ${item.mensajeTarjeta || "Ninguno"}</p>
                        <p><strong>Turno de entrega:</strong> ${item.turnoEntrega || "No especificado"}</p>
                        <p><strong>Fecha de entrega:</strong> ${item.fechaEntrega || "No especificado"}</p>
                        <div class="acciones">
                            <button class="agregar-mas" data-id="${producto.id}">Agregar más</button>
                            <button class="eliminar" data-id="${producto.id}">Eliminar</button>
                        </div>
                    </div>
                `;
            carritoContainer.appendChild(itemContainer);
        }
    });

    totalContainer.textContent = `Total: S/${total.toFixed(2)}`;  // Mostrar el total
}

function eliminarProducto(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Buscar el producto en el carrito
    const productoIndex = carrito.findIndex(item => item.id === id);

    if (productoIndex !== -1) {
        // Si la cantidad es mayor a 1, reducirla
        if (carrito[productoIndex].cantidad > 1) {
            carrito[productoIndex].cantidad--;
        } else {
            // Si la cantidad es 1, eliminar el producto del carrito
            carrito.splice(productoIndex, 1);
        }
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarritoDeCompras(); // Actualizar la vista del carrito
}


function agregarMasProducto(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const productoExistente = carrito.find(item => item.id === id);
    if (productoExistente) {
        // Si el producto ya existe, aumentar la cantidad
        productoExistente.cantidad++;
    } else {
        // Si no está en el carrito, agregarlo con cantidad 1
        carrito.push({ id: id, cantidad: 1, mensajeTarjeta: '', turnoEntrega: '', fechaEntrega: '' });
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarritoDeCompras(); // Actualizar la vista del carrito
}




// Vaciar el carrito
function vaciarCarrito() {
    localStorage.removeItem('carrito');  // Limpiar el carrito de localStorage
    carrito = [];  // Limpiar el array del carrito
    mostrarCarritoDeCompras();  // Vuelve a renderizar el carrito vacío
}

// Generar el enlace de WhatsApp con los productos del carrito
function generarEnlaceWhatsApp() {
    // Recuperar el carrito desde localStorage y verificar que sea un array
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Asegurarse de que 'carrito' es un array
    if (!Array.isArray(carrito)) {
        carrito = [];  // Si no es un array válido, inicializarlo como un array vacío
        localStorage.setItem('carrito', JSON.stringify(carrito));  // Guardarlo en localStorage
    }

    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    let mensaje = "¡Hola! Quiero comprar los siguientes productos:\n";

    let total = 0;

    // Agrupar los productos por su ID y cantidad, asegurándonos de que 'carrito' sea un array
    const productosUnicos = carrito.reduce((acc, item) => {
        const found = acc.find(product => product.id === item.id);
        if (found) {
            found.cantidad++; // Si ya existe, sumar la cantidad
        } else {
            acc.push({ ...item, cantidad: 1 });
        }
        return acc;
    }, []);

    productosUnicos.forEach(item => {
        const producto = productos.find(p => p.id === item.id);
        if (producto) {
            total += producto.precio * item.cantidad;
            mensaje += `${producto.nombre} x ${item.cantidad} - S/${producto.precio * item.cantidad}\n`;

            // Agregar los detalles adicionales del producto al mensaje
            mensaje += `Mensaje para la tarjeta: ${item.mensajeTarjeta || "Ninguno"}\n`;
            mensaje += `Turno de entrega: ${item.turnoEntrega || "No especificado"}\n`;
            mensaje += `Fecha de entrega: ${item.fechaEntrega || "No especificado"}\n\n`;
        }
    });

    mensaje += `\nTotal: S/${total.toFixed(2)}\n`;

    const telefono = "51947128218";  // Número de WhatsApp
    const enlace = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    return enlace;
}

// Redirigir a WhatsApp al hacer clic en "Pagar"
function pagarEnWhatsApp() {
    const enlaceWhatsApp = generarEnlaceWhatsApp();
    window.location.href = enlaceWhatsApp;  // Redirige al enlace de WhatsApp con los datos
}

// Inicializar
document.addEventListener('DOMContentLoaded', mostrarCarritoDeCompras);
document.getElementById('boton-vaciar').addEventListener('click', vaciarCarrito);

// Evento para redirigir a WhatsApp al hacer clic en "Pagar"
document.getElementById('boton-pagar').addEventListener('click', function () {
    pagarEnWhatsApp();  // Llamada a la función que redirige a WhatsApp
});

// Delegación de eventos para los botones de "Agregar más" y "Eliminar"

document.getElementById('carrito-items').addEventListener('click', function (event) {
    const target = event.target;

    if (target.classList.contains('agregar-mas')) {
        const id = parseInt(target.getAttribute('data-id'));
        agregarMasProducto(id); // Llamar a la función para agregar más productos

    }

    if (target.classList.contains('eliminar')) {
        const id = parseInt(target.getAttribute('data-id'));
        eliminarProducto(id); // Llamar a la función para eliminar el producto
    }
    document.addEventListener('DOMContentLoaded', mostrarCarritoDeCompras);

});
