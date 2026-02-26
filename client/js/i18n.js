const translations = {
    fr: {
        "nav.home": "Accueil",
        "nav.about": "Qui sommes-nous",
        "nav.portfolio": "Réalisations",
        "nav.contact": "Contact",
        "nav.quote": "Demander un Devis",

        "hero.badge": "Excellence en menuiserie depuis 2004",
        "hero.title1": "La qualité",
        "hero.title2": "sur-mesure",
        "hero.title3": "en menuiserie",
        "hero.subtitle": "Conception, fabrication et installation d'agencements intérieurs haut de gamme pour les espaces commerciaux, bancaires et hôteliers.",
        "hero.btn.quote": "Demander un Devis",
        "hero.btn.portfolio": "Nos Réalisations",
        "hero.stat.pro": "Professionnels",
        "hero.stat.area": "d'Atelier",
        "hero.stat.exp": "Ans d'Expérience",

        "about.tag": "Qui sommes-nous",
        "about.title1": "L'excellence artisanale",
        "about.title2": "à l'échelle industrielle",
        "about.p1": "Depuis <strong>2004</strong>, France Agencement est le partenaire de référence pour l'agencement intérieur sur-mesure au Maroc. Notre usine de <strong>6 000 m²</strong>, située dans la Zone Industrielle du Sahel à Had Soualem, allie savoir-faire artisanal et technologies de pointe.",
        "about.p2": "Notre équipe de plus de <strong>200 professionnels</strong> — ingénieurs, menuisiers, métalliers et designers — conçoit et fabrique des aménagements pour les secteurs bancaire, commercial, hôtelier et industriel. Chaque projet est une réponse sur-mesure aux exigences les plus élevées.",

        "about.feat1.title": "Conception Intégrée",
        "about.feat1.desc": "Du design 3D à l'installation, tout est réalisé en interne.",
        "about.feat2.title": "Délais Maîtrisés",
        "about.feat2.desc": "Organisation logistique rigoureuse pour respecter vos échéances.",
        "about.feat3.title": "Qualité Certifiée",
        "about.feat3.desc": "Matériaux nobles et finitions irréprochables, conformes aux normes internationales.",
        "about.card.text": "d'espace de production",
        "scroll.indicator": "Défiler",

        "portfolio.tag": "Réalisations",
        "portfolio.title1": "Des projets qui",
        "portfolio.title2": "parlent d'eux-mêmes",
        "portfolio.filter.all": "Tous",

        "contact.tag": "Contact",
        "contact.title1": "Discutons de",
        "contact.title2": "votre projet",
        "contact.desc": "Vous avez un projet d'agencement ? Notre équipe est à votre écoute pour transformer vos idées en réalité.",
        "contact.address.title": "Adresse",
        "contact.address.desc": "Zone Industrielle du Sahel<br />Had Soualem, Maroc",
        "contact.phone.title": "Téléphone",
        "contact.email.title": "Email",

        "form.name": "Nom complet",
        "form.name.ph": "Votre nom",
        "form.email": "Email",
        "form.email.ph": "votre@email.com",
        "form.phone": "Téléphone",
        "form.phone.ph": "+212 6XX XX XX XX",
        "form.message": "Message",
        "form.message.ph": "Décrivez votre projet...",
        "form.submit": "Envoyer le message",

        "footer.desc": "L'excellence en menuiserie sur-mesure depuis 2004.",
        "footer.nav": "Navigation",
        "footer.services": "Services",
        "footer.copy": "&copy; 2024 France Agencement. Tous droits réservés."
    },
    en: {
        "nav.home": "Home",
        "nav.about": "About Us",
        "nav.portfolio": "Portfolio",
        "nav.contact": "Contact",
        "nav.quote": "Request a Quote",

        "hero.badge": "Woodworking Excellence since 2004",
        "hero.title1": "Exceptional",
        "hero.title2": "custom-made",
        "hero.title3": "woodworking",
        "hero.subtitle": "Design, manufacturing, and installation of premium interior fittings for commercial, banking, and hospitality spaces.",
        "hero.btn.quote": "Request a Quote",
        "hero.btn.portfolio": "Our Portfolio",
        "hero.stat.pro": "Professionals",
        "hero.stat.area": "of Workshop",
        "hero.stat.exp": "Years of Experience",

        "about.tag": "About Us",
        "about.title1": "Craftsmanship excellence",
        "about.title2": "at an industrial scale",
        "about.p1": "Since <strong>2004</strong>, France Agencement has been the reference partner for custom interior fittings in Morocco. Our <strong>6,000 m²</strong> factory, located in the Sahel Industrial Zone in Had Soualem, combines traditional craftsmanship with cutting-edge technologies.",
        "about.p2": "Our team of over <strong>200 professionals</strong> — engineers, carpenters, metalworkers, and designers — designs and manufactures fittings for the banking, commercial, hospitality, and industrial sectors. Each project is a tailored response to the highest requirements.",

        "about.feat1.title": "Integrated Design",
        "about.feat1.desc": "From 3D design to installation, everything is done in-house.",
        "about.feat2.title": "Controlled Deadlines",
        "about.feat2.desc": "Rigorous logistics organization to meet your deadlines.",
        "about.feat3.title": "Certified Quality",
        "about.feat3.desc": "Noble materials and flawless finishes, meeting international standards.",
        "about.card.text": "of production space",
        "scroll.indicator": "Scroll",

        "portfolio.tag": "Portfolio",
        "portfolio.title1": "Projects that",
        "portfolio.title2": "speak for themselves",
        "portfolio.filter.all": "All",

        "contact.tag": "Contact",
        "contact.title1": "Let's discuss",
        "contact.title2": "your project",
        "contact.desc": "Do you have a fitting project? Our team is at your disposal to turn your ideas into reality.",
        "contact.address.title": "Address",
        "contact.address.desc": "Sahel Industrial Zone<br />Had Soualem, Morocco",
        "contact.phone.title": "Phone",
        "contact.email.title": "Email",

        "form.name": "Full Name",
        "form.name.ph": "Your Name",
        "form.email": "Email",
        "form.email.ph": "your@email.com",
        "form.phone": "Phone",
        "form.phone.ph": "+212 6XX XX XX XX",
        "form.message": "Message",
        "form.message.ph": "Describe your project...",
        "form.submit": "Send Message",

        "footer.desc": "Custom woodworking excellence since 2004.",
        "footer.nav": "Navigation",
        "footer.services": "Services",
        "footer.copy": "&copy; 2024 France Agencement. All rights reserved."
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

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[currentLang][key]) {
            el.setAttribute('placeholder', translations[currentLang][key]);
        }
    });
}

window.updateContent = updateContent;

if (langToggle) {
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'fr' ? 'en' : 'fr';
        langToggle.textContent = currentLang === 'fr' ? 'EN' : 'FR';
        updateContent();
    });
}
