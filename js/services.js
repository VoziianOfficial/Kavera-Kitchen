"use strict";

/* ==========================================================
   Kavera — Services Page
   Handles:
   - Kitchen style switcher
========================================================== */

(function () {
    const config = window.SITE_CONFIG;

    if (!config) {
        console.error("SITE_CONFIG is missing on services page.");
        return;
    }

    const styles = [
        {
            title: "Warm modern kitchen direction.",
            badge: "Wood / stone / soft lines",
            image: "./assets/images/hero-services.jpg",
            alt: "Warm modern kitchen style",
            text:
                "Compare providers by how clearly they discuss warm materials, clean cabinet profiles, surface choices, and lighting details."
        },
        {
            title: "Soft sage cabinet direction.",
            badge: "Sage / cream / brass",
            image: "./assets/images/material-sage-cabinet.jpg",
            alt: "Sage green cabinet kitchen detail",
            text:
                "Review provider options for cabinet color, hardware finish, backsplash tone, and overall kitchen finish coordination."
        },
        {
            title: "Deep wood and contrast direction.",
            badge: "Walnut / charcoal / stone",
            image: "./assets/images/material-wood.jpg",
            alt: "Dark wood kitchen material detail",
            text:
                "Ask providers how they approach darker finishes, lighting balance, surface contrast, and larger project scope."
        },
        {
            title: "Cream minimal kitchen direction.",
            badge: "Cream / tile / quiet surfaces",
            image: "./assets/images/material-cream-tile.jpg",
            alt: "Cream tile kitchen surface detail",
            text:
                "Compare independent providers for simple cabinet lines, quiet materials, backsplash details, and clean finish transitions."
        },
        {
            title: "Stone and brass detail direction.",
            badge: "Marble / quartz / brass",
            image: "./assets/images/material-marble.jpg",
            alt: "Stone and brass kitchen material detail",
            text:
                "Review how providers discuss stone surfaces, edge profiles, sink planning, fixtures, and finish compatibility."
        }
    ];

    document.addEventListener("DOMContentLoaded", initServicesPage);

    function initServicesPage() {
        initKitchenStyleSwitcher();
    }

    function initKitchenStyleSwitcher() {
        const image = document.querySelector("[data-style-image]");
        const title = document.querySelector("[data-style-title]");
        const text = document.querySelector("[data-style-text]");
        const badge = document.querySelector("[data-style-badge]");
        const buttons = document.querySelectorAll("[data-style-index]");

        if (!image || !title || !text || !badge || !buttons.length) return;

        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                const index = Number(button.dataset.styleIndex);
                const item = styles[index];

                if (!item) return;

                buttons.forEach((currentButton) => {
                    currentButton.classList.remove("is-active");
                });

                button.classList.add("is-active");

                swapStyleContent({
                    image,
                    title,
                    text,
                    badge,
                    item
                });
            });
        });
    }

    function swapStyleContent({ image, title, text, badge, item }) {
        if (shouldReduceMotion()) {
            updateContent({ image, title, text, badge, item });
            return;
        }

        image.style.opacity = "0";
        title.style.opacity = "0";
        text.style.opacity = "0";
        badge.style.opacity = "0";

        window.setTimeout(() => {
            updateContent({ image, title, text, badge, item });

            image.style.opacity = "1";
            title.style.opacity = "1";
            text.style.opacity = "1";
            badge.style.opacity = "1";
        }, 180);
    }

    function updateContent({ image, title, text, badge, item }) {
        image.src = item.image;
        image.alt = item.alt;
        title.textContent = item.title;
        text.textContent = item.text;
        badge.textContent = item.badge;
    }

    function shouldReduceMotion() {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
})();