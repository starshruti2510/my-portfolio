document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mouse Spotlight Tracking ---
    const spotlight = document.getElementById('spotlight');
    window.addEventListener('mousemove', (e) => {
        spotlight.style.left = `${e.clientX}px`;
        spotlight.style.top = `${e.clientY}px`;
    });

    // --- Clean Typing Animation Engine ---
    const phrases = [
        "MERN Stack Developer",
        "Full Stack Enthusiast",
        "Java & DSA Learner"
    ];
    let phraseIdx = 0;
    let letterIdx = 0;
    let isDeleting = false;
    const typingSpeed = 65;
    const deletingSpeed = 40;
    const pauseDuration = 2000;
    const typewriterElement = document.getElementById('typewriter');

    function executeTypecycle() {
        const currentPhrase = phrases[phraseIdx];
        
        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, letterIdx - 1);
            letterIdx--;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, letterIdx + 1);
            letterIdx++;
        }

        let dynamicDelay = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && letterIdx === currentPhrase.length) {
            dynamicDelay = pauseDuration;
            isDeleting = true;
        } else if (isDeleting && letterIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            dynamicDelay = 250; 
        }

        setTimeout(executeTypecycle, dynamicDelay);
    }
    
    if(typewriterElement) executeTypecycle();

    // --- Dynamic Navbar Background & Link Highlight Controller ---
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 260)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // --- Mobile Hamburger Actions ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // --- Scroll Intersection Observer Execution ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
});