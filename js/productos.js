
// Cargar productos desde JSON
async function cargarProductos() {
    try {
        const respuesta = await fetch('../data/productos.json');
        const productos = await respuesta.json();
        localStorage.setItem('productos', JSON.stringify(productos)); // Guardar productos en localStorage

        const contenedor = document.getElementById('productos-container');
        contenedor.innerHTML = ''; // Limpiar el contenedor antes de agregar productos

        // Iterar a través de los productos y agregar cada uno al contenedor
        productos.forEach(producto => {
            const div = document.createElement('div');
            div.classList.add('producto');

            // Agregar un evento al contenedor para redirigir al detalle del producto
            div.addEventListener('click', () => {
                verDetalleProducto(producto.id); // Llamar a la función para redirigir
            });

            if (producto.precioOriginal == null) {
                div.innerHTML = `
            <img src="${producto.imagen}" 
                 alt="${producto.nombre}"  
                 style="cursor: pointer;">
            <h3>${producto.nombre}</h3>
            <div class="precio">
                <span class="promocion">S/${producto.precio.toFixed(2)}</span>
            </div>
        `;

            } else {
                div.innerHTML = `
            <img src="${producto.imagen}" 
                 alt="${producto.nombre}"  
                 style="cursor: pointer;">
            <h3>${producto.nombre}</h3>
            <div class="precio">
                <span class="original">S/${producto.precioOriginal.toFixed(2)}</span>
                <span class="promocion">S/${producto.precio.toFixed(2)}</span>
            </div>
        `;
            }

            contenedor.appendChild(div);
        });
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}


function actualizarContadorCarrito() {
    // Esperamos a que el DOM se haya cargado completamente
    document.addEventListener('DOMContentLoaded', () => {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const contador = document.getElementById('cart-count'); // Obtener el elemento del contador

        // Verificar si el contador existe en el DOM
        if (contador) {
            if (carrito.length > 0) {
                contador.style.display = 'inline'; // Mostrar el contador si hay productos en el carrito
                contador.textContent = carrito.length; // Mostrar la cantidad de productos
            } else {
                contador.style.display = 'none'; // Ocultar el contador si no hay productos en el carrito
            }
        } else {
            console.error('El elemento con id "cart-count" no se encuentra en el DOM.');
        }
    });
}

// Actualizar el contador del carrito
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || {};
    const contador = document.getElementById('cart-count');
    if (contador) {
        if (carrito.length > 0) {
            contador.style.display = 'inline';
            contador.textContent = carrito.length; // Mostrar la cantidad de productos
        } else {
            contador.style.display = 'none'; // Ocultar si no hay productos
        }
    }
}

// Redirigir al detalle del producto
function verDetalleProducto(productId) {
    localStorage.setItem('producto-detalle', productId); // Guardar el ID del producto
    window.location.href = 'producto-detalle.html'; // Redirigir al detalle
}

// Inicializar funciones
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    actualizarContadorCarrito();
});
