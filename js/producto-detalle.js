// producto-detalle.js

// Cargar el detalle del producto seleccionado
function cargarDetalleProducto() {
    const productoId = localStorage.getItem('producto-detalle'); // Obtener el ID del producto del localStorage
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const producto = productos.find(p => p.id == productoId); // Buscar el producto por ID

    if (producto) {
        // Actualizar información del producto en la página
        document.getElementById('imagen-principal').src = producto.imagen;
        document.getElementById('nombre-producto').textContent = producto.nombre;
        document.getElementById('codigo-producto').textContent = `Código: ${producto.id}`;
        document.getElementById('precio-producto').textContent = `$${producto.precio.toFixed(2)}`;
        document.getElementById('descripcion-producto').textContent = producto.descripcion;

        // Crear el carrusel de imágenes
        const galeriaImagenes = document.getElementById('galeria-imagenes');
        galeriaImagenes.innerHTML = `
            <img src="${producto.imagen}" alt="Imagen principal" class="galeria-imagen">
            <img src="${producto.imagen2}" alt="Imagen secundaria" class="galeria-imagen">
            <img src="${producto.imagen3}" alt="Imagen terciaria" class="galeria-imagen">
        `;
    } else {
        // Si no se encuentra el producto, redirigir a la lista de productos
        alert('Producto no encontrado.');
        window.location.href = 'productos.html';
    }
}

// Agregar el producto al carrito
function agregarProductoAlCarrito() {
    const productoId = localStorage.getItem('producto-detalle'); // Obtener el ID del producto actual
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const cantidad = parseInt(document.getElementById('cantidad').value) || 1;

    for (let i = 0; i < cantidad; i++) {
        carrito.push(parseInt(productoId)); // Añadir el producto al carrito tantas veces como la cantidad
    }

    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar el carrito actualizado en el localStorage
    alert('Producto agregado al carrito.');
}

// Inicializar los eventos y cargar los datos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarDetalleProducto();

    // Añadir evento al botón de "Añadir al carrito"
    document.getElementById('agregar-carrito').addEventListener('click', agregarProductoAlCarrito);
});
