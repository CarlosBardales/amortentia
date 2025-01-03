// Selecciona los elementos necesarios
const menuIcon = document.querySelector('.menu-icon');
const sidebar = document.querySelector('.sidebar');

// Muestra y oculta el menú hamburguesa al hacer clic en el icono
menuIcon.addEventListener('click', function (event) {
    // Evita que el evento se propague al document y se cierre al hacer clic en el icono
    event.stopPropagation();

    // Toggle para abrir/cerrar el menú
    sidebar.classList.toggle('open');
});

// Cierra el menú si se hace clic fuera de la barra lateral
document.addEventListener('click', function (event) {
    // Verifica si el clic ocurrió fuera de la barra lateral y el icono de menú
    if (!sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
        sidebar.classList.remove('open');
    }
});