const slider = document.querySelector(".coffee-container");

slider.addEventListener("wheel", (event) => {
    event.preventDefault();

    const direction = event.deltaY > 0 ? 1 : -1;

    slider.scrollBy({
        left: direction * window.innerWidth,
        behavior: "smooth"
    });
}, {
    passive: false
});
