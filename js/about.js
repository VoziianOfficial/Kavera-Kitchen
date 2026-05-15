"use strict";

/* ==========================================================
   Kavera — About Page
   Handles:
   - Editorial slideshow
========================================================== */

(function () {
    const slides = [
        {
            title: "Cabinet Detail",
            label: "Cabinet focus",
            tag: "Cabinet detail",
            image: "./assets/images/service-cabinets.jpg",
            alt: "Cabinet detail in a premium kitchen",
            text:
                "Compare cabinet finish, door style, storage options, hardware, and quote clarity before contacting independent companies."
        },
        {
            title: "Surface Planning",
            label: "Surface focus",
            tag: "Surface planning",
            image: "./assets/images/service-countertops.jpg",
            alt: "Kitchen countertop surface planning detail",
            text:
                "Review countertop materials, edge profiles, sink planning, measurement discussions, and installation details directly with providers."
        },
        {
            title: "Fixture Layers",
            label: "Detail focus",
            tag: "Fixture layers",
            image: "./assets/images/service-backsplash.jpg",
            alt: "Backsplash tile and kitchen fixture detail",
            text:
                "Look at tile, lighting, faucets, hardware, and finish coordination as separate parts of the kitchen update conversation."
        },
        {
            title: "Project Scope",
            label: "Scope focus",
            tag: "Project scope",
            image: "./assets/images/service-full-kitchen.jpg",
            alt: "Full kitchen remodeling scope view",
            text:
                "Use Kavera to organize project scope, provider questions, timeline conversations, and estimate comparisons."
        }
    ];

    document.addEventListener("DOMContentLoaded", initAboutPage);

    function initAboutPage() {
        initSlideshow();
    }

    function initSlideshow() {
        const title = document.querySelector("[data-about-slide-title]");
        const label = document.querySelector("[data-about-slide-label]");
        const text = document.querySelector("[data-about-slide-text]");
        const image = document.querySelector("[data-about-slide-image]");
        const tag = document.querySelector("[data-about-slide-tag]");
        const dots = document.querySelectorAll("[data-about-slide]");

        if (!title || !label || !text || !image || !tag || !dots.length) return;

        dots.forEach((dot) => {
            dot.addEventListener("click", () => {
                const index = Number(dot.dataset.aboutSlide);
                const slide = slides[index];

                if (!slide) return;

                dots.forEach((item) => {
                    item.classList.remove("is-active");
                });

                dot.classList.add("is-active");

                changeSlide({
                    title,
                    label,
                    text,
                    image,
                    tag,
                    slide
                });
            });
        });
    }

    function changeSlide({ title, label, text, image, tag, slide }) {
        if (shouldReduceMotion()) {
            updateSlide({ title, label, text, image, tag, slide });
            return;
        }

        title.style.opacity = "0";
        label.style.opacity = "0";
        text.style.opacity = "0";
        image.style.opacity = "0";
        tag.style.opacity = "0";

        window.setTimeout(() => {
            updateSlide({ title, label, text, image, tag, slide });

            title.style.opacity = "1";
            label.style.opacity = "1";
            text.style.opacity = "1";
            image.style.opacity = "1";
            tag.style.opacity = "1";
        }, 180);
    }

    function updateSlide({ title, label, text, image, tag, slide }) {
        title.textContent = slide.title;
        label.textContent = slide.label;
        text.textContent = slide.text;
        image.src = slide.image;
        image.alt = slide.alt;
        tag.textContent = slide.tag;
    }

    function shouldReduceMotion() {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
})();