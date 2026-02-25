// ============================================
// PRIETO ALIMENTOS - Contato Page
// Decorative form validation & feedback
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
});

function initContactForm() {
    const form = document.getElementById('contato-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Clear previous errors
        form.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));

        let isValid = true;

        // Validate required fields
        const fields = [
            { id: 'contato-nome', msg: 'Por favor, insira seu nome.' },
            { id: 'contato-email', msg: 'Por favor, insira um email válido.', type: 'email' },
            { id: 'contato-assunto', msg: 'Por favor, selecione um assunto.' },
            { id: 'contato-mensagem', msg: 'Por favor, escreva sua mensagem.' }
        ];

        fields.forEach(field => {
            const input = document.getElementById(field.id);
            if (!input) return;

            let valid = input.value.trim() !== '';

            if (field.type === 'email' && valid) {
                valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
            }

            if (!valid) {
                isValid = false;
                const group = input.closest('.form-group');
                group.classList.add('error');
                const errorMsg = group.querySelector('.error-msg');
                if (errorMsg) errorMsg.textContent = field.msg;
            }
        });

        if (isValid) {
            // Simulate submission
            const btn = form.querySelector('.btn');
            const originalText = btn.textContent;
            btn.textContent = 'Enviando...';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = '✓ Enviado!';
                btn.style.background = '#22c55e';

                showToast('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');

                setTimeout(() => {
                    form.reset();
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        }
    });

    // Real-time validation on blur
    form.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('blur', () => {
            const group = input.closest('.form-group');
            if (input.value.trim() !== '') {
                group.classList.remove('error');
            }
        });
    });
}
