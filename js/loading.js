// ============================================
// PRIETO ALIMENTOS - Loading Screen Controller
// Shows only on first visit per session
// ============================================

class PrietoLoader {
    constructor() {
        this.screen = document.getElementById('loading-screen');
        this.progressBar = document.getElementById('loading-progress-bar');
        this.percentage = document.getElementById('loading-percentage');
        this.flash = document.getElementById('loading-flash');
        this.progress = 0;
        this.duration = 3200;
    }

    init() {
        if (!this.screen) return;

        // Check if already loaded in this session
        if (sessionStorage.getItem('prietoLoaded')) {
            this.screen.remove();
            if (this.flash) this.flash.remove();
            document.body.classList.remove('loading-active');
            return;
        }

        document.body.classList.add('loading-active');
        this.createParticles();
        this.animateLetters();
        this.startProgress();
    }

    createParticles() {
        const container = this.screen.querySelector('.loading-particles');
        if (!container) return;

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'loading-particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 3 + 's';
            particle.style.animationDuration = (2 + Math.random() * 2) + 's';
            particle.style.width = (2 + Math.random() * 4) + 'px';
            particle.style.height = particle.style.width;
            container.appendChild(particle);
        }
    }

    animateLetters() {
        const letters = this.screen.querySelectorAll('.loading-brand-name span');
        letters.forEach((letter, i) => {
            letter.style.animationDelay = (0.8 + i * 0.08) + 's';
        });
    }

    startProgress() {
        const startTime = Date.now();
        const animate = () => {
            const elapsed = Date.now() - startTime;
            this.progress = Math.min((elapsed / this.duration) * 100, 100);

            if (this.progressBar) {
                this.progressBar.style.width = this.progress + '%';
            }
            if (this.percentage) {
                this.percentage.textContent = Math.round(this.progress) + '%';
            }

            if (this.progress < 100) {
                requestAnimationFrame(animate);
            } else {
                this.complete();
            }
        };
        requestAnimationFrame(animate);
    }

    complete() {
        sessionStorage.setItem('prietoLoaded', 'true');

        setTimeout(() => {
            // Flash effect
            if (this.flash) {
                this.flash.classList.add('active');
            }

            // Exit animation
            this.screen.classList.add('exit');

            setTimeout(() => {
                document.body.classList.remove('loading-active');
                this.screen.classList.add('hidden');
                
                setTimeout(() => {
                    this.screen.remove();
                    if (this.flash) this.flash.remove();
                }, 600);
            }, 1000);
        }, 300);
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    const loader = new PrietoLoader();
    loader.init();
});
