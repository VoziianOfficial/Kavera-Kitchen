"use strict";

(function () {
  const config = window.SITE_CONFIG;

  if (!config) {
    console.error("SITE_CONFIG is missing. Make sure /js/config.js loads before /js/main.js.");
    return;
  }

  const state = {
    dropdownTimer: null,
    activeMobileTrigger: null
  };

  document.addEventListener("DOMContentLoaded", initSite);

  function initSite() {
    ensureSkipLink();

    applyPageMeta();

    renderHeader();
    renderMobileMenu();
    renderFooter();

    injectDynamicContent();
    renderSectionNav();
    renderServicePanels();
    renderServiceSelects();
    renderFaqBlocks();
    renderFaqSchema();
    renderPolicyBanner();

    replaceLegacyValues();

    initHeaderScroll();
    initDesktopServicesDropdown();
    initMobileMenu();
    initFaqAccordions();
    initSectionNavActive();
    initSmoothAnchors();
    preventEmptyLinks();

    document.documentElement.classList.add("site-ready");
  }

  

  function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf("/") + 1);
    return page || "index.html";
  }

  function applyPageMeta() {
    const page = getCurrentPage();
    const meta = config.pageMeta && config.pageMeta[page];

    if (!meta) return;

    if (meta.title) {
      document.title = meta.title;
    }

    if (meta.description) {
      let description = document.querySelector('meta[name="description"]');

      if (!description) {
        description = document.createElement("meta");
        description.setAttribute("name", "description");
        document.head.appendChild(description);
      }

      description.setAttribute("content", meta.description);
    }
  }

  function ensureSkipLink() {
    if (document.querySelector(".skip-link")) return;

    const skip = document.createElement("a");
    skip.className = "skip-link";
    skip.href = "#main";
    skip.textContent = "Skip to content";

    document.body.insertBefore(skip, document.body.firstChild);
  }

  

  function renderHeader() {
    const mount = document.querySelector("[data-site-header]");
    if (!mount) return;

    const currentPage = getCurrentPage();

    const navMarkup = config.navigation
      .map((item) => {
        const isServices = item.label.toLowerCase() === "services";
        const isActive =
          currentPage === item.href ||
          (isServices && isServicePage(currentPage));

        if (isServices) {
          return `
            <div class="site-nav__item has-dropdown" data-services-dropdown-root>
              <a class="site-nav__link ${isActive ? "is-active" : ""}"
                 href="${escapeHtml(item.href)}"
                 aria-haspopup="true"
                 aria-expanded="false"
                 data-services-dropdown-trigger>
                <span>${escapeHtml(item.label)}</span>
                ${icon("chevron-down")}
              </a>

              <div class="services-dropdown" data-services-dropdown>
                <div class="services-dropdown__top">
                  <span>Kitchen categories</span>
                  <p>Compare independent provider options by project scope, material focus, and kitchen update type.</p>
                </div>

                <div class="services-dropdown__list" data-service-dropdown-list>
                  ${renderDropdownServices()}
                </div>
              </div>
            </div>
          `;
        }

        return `
          <div class="site-nav__item">
            <a class="site-nav__link ${isActive ? "is-active" : ""}" href="${escapeHtml(item.href)}">
              <span>${escapeHtml(item.label)}</span>
            </a>
          </div>
        `;
      })
      .join("");

    mount.innerHTML = `
      <header class="site-header" data-header>
        <div class="site-header__inner">
          ${renderBrandLogo("header")}

          <nav class="site-nav" aria-label="Main navigation">
            ${navMarkup}
          </nav>

          <div class="site-header__actions">
            <a class="icon-button" href="${escapeAttr(config.phone.href)}" aria-label="Call ${escapeAttr(config.companyName)}" data-phone-link>
              ${icon("phone")}
            </a>

            <a class="icon-button icon-button--desktop" href="${escapeAttr(config.email.href)}" aria-label="Email ${escapeAttr(config.companyName)}" data-email-link>
              ${icon("mail")}
            </a>

            <a class="button button--small site-header__cta" href="contact.html#request">
              <span>${escapeHtml(config.forms.primaryCta)}</span>
            </a>

            <button class="mobile-menu-toggle"
                    type="button"
                    aria-label="Open menu"
                    aria-controls="mobileMenu"
                    aria-expanded="false"
                    data-mobile-menu-open>
              ${icon("menu")}
            </button>
          </div>
        </div>
      </header>
    `;
  }

  function renderBrandLogo(context) {
    const label = config.brand.logoLabel || `${config.companyName} home`;

    return `
    <a class="brand-logo brand-logo--${escapeHtml(context)}" href="index.html" aria-label="${escapeAttr(label)}">
      <svg class="brand-logo__mark" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <path
          class="brand-logo__outline"
          d="M14 8H24V29L46 8H58L34 32L59 56H47L24 36V56H14V8Z"
        />
      </svg>

      <span class="brand-logo__text" data-company-name>${escapeHtml(config.brand.logoText || config.companyName)}</span>
    </a>
  `;
  }

  function renderDropdownServices() {
    return config.services
      .map((service) => {
        return `
          <a class="services-dropdown__link" href="${escapeAttr(service.href)}">
            ${icon(service.icon)}
            <span>
              <strong>${escapeHtml(service.shortTitle || service.title)}</strong>
              <small>${escapeHtml(service.dropdownHint || service.summary)}</small>
            </span>
          </a>
        `;
      })
      .join("");
  }

  function isServicePage(page) {
    return config.services.some((service) => service.href === page);
  }

  function initHeaderScroll() {
    const header = document.querySelector("[data-header]");
    if (!header) return;

    const update = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 10);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function initDesktopServicesDropdown() {
    const root = document.querySelector("[data-services-dropdown-root]");
    if (!root) return;

    const trigger = root.querySelector("[data-services-dropdown-trigger]");

    const open = () => {
      window.clearTimeout(state.dropdownTimer);
      root.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
    };

    const close = () => {
      state.dropdownTimer = window.setTimeout(() => {
        root.classList.remove("is-open");
        trigger.setAttribute("aria-expanded", "false");
      }, 180);
    };

    root.addEventListener("mouseenter", open);
    root.addEventListener("mouseleave", close);

    root.addEventListener("focusin", open);
    root.addEventListener("focusout", (event) => {
      if (!root.contains(event.relatedTarget)) close();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        root.classList.remove("is-open");
        trigger.setAttribute("aria-expanded", "false");
        trigger.blur();
      }
    });
  }

  

  function renderMobileMenu() {
    if (document.getElementById("mobileMenu")) return;

    const backdrop = document.createElement("div");
    backdrop.className = "mobile-menu-backdrop";
    backdrop.hidden = true;
    backdrop.dataset.mobileMenuBackdrop = "";

    const menu = document.createElement("aside");
    menu.className = "mobile-menu";
    menu.id = "mobileMenu";
    menu.setAttribute("aria-label", "Mobile navigation");
    menu.hidden = true;
    menu.inert = true;
    menu.dataset.mobileMenu = "";

    menu.innerHTML = `
      <div class="mobile-menu__head">
        ${renderBrandLogo("mobile")}

        <button class="mobile-menu__close" type="button" aria-label="Close menu" data-mobile-menu-close>
          ${icon("x")}
        </button>
      </div>

      <nav class="mobile-menu__nav" aria-label="Mobile main navigation">
        ${config.navigation
        .map((item) => {
          const currentPage = getCurrentPage();
          const isActive =
            currentPage === item.href ||
            (item.label.toLowerCase() === "services" && isServicePage(currentPage));

          return `
              <a class="mobile-menu__link ${isActive ? "is-active" : ""}" href="${escapeAttr(item.href)}">
                <span>${escapeHtml(item.label)}</span>
              </a>
            `;
        })
        .join("")}
      </nav>

      <div class="mobile-menu__services">
        <span class="mobile-menu__label">Service categories</span>

        <div class="mobile-menu__service-list" data-mobile-services-list>
          ${config.services
        .map((service) => {
          return `
                <a class="mobile-menu__service" href="${escapeAttr(service.href)}">
                  ${icon(service.icon)}
                  <span>${escapeHtml(service.title)}</span>
                </a>
              `;
        })
        .join("")}
        </div>
      </div>

      <div class="mobile-menu__contact">
        <a href="${escapeAttr(config.phone.href)}" data-phone-link>
          ${icon("phone")}
          <span data-phone-text>${escapeHtml(config.phone.number)}</span>
        </a>

        <a href="${escapeAttr(config.email.href)}" data-email-link>
          ${icon("mail")}
          <span data-email-text>${escapeHtml(config.email.value)}</span>
        </a>

        <p>
          <span>Service area</span>
          <strong data-service-area>${escapeHtml(config.serviceArea)}</strong>
        </p>
      </div>

      <p class="mobile-menu__notice" data-legal-notice>
        ${escapeHtml(config.legalNotice)}
      </p>
    `;

    document.body.appendChild(backdrop);
    document.body.appendChild(menu);
  }

  function initMobileMenu() {
    const openButton = document.querySelector("[data-mobile-menu-open]");
    const closeButton = document.querySelector("[data-mobile-menu-close]");
    const menu = document.querySelector("[data-mobile-menu]");
    const backdrop = document.querySelector("[data-mobile-menu-backdrop]");

    if (!openButton || !closeButton || !menu || !backdrop) return;

    const openMenu = () => {
      state.activeMobileTrigger = document.activeElement;

      backdrop.hidden = false;
      menu.hidden = false;
      menu.inert = false;

      requestAnimationFrame(() => {
        backdrop.classList.add("is-visible");
        menu.classList.add("is-open");
        document.body.classList.add("menu-open");
        openButton.setAttribute("aria-expanded", "true");
        closeButton.focus();
      });
    };

    const closeMenu = () => {
      if (menu.contains(document.activeElement)) {
        openButton.focus();
      }

      backdrop.classList.remove("is-visible");
      menu.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      openButton.setAttribute("aria-expanded", "false");

      window.setTimeout(() => {
        menu.inert = true;
        menu.hidden = true;
        backdrop.hidden = true;

        if (state.activeMobileTrigger && typeof state.activeMobileTrigger.focus === "function") {
          state.activeMobileTrigger.focus();
        }
      }, 260);
    };

    openButton.addEventListener("click", openMenu);
    closeButton.addEventListener("click", closeMenu);
    backdrop.addEventListener("click", closeMenu);

    menu.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (link) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.classList.contains("is-open")) {
        closeMenu();
      }

      if (event.key === "Tab" && menu.classList.contains("is-open")) {
        trapFocus(event, menu);
      }
    });
  }

  function trapFocus(event, container) {
    const focusable = getFocusableElements(container);
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    }

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function getFocusableElements(container) {
    return Array.from(
      container.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter((element) => element.offsetParent !== null);
  }

  /* ==========================================================
     FOOTER
  ========================================================== */

  function renderFooter() {
    const mount = document.querySelector("[data-site-footer]");
    if (!mount) return;

    mount.innerHTML = `
      <footer class="site-footer">
        <div class="container site-footer__inner">
          <div class="site-footer__brand">
            <div>
              ${renderBrandLogo("footer")}
            </div>

            <p data-footer-text>${escapeHtml(config.footerText)}</p>

            <div class="site-footer__badges">
              <span>Independent platform</span>
              <span>Provider comparison</span>
              <span data-service-area>${escapeHtml(config.serviceArea)}</span>
            </div>
          </div>

          <div class="site-footer__columns">
            <div class="site-footer__column">
              <span class="site-footer__label">Company</span>
              <p><span data-company-name>${escapeHtml(config.companyName)}</span></p>
              <p><span data-company-id>${escapeHtml(config.companyId)}</span></p>
              <p><span data-address-text>${escapeHtml(config.address.full)}</span></p>
            </div>

            <div class="site-footer__column">
              <span class="site-footer__label">Navigation</span>
              ${config.navigation
        .map((item) => {
          return `
                    <a href="${escapeAttr(item.href)}">
                      <span>${escapeHtml(item.label)}</span>
                    </a>
                  `;
        })
        .join("")}
            </div>

            <div class="site-footer__column">
              <span class="site-footer__label">Services</span>
              ${config.services
        .map((service) => {
          return `
                    <a href="${escapeAttr(service.href)}">
                      <span>${escapeHtml(service.shortTitle || service.title)}</span>
                    </a>
                  `;
        })
        .join("")}
            </div>

            <div class="site-footer__column">
              <span class="site-footer__label">Contact</span>

              <a href="${escapeAttr(config.phone.href)}" data-phone-link>
                ${icon("phone")}
                <span data-phone-text>${escapeHtml(config.phone.number)}</span>
              </a>

              <a href="${escapeAttr(config.email.href)}" data-email-link>
                ${icon("mail")}
                <span data-email-text>${escapeHtml(config.email.value)}</span>
              </a>

              ${config.legalLinks
        .map((item) => {
          return `
                    <a href="${escapeAttr(item.href)}">
                      <span>${escapeHtml(item.label)}</span>
                    </a>
                  `;
        })
        .join("")}
            </div>
          </div>

          <div class="site-footer__legal">
            <p data-legal-notice>${escapeHtml(config.legalNotice)}</p>
            <p data-disclaimer>${escapeHtml(config.disclaimer)}</p>
          </div>
        </div>
      </footer>
    `;
  }

  /* ==========================================================
     CONFIG INJECTION
  ========================================================== */

  function injectDynamicContent() {
    setText("[data-company-name]", config.companyName);
    setText("[data-company-id]", config.companyId);
    setText("[data-phone-text]", config.phone.number);
    setText("[data-email-text]", config.email.value);
    setText("[data-address-text]", config.address.full);
    setText("[data-footer-text]", config.footerText);
    setText("[data-service-area]", config.serviceArea);
    setText("[data-disclaimer]", config.disclaimer);
    setText("[data-legal-notice]", config.legalNotice);

    document.querySelectorAll("[data-phone-link]").forEach((link) => {
      link.setAttribute("href", config.phone.href);
    });

    document.querySelectorAll("[data-email-link]").forEach((link) => {
      link.setAttribute("href", config.email.href);
    });
  }

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach((element) => {
      element.textContent = value;
    });
  }

  function replaceLegacyValues() {
    const replacements = [
      ["Kavera Provider Matching LLC", config.companyId],
      ["Kavera", config.companyName],
      ["(888) 555-0198", config.phone.number],
      ["tel:+18885550198", config.phone.href],
      ["hello@kavera.example", config.email.value],
      ["mailto:hello@kavera.example", config.email.href],
      ["2148 W Maple Studio Ave, Denver, CO 80202, USA", config.address.full],
      ["United States", config.serviceArea]
    ];

    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          const parent = node.parentElement;

          if (!parent) return NodeFilter.FILTER_REJECT;

          if (
            parent.closest("script, style, textarea, input, select, option")
          ) {
            return NodeFilter.FILTER_REJECT;
          }

          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const textNodes = [];

    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    textNodes.forEach((node) => {
      let value = node.nodeValue;

      replacements.forEach(([from, to]) => {
        if (from && to && from !== to) {
          value = value.split(from).join(to);
        }
      });

      node.nodeValue = value;
    });

    document.querySelectorAll("[href], [aria-label], [title], [alt]").forEach((element) => {
      ["href", "aria-label", "title", "alt"].forEach((attr) => {
        if (!element.hasAttribute(attr)) return;

        let value = element.getAttribute(attr);

        replacements.forEach(([from, to]) => {
          if (from && to && from !== to) {
            value = value.split(from).join(to);
          }
        });

        element.setAttribute(attr, value);
      });
    });
  }

  /* ==========================================================
     SECTION NAV
  ========================================================== */

  function renderSectionNav() {
    const mounts = document.querySelectorAll("[data-section-nav]");
    if (!mounts.length) return;

    const page = getCurrentPage();
    const links = config.sectionNav && config.sectionNav[page];

    if (!Array.isArray(links) || !links.length) return;

    const markup = `
      <div class="section-nav-wrap">
        <nav class="section-nav" aria-label="Page sections">
          ${links
        .map((item) => {
          return `
                <a class="section-nav__link" href="${escapeAttr(item.href)}">
                  <span>${escapeHtml(item.label)}</span>
                </a>
              `;
        })
        .join("")}
        </nav>
      </div>
    `;

    mounts.forEach((mount) => {
      mount.innerHTML = markup;
    });
  }

  function initSectionNavActive() {
    const links = Array.from(document.querySelectorAll(".section-nav__link"));
    if (!links.length || !("IntersectionObserver" in window)) return;

    const sections = links
      .map((link) => {
        const id = link.getAttribute("href");
        if (!id || !id.startsWith("#")) return null;

        const section = document.querySelector(id);
        return section ? { link, section } : null;
      })
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          links.forEach((link) => link.classList.remove("is-active"));

          const current = sections.find((item) => item.section === entry.target);
          if (current) current.link.classList.add("is-active");
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
      }
    );

    sections.forEach((item) => observer.observe(item.section));
  }

  function initSmoothAnchors() {
    document.addEventListener("click", (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  /* ==========================================================
     SERVICE PANELS / SELECTS
  ========================================================== */

  function renderServicePanels() {
    const mounts = document.querySelectorAll("[data-service-panels]");
    if (!mounts.length) return;

    const markup = config.services
      .map((service, index) => {
        return `
          <article class="service-panel">
            <a class="service-panel__link" href="${escapeAttr(service.href)}">
              <img src="${escapeAttr(service.image)}" alt="${escapeAttr(service.title)}">

              <span class="service-panel__number">${String(index + 1).padStart(2, "0")}</span>

              <div class="service-panel__content">
                ${icon(service.icon)}
                <h3>${escapeHtml(service.title)}</h3>
                <p>${escapeHtml(service.summary)}</p>
                <span class="service-panel__more">View category</span>
              </div>
            </a>
          </article>
        `;
      })
      .join("");

    mounts.forEach((mount) => {
      mount.innerHTML = markup;
    });
  }

  function renderServiceSelects() {
    const selects = document.querySelectorAll("[data-service-select]");
    if (!selects.length) return;

    selects.forEach((select) => {
      const current = select.value;

      select.innerHTML = `
        <option value="">Selected service</option>
        ${config.forms.serviceOptions
          .map((option) => {
            return `<option value="${escapeAttr(option)}">${escapeHtml(option)}</option>`;
          })
          .join("")}
      `;

      if (current) select.value = current;
    });
  }

  /* ==========================================================
     FAQ
  ========================================================== */

  function renderFaqBlocks() {
    const mounts = document.querySelectorAll("[data-faq-list]");
    if (!mounts.length) return;

    mounts.forEach((mount) => {
      const key = getFaqKey(mount);
      const questions = config.faq && config.faq[key];

      if (!Array.isArray(questions) || !questions.length) return;

      mount.innerHTML = questions
        .map((item, index) => {
          const id = `faq-${key}-${index + 1}`;

          return `
            <article class="faq-item">
              <button class="faq-button" type="button" aria-expanded="false" aria-controls="${escapeAttr(id)}">
                <span class="faq-button__number">${String(index + 1).padStart(2, "0")}</span>
                <span class="faq-button__text">${escapeHtml(item.question)}</span>
                ${icon("plus")}
              </button>

              <div class="faq-panel" id="${escapeAttr(id)}" hidden>
                <p>${escapeHtml(item.answer)}</p>
              </div>
            </article>
          `;
        })
        .join("");
    });
  }

  function initFaqAccordions() {
    document.querySelectorAll(".faq-button").forEach((button) => {
      button.addEventListener("click", () => {
        const panelId = button.getAttribute("aria-controls");
        const panel = document.getElementById(panelId);
        if (!panel) return;

        const isOpen = button.getAttribute("aria-expanded") === "true";

        button.setAttribute("aria-expanded", String(!isOpen));
        panel.hidden = isOpen;
      });
    });
  }

  function renderFaqSchema() {
    const existing = document.getElementById("faq-schema-generated");
    if (existing) existing.remove();

    const faqMount = document.querySelector("[data-faq-list]");
    if (!faqMount) return;

    const key = getFaqKey(faqMount);
    const questions = config.faq && config.faq[key];

    if (!Array.isArray(questions) || !questions.length) return;

    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: questions.map((item) => {
        return {
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer
          }
        };
      })
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "faq-schema-generated";
    script.textContent = JSON.stringify(schema);

    document.head.appendChild(script);
  }

  function getFaqKey(mount) {
    const direct = mount.getAttribute("data-faq-list");

    if (direct && direct !== "auto") return direct;

    const page = getCurrentPage();
    const servicePage = config.servicePages && config.servicePages[page];

    if (servicePage && servicePage.serviceId) {
      return servicePage.serviceId;
    }

    if (page === "services.html") return "services";
    if (page === "contact.html") return "contact";

    return "general";
  }

  /* ==========================================================
     POLICY BANNER
  ========================================================== */

  function renderPolicyBanner() {
    const storageKey = config.cookieBanner.storageKey;

    try {
      if (window.localStorage.getItem(storageKey)) return;
    } catch (error) {
      console.warn("Unable to access localStorage for policy banner.", error);
    }

    let mount = document.querySelector("[data-policy-banner]");

    if (!mount) {
      mount = document.createElement("div");
      mount.dataset.policyBanner = "";
      document.body.appendChild(mount);
    }

    mount.innerHTML = `
      <aside class="policy-banner" aria-label="Privacy preferences">
        <div class="policy-banner__content">
          <span>${escapeHtml(config.cookieBanner.title)}</span>
          <p>${escapeHtml(config.cookieBanner.text)}</p>

          <div class="policy-banner__links">
            ${config.cookieBanner.links
        .map((item) => {
          return `
                  <a href="${escapeAttr(item.href)}">
                    <span>${escapeHtml(item.label)}</span>
                  </a>
                `;
        })
        .join("")}
          </div>
        </div>

        <div class="policy-banner__actions">
          <button class="button button--ghost button--small" type="button" data-policy-choice="declined">
            <span>${escapeHtml(config.cookieBanner.decline)}</span>
          </button>

          <button class="button button--small" type="button" data-policy-choice="accepted">
            <span>${escapeHtml(config.cookieBanner.accept)}</span>
          </button>
        </div>
      </aside>
    `;

    mount.querySelectorAll("[data-policy-choice]").forEach((button) => {
      button.addEventListener("click", () => {
        try {
          window.localStorage.setItem(storageKey, button.dataset.policyChoice);
        } catch (error) {
          console.warn("Unable to save policy choice.", error);
        }

        mount.remove();
      });
    });
  }

  /* ==========================================================
     SAFETY HELPERS
  ========================================================== */

  function preventEmptyLinks() {
    document.querySelectorAll('a[href="#"]').forEach((link) => {
      link.addEventListener("click", (event) => event.preventDefault());
    });
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

  /* ==========================================================
     SVG ICONS
  ========================================================== */

  function icon(name) {
    const icons = {
      phone: `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.11 5.18 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.72c.12.88.31 1.74.57 2.56a2 2 0 0 1-.45 2.11L9 10.61a16 16 0 0 0 4.39 4.39l1.22-1.22a2 2 0 0 1 2.11-.45c.82.26 1.68.45 2.56.57A2 2 0 0 1 22 16.92Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `,

      mail: `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="m22 6-10 7L2 6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `,

      menu: `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-linecap="round"/>
        </svg>
      `,

      x: `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-linecap="round"/>
        </svg>
      `,

      plus: `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-linecap="round"/>
        </svg>
      `,

      "chevron-down": `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `,

      "layout-dashboard": `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <rect x="3" y="3" width="7" height="8" rx="1" fill="none" stroke="currentColor"/>
          <rect x="14" y="3" width="7" height="5" rx="1" fill="none" stroke="currentColor"/>
          <rect x="14" y="12" width="7" height="9" rx="1" fill="none" stroke="currentColor"/>
          <rect x="3" y="15" width="7" height="6" rx="1" fill="none" stroke="currentColor"/>
        </svg>
      `,

      "panels-top-left": `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <rect x="3" y="3" width="18" height="18" rx="1" fill="none" stroke="currentColor"/>
          <path d="M3 9h18M9 21V9" fill="none" stroke="currentColor" stroke-linecap="round"/>
        </svg>
      `,

      "panel-top": `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <rect x="3" y="4" width="18" height="16" rx="1" fill="none" stroke="currentColor"/>
          <path d="M3 10h18" fill="none" stroke="currentColor"/>
        </svg>
      `,

      "table-2": `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M4 9h16M4 15h16M10 9v10M14 9v10" fill="none" stroke="currentColor" stroke-linecap="round"/>
          <rect x="4" y="5" width="16" height="14" rx="1" fill="none" stroke="currentColor"/>
        </svg>
      `,

      "grid-3x3": `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18" fill="none" stroke="currentColor"/>
        </svg>
      `,

      ruler: `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M4 20 20 4M7 17l-2-2M10 14l-2-2M13 11l-2-2M16 8l-2-2" fill="none" stroke="currentColor" stroke-linecap="round"/>
        </svg>
      `,

      "clipboard-check": `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M9 5h6M9 3h6v4H9zM9 14l2 2 4-5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1" fill="none" stroke="currentColor"/>
        </svg>
      `,

      "badge-check": `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="m12 3 2.2 2 3-.2.8 2.9 2.4 1.8-1.2 2.8 1.2 2.7-2.4 1.8-.8 2.9-3-.2-2.2 2-2.2-2-3 .2-.8-2.9L3.6 15l1.2-2.7-1.2-2.8L6 7.7l.8-2.9 3 .2L12 3Z" fill="none" stroke="currentColor" stroke-linejoin="round"/>
          <path d="m8.8 12 2.1 2.1 4.4-4.6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `,

      default: `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M4 12h16M12 4v16" fill="none" stroke="currentColor" stroke-linecap="round"/>
        </svg>
      `
    };

    return icons[name] || icons.default;
  }
})();