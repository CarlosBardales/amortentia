// carrito.js

// Renderizar el carrito
function renderizarCarrito() {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoContainer = document.getElementById('carrito-items');
    const totalContainer = document.getElementById('total');
    carritoContainer.innerHTML = '';
    let total = 0;

    const productosUnicos = [...new Set(carrito)];
    productosUnicos.forEach(id => {
        const producto = productos.find(p => p.id === id);
        if (producto) {
            const cantidad = carrito.filter(pid => pid === id).length;
            total += producto.precio * cantidad;
            const item = document.createElement('li');
            item.textContent = `${producto.nombre} x ${cantidad} - $${producto.precio * cantidad}`;
            carritoContainer.appendChild(item);
        }
    });

    totalContainer.textContent = total.toFixed(2);
}

// Vaciar el carrito
function vaciarCarrito() {
    localStorage.removeItem('carrito');
    renderizarCarrito();
}



// carrito.js

// Generar enlace de WhatsApp con los productos del carrito
function generarEnlaceWhatsApp() {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let mensaje = "¡Hola! Quiero comprar los siguientes productos:\n";

    const productosUnicos = [...new Set(carrito)];
    let total = 0;

    productosUnicos.forEach(id => {
        const producto = productos.find(p => p.id === id);
        if (producto) {
            const cantidad = carrito.filter(pid => pid === id).length;
            total += producto.precio * cantidad;
            mensaje += `${producto.nombre} x ${cantidad} - $${producto.precio * cantidad}\n`;
        }
    });

    mensaje += `\nTotal: $${total.toFixed(2)}\n`;

    const telefono = "51947128218"; // Número de WhatsApp
    const enlace = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    return enlace;
}

// Redirigir a WhatsApp al hacer clic en "Pagar"
function pagarEnWhatsApp() {
    const enlaceWhatsApp = generarEnlaceWhatsApp();
    window.location.href = enlaceWhatsApp;
}

// Renderizar el carrito y asociar evento al botón "Pagar"
function renderizarCarrito() {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoContainer = document.getElementById('carrito-items');
    const totalContainer = document.getElementById('total');
    carritoContainer.innerHTML = '';
    let total = 0;

    const productosUnicos = [...new Set(carrito)];
    productosUnicos.forEach(id => {
        const producto = productos.find(p => p.id === id);
        if (producto) {
            const cantidad = carrito.filter(pid => pid === id).length;
            total += producto.precio * cantidad;
            const item = document.createElement('li');
            item.textContent = `${producto.nombre} x ${cantidad} - $${producto.precio * cantidad}`;
            carritoContainer.appendChild(item);
        }
    });

    totalContainer.textContent = total.toFixed(2);
}

// Vaciar el carrito
function vaciarCarrito() {
    localStorage.removeItem('carrito');
    renderizarCarrito();
}

// Inicializar
document.addEventListener('DOMContentLoaded', renderizarCarrito);
document.getElementById('boton-vaciar').addEventListener('click', vaciarCarrito);
document.getElementById('boton-pagar').addEventListener('click', pagarEnWhatsApp);
