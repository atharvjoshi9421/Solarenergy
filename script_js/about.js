  // Simple Counter Animation for the "Our Journey" Section
        const counters = document.querySelectorAll('.counter-value');
        const speed = 200; // The lower the slower

        const animateCounters = () => {
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    
                    // Lower inc to slow and higher to speed up
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            });
        };

        // Trigger animation when the section is in view
        let observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        // Observe the Journey section
        const journeySection = document.querySelector('.our-journey');
        if(journeySection) {
            observer.observe(journeySection);
        }

        /* ============================================
   FOOTER ANIMATIONS
   ============================================ */
gsap.utils.toArray(".footer-col").forEach((col, index) => {
    gsap.fromTo(col, 
        { y: 30, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".global-footer",
                start: "top 90%", // Starts when footer top hits 90% of viewport
                delay: index * 0.1 // Stagger effect
            }
        }
    );
});