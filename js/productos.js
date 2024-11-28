// productos.js

// Actualizar el contador del carrito
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contador = document.getElementById('cart-count');
    if (carrito.length > 0) {
        contador.style.display = 'inline';
        contador.textContent = carrito.length; // Mostrar la cantidad de productos
    } else {
        contador.style.display = 'none'; // Ocultar si no hay productos
    }
}

// Agregar producto al carrito
function agregarAlCarrito(productId) {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const producto = productos.find(p => p.id === productId);
    if (producto) {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.push(productId);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarModalProducto(producto); // Mostrar el modal de confirmación
        actualizarContadorCarrito(); // Actualizar el contador
    }
}

// Mostrar modal con información del producto agregado
function mostrarModalProducto(producto) {
    const modal = document.createElement('div');
    modal.id = 'modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '1000';

    modal.innerHTML = `
        <div style="background: #fff; padding: 20px; border-radius: 10px; max-width: 600px; display: flex; align-items: center; gap: 20px;">
            <img src="${producto.imagen}" alt="${producto.nombre}" style="max-width: 150px; border-radius: 5px;">
            <div style="flex: 1;">
                <h2>Producto agregado</h2>
                <p><strong>${producto.nombre}</strong></p>
                <p>${producto.descripcion}</p>
                <p><strong>Precio:</strong> $${producto.precio}</p>
                <div style="margin-top: 20px; display: flex; justify-content: space-between;">
                    <button id="seguir-comprando" style="padding: 10px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">Seguir comprando</button>
                    <button id="ir-al-carrito" style="padding: 10px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer;">Ir al carrito</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('seguir-comprando').addEventListener('click', () => modal.remove());
    document.getElementById('ir-al-carrito').addEventListener('click', () => window.location.href = 'carrito.html');
}

// Mostrar un modal carrusel con imágenes
function mostrarCarruselImagenes(imagenes) {
    const modal = document.createElement('div');
    modal.id = 'modal-carrusel';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '1000';

    modal.innerHTML = `
        <div style="background: #fff; padding: 20px; border-radius: 10px; max-width:800px; position: relative; text-align: center;">
            <span id="cerrar-carrusel" style="position: absolute; top: -10px; right: 5px; font-size: 30px; cursor: pointer;">&times;</span>
            <div id="carrusel" style="overflow: hidden; height: 700px; display: flex; align-items: center;">
                <div id="carrusel-items" style="display: flex; transition: transform 0.3s ease;">
                    ${imagenes.map(img => `
                        <div style="flex: 0 0 100%; display: flex; align-items: center; justify-content: center; height: 100%;">
                            <img src="${img}" alt="Imagen del producto" style="max-width: 60%; max-height: 100%; object-fit: contain;">
                        </div>
                    `).join('')}
                </div>
            </div>
            <button id="prev-carrusel" style="position: absolute; top: 50%; left: 10px; transform: translateY(-50%); background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">&#10094;</button>
            <button id="next-carrusel" style="position: absolute; top: 50%; right: 10px; transform: translateY(-50%); background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">&#10095;</button>
        </div>
    `;

    document.body.appendChild(modal);

    const carrusel = document.getElementById('carrusel-items');
    let currentIndex = 0;

    document.getElementById('prev-carrusel').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + imagenes.length) % imagenes.length;
        carrusel.style.transform = `translateX(-${currentIndex * 100}%)`;
    });

    document.getElementById('next-carrusel').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % imagenes.length;
        carrusel.style.transform = `translateX(-${currentIndex * 100}%)`;
    });

    document.getElementById('cerrar-carrusel').addEventListener('click', () => modal.remove());
}

// Cargar productos desde JSON
async function cargarProductos() {
    try {
        const respuesta = await fetch('../data/productos.json');
        const productos = await respuesta.json();
        localStorage.setItem('productos', JSON.stringify(productos)); // Guardar productos en localStorage

        const contenedor = document.getElementById('productos-container');
        productos.forEach(producto => {
            const div = document.createElement('div');
            div.classList.add('producto');
            div.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p>Precio: $${producto.precio}</p>
                <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
                <button onclick="mostrarCarruselImagenes(['${producto.imagen}', '${producto.imagen2}', '${producto.imagen3}'])">
                    <i class="fas fa-eye"></i> Ver
                </button>
            `;
            contenedor.appendChild(div);
        });
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

// Inicializar funciones
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    actualizarContadorCarrito();
});




// Redirigir al detalle del producto
function verDetalleProducto(productId) {
    localStorage.setItem('producto-detalle', productId); // Guardar el ID del producto
    window.location.href = 'producto-detalle.html'; // Redirigir al detalle
}