/* =========================================
   PORTFOLIO INTERACTIVITY SCRIPT
========================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* --- Toggle Menu Icon & Navbar (Mobile) --- */
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');

    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };

    /* --- Smooth Scrolling & Active Link Highlighting --- */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');

    window.onscroll = () => {
        let top = window.scrollY;
        
        sections.forEach(sec => {
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if(top >= offset && top < offset + height) {
                navLinks.forEach(links => {
                    links.classList.remove('active');
                    let activeLink = document.querySelector('header nav a[href*=' + id + ']');
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                });
            }
        });

        /* --- Sticky Header --- */
        let header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 100);

        /* --- Remove Mobile Nav on Scroll --- */
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    };

    /* --- Scroll Reveal Animations --- */
    // A simple custom implementation instead of importing an external library
    const revealElements = document.querySelectorAll('.home-img, .about-content, .skill-category, .project-box, .contact-wrapper');
    
    // Initial style setup for elements before they reveal
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s ease-out';
    });

    const revealOnScroll = () => {
        let windowHeight = window.innerHeight;
        let elementVisible = 150; // Pixels from bottom when reveal starts

        revealElements.forEach((el, index) => {
            let elementTop = el.getBoundingClientRect().top;

            if (elementTop < windowHeight - elementVisible) {
                // Add a slight stagger effect based on index for grid items
                let delay = 0;
                if (el.classList.contains('skill-category') || el.classList.contains('project-box')) {
                    // Calculate index within parent to stagger siblings
                    let parent = el.parentElement;
                    let siblings = Array.from(parent.children);
                    let localIndex = siblings.indexOf(el);
                    delay = localIndex * 0.15; // 150ms delay per item
                }
                
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, delay * 1000);
            }
        });
    };

    // Trigger once on load
    revealOnScroll();
    
    // Trigger on scroll
    window.addEventListener('scroll', revealOnScroll);

    /* --- Typing Effect --- */
    const typedTextSpan = document.getElementById('typed-text');
    const textArray = ["AI Enthusiast", "Full-Stack Developer"];
    const typingDelay = 100;
    const erasingDelay = 60;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (!typedTextSpan) return;
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (!typedTextSpan) return;
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 500);
        }
    }

    if (textArray.length && typedTextSpan) setTimeout(type, newTextDelay + 250);

    /* --- Contact Form Prevent Default (Demo only) --- */
    const contactForm = document.querySelector('.contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple visual feedback
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = "Message Sent!";
            btn.style.background = "linear-gradient(90deg, #10b981 0%, #059669 100%)";
            btn.style.boxShadow = "0 4px 15px rgba(16, 185, 129, 0.3)";
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = "";
                btn.style.boxShadow = "";
                contactForm.reset();
            }, 3000);
        });
    }
});
