"use strict";

/* ==========================================================
   Kavera — Legal Pages
   Handles:
   - active sidebar section state
   - smooth legal anchor behavior is handled globally in main.js
========================================================== */

(function () {
    document.addEventListener("DOMContentLoaded", initLegalPage);

    function initLegalPage() {
        initLegalSidebarActiveState();
    }

    function initLegalSidebarActiveState() {
        const links = Array.from(document.querySelectorAll(".legal-sidebar__nav a"));

        if (!links.length || !("IntersectionObserver" in window)) return;

        const items = links
            .map((link) => {
                const selector = link.getAttribute("href");

                if (!selector || !selector.startsWith("#")) return null;

                const section = document.querySelector(selector);

                if (!section) return null;

                return {
                    link,
                    section
                };
            })
            .filter(Boolean);

        if (!items.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    links.forEach((link) => {
                        link.classList.remove("is-active");
                    });

                    const activeItem = items.find((item) => item.section === entry.target);

                    if (activeItem) {
                        activeItem.link.classList.add("is-active");
                    }
                });
            },
            {
                rootMargin: "-30% 0px -58% 0px",
                threshold: 0
            }
        );

        items.forEach((item) => {
            observer.observe(item.section);
        });
    }
})();