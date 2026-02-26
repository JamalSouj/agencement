// ============================================
// Contact Form — Opens mailto link
// ============================================

const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');
const submitBtn = document.getElementById('contactSubmit');

const CONTACT_EMAIL = 'contact@france-agencement.ma';

import { fetchAPI } from './api.js';

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const name = formData.get('name') || '';
        const email = formData.get('email') || '';
        const phone = formData.get('phone') || '';
        const message = formData.get('message') || '';

        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `<span>Envoi en cours...</span>`;
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        try {
            await fetchAPI('/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone, message })
            });

            // Show success feedback
            submitBtn.innerHTML = `<span>Message envoyé !</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"></path></svg>`;
            submitBtn.style.background = 'var(--success)';
            submitBtn.style.color = '#fff';

            feedback.innerHTML = `<strong>Merci ${name} !</strong><br>Votre demande a été envoyée avec succès. Notre équipe vous recontactera très prochainement.`;
            feedback.style.display = 'block';
            feedback.className = 'form-feedback success';
            form.reset();

        } catch (error) {
            console.error(error);
            submitBtn.innerHTML = `<span>Erreur</span>`;
            submitBtn.style.background = 'var(--error)';
            submitBtn.style.color = '#fff';

            feedback.innerHTML = `<strong>Oups !</strong><br>Une erreur est survenue lors de l'envoi de votre message.`;
            feedback.style.display = 'block';
            feedback.className = 'form-feedback error';
        } finally {
            // Reset button after 4 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                submitBtn.style.color = '';
                feedback.style.display = 'none';
            }, 4000);
        }
    });
}
