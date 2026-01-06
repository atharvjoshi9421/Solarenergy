 document.addEventListener('DOMContentLoaded', () => {
            
            /* --- 1. Filter Functionality --- */
            const filterBtns = document.querySelectorAll('.filter-btn');
            const galleryItems = document.querySelectorAll('.gallery-item');

            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Remove active class from all buttons
                    filterBtns.forEach(b => b.classList.remove('active'));
                    // Add active class to clicked button
                    btn.classList.add('active');

                    const filterValue = btn.getAttribute('data-filter');

                    galleryItems.forEach(item => {
                        // Check if category matches or if 'all' is selected
                        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                            item.classList.remove('hide');
                            // Trigger CSS animation reflow
                            item.style.animation = 'none'; 
                            item.offsetHeight; /* trigger reflow */
                            item.style.animation = 'fadeIn 0.5s ease-in-out';
                        } else {
                            item.classList.add('hide');
                        }
                    });
                });
            });

            /* --- 2. Lightbox Functionality --- */
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            const lightboxCaption = document.getElementById('lightbox-caption');
            const closeBtn = document.querySelector('.close-lightbox');

            // Open Lightbox
            galleryItems.forEach(item => {
                item.addEventListener('click', () => {
                    const img = item.querySelector('img');
                    const title = item.querySelector('h4').innerText;
                    const desc = item.querySelector('p').innerText;

                    lightboxImg.src = img.src;
                    lightboxCaption.innerText = `${title} - ${desc}`;
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Disable background scrolling
                });
            });

            // Close Lightbox
            const closeLightbox = () => {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto'; // Enable scrolling
            };

            closeBtn.addEventListener('click', closeLightbox);

            // Close when clicking outside the image
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
            
            // Close on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                    closeLightbox();
                }
            });

        });

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