 /* ============================================
           PREMIUM ANIMATION SYSTEM
           ============================================ */

        // Register GSAP Plugins
        gsap.registerPlugin(ScrollTrigger);

        /* ============================================
           HERO SECTION ANIMATIONS
           ============================================ */
        const heroTimeline = gsap.timeline({ 
            defaults: { ease: "power3.out" } 
        });

        heroTimeline.to(".logo", { opacity: 1, duration: 0.8 }, 0.2);
        heroTimeline.to(".nav-links", { opacity: 1, duration: 0.6 }, 0.4);
        heroTimeline.to(".nav-buttons", { opacity: 1, duration: 0.6 }, 0.6);
        heroTimeline.to(".tag", { opacity: 1, y: 0, duration: 0.8 }, 0.8);
        heroTimeline.to("h1", { opacity: 1, y: 0, duration: 1 }, 1);
        heroTimeline.to(".hero-content > p", { opacity: 1, y: 0, duration: 0.8 }, 1.2);
        heroTimeline.to(".btn-cta", { opacity: 1, y: 0, duration: 0.8 }, 1.4);

        if(window.innerWidth > 900) {
            gsap.to(".giant-text", {
                yPercent: -30,
                ease: "none",
                scrollTrigger: {
                    trigger: ".hero-container",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1
                }
            });

            gsap.to(".hero", {
                backgroundPositionY: "50%",
                ease: "none",
                scrollTrigger: {
                    trigger: ".hero-container",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1
                }
            });
        }

        /* ============================================
           COUNTER ANIMATIONS
           ============================================ */
        const counters = document.querySelectorAll('.stat-number, .big-number');
        
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const prefix = counter.getAttribute('data-prefix') || "";
            const suffix = counter.getAttribute('data-suffix') || "";
            const isDecimal = target % 1 !== 0;

            gsap.to(counter, {
                innerText: target,
                duration: 2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: counter,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                snap: { innerText: isDecimal ? 0.1 : 1 },
                onUpdate: function() {
                    let val = parseFloat(this.targets()[0].innerText);
                    if (isDecimal) {
                        counter.innerText = prefix + val.toFixed(1) + suffix;
                    } else {
                        counter.innerText = prefix + Math.round(val).toLocaleString() + suffix;
                    }
                }
            });
        });

        /* ============================================
           SCROLL-TRIGGERED CONTENT ANIMATIONS
           ============================================ */
        const scrollElements = [
            ".benefits-header",
            ".solutions-header",
            ".eco-left",
            ".eco-right",
            ".eco-divider",
            ".testi-header",
            ".footer-left",
            ".footer-right"
        ];

        scrollElements.forEach(selector => {
            gsap.utils.toArray(selector).forEach(el => {
                gsap.fromTo(el,
                    { y: 60, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%"
                        }
                    }
                );
            });
        });

        // Benefits items stagger
        gsap.utils.toArray(".benefit-item").forEach((item, index) => {
            gsap.fromTo(item,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".benefits-grid",
                        start: "top 80%"
                    },
                    delay: index * 0.15
                }
            );
        });

        // Solution cards
        gsap.utils.toArray(".solution-card").forEach((card, index) => {
            gsap.fromTo(card,
                { y: 60, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".solutions-grid",
                        start: "top 80%"
                    },
                    delay: index * 0.1
                }
            );
        });

        /* ============================================
           NEW PROCESS SECTION ANIMATION
           Horizontal Pinning Scroll
           ============================================ */
        const processSection = document.querySelector(".process-section");
        const track = document.querySelector(".cards-track");

        function getScrollAmount() {
            let trackWidth = track.scrollWidth;
            return -(trackWidth - window.innerWidth + 50);
        }

        const tween = gsap.to(track, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
                trigger: processSection,
                start: "top top",
                end: "+=3000", // Controls length of scroll
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
                anticipatePin: 1
            }
        });

        /* ============================================
           IMPACT ANIMATIONS
           ============================================ */
        gsap.fromTo(".impact-image",
            { scale: 1.1, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".impact-card",
                    start: "top 75%"
                }
            }
        );

        gsap.fromTo(".impact-content",
            { y: 80, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".impact-card",
                    start: "top 75%"
                },
                delay: 0.3
            }
        );

        /* ============================================
           SWIPER CAROUSEL (UPDATED)
           ============================================ */
        var swiper = new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            speed: 800,
            grabCursor: true,
            navigation: {
                nextEl: ".swiper-btn-next",
                prevEl: ".swiper-btn-prev",
            },
            breakpoints: {
                640: { slidesPerView: 2, spaceBetween: 30 },
                1024: { slidesPerView: 3.2, spaceBetween: 40 },
            },
        });

        gsap.to(".testi-header", {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
                trigger: ".testimonials-section", // Updated Trigger Class
                start: "top 80%"
            }
        });

        /* ============================================
           SMOOTH ANCHOR SCROLLING
           ============================================ */
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if(target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        /* ============================================
           PERFORMANCE OPTIMIZATION
           ============================================ */
        if(window.innerWidth < 768) {
            ScrollTrigger.config({ 
                autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
            });
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