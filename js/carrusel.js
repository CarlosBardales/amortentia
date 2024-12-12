// Manejo del Carrusel de Productos Destacados
function inicializarCarrusel() {
  let currentIndex = 0;
  const carouselContainer = document.getElementById("destacados-carousel");
  const indicatorsContainer = document.querySelector(".carousel-indicators");

  fetch("../data/prodestacados.json")
    .then((response) => response.json())
    .then((items) => {
      const totalItems = items.length;

      // Función para renderizar el producto actual
      function renderizarCarrusel() {
        carouselContainer.innerHTML = "";
        const producto = items[currentIndex];

        // Crear el contenido del producto
        const div = document.createElement("div");
        div.classList.add("carousel-item");

        div.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}" style="max-width: 100%; max-height: 100%;">
                `;
        carouselContainer.appendChild(div);

        // Actualizar indicadores
        actualizarIndicadores();
      }

      // Función para actualizar indicadores
      function actualizarIndicadores() {
        const indicators = document.querySelectorAll(".indicator");
        indicators.forEach((indicator, index) => {
          indicator.classList.toggle("active", index === currentIndex);
        });
      }

      // Función para crear indicadores dinámicamente
      function crearIndicadores() {
        indicatorsContainer.innerHTML = ""; // Limpiar indicadores
        items.forEach((_, index) => {
          const indicator = document.createElement("span");
          indicator.classList.add("indicator");
          if (index === 0) indicator.classList.add("active"); // Activar el primero inicialmente
          indicator.setAttribute("data-slide", index);

          // Evento al hacer clic en el indicador
          indicator.addEventListener("click", () => {
            currentIndex = index;
            renderizarCarrusel();
          });

          indicatorsContainer.appendChild(indicator);
        });
      }

      // Función para mostrar el siguiente producto
      function siguienteProducto() {
        currentIndex = (currentIndex + 1) % totalItems;
        renderizarCarrusel();
      }

      // Función para mostrar el producto anterior
      function productoAnterior() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        renderizarCarrusel();
      }

      // Crear indicadores y renderizar carrusel inicial
      crearIndicadores();
      renderizarCarrusel();

      // Cambiar automáticamente cada 5 segundos
      setInterval(siguienteProducto, 4000);
    })
    .catch((error) =>
      console.error("Error al cargar los productos destacados:", error)
    );
}

document.addEventListener("DOMContentLoaded", () => {
  inicializarCarrusel();
});
