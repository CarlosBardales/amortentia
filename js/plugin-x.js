(function(){
    let currentIndex = 0;
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;

    function showItem(index) {
        items.forEach(item => item.classList.remove('active'));
        items[index].classList.add('active');
    }

    document.getElementById('carousel-next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalItems;
        showItem(currentIndex);
    });

    document.getElementById('carousel-prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        showItem(currentIndex);
    });

    // Mostrar el primer elemento al cargar la página
    document.addEventListener("DOMContentLoaded", () => {
        showItem(currentIndex);
    });
})();