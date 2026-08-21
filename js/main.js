const menuBox = document.getElementById("menuBox");
const menuIcon = document.getElementById("menuIcon");
const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");

function setMenu(open) {
    menuBox.classList.toggle("open-menu", open);
    document.body.classList.toggle("no-scroll", open);
    menuIcon.src = open ? "assets/nav/close.png" : "assets/nav/menu.png";
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

menuToggle.addEventListener("click", function () {
    setMenu(!menuBox.classList.contains("open-menu"));
});

menuBox.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        setMenu(false);
    });
});

window.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        setMenu(false);
    }
});

function onNavScroll() {
    siteNav.classList.toggle("scrolled", window.scrollY > 40);
}

window.addEventListener("scroll", onNavScroll, { passive: true });
onNavScroll();

const revealObserver = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
);

document.querySelectorAll(".reveal").forEach(function (el) {
    revealObserver.observe(el);
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const parallaxEls = document.querySelectorAll("[data-parallax]");
let ticking = false;

function applyParallax() {
    ticking = false;
    if (reduceMotion.matches || window.innerWidth < 861) {
        return;
    }
    parallaxEls.forEach(function (el) {
        const speed = parseFloat(el.dataset.parallax) || 0;
        const rect = el.parentElement.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
        el.style.transform = "translate3d(0, " + offset.toFixed(1) + "px, 0)";
    });
}

function requestParallax() {
    if (!ticking) {
        ticking = true;
        requestAnimationFrame(applyParallax);
    }
}

window.addEventListener("scroll", requestParallax, { passive: true });
window.addEventListener("resize", requestParallax);
applyParallax();

document.getElementById("year").textContent = new Date().getFullYear();
