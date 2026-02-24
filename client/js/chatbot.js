// ============================================
// AI Chatbot — Floating assistant with pre-set responses
// ============================================

const chatbot = document.getElementById('chatbot');
const toggle = document.getElementById('chatbotToggle');
const messagesContainer = document.getElementById('chatbotMessages');
const input = document.getElementById('chatbotInput');
const sendBtn = document.getElementById('chatbotSend');

// Pre-set responses
const responses = {
    services: `Nous proposons une gamme complète de services :\n\n🪵 **Menuiserie sur-mesure** — mobilier, cloisons, habillages\n🏢 **Agencement intérieur** — banques, commerces, hôtels\n🔧 **Métallerie** — structures et ouvrages métalliques\n📐 **Conception 3D** — modélisation et plans d'exécution\n🏗️ **Installation** — pose et finitions sur site`,

    devis: `Pour obtenir un devis personnalisé :\n\n1. Remplissez le formulaire de contact ci-dessous\n2. Décrivez votre projet en détail\n3. Notre équipe vous contactera sous 48h\n\nVous pouvez aussi nous appeler au **+212 522 96 30 00**`,

    horaires: `Nos horaires d'ouverture :\n\n📅 **Lundi - Vendredi** : 8h00 - 18h00\n📅 **Samedi** : 8h00 - 13h00\n📅 **Dimanche** : Fermé\n\nNous sommes disponibles par téléphone aux mêmes horaires.`,

    localisation: `Nous sommes situés à :\n\n📍 **Zone Industrielle du Sahel**\nHad Soualem, Maroc\n\n📞 +212 522 96 30 00\n📧 contact@france-agencement.ma\n\nNotre usine de **6 000 m²** est facilement accessible depuis l'autoroute Casablanca-El Jadida.`,

    default: `Merci pour votre message ! Pour une réponse personnalisée, je vous invite à :\n\n• Remplir notre **formulaire de contact**\n• Appeler le **+212 522 96 30 00**\n• Envoyer un email à **contact@france-agencement.ma**\n\nNotre équipe sera ravie de vous assister.`,
};

// Toggle chatbot
toggle.addEventListener('click', () => {
    chatbot.classList.toggle('open');
    if (chatbot.classList.contains('open')) {
        input.focus();
    }
});

// Handle suggestion buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('suggestion-btn')) {
        const question = e.target.dataset.question;
        const questionText = e.target.textContent;

        addMessage(questionText, 'user');

        // Remove suggestions after clicking
        const suggestions = document.getElementById('chatbotSuggestions');
        if (suggestions) suggestions.remove();

        // Simulate typing delay
        setTimeout(() => {
            addMessage(responses[question] || responses.default, 'bot');
        }, 600);
    }
});

// Handle send button
sendBtn.addEventListener('click', sendMessage);
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    input.value = '';

    // Simple keyword matching
    setTimeout(() => {
        let response = responses.default;

        const lower = text.toLowerCase();
        if (lower.includes('service') || lower.includes('menuiserie') || lower.includes('quoi')) {
            response = responses.services;
        } else if (lower.includes('devis') || lower.includes('prix') || lower.includes('coût') || lower.includes('tarif')) {
            response = responses.devis;
        } else if (lower.includes('horaire') || lower.includes('ouvert') || lower.includes('heure')) {
            response = responses.horaires;
        } else if (lower.includes('adresse') || lower.includes('où') || lower.includes('situé') || lower.includes('localisation')) {
            response = responses.localisation;
        }

        addMessage(response, 'bot');
    }, 800);
}

function addMessage(text, type) {
    const msg = document.createElement('div');
    msg.className = `chat-message ${type}`;

    // Simple markdown-like formatting for bot messages
    if (type === 'bot') {
        const formatted = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
        msg.innerHTML = `<p>${formatted}</p>`;
    } else {
        msg.innerHTML = `<p>${text}</p>`;
    }

    messagesContainer.appendChild(msg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
