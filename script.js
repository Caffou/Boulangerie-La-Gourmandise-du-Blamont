/**
 * La Gourmandise du Blamont - Landing page publicitaire
 * Navigation, formulaire, animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // ===== Suppression du texte orphelin "d'anniversaire" =====
    document.body.childNodes.forEach(node => {
        if (node.nodeType === 3) {
            const t = node.textContent.trim();
            if (t === "d'anniversaire" || t === "d'anniversaire " || t.includes("d'anniversaire") && t.length < 20) {
                node.remove();
            }
        }
    });

    // ===== Ombre sticky sur le header au scroll =====
    const nav = document.getElementById('nav');
    const onScroll = () => {
        if (window.scrollY > 30) {
            nav?.classList.add('scrolled');
        } else {
            nav?.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();

    // ===== Parallax léger sur le hero (désactivé sur mobile pour les perfs) =====
    const heroBg = document.querySelector('.hero-bg.parallax-bg');
    if (heroBg && window.matchMedia('(min-width: 769px)').matches) {
        window.addEventListener('scroll', () => {
            heroBg.style.transform = `translateY(${window.scrollY * 0.15}px)`;
        });
    }

    // ===== Menu mobile (uniquement sur mobile) =====
    const navToggle = document.querySelector('.nav-toggle');
    const navPanel = document.querySelector('.nav-panel');
    const navOverlay = document.querySelector('.nav-overlay');
    const navClose = document.querySelector('.nav-close');

    function isMobile() {
        return window.matchMedia('(max-width: 768px)').matches;
    }

    function openMenu() {
        if (!isMobile()) return;
        document.body.dataset.scrollY = window.scrollY;
        navPanel?.classList.add('active');
        navOverlay?.classList.add('active');
        navToggle?.classList.add('active');
        navToggle?.setAttribute('aria-label', 'Fermer le menu');
        navOverlay?.setAttribute('aria-hidden', 'false');
        document.body.classList.add('menu-open');
    }

    function closeMenu() {
        const scrollY = document.body.dataset.scrollY;
        navPanel?.classList.remove('active');
        navOverlay?.classList.remove('active');
        navToggle?.classList.remove('active');
        navToggle?.setAttribute('aria-label', 'Ouvrir le menu');
        navOverlay?.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('menu-open');
        if (scrollY) window.scrollTo(0, parseInt(scrollY, 10));
    }

    navToggle?.addEventListener('click', () => {
        if (!isMobile()) return;
        if (navPanel?.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    navClose?.addEventListener('click', closeMenu);
    navOverlay?.addEventListener('click', closeMenu);

    document.querySelectorAll('.nav-panel .nav-links a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Fermer le menu si on redimensionne vers desktop
    window.addEventListener('resize', () => {
        if (!isMobile() && navPanel?.classList.contains('active')) {
            closeMenu();
        }
    });

    // ===== Formulaire de contact =====
    document.getElementById('contactForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Merci pour votre message ! Nous vous recontacterons rapidement.');
        e.target.reset();
    });

    // ===== Animations au scroll =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

    // ===== Smooth scroll =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ===== Fermer la barre CTA (réservation / contact) =====
    const ctaBar = document.getElementById('ctaBar');
    const ctaBarClose = document.getElementById('ctaBarClose');

    if (ctaBar && ctaBarClose) {
        if (localStorage.getItem('ctaBarHidden') === 'true') {
            ctaBar.classList.add('hidden');
            document.body.classList.add('cta-bar-hidden');
        }

        ctaBarClose.addEventListener('click', () => {
            ctaBar.classList.add('hidden');
            document.body.classList.add('cta-bar-hidden');
            localStorage.setItem('ctaBarHidden', 'true');
        });
    }
});
