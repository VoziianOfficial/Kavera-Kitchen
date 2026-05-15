"use strict";



(function () {
    const config = window.SITE_CONFIG;

    if (!config) {
        console.error("SITE_CONFIG is missing on contact page.");
        return;
    }

    document.addEventListener("DOMContentLoaded", initContactPage);

    function initContactPage() {
        initContactForm();
    }

    function initContactForm() {
        const form = document.querySelector("[data-contact-form]");
        const message = document.querySelector("[data-form-message]");

        if (!form || !message) return;

        const fields = {
            fullName: form.querySelector('[name="fullName"]'),
            phone: form.querySelector('[name="phone"]'),
            email: form.querySelector('[name="email"]'),
            selectedService: form.querySelector('[name="selectedService"]')
        };

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            clearMessage(message);
            clearFieldStates(fields);

            const errors = validateFields(fields);

            if (errors.length) {
                showError(message, config.forms.errorMessage);
                markInvalidFields(errors);
                focusFirstInvalid(errors);
                return;
            }

            showSuccess(message, config.forms.successMessage);
            form.reset();
        });
    }

    function validateFields(fields) {
        const errors = [];

        Object.entries(fields).forEach(([name, field]) => {
            if (!field) return;

            const value = field.value.trim();

            if (!value) {
                errors.push(field);
                return;
            }

            if (name === "email" && !isValidEmail(value)) {
                errors.push(field);
            }
        });

        return errors;
    }

    function markInvalidFields(fields) {
        fields.forEach((field) => {
            field.setAttribute("aria-invalid", "true");
        });
    }

    function clearFieldStates(fields) {
        Object.values(fields).forEach((field) => {
            if (!field) return;
            field.removeAttribute("aria-invalid");
        });
    }

    function focusFirstInvalid(fields) {
        const first = fields[0];

        if (first && typeof first.focus === "function") {
            first.focus();
        }
    }

    function showSuccess(message, text) {
        message.textContent = text;
        message.classList.remove("is-error");
        message.classList.add("is-success");
    }

    function showError(message, text) {
        message.textContent = text;
        message.classList.remove("is-success");
        message.classList.add("is-error");
    }

    function clearMessage(message) {
        message.textContent = "";
        message.classList.remove("is-success", "is-error");
    }

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }
})();