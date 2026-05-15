"use strict";



(function () {
    document.addEventListener("DOMContentLoaded", initHomePage);

    function initHomePage() {
        renderHomeServiceSplit();
        initHomeServicesMobileSlider();
        initMatchChoices();
        initScoreLines();
    }

    function renderHomeServiceSplit() {
        const mount = document.querySelector("[data-home-service-split]");
        const config = window.SITE_CONFIG;

        if (!mount || !config || !Array.isArray(config.services)) return;

        const slides = config.services
            .map((service, index) => {
                const isReverse = index % 2 !== 0;

                return `
        <article class="home-service-row ${isReverse ? "home-service-row--reverse" : ""}" data-service-slide>
          <div class="home-service-row__text">
            <span class="home-service-row__number">${String(index + 1).padStart(2, "0")}</span>

            <div>
              <h3>${escapeHtml(service.title)}</h3>
              <p>${escapeHtml(service.summary)}</p>

              <a class="text-link" href="${escapeAttr(service.href)}">
                View category
              </a>
            </div>
          </div>

          <a class="home-service-row__photo" href="${escapeAttr(service.href)}" aria-label="${escapeAttr(service.title)}">
            <img src="${escapeAttr(service.image)}" alt="${escapeAttr(service.title)}" loading="lazy">
            <span>${escapeHtml(service.shortTitle || service.title)}</span>
          </a>
        </article>
      `;
            })
            .join("");

        const dots = config.services
            .map((service, index) => {
                return `
        <button
          class="home-services__dot ${index === 0 ? "is-active" : ""}"
          type="button"
          data-service-slider-dot="${index}"
          aria-label="Show ${escapeAttr(service.title)}"
          aria-pressed="${index === 0 ? "true" : "false"}"
        ></button>
      `;
            })
            .join("");

        mount.innerHTML = `
    <div class="home-services__slider-track" data-service-slider-track>
      ${slides}
    </div>

    <div class="home-services__dots" aria-label="Service slider controls">
      ${dots}
    </div>
  `;
    }

    function initHomeServicesMobileSlider() {
        const slider = document.querySelector("[data-home-service-split]");
        const track = document.querySelector("[data-service-slider-track]");
        const slides = Array.from(document.querySelectorAll("[data-service-slide]"));
        const dots = Array.from(document.querySelectorAll("[data-service-slider-dot]"));

        if (!slider || !track || !slides.length) return;

        const mobileQuery = window.matchMedia("(max-width: 700px)");

        let activeIndex = 0;
        let timer = null;

        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        let hasDragged = false;

        const swipeThreshold = 48;

        function goToSlide(index) {
            activeIndex = (index + slides.length) % slides.length;

            track.style.transition = "";

            if (mobileQuery.matches) {
                track.style.transform = `translateX(-${activeIndex * 100}%)`;
            } else {
                track.style.transform = "";
            }

            dots.forEach((dot, dotIndex) => {
                const isActive = dotIndex === activeIndex;

                dot.classList.toggle("is-active", isActive);
                dot.setAttribute("aria-pressed", String(isActive));
            });
        }

        function startAutoPlay() {
            stopAutoPlay();

            if (!mobileQuery.matches || shouldReduceMotion()) return;

            timer = window.setInterval(() => {
                goToSlide(activeIndex + 1);
            }, 4200);
        }

        function stopAutoPlay() {
            if (!timer) return;

            window.clearInterval(timer);
            timer = null;
        }

        function onPointerDown(event) {
            if (!mobileQuery.matches) return;

            isDragging = true;
            hasDragged = false;
            startX = event.clientX;
            currentX = startX;

            stopAutoPlay();

            track.style.transition = "none";
            slider.classList.add("is-dragging");
        }

        function onPointerMove(event) {
            if (!isDragging || !mobileQuery.matches) return;

            currentX = event.clientX;

            const diff = currentX - startX;

            if (Math.abs(diff) > 8) {
                hasDragged = true;
            }

            track.style.transform = `translateX(calc(-${activeIndex * 100}% + ${diff}px))`;
        }

        function onPointerUp() {
            if (!isDragging || !mobileQuery.matches) return;

            const diff = currentX - startX;

            isDragging = false;
            track.style.transition = "";
            slider.classList.remove("is-dragging");

            if (Math.abs(diff) > swipeThreshold) {
                if (diff < 0) {
                    goToSlide(activeIndex + 1);
                } else {
                    goToSlide(activeIndex - 1);
                }
            } else {
                goToSlide(activeIndex);
            }

            window.setTimeout(() => {
                hasDragged = false;
            }, 80);

            startAutoPlay();
        }

        dots.forEach((dot) => {
            dot.addEventListener("click", () => {
                const index = Number(dot.dataset.serviceSliderDot);

                if (!Number.isFinite(index)) return;

                goToSlide(index);
                startAutoPlay();
            });
        });

        slider.addEventListener("pointerdown", onPointerDown);
        slider.addEventListener("pointermove", onPointerMove);
        slider.addEventListener("pointerup", onPointerUp);
        slider.addEventListener("pointercancel", onPointerUp);
        slider.addEventListener("pointerleave", onPointerUp);

        slider.addEventListener(
            "click",
            (event) => {
                if (!hasDragged) return;

                const link = event.target.closest("a");

                if (link) {
                    event.preventDefault();
                }
            },
            true
        );

        slider.addEventListener("mouseenter", stopAutoPlay);
        slider.addEventListener("mouseleave", startAutoPlay);

        mobileQuery.addEventListener("change", () => {
            goToSlide(activeIndex);
            startAutoPlay();
        });

        goToSlide(0);
        startAutoPlay();
    }


    

    function escapeHtml(value) {
        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function escapeAttr(value) {
        return escapeHtml(value);
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