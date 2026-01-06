  // Form Submission Handler
        document.getElementById('solarForm').addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual page reload

            // Basic Validation & Data Collection
            const name = document.getElementById('fullName').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const pincode = document.getElementById('pincode').value;
            const bill = document.getElementById('bill').value;

            // Simple validation check
            if(name && phone && email && pincode && bill) {
                // Simulate API call or processing time
                const btn = document.querySelector('.submit-btn');
                const originalText = btn.innerText;
                
                btn.innerText = 'Sending...';
                btn.disabled = true;
                btn.style.opacity = '0.7';

                setTimeout(() => {
                    alert('Thank you, ' + name + '! We have received your request for a Free Solar Quotation. Our team will contact you at ' + phone + ' shortly.');
                    document.getElementById('solarForm').reset();
                    
                    btn.innerText = originalText;
                    btn.disabled = false;
                    btn.style.opacity = '1';
                }, 1500);
            }
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