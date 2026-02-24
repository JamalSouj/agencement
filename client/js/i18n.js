const translations = {
    fr: {
        "nav.quote": "Demander un Devis",
        "hero.badge": "Excellence en menuiserie depuis 2004",
        "hero.title1": "La qualité",
        "hero.title2": "sur-mesure",
        "hero.title3": "en menuiserie",
        "hero.subtitle": "Conception, fabrication et installation d'agencements intérieurs haut de gamme pour les espaces commerciaux, bancaires et hôteliers.",
        "about.tag": "Qui sommes-nous",
        "about.title1": "L'excellence artisanale",
        "about.title2": "à l'échelle industrielle"
    },
    en: {
        "nav.quote": "Request a Quote",
        "hero.badge": "Woodworking Excellence since 2004",
        "hero.title1": "Exceptional",
        "hero.title2": "custom-made",
        "hero.title3": "woodworking",
        "hero.subtitle": "Design, manufacturing, and installation of premium interior fittings for commercial, banking, and hospitality spaces.",
        "about.tag": "About Us",
        "about.title1": "Craftsmanship excellence",
        "about.title2": "at an industrial scale"
    }
};

let currentLang = 'fr';
const langToggle = document.getElementById('langToggle');

function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.innerHTML = translations[currentLang][key];
        }
    });
}

if (langToggle) {
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'fr' ? 'en' : 'fr';
        langToggle.textContent = currentLang === 'fr' ? 'EN' : 'FR';
        updateContent();
    });
}
