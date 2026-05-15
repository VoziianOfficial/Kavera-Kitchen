"use strict";

/* ==========================================================
   Kavera — Home Page
   Handles:
   - Match choice active states
   - Comparison score line animation
========================================================== */

(function () {
    document.addEventListener("DOMContentLoaded", initHomePage);

    function initHomePage() {
        initMatchChoices();
        initScoreLines();
    }

    function initMatchChoices() {
        const groups = document.querySelectorAll("[data-choice-group]");

        if (!groups.length) return;

        groups.forEach((group) => {
            const buttons = group.querySelectorAll("[data-choice]");

            buttons.forEach((button) => {
                button.addEventListener("click", () => {
                    buttons.forEach((item) => {
                        item.classList.remove("is-active");
                        item.setAttribute("aria-pressed", "false");
                    });

                    button.classList.add("is-active");
                    button.setAttribute("aria-pressed", "true");
                });
            });
        });
    }

    function initScoreLines() {
        const lines = document.querySelectorAll(".score-line[data-score]");

        if (!lines.length) return;

        lines.forEach((line) => {
            const rawValue = Number(line.dataset.score);
            const safeValue = Number.isFinite(rawValue)
                ? Math.max(0, Math.min(rawValue, 100))
                : 70;

            line.style.setProperty("--score", shouldReduceMotion() ? `${safeValue}%` : "0%");
            line.dataset.finalScore = String(safeValue);
        });

        if (shouldReduceMotion() || !("IntersectionObserver" in window)) {
            lines.forEach((line) => {
                line.style.setProperty("--score", `${line.dataset.finalScore}%`);
            });

            return;
        }

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const line = entry.target;
                    const value = line.dataset.finalScore || "70";

                    window.setTimeout(() => {
                        line.style.setProperty("--score", `${value}%`);
                    }, 120);

                    currentObserver.unobserve(line);
                });
            },
            {
                threshold: 0.35
            }
        );

        lines.forEach((line) => observer.observe(line));
    }

    function shouldReduceMotion() {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
})();