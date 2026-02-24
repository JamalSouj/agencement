// ============================================
// Contact Form — Opens mailto link
// ============================================

const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');
const submitBtn = document.getElementById('contactSubmit');

const CONTACT_EMAIL = 'contact@france-agencement.ma';

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const name = formData.get('name') || '';

        // Simulate API Request
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `<span>Envoi en cours...</span>`;
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        setTimeout(() => {
            // Show success feedback
            submitBtn.innerHTML = `<span>Message envoyé !</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"></path></svg>`;
            submitBtn.style.background = 'var(--success)';
            submitBtn.style.color = '#fff';

            feedback.innerHTML = `<strong>Merci ${name} !</strong><br>Votre demande a été envoyée avec succès. Notre équipe vous recontactera très prochainement.`;
            feedback.className = 'form-feedback success';
            form.reset();

            // Reset button after 4 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                submitBtn.style.color = '';
                feedback.style.display = 'none';
            }, 4000);

        }, 1500); // 1.5s simulated delay
    });
}
