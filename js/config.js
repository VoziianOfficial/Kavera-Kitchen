"use strict";

window.SITE_CONFIG = {
    companyName: "Kavera",
    companyId: "Kavera Provider Matching LLC",

    brand: {
        shortName: "Kavera",
        tagline: "Compare kitchen remodeling provider options with clarity and style.",
        logoLabel: "Kavera home",
        logoText: "Kavera"
    },

    phone: {
        number: "(888) 555-0198",
        href: "tel:+18885550198",
        label: "Call"
    },

    email: {
        value: "hello@kavera.example",
        href: "mailto:hello@kavera.example",
        label: "Email"
    },

    address: {
        line1: "2148 W Maple Studio Ave",
        city: "Denver",
        state: "CO",
        zip: "80202",
        country: "USA",
        full: "2148 W Maple Studio Ave, Denver, CO 80202, USA"
    },

    serviceArea: "United States",

    footerText:
        "Kavera helps homeowners compare independent kitchen remodeling provider options across the United States.",

    disclaimer:
        "Disclaimer: This site is a free service to assist homeowners in connecting with local service providers. All contractors/providers are independent and this site does not warrant or guarantee any work performed. It is the responsibility of the homeowner to verify that the hired contractor furnishes the necessary license and insurance required for the work being performed. All persons depicted in a photo or video are actors or models and not contractors listed on this site.",

    legalNotice:
        "Kavera is an independent provider-matching platform and is not a kitchen remodeling contractor. Provider availability, scope, licensing, insurance, estimates, timelines, warranties, and project terms must be verified directly with each independent provider.",

    navigation: [
        { label: "Home", href: "index.html" },
        { label: "Services", href: "services.html" },
        { label: "About", href: "about.html" },
        { label: "Contact", href: "contact.html" }
    ],

    legalLinks: [
        { label: "Privacy Policy", href: "privacy-policy.html" },
        { label: "Cookie Policy", href: "cookie-policy.html" },
        { label: "Terms of Service", href: "terms-of-service.html" }
    ],

    assets: {
        favicon: "./assets/icons/favicon.svg",

        images: {
            heroHome: "./assets/images/hero-kitchen-main.jpg",
            heroServices: "./assets/images/hero-services.jpg",
            heroAbout: "./assets/images/hero-about.jpg",
            heroContact: "./assets/images/hero-contact.jpg",

            fullKitchen: "./assets/images/service-full-kitchen.jpg",
            cabinets: "./assets/images/service-cabinets.jpg",
            countertops: "./assets/images/service-countertops.jpg",
            backsplash: "./assets/images/service-backsplash.jpg",

            wood: "./assets/images/material-wood.jpg",
            marble: "./assets/images/material-marble.jpg",
            sageCabinet: "./assets/images/material-sage-cabinet.jpg",
            brassHandle: "./assets/images/material-brass-handle.jpg",
            creamTile: "./assets/images/material-cream-tile.jpg",

            sink: "./assets/images/detail-sink.jpg",
            lighting: "./assets/images/detail-lighting.jpg",
            cta: "./assets/images/cta-kitchen-mosaic.jpg"
        }
    },

    services: [
        {
            id: "full-kitchen-remodeling",
            title: "Full Kitchen Remodeling",
            shortTitle: "Full Remodel",
            href: "full-kitchen-remodeling.html",
            icon: "layout-dashboard",
            image: "./assets/images/service-full-kitchen.jpg",
            summary:
                "Compare independent providers for broader kitchen remodel scopes, layouts, cabinets, surfaces, lighting, and finish coordination.",
            heroTitle: "Compare full kitchen remodeling providers",
            pageIntro:
                "Explore provider options for larger kitchen remodeling projects and review scope, timeline, material, and quote details directly with providers.",
            dropdownHint: "Layout, cabinets, surfaces, lighting, and finish coordination."
        },

        {
            id: "kitchen-cabinet-upgrades",
            title: "Kitchen Cabinet Upgrades",
            shortTitle: "Cabinets",
            href: "kitchen-cabinet-upgrades.html",
            icon: "panels-top-left",
            image: "./assets/images/service-cabinets.jpg",
            summary:
                "Review provider options for cabinet replacement, refacing, finishes, storage details, doors, and hardware.",
            heroTitle: "Compare kitchen cabinet upgrade providers",
            pageIntro:
                "Find independent provider options for cabinet-focused updates and compare finish, storage, quote, and timeline details.",
            dropdownHint: "Replacement, refacing, finishes, storage, doors, and hardware."
        },

        {
            id: "countertops-surfaces",
            title: "Countertops & Surfaces",
            shortTitle: "Countertops",
            href: "countertops-surfaces.html",
            icon: "table-2",
            image: "./assets/images/service-countertops.jpg",
            summary:
                "Compare providers for countertop surfaces, stone, quartz, porcelain, butcher block, edge profiles, sinks, and surface planning.",
            heroTitle: "Compare countertop and surface providers",
            pageIntro:
                "Explore provider options for surface upgrades and review material, measurement, sink, edge, and installation details directly with providers.",
            dropdownHint: "Stone, quartz, porcelain, wood, sinks, and edge profiles."
        },

        {
            id: "backsplash-tile-fixtures",
            title: "Backsplash, Tile & Fixtures",
            shortTitle: "Tile & Fixtures",
            href: "backsplash-tile-fixtures.html",
            icon: "grid-3x3",
            image: "./assets/images/service-backsplash.jpg",
            summary:
                "Compare providers for backsplash updates, tile surfaces, sink areas, faucets, lighting details, hardware, and finish coordination.",
            heroTitle: "Compare backsplash, tile, and fixture providers",
            pageIntro:
                "Review local provider options for detail-driven kitchen updates and compare style, material, surface, and quote clarity.",
            dropdownHint: "Tile, backsplash, faucets, hardware, lighting, and finish details."
        }
    ],

    forms: {
        primaryCta: "Compare providers",
        secondaryCta: "Request options",
        submitLabel: "Start comparing",

        serviceOptions: [
            "Full Kitchen Remodeling",
            "Kitchen Cabinet Upgrades",
            "Countertops & Surfaces",
            "Backsplash, Tile & Fixtures"
        ],

        successMessage:
            "Thank you. Your request has been received. You can now compare provider options and follow up directly with independent companies.",

        errorMessage:
            "Please complete full name, phone, email, and selected service.",

        safeNote:
            "Submitting this form does not hire a contractor. Kavera helps you compare independent provider options. Homeowners should verify licensing, insurance, quotes, timelines, and warranties directly with providers."
    },

    cookieBanner: {
        storageKey: "kavera_policy_choice",
        title: "Privacy preferences",
        text:
            "Kavera uses cookies and similar technologies to improve site experience. Please review our policies and choose whether to accept or decline.",
        accept: "Accept",
        decline: "Decline",
        links: [
            { label: "Privacy Policy", href: "privacy-policy.html" },
            { label: "Cookie Policy", href: "cookie-policy.html" },
            { label: "Terms of Service", href: "terms-of-service.html" }
        ]
    },

    sectionNav: {
        "index.html": [
            { label: "Intro", href: "#hero" },
            { label: "Services", href: "#services" },
            { label: "Match", href: "#match" },
            { label: "Materials", href: "#materials" },
            { label: "Process", href: "#process" },
            { label: "Compare", href: "#compare" },
            { label: "Start", href: "#start" }
        ],

        "services.html": [
            { label: "Intro", href: "#hero" },
            { label: "Atlas", href: "#atlas" },
            { label: "Styles", href: "#styles" },
            { label: "Scope", href: "#scope-range" },
            { label: "Clarity", href: "#clarity" },
            { label: "FAQ", href: "#faq" },
            { label: "Start", href: "#start" }
        ],

        "about.html": [
            { label: "Intro", href: "#hero" },
            { label: "Story", href: "#story" },
            { label: "Details", href: "#slideshow" },
            { label: "Model", href: "#model" },
            { label: "Limits", href: "#limits" },
            { label: "Principles", href: "#principles" },
            { label: "Start", href: "#start" }
        ],

        "contact.html": [
            { label: "Intro", href: "#hero" },
            { label: "Options", href: "#options" },
            { label: "Request", href: "#request" },
            { label: "Match", href: "#contact-match" },
            { label: "FAQ", href: "#faq" },
            { label: "Start", href: "#start" }
        ],

        "full-kitchen-remodeling.html": [
            { label: "Intro", href: "#hero" },
            { label: "Scope", href: "#scope" },
            { label: "Checklist", href: "#checklist" },
            { label: "Materials", href: "#materials" },
            { label: "Compare", href: "#compare" },
            { label: "FAQ", href: "#faq" },
            { label: "Start", href: "#start" }
        ],

        "kitchen-cabinet-upgrades.html": [
            { label: "Intro", href: "#hero" },
            { label: "Scope", href: "#scope" },
            { label: "Checklist", href: "#checklist" },
            { label: "Materials", href: "#materials" },
            { label: "Compare", href: "#compare" },
            { label: "FAQ", href: "#faq" },
            { label: "Start", href: "#start" }
        ],

        "countertops-surfaces.html": [
            { label: "Intro", href: "#hero" },
            { label: "Scope", href: "#scope" },
            { label: "Checklist", href: "#checklist" },
            { label: "Materials", href: "#materials" },
            { label: "Compare", href: "#compare" },
            { label: "FAQ", href: "#faq" },
            { label: "Start", href: "#start" }
        ],

        "backsplash-tile-fixtures.html": [
            { label: "Intro", href: "#hero" },
            { label: "Scope", href: "#scope" },
            { label: "Checklist", href: "#checklist" },
            { label: "Materials", href: "#materials" },
            { label: "Compare", href: "#compare" },
            { label: "FAQ", href: "#faq" },
            { label: "Start", href: "#start" }
        ]
    },

	    faq: {
	        general: [
            {
                question: "How does Kavera help me compare kitchen remodeling providers?",
                answer:
                    "Kavera helps homeowners organize kitchen remodeling service categories and request information from independent local provider options. Homeowners should compare each provider directly before choosing who to hire."
            },
            {
                question: "Is Kavera a kitchen remodeling contractor?",
                answer:
                    "No. Kavera is an independent provider-matching platform. It does not perform kitchen remodeling work, employ remodeling crews, or manage projects directly."
            },
            {
                question: "What should I ask before choosing a provider?",
                answer:
                    "Ask about license, insurance, quote detail, materials, timeline, warranty terms, project conditions, and who will be responsible for each part of the work."
            },
            {
                question: "How do I know if a provider serves my area?",
                answer:
                    "Provider availability can vary by ZIP code, city, project type, and schedule. Confirm service area directly with each independent provider."
            }
	        ],

	        services: [
	            {
	                question: "Can I compare providers for only one kitchen update?",
	                answer:
	                    "Yes. Kavera organizes provider options by service category, including cabinets, countertops, backsplash and fixtures, or broader kitchen remodeling scopes."
	            },
	            {
	                question: "Does Kavera recommend one specific provider?",
	                answer:
	                    "Kavera helps homeowners review provider options. The final decision should be based on direct conversations, estimates, license and insurance verification, warranties, and project fit."
	            },
	            {
	                question: "What can affect kitchen remodeling project scope?",
	                answer:
	                    "Materials, layout changes, cabinet condition, measurements, plumbing or electrical needs, access, location, and provider availability may affect scope and timing."
	            },
	            {
	                question: "How do I choose the right service category?",
	                answer:
	                    "Start with the category that matches the biggest part of your kitchen scope (full remodel, cabinets, countertops, or tile and fixtures). Providers can confirm details during estimates, but separating categories helps keep comparisons clearer."
	            }
	        ],

	        contact: [
	            {
	                question: "What happens after I submit the request form?",
	                answer:
	                    "Your request helps identify the service category you want to compare. Submitting the form does not hire a contractor or create a project agreement."
	            },
	            {
	                question: "Why does the form only ask for four fields?",
	                answer:
	                    "The form is intentionally compact. More detailed project questions should be discussed directly with independent providers during estimate conversations."
	            },
	            {
	                question: "Does Kavera operate its own remodeling crew?",
	                answer:
	                    "No. Kavera is not a kitchen remodeling contractor and does not operate remodeling crews."
	            },
	            {
	                question: "Do I need to share my full project details right away?",
	                answer:
	                    "No. Start with the service category and basic contact info. More detailed scope, measurements, materials, timeline, and quote questions should be confirmed directly with independent providers during estimate conversations."
	            }
	        ],

        "full-kitchen-remodeling": [
            {
                question: "What should I compare for a full kitchen remodel?",
                answer:
                    "Compare layout planning, cabinet scope, surface materials, lighting, fixture details, timeline expectations, estimate detail, and warranty discussions."
            },
            {
                question: "Does Kavera manage full kitchen remodel projects?",
                answer:
                    "No. Kavera does not manage or perform remodeling projects. Homeowners communicate directly with independent providers about scope, scheduling, estimates, and terms."
            },
            {
                question: "Can one provider handle every part of a larger kitchen scope?",
                answer:
                    "Provider capabilities vary. Ask each provider which parts of the project they handle, which parts may require separate trades, and how coordination is addressed."
            }
        ],

        "kitchen-cabinet-upgrades": [
            {
                question: "Should I compare cabinet replacement and refacing separately?",
                answer:
                    "Yes. Replacement and refacing can involve different materials, timelines, costs, and provider capabilities."
            },
            {
                question: "What cabinet details should I ask about?",
                answer:
                    "Ask about door style, finish, storage inserts, hardware, measurement process, cabinet construction, timeline, and warranty terms."
            },
            {
                question: "Does Kavera install cabinets?",
                answer:
                    "No. Kavera helps homeowners compare independent cabinet upgrade provider options and does not install or replace cabinets directly."
            }
        ],

        "countertops-surfaces": [
            {
                question: "What should I ask countertop providers?",
                answer:
                    "Ask about material options, edge profiles, seams, sink cutouts, measurement process, removal, installation timing, warranties, and quote detail."
            },
            {
                question: "Can countertop scope affect the rest of the kitchen?",
                answer:
                    "Yes. Countertop planning may connect to sinks, backsplash height, cabinets, plumbing fixtures, and timing with other kitchen updates."
            },
            {
                question: "Does Kavera install countertops?",
                answer:
                    "No. Kavera does not install countertops or perform direct remodeling work."
            }
        ],

        "backsplash-tile-fixtures": [
            {
                question: "What should I compare for backsplash and fixture updates?",
                answer:
                    "Compare tile material, pattern, grout, surface prep, faucet compatibility, hardware finish, lighting details, quote clarity, and timing."
            },
            {
                question: "Can backsplash and fixtures be a smaller project?",
                answer:
                    "Often yes, but scope depends on existing surfaces, materials, plumbing or electrical needs, and provider availability."
            },
            {
                question: "Does Kavera perform tile or fixture work?",
                answer:
                    "No. Kavera is an independent provider-matching platform and does not perform tile, fixture, or kitchen remodeling work directly."
            }
        ]
    },

    servicePages: {
        "full-kitchen-remodeling.html": {
            serviceId: "full-kitchen-remodeling",
            heroImage: "./assets/images/service-full-kitchen.jpg",
            kicker: "Full kitchen scope",
            title: "Compare full kitchen remodeling providers",
            intro:
                "Review independent provider options for larger kitchen updates involving layout, cabinetry, surfaces, lighting, and finish coordination.",
            scopeTitle: "When the whole kitchen needs a clearer plan",
            scopeText:
                "A full kitchen remodel can involve many decisions at once. Kavera helps homeowners organize provider options by scope, materials, timing, and quote detail before making contact.",
            scopeImage: "./assets/images/hero-kitchen-main.jpg",
            checklist: [
                "Layout and workflow discussions",
                "Cabinet replacement or major upgrades",
                "Countertop and surface coordination",
                "Lighting, backsplash, and fixture details",
                "Timeline and access expectations",
                "License, insurance, and warranty verification"
            ],
            materials: ["Layout", "Cabinets", "Surfaces", "Lighting"]
        },

        "kitchen-cabinet-upgrades.html": {
            serviceId: "kitchen-cabinet-upgrades",
            heroImage: "./assets/images/service-cabinets.jpg",
            kicker: "Cabinet focus",
            title: "Compare kitchen cabinet upgrade providers",
            intro:
                "Explore independent provider options for cabinet replacement, refacing, finishes, door styles, storage inserts, and hardware.",
            scopeTitle: "Cabinet updates shape the whole kitchen",
            scopeText:
                "Cabinet projects can range from visual updates to larger storage and replacement scopes. Compare providers by finish options, construction, quote detail, and timeline clarity.",
            scopeImage: "./assets/images/material-sage-cabinet.jpg",
            checklist: [
                "Replacement versus refacing options",
                "Door style and cabinet finish",
                "Storage inserts and organization",
                "Hardware and handle coordination",
                "Measurement or site visit process",
                "License, insurance, and warranty verification"
            ],
            materials: ["Door profile", "Finish", "Handle", "Storage"]
        },

        "countertops-surfaces.html": {
            serviceId: "countertops-surfaces",
            heroImage: "./assets/images/service-countertops.jpg",
            kicker: "Surface focus",
            title: "Compare countertop and surface providers",
            intro:
                "Review provider options for countertop replacement, quartz, stone, porcelain, butcher block, edge profiles, sinks, and measurement planning.",
            scopeTitle: "Surfaces need material and measurement clarity",
            scopeText:
                "Countertop projects often depend on material selection, templating, sink planning, edges, seams, and installation timing.",
            scopeImage: "./assets/images/material-marble.jpg",
            checklist: [
                "Material options and availability",
                "Edge profile and seam discussion",
                "Sink cutout and fixture coordination",
                "Measurement or template process",
                "Removal and installation timing",
                "License, insurance, and warranty verification"
            ],
            materials: ["Stone", "Quartz", "Edge", "Sink"]
        },

        "backsplash-tile-fixtures.html": {
            serviceId: "backsplash-tile-fixtures",
            heroImage: "./assets/images/service-backsplash.jpg",
            kicker: "Detail focus",
            title: "Compare backsplash, tile, and fixture providers",
            intro:
                "Explore independent provider options for backsplash updates, tile surfaces, sink areas, faucets, hardware, lighting details, and finish coordination.",
            scopeTitle: "Small details can change the whole kitchen feel",
            scopeText:
                "Backsplash, tile, and fixture updates can be compact but detail-heavy. Compare providers by material planning, surface prep, fixture compatibility, and finish coordination.",
            scopeImage: "./assets/images/detail-sink.jpg",
            checklist: [
                "Tile material and pattern discussion",
                "Grout color and surface prep",
                "Faucet and fixture compatibility",
                "Lighting and hardware coordination",
                "Timeline and access expectations",
                "License, insurance, and warranty verification"
            ],
            materials: ["Tile", "Grout", "Faucet", "Lighting"]
        }
    },

    pageMeta: {
        "index.html": {
            title: "Kavera | Compare Kitchen Remodeling Providers",
            description:
                "Compare independent kitchen remodeling provider options for cabinets, countertops, backsplash, fixtures, and full kitchen remodel projects."
        },
        "services.html": {
            title: "Kitchen Remodeling Services | Kavera",
            description:
                "Explore kitchen remodeling service categories and compare independent provider options for your project scope."
        },
        "about.html": {
            title: "About Kavera | Kitchen Provider Matching Platform",
            description:
                "Learn how Kavera helps homeowners compare local kitchen remodeling providers while staying independent from direct remodeling services."
        },
        "contact.html": {
            title: "Contact Kavera | Compare Kitchen Provider Options",
            description:
                "Contact Kavera to start comparing independent kitchen remodeling provider options in your area."
        },
        "full-kitchen-remodeling.html": {
            title: "Full Kitchen Remodeling Providers | Kavera",
            description:
                "Compare independent provider options for full kitchen remodeling scopes, layouts, cabinets, surfaces, lighting, and finish coordination."
        },
        "kitchen-cabinet-upgrades.html": {
            title: "Kitchen Cabinet Upgrade Providers | Kavera",
            description:
                "Compare independent provider options for cabinet replacement, refacing, finishes, doors, storage, and hardware."
        },
        "countertops-surfaces.html": {
            title: "Countertop & Surface Providers | Kavera",
            description:
                "Compare independent provider options for kitchen countertops, stone surfaces, quartz, porcelain, edge profiles, and sinks."
        },
        "backsplash-tile-fixtures.html": {
            title: "Backsplash, Tile & Fixture Providers | Kavera",
            description:
                "Compare independent provider options for backsplash, tile, sink areas, faucets, lighting details, and finish coordination."
        },
        "privacy-policy.html": {
            title: "Privacy Policy | Kavera",
            description:
                "Review Kavera privacy practices for the independent kitchen remodeling provider-matching platform."
        },
        "cookie-policy.html": {
            title: "Cookie Policy | Kavera",
            description:
                "Review how Kavera uses cookies and similar technologies on the provider-matching website."
        },
        "terms-of-service.html": {
            title: "Terms of Service | Kavera",
            description:
                "Review the terms for using Kavera, an independent kitchen remodeling provider-matching platform."
        }
    }
};
