// Manejo del Carrusel de Productos Destacados
function inicializarCarrusel() {
    let currentIndex = 0;
    const carouselContainer = document.getElementById("destacados-carousel");

    fetch("./data/prodestacados.json")
        .then(response => response.json())
        .then(items => {
            const totalItems = items.length;

            function renderizarCarrusel() {
                carouselContainer.innerHTML = "";
                const producto = items[currentIndex];
                const div = document.createElement("div");
                div.classList.add("carousel-item");
                div.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}" style="max-width: 100%; max-height: 100%;">
                    
                `;
                carouselContainer.appendChild(div);
            }

            function siguienteProducto() {
                currentIndex = (currentIndex + 1) % totalItems;
                renderizarCarrusel();
            }

            document.getElementById("carousel-next").addEventListener("click", siguienteProducto);

            document.getElementById("carousel-prev").addEventListener("click", () => {
                currentIndex = (currentIndex - 1 + totalItems) % totalItems;
                renderizarCarrusel();
            });

            // Mostrar el primer producto al cargar la página
            renderizarCarrusel();

            // Cambiar automáticamente cada 5 segundos
            setInterval(siguienteProducto, 4000);
        })
        .catch(error => console.error('Error al cargar los productos destacados:', error));
}

document.addEventListener("DOMContentLoaded", () => {
    inicializarCarrusel();
});
