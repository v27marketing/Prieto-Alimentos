// ============================================
// PRIETO ALIMENTOS - Historia Page
// GSAP ScrollTrigger horizontal scroll + parallax
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Wait for GSAP to be loaded
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    initHistoriaHero();
    initHorizontalScroll();
    initProgressIndicator();
    initParallaxElements();
    initTextAnimations();
});

// ============================================
// HERO ANIMATION
// ============================================
function initHistoriaHero() {
    const hero = document.querySelector('.historia-hero');
    if (!hero) return;

    gsap.from('.historia-hero-content h1', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3
    });

    gsap.from('.historia-hero-content p', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.6
    });

    gsap.from('.historia-scroll-hint', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 1
    });

    // Parallax on hero on scroll
    gsap.to('.historia-hero-content', {
        y: -100,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
}

// ============================================
// HORIZONTAL SCROLL
// ============================================
function initHorizontalScroll() {
    const wrapper = document.querySelector('.historia-horizontal-wrapper');
    const track = document.querySelector('.historia-horizontal-track');
    if (!wrapper || !track) return;

    // Only run horizontal scroll on desktop
    const mm = gsap.matchMedia();

    mm.add('(min-width: 769px)', () => {
        const panels = gsap.utils.toArray('.historia-panel');
        
        const scrollTween = gsap.to(track, {
            x: () => -(track.scrollWidth - window.innerWidth),
            ease: 'none',
            scrollTrigger: {
                trigger: wrapper,
                pin: true,
                scrub: 1,
                end: () => '+=' + (track.scrollWidth - window.innerWidth),
                invalidateOnRefresh: true
            }
        });

        // Animate each panel's content on enter
        panels.forEach((panel, i) => {
            const text = panel.querySelector('.historia-text');
            const illustration = panel.querySelector('.historia-illustration');
            const year = panel.querySelector('.historia-year');

            if (text) {
                gsap.from(text.children, {
                    x: -60,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: panel,
                        containerAnimation: scrollTween,
                        start: 'left 80%',
                        end: 'left 30%',
                        toggleActions: 'play none none reverse'
                    }
                });
            }

            if (illustration) {
                gsap.from(illustration, {
                    x: 80,
                    opacity: 0,
                    scale: 0.9,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: panel,
                        containerAnimation: scrollTween,
                        start: 'left 70%',
                        end: 'left 20%',
                        toggleActions: 'play none none reverse'
                    }
                });
            }

            if (year) {
                gsap.from(year, {
                    scale: 0.5,
                    opacity: 0,
                    duration: 1.5,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: panel,
                        containerAnimation: scrollTween,
                        start: 'left 90%',
                        toggleActions: 'play none none reverse'
                    }
                });
            }
        });

        // Background color transition for last panel (Etiqueta Negra)
        const lastPanel = panels[panels.length - 1];
        if (lastPanel) {
            ScrollTrigger.create({
                trigger: lastPanel,
                containerAnimation: scrollTween,
                start: 'left 60%',
                onEnter: () => {
                    gsap.to('body', { backgroundColor: '#0a0a0a', duration: 0.8 });
                },
                onLeaveBack: () => {
                    gsap.to('body', { backgroundColor: '#ffffff', duration: 0.8 });
                }
            });
        }

        return () => {
            // Cleanup on resize below breakpoint
        };
    });

    // Mobile: vertical scroll with simple animations
    mm.add('(max-width: 768px)', () => {
        const panels = gsap.utils.toArray('.historia-panel');

        panels.forEach(panel => {
            const text = panel.querySelector('.historia-text');
            const illustration = panel.querySelector('.historia-illustration');

            if (text) {
                gsap.from(text.children, {
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: panel,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                });
            }

            if (illustration) {
                gsap.from(illustration, {
                    y: 60,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: panel,
                        start: 'top 70%',
                        toggleActions: 'play none none none'
                    }
                });
            }
        });
    });
}

// ============================================
// PROGRESS INDICATOR
// ============================================
function initProgressIndicator() {
    const progress = document.querySelector('.historia-progress');
    const dots = document.querySelectorAll('.historia-progress-dot');
    const yearLabel = document.querySelector('.historia-progress-year');
    const wrapper = document.querySelector('.historia-horizontal-wrapper');

    if (!progress || !wrapper || dots.length === 0) return;

    const years = ['1960', '1962', '1965', '1972', '1985', '2010'];

    ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: 'bottom bottom',
        onEnter: () => progress.classList.add('visible'),
        onLeave: () => progress.classList.remove('visible'),
        onEnterBack: () => progress.classList.add('visible'),
        onLeaveBack: () => progress.classList.remove('visible'),
        onUpdate: (self) => {
            const panelIndex = Math.min(
                Math.floor(self.progress * dots.length),
                dots.length - 1
            );

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i <= panelIndex);
            });

            if (yearLabel && years[panelIndex]) {
                yearLabel.textContent = years[panelIndex];
            }
        }
    });
}

// ============================================
// PARALLAX ELEMENTS
// ============================================
function initParallaxElements() {
    const parallaxEls = document.querySelectorAll('[data-parallax-speed]');

    parallaxEls.forEach(el => {
        const speed = parseFloat(el.dataset.parallaxSpeed) || 0.5;

        gsap.to(el, {
            y: () => speed * 100,
            ease: 'none',
            scrollTrigger: {
                trigger: el.closest('.historia-panel') || el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });
}

// ============================================
// TEXT REVEAL ANIMATIONS
// ============================================
function initTextAnimations() {
    // SVG path drawing animation
    const paths = document.querySelectorAll('.draw-path');
    paths.forEach(path => {
        const length = path.getTotalLength ? path.getTotalLength() : 0;
        if (length > 0) {
            gsap.set(path, {
                strokeDasharray: length,
                strokeDashoffset: length
            });

            gsap.to(path, {
                strokeDashoffset: 0,
                duration: 2,
                ease: 'power2.inOut',
                scrollTrigger: {
                    trigger: path.closest('svg'),
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        }
    });
}
