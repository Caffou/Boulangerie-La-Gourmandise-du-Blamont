/**
 * La Gourmandise du Blamont - Landing page publicitaire
 * Navigation, formulaire, animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // ===== Parallax léger sur le hero (désactivé sur mobile pour les perfs) =====
    const heroBg = document.querySelector('.hero-bg.parallax-bg');
    if (heroBg && window.matchMedia('(min-width: 769px)').matches) {
        window.addEventListener('scroll', () => {
            heroBg.style.transform = `translateY(${window.scrollY * 0.15}px)`;
        });
    }

    // ===== Menu mobile =====
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle?.addEventListener('click', () => {
        navLinks?.classList.toggle('active');
        navToggle?.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks?.classList.remove('active');
            navToggle?.classList.remove('active');
        });
    });

    // ===== Formulaire de contact =====
    document.getElementById('contactForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Merci pour votre message ! Nous vous recontacterons rapidement.');
        e.target.reset();
    });

    // ===== Formulaire de commande =====
    const orderForm = document.getElementById('orderForm');
    orderForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const nom = document.getElementById('nom')?.value;
        const telephone = document.getElementById('telephone')?.value;
        const produit = document.getElementById('produit')?.value;
        const heure = document.getElementById('heure')?.value;
        
        // Créer le lien WhatsApp ou tel: pour la réservation
        const message = `Bonjour, je souhaite réserver :\n- Nom : ${nom}\n- Produits : ${produit || 'à préciser'}\n- Heure de retrait : ${heure || 'à préciser'}`;
        const tel = '03322914231';
        
        // Option : ouvrir le clavier téléphonique ou WhatsApp
        if (nom && telephone) {
            alert(`Merci ${nom} ! Votre réservation a été prise en note.\n\nNous vous recontacterons au ${telephone} pour confirmer.\n\nVous pouvez aussi nous appeler au 03 22 91 42 31.`);
            orderForm.reset();
        }
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
});
