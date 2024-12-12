// Cargar el detalle del producto seleccionado
function cargarDetalleProducto() {
    const productoId = localStorage.getItem('navidad-detalle'); // Obtener el ID del producto
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const producto = productos.find(p => p.id == productoId); // Buscar el producto por ID

    if (producto) {
        // Actualizar información del producto en la página
        document.getElementById('imagen-principal').src = producto.imagen;
        document.getElementById('nombre-producto').textContent = producto.nombre;
        document.getElementById('precio-producto').textContent = `S/${producto.precio.toFixed(2)}`;
        document.getElementById('descripcion-producto').textContent = producto.descripcion;

        // Crear el carrusel de imágenes
        const galeriaImagenes = document.getElementById('galeria-imagenes');
        galeriaImagenes.innerHTML = ''; // Limpiar el contenedor antes de agregar las miniaturas

        // Asegurarse de que el producto tenga imágenes secundarias
        const imagenes = [producto.imagen, producto.imagen2, producto.imagen3];
        
        imagenes.forEach(imagen => {
            const imgElement = document.createElement('img');
            imgElement.src = imagen;
            imgElement.alt = 'Miniatura de imagen';
            imgElement.classList.add('galeria-imagen');
            imgElement.style.cursor = 'pointer'; // Para indicar que es clickeable

            // Al hacer clic en una miniatura, actualizar la imagen principal
            imgElement.addEventListener('click', () => {
                document.getElementById('imagen-principal').src = imagen;
            });

            // Añadir la miniatura al contenedor de la galería
            galeriaImagenes.appendChild(imgElement);
        });

    } else {
        // Si no se encuentra el producto, redirigir a la lista de productos
        alert('Producto no encontrado.');
        window.location.href = 'navidad.html';
    }
}

// Agregar producto al carrito con la cantidad ingresada en el formulario
function agregarProductoAlCarrito() {
    // Recuperar el carrito actual del localStorage, si no existe, inicializarlo como un arreglo vacío
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Obtener el ID del producto actual
    const productoId = localStorage.getItem('navidad-detalle');
    
    // Recuperar los productos almacenados en localStorage (debe ser un arreglo)
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    
    // Buscar el producto en el arreglo de productos
    const producto = productos.find(p => p.id == productoId);

    // Obtener la cantidad ingresada en el formulario, por defecto es 1
    const cantidad = parseInt(document.getElementById('cantidad').value) || 1;

    // Otros campos relacionados con el producto (opcional)
    const turnoEntrega = document.getElementById('turno-entrega').value;
    const fechaEntrega = document.getElementById('fecha-entrega').value;
    const mensajeTarjeta = document.getElementById('mensaje-tarjeta').value;
    
    if (producto) {
        // Crear un objeto con todas las variaciones del producto
        const itemCarrito = {
            id: producto.id,
            nombre: producto.nombre,
            imagen: producto.imagen,
            precio: producto.precio,
            cantidad: cantidad,
            mensajeTarjeta: mensajeTarjeta,
            turnoEntrega: turnoEntrega,
            fechaEntrega: fechaEntrega
        };

        // Verificar si el producto con esas variaciones ya existe en el carrito
        const productoExistente = carrito.find(item => 
            item.id === producto.id && 
            item.mensajeTarjeta === mensajeTarjeta && 
            item.turnoEntrega === turnoEntrega && 
            item.fechaEntrega === fechaEntrega
        );

        if (productoExistente) {
            // Si ya existe un producto con las mismas variaciones, incrementar la cantidad
            productoExistente.cantidad += cantidad;
        } else {
            // Si no existe, agregarlo como un nuevo producto con esas variaciones
            carrito.push(itemCarrito);
        }

        // Guardar el carrito actualizado en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));

        // Mostrar un mensaje de éxito y redirigir al carrito
        alert('Producto agregado al carrito.');
        window.location.href = 'carrito.html'; // Redirigir a la página del carrito
    } else {
        alert('Producto no encontrado.');
    }
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

// Inicializar los eventos y cargar los datos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarDetalleProducto();
    actualizarContadorCarrito();

    // Añadir evento al botón de "Añadir al carrito"
    document.getElementById('agregar-carrito').addEventListener('click', agregarProductoAlCarrito);
});
