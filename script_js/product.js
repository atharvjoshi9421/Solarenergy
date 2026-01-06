  // --- Filtering Functions ---

        // Show a Single Product ONLY
        function filterProduct(id) {
            // 1. Hide all main sections
            const sections = document.querySelectorAll('.product-category');
            sections.forEach(sec => sec.classList.add('d-none'));

            // 2. Find the specific card
            // Search in cards and list items and projects
            const card = document.querySelector(`.product-card[data-id="${id}"], .list-item[data-id="${id}"], .project-card[data-id="${id}"]`);
            
            if (card) {
                // 3. Unhide the parent section of that card
                const parentSection = card.closest('.product-category');
                parentSection.classList.remove('d-none');

                // 4. Hide ALL sibling cards in that section
                const siblings = parentSection.querySelectorAll('.product-card, .list-item, .project-card');
                siblings.forEach(sib => sib.classList.add('d-none'));

                // 5. Show ONLY the target card
                card.classList.remove('d-none');

                // Scroll to top of content
                document.querySelector('.main-content').scrollIntoView({ behavior: 'smooth' });
            }
        }

        // Show Entire Category (e.g. All Pumps)
        function filterCategory(categoryId) {
            const sections = document.querySelectorAll('.product-category');
            sections.forEach(sec => {
                if (sec.id === categoryId) {
                    sec.classList.remove('d-none');
                    // Make sure all children are visible
                    const children = sec.querySelectorAll('.product-card, .list-item, .project-card');
                    children.forEach(child => child.classList.remove('d-none'));
                } else {
                    sec.classList.add('d-none');
                }
            });
            document.querySelector('.main-content').scrollIntoView({ behavior: 'smooth' });
        }

        // Show Everything (Reset)
        function showAll() {
            const sections = document.querySelectorAll('.product-category');
            sections.forEach(sec => {
                sec.classList.remove('d-none');
                const children = sec.querySelectorAll('.product-card, .list-item, .project-card');
                children.forEach(child => child.classList.remove('d-none'));
            });
        }

        // --- Accordion Logic ---
        const acc = document.getElementsByClassName("accordion-btn");
        for (let i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function() {
                this.classList.toggle("active-acc");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    // Optional: Close others
                    var allPanels = document.getElementsByClassName("panel");
                    var allBtns = document.getElementsByClassName("accordion-btn");
                    for(let j=0; j<allPanels.length; j++){
                        allPanels[j].style.maxHeight = null;
                        allBtns[j].classList.remove("active-acc");
                    }
                    this.classList.add("active-acc");
                    panel.style.maxHeight = panel.scrollHeight + "px";
                } 
            });
        }

        // --- Data & Modal Logic (Same as before) ---
        const productData = {
            "agri-pump": { title: "Solar Agri Pumps", image: "Solar Agri Pumps.jpg", desc: "Our Solar Agri Pumps are designed for high efficiency and durability in harsh agricultural environments. They provide a reliable water supply for irrigation without electricity costs.", specs: ["Head Range: 10m to 100m", "Discharge: 2000 to 500,000 Liters/Day", "Motor: High-efficiency DC/AC Motor", "Warranty: 5 Years", "Automatic Start/Stop with sunlight"] },
            "bldc-pump": { title: "BLDC Solar Pump", image: "BLDC Solar Pump.jpg", desc: "Brushless DC (BLDC) technology ensures maximum efficiency and longer life span. Ideal for remote locations requiring consistent water output.", specs: ["Efficiency: > 90%", "Maintenance Free Operation", "Built-in MPPT Controller", "Dry run protection included", "Compact and lightweight design"] },
            "ac-pump": { title: "AC Solar Pump", image: "AC Solar Pump.jpg", desc: "Seamlessly convert your existing AC pump into a solar pump using our advanced Solar Variable Frequency Drives (VFD).", specs: ["Compatible with standard AC motors", "Grid/Generator hybrid options available", "Soft start functionality", "Power Range: 1HP to 100HP", "Smart monitoring via App"] },
            "high-cap-pump": { title: "High Capacity Pump", image: "High Capacity Pump.jpg", desc: "Engineered for large-scale irrigation and industrial water supply. Capable of moving massive volumes of water efficiently.", specs: ["Flow Rate: Up to 1,000,000 LPD", "Industrial grade construction", "Advanced thermal management", "Suitable for canal lifting and community water"] },
            "rooftop": { title: "Solar Roof Top Plant", image: "Solar Roof Top Plant.jpg", desc: "Turn your unused roof space into a power generator. Reduce electricity bills significantly with our grid-tied rooftop systems.", specs: ["Net-Metering compatible", "ROI in 3-4 years", "Remote monitoring included", "25-year performance warranty on modules", "Customized structure design"] },
            "ground": { title: "Solar Ground Mounted", image: "Solar Ground Mounted.jpg", desc: "Ideal for utility-scale power generation or large industries with available land. Optimized for maximum sun exposure.", specs: ["Scalable from kW to MW", "Robust galvanized steel structure", "High wind speed resistance (150 kmph+)", "Quick installation timeline", "Grid stability integration"] },
            "hybrid": { title: "Solar PV Diesel Hybrid", image: "Solar PV Diesel Hybrid.jpg", desc: "Intelligent fuel saver solution that synchronizes solar power with DG sets, ensuring power availability while cutting fuel costs.", specs: ["Fuel Saving: Up to 40-60%", "Seamless switching logic", "Prevents reverse power flow to DG", "Real-time load management", "Suitable for factories and hospitals"] },
            "pv-10-100": { title: "PV Module 10–100 Wp", image: "PV Module 10–100 Wp.jpg", desc: "Compact modules designed for small applications like street lights, home lighting systems, and portable chargers.", specs: ["High transmission tempered glass", "Anodized aluminum frame", "Excellent low light performance"] },
            "pv-160-170": { title: "PV Module 160–170 Wp", image: "PV Module 160–170 Wp.jpg", desc: "Mid-range modules suitable for off-grid battery charging systems and small domestic setups.", specs: ["36 Cell Polycrystalline", "Robust junction box", "IEC 61215 Certified"] },
            "pv-260-270": { title: "PV Module 260–270 Wp", image: "PV Module 260–270 Wp.jpg", desc: "Standard 60-cell modules, widely used for residential rooftop and commercial projects.", specs: ["Efficiency > 16%", "PID Resistant", "Positive power tolerance"] },
            "pv-400": { title: "PERC PV Module 400 Wp", image: "PERC PV Module 400 Wp (High Efficiency).jpg", desc: "Cutting-edge MONO PERC technology delivering highest efficiency per square meter. Best for space-constrained areas.", specs: ["Mono-crystalline PERC cells", "Efficiency > 20%", "Reduced shading loss", "Split cell technology", "Lower temperature coefficient"] },
            "tracker": { title: "Jain Solar Tracker", image: "Jain Solar Tracker.jpg", desc: "Mechanized structure that follows the sun's path throughout the day, significantly increasing energy generation.", specs: ["Single Axis & Dual Axis options", "Generation increase: 15-25%", "Automatic stow during high winds", "Low maintenance bearings"] },
            "agro": { title: "Agro-Voltaic Farming", image: "Agro-Voltaic Farming.jpg", desc: "Innovative dual-use system allowing farming underneath solar panels. Optimize land use efficiency.", specs: ["Elevated structure (3m+ height)", "Specific crop compatibility", "Reduces water evaporation from soil", "Generates power for farm needs"] },
            "floating": { title: "Floating Structures (Jain Tarang)", image: "Floating Structures.jpg", desc: "Install solar panels on water bodies like reservoirs and lakes. Conserves land and reduces water evaporation.", specs: ["HDPE Floats", "Cooling effect increases generation", "UV resistant material", "Eco-friendly design"] },
            "proj-plant": { title: "Solar Power Plant Projects", image: "Solar PV-Power Plant Projects.jpg", desc: "Complete EPC (Engineering, Procurement, Construction) services for MW scale solar parks.", specs: ["Site Feasibility Study", "High Voltage Transmission", "Substation Automation", "O&M Services"] },
            "proj-pump": { title: "Solar Pumping Projects", image: "Solar Pumping Projects.jpg", desc: "Implementation of government schemes (Kusum) and community water supply projects across states.", specs: ["Remote village electrification", "Drinking water schemes", "Integrated drip irrigation projects"] }
        };

        function openModal(id) {
            const data = productData[id];
            if(!data) return;
            document.getElementById('modal-title').textContent = data.title;
            document.getElementById('modal-img').src = data.image;
            document.getElementById('modal-desc').textContent = data.desc;
            const ul = document.getElementById('modal-specs');
            ul.innerHTML = '';
            data.specs.forEach(s => { let li = document.createElement('li'); li.textContent = s; ul.appendChild(li); });
            document.getElementById('product-modal').style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
        function closeModal() {
            document.getElementById('product-modal').style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        window.onclick = function(e) { if(e.target == document.getElementById('product-modal')) closeModal(); }