document.addEventListener('DOMContentLoaded', function() {
    // --- Header Scroll Effect ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (header) {
            header.classList.toggle('header-scrolled', window.scrollY > 50);
        }
    });

    // --- Scroll Animation Observer ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.id === 'map-container') {
                    initBrazilMap(); // Initialize map when it becomes visible
                }
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        if (el) {
            observer.observe(el);
        }
    });

    // --- Solutions Carousel Logic ---
    const solutionsCarousel = document.querySelector('.solutions-carousel');
    if (solutionsCarousel) {
        const track = solutionsCarousel;
        const cards = Array.from(track.children);
        const nextButton = document.querySelector('#solutions .carousel-arrow.next');
        const prevButton = document.querySelector('#solutions .carousel-arrow.prev');
        const dotsNav = document.querySelector('#solutions .carousel-dots');
        let currentIndex = 0;
        let slideInterval;
        let cardWidth = cards.length > 0 ? cards[0].offsetWidth : 0; // Initialize cardWidth

        // Create dots
        cards.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.setAttribute('aria-label', `Ir para slide ${i + 1}`); // Accessibility
            dot.addEventListener('click', () => {
                goToSlide(i);
                resetInterval();
            });
            dotsNav.appendChild(dot);
        });
        const dots = Array.from(dotsNav.children);

        const updateCarousel = () => {
            if (cards.length === 0) return;
            cardWidth = cards[0].offsetWidth; // Recalculate on update (e.g., resize)
            // Calculate offset to center the current card
            const offset = -currentIndex * cardWidth + (track.parentElement.offsetWidth - cardWidth) / 2;
            track.style.transform = `translateX(${offset}px)`;

            // Update active card class
            cards.forEach((card, index) => {
                card.classList.toggle('is-active', index === currentIndex);
            });

            // Update active dot class
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        };

        const goToSlide = (index) => {
            currentIndex = index;
            updateCarousel();
        };

        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % cards.length;
            updateCarousel();
        };

        const prevSlide = () => { // Function for previous slide
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            updateCarousel();
        };


        if (nextButton) {
           nextButton.addEventListener('click', () => {
                nextSlide();
                resetInterval();
            });
        }
         if (prevButton) {
            prevButton.addEventListener('click', () => {
                prevSlide(); // Use the prevSlide function
                resetInterval();
            });
        }


        const startInterval = () => {
            clearInterval(slideInterval); // Clear existing interval before starting a new one
            slideInterval = setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
        };

        const resetInterval = () => {
            clearInterval(slideInterval);
            startInterval();
        };

        const handleResize = () => { // Recalculate width on resize
            updateCarousel();
        }

        window.addEventListener('resize', handleResize);

        // Initial setup
        updateCarousel();
        startInterval();
    }


    // --- Testimonial Slider Logic ---
    const testimonialWrapper = document.querySelector('.testimonial-wrapper');
    if (testimonialWrapper) {
        const track = testimonialWrapper.querySelector('.testimonial-track');
        const slides = Array.from(track.children);
        const nextButton = testimonialWrapper.querySelector('.slider-arrow.next'); // Corrected selector
        const prevButton = testimonialWrapper.querySelector('.slider-arrow.prev'); // Corrected selector
        const dotsNav = testimonialWrapper.querySelector('.testimonial-dots');
        let currentIndex = 0;
        let autoPlayInterval;

        // Create dots
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.setAttribute('aria-label', `Ir para depoimento ${i + 1}`); // Accessibility
            dot.addEventListener('click', () => {
                goToTestimonialSlide(i);
                resetAutoPlay();
            });
            dotsNav.appendChild(dot);
        });
        const dots = Array.from(dotsNav.children);

        const setSlidePosition = () => {
            // Move the entire track based on the current index
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        };

        const updateDots = () => {
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[currentIndex]) { // Check if dot exists
                dots[currentIndex].classList.add('active');
            }
        };

        const goToTestimonialSlide = (index) => {
            currentIndex = index;
            setSlidePosition();
            updateDots();
        };

        if(nextButton) {
            nextButton.addEventListener('click', () => {
                const nextIndex = (currentIndex + 1) % slides.length;
                goToTestimonialSlide(nextIndex);
                resetAutoPlay();
            });
        }

        if(prevButton) {
            prevButton.addEventListener('click', () => {
                const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
                goToTestimonialSlide(prevIndex);
                resetAutoPlay();
            });
        }


        const startAutoPlay = () => {
            clearInterval(autoPlayInterval); // Clear previous interval
            autoPlayInterval = setInterval(() => {
                const nextIndex = (currentIndex + 1) % slides.length;
                goToTestimonialSlide(nextIndex);
            }, 7000); // Change slide every 7 seconds
        };

        const resetAutoPlay = () => {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        };

        // Pause autoplay on hover
        testimonialWrapper.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        testimonialWrapper.addEventListener('mouseleave', () => startAutoPlay());


        // Initial setup
        updateDots(); // Set the first dot active
        startAutoPlay();
    }


    // --- Feather Icons ---
    try {
        feather.replace();
    } catch (e) {
        console.error("Erro ao inicializar Feather Icons:", e);
    }


    // --- Modal Logic ---
    const openModal = (modal) => {
        if (modal) {
            modal.classList.add('visible');
            feather.replace(); // Re-run Feather Icons when modal opens
        }
    };

    const closeModal = (modal) => {
        if (modal) {
            modal.classList.remove('visible');
        }
    };

    const promoModal = document.getElementById('promoModalOverlay');
    const planModal = document.getElementById('planModalOverlay');
    const reinforcementModal = document.getElementById('reinforcementModalOverlay');
    const contactModal = document.getElementById('contactModalOverlay');

    // Show promo modal after a delay (if it exists)
    if (promoModal) {
        setTimeout(() => {
             openModal(promoModal);
        }, 5000); // Show after 5 seconds
    }


    // Add close functionality to all modals
    [promoModal, planModal, reinforcementModal, contactModal].forEach(modal => {
        if (modal) {
            const closeBtn = modal.querySelector('.modal-close');
            if (closeBtn) {
                 closeBtn.addEventListener('click', () => closeModal(modal));
            }
            // Close modal if clicking outside the content area
            modal.addEventListener('click', (event) => {
                if (event.target === modal) {
                    closeModal(modal);
                }
            });
        }
    });

    // --- Plan Button Logic ---
    const planButtons = document.querySelectorAll('.plan-button');
    planButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            const parentCard = event.target.closest('.pricing-card');
            // Check if it's the custom plan ('Plus' or 'Consultar')
            if (parentCard && (parentCard.querySelector('h3').innerText.toLowerCase() === 'plus' || parentCard.querySelector('.price-value').innerText.toLowerCase() === 'consultar')) {
                 // Smooth scroll to contact section
                 const contactSection = document.getElementById('contact');
                 if(contactSection) {
                     contactSection.scrollIntoView({ behavior: 'smooth' });
                 }
            } else if (parentCard && parentCard.classList.contains('free-plan')) {
                 // Handle free plan signup - maybe redirect or open a specific modal?
                 // For now, let's assume it opens the contact modal as an example
                 openModal(contactModal);
            }
             else {
                 openModal(planModal); // Open the standard plan modal
            }
        });
    });


    // --- Header CTA Button Logic ---
    const headerCtaButton = document.getElementById('header-cta-button');
     if (headerCtaButton) {
        headerCtaButton.addEventListener('click', (event) => {
            event.preventDefault();
            openModal(contactModal); // Open contact modal when header button is clicked
        });
    }

    // --- Reinforcement Modal Logic (Show on scroll near bottom) ---
    let reinforcementModalShown = false;
    let scrollTimeout;

    window.addEventListener('scroll', () => {
        if (!reinforcementModalShown && reinforcementModal) { // Check if modal exists
            clearTimeout(scrollTimeout);
            // Check if user is near the bottom (e.g., last 200 pixels)
            const isNearBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200;

            if (isNearBottom) {
                // Wait a bit before showing, in case they scroll back up quickly
                scrollTimeout = setTimeout(() => {
                    // Check again if still near bottom before showing
                    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
                         openModal(reinforcementModal);
                        reinforcementModalShown = true; // Only show once per page load
                    }
                }, 5000); // Show after 5 seconds near the bottom
            }
        }
    });


    // --- Copy Button Logic ---
    const copyButtons = document.querySelectorAll('.copy-button');
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.copyTarget;
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                navigator.clipboard.writeText(targetElement.innerText.trim()).then(() => {
                    const originalIcon = button.innerHTML;
                    button.innerHTML = '<i data-feather="check"></i>';
                    button.classList.add('copied');
                    feather.replace(); // Update the icon

                    // Reset after 2 seconds
                    setTimeout(() => {
                        button.innerHTML = originalIcon;
                        button.classList.remove('copied');
                        feather.replace(); // Change icon back
                    }, 2000);
                }).catch(err => {
                    console.error('Falha ao copiar:', err);
                    // Optionally show an error message to the user
                });
            } else {
                console.error(`Elemento com ID '${targetId}' não encontrado para cópia.`);
            }
        });
    });

    // --- Brazil Map Initialization ---
    let mapInstance = null;
    function initBrazilMap() {
        // Check if Leaflet is loaded and map container exists and map not already initialized
        if (mapInstance || typeof L === 'undefined' || !document.getElementById('map-container')) return;

        try {
            mapInstance = L.map('map-container', {
                center: [-15.5, -50.0], // Centered on Brazil
                zoom: 4.49,             // Adjusted zoom level
                zoomControl: false,      // Disable +/- buttons
                dragging: false,         // Disable map dragging
                touchZoom: false,        // Disable pinch zoom
                doubleClickZoom: false,  // Disable double click zoom
                scrollWheelZoom: false,  // Disable scroll wheel zoom
                boxZoom: false,          // Disable box zoom
                keyboard: false,         // Disable keyboard navigation
                attributionControl: false // Hide Leaflet attribution
            });

            // Tile Layer (using a light theme without labels)
            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
                // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>', // Optional attribution if needed elsewhere
                subdomains: 'abcd',
                maxZoom: 7, // Limit zoom further if desired
                minZoom: 4
            }).addTo(mapInstance);

            // ZengaTax HQ Coordinates (Curitiba approx.)
            const zengaHQ = [-25.4411, -49.2908];

            // Approximate coordinates for state capitals or major cities
             const ufCoordinates = {
                 'PE': { lat: -8.0476, lon: -34.8770, name: 'Pernambuco' },
                 'SP': { lat: -23.5505, lon: -46.6333, name: 'São Paulo' },
                 'MG': { lat: -19.9167, lon: -43.9345, name: 'Minas Gerais' },
                 'ES': { lat: -20.3192, lon: -40.3378, name: 'Espírito Santo'},
                 'AM': { lat: -3.1190, lon: -60.0217, name: 'Amazonas' },
                 'MT': { lat: -15.6014, lon: -56.0977, name: 'Mato Grosso' },
                 'PR': { lat: -25.4284, lon: -49.2733, name: 'Paraná' }, // HQ State
                 'SC': { lat: -27.5954, lon: -48.5480, name: 'Santa Catarina' },
                 'RS': { lat: -30.0346, lon: -51.2177, name: 'Rio Grande do Sul' },
                 'RO': { lat: -10.83, lon: -63.22, name: 'Rondônia' }, // Adjusted approx. center
                 'TO': { lat: -10.1848, lon: -48.3338, name: 'Tocantins' }
             };

            // List of UFs where clients are located (can have duplicates)
            const clientUFs = ['PE', 'MG', 'SP', 'AM', 'SP', 'SP', 'SP', 'MT', 'PR', 'PR', 'MG', 'SC', 'RS', 'RO', 'TO', 'ES']; // Added ES

            // Marker for HQ
            L.marker(zengaHQ, {
                icon: L.divIcon({
                    className: 'pulsing-marker hq', // Specific class for HQ
                    iconSize: [18, 18]
                })
            }).addTo(mapInstance).bindTooltip("Sede ZengaTax", { // Tooltip on hover
                permanent: false, // Show only on hover
                direction: 'top',
                className: 'custom-leaflet-tooltip' // Custom style for tooltip
            });

            // Function to calculate points for a curved line (quadratic Bézier)
            function getArc(start, end) {
                const points = [];
                const startLat = start[0];
                const startLng = start[1];
                const endLat = end[0];
                const endLng = end[1];

                // Simple midpoint for control point calculation
                const midLat = (startLat + endLat) / 2;
                const midLng = (startLng + endLng) / 2;

                // Offset to create the curve - adjust multiplier (0.20) for more/less curve
                const latOffset = (endLng - startLng) * 0.20;
                const lngOffset = -(endLat - startLat) * 0.20; // Negative to curve outwards generally

                const controlLat = midLat + latOffset;
                const controlLng = midLng + lngOffset;

                // Generate points along the Bézier curve
                for (let i = 0; i <= 100; i++) { // More points for smoother curve
                    const t = i / 100;
                    const lat = Math.pow(1 - t, 2) * startLat + 2 * (1 - t) * t * controlLat + Math.pow(t, 2) * endLat;
                    const lng = Math.pow(1 - t, 2) * startLng + 2 * (1 - t) * t * controlLng + Math.pow(t, 2) * endLng;
                    points.push([lat, lng]);
                }
                return points;
            }

             const drawnLocations = {}; // Keep track of locations where markers+tooltips were added

            // Add markers and lines for each client UF
            clientUFs.forEach((uf, index) => {
                const loc = ufCoordinates[uf];
                if (!loc) return; // Skip if UF not found in coordinates list

                 // Add slight random offset to avoid exact overlap if multiple clients in same city/state
                 const offsetLat = (Math.random() - 0.5) * 0.8; // Adjust multiplier for spread
                 const offsetLon = (Math.random() - 0.5) * 0.8;
                 const destination = [loc.lat + offsetLat, loc.lon + offsetLon];


                // Don't draw line from HQ to itself too often if PR is in the list multiple times
                const isHqState = loc.name === 'Paraná';
                 if (isHqState && Math.random() < 0.5) { // Randomly skip some PR lines if desired
                     // Still add marker if not drawn yet
                     if (!drawnLocations[loc.name]) {
                         L.marker(destination, { icon: L.divIcon({ className: 'pulsing-marker', iconSize: [14, 14] }) })
                           .addTo(mapInstance)
                           .bindTooltip(loc.name, { permanent: false, direction: 'top', className: 'custom-leaflet-tooltip' });
                         drawnLocations[loc.name] = true;
                     } else {
                          L.marker(destination, { icon: L.divIcon({ className: 'pulsing-marker', iconSize: [14, 14] }) }).addTo(mapInstance);
                     }
                     return; // Skip drawing the line for this instance
                 }


                // Draw curved line
                const latlngs = getArc(zengaHQ, destination);
                const line = L.polyline(latlngs, {
                    color: '#00aaff', // Zenga blue color
                    weight: 2,
                    opacity: 0.7
                }).addTo(mapInstance);

                // Add animation class to the SVG path element
                const path = line.getElement();
                if (path) {
                    path.classList.add('map-line-path');
                    path.style.animationDelay = `${index * 0.08}s`; // Stagger animation start
                }


                // Add pulsing marker at destination
                const customIcon = L.divIcon({
                    className: 'pulsing-marker',
                    iconSize: [14, 14]
                });

                 // Add marker with tooltip only ONCE per state name
                 if (!drawnLocations[loc.name]) {
                     L.marker(destination, { icon: customIcon })
                         .addTo(mapInstance)
                         .bindTooltip(loc.name, { // Add tooltip on hover
                             permanent: false, // Show only on hover
                             direction: 'top',
                             className: 'custom-leaflet-tooltip' // Use custom style
                         });
                     drawnLocations[loc.name] = true; // Mark this state as having a marker+tooltip
                 } else {
                     // Add marker without tooltip if state name already has one
                     L.marker(destination, { icon: customIcon }).addTo(mapInstance);
                 }
            });

             // Refresh map size after initialization (sometimes needed if container size changes)
             setTimeout(() => mapInstance.invalidateSize(), 400);

        } catch (error) {
            console.error("Erro ao inicializar o mapa:", error);
            // Optionally display a fallback message or image
             const mapContainer = document.getElementById('map-container');
             if(mapContainer) mapContainer.innerHTML = "<p>Erro ao carregar o mapa.</p>";
        }
    }


    // --- FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(clickedItem => {
            const question = clickedItem.querySelector('.faq-question');
            const answer = clickedItem.querySelector('.faq-answer');

            if (question && answer) {
                question.addEventListener('click', () => {
                    const isOpening = !clickedItem.classList.contains('active');

                    // Close all other items first
                    faqItems.forEach(item => {
                        if (item !== clickedItem) {
                            item.classList.remove('active');
                            item.querySelector('.faq-answer').style.maxHeight = null;
                        }
                    });

                    // Toggle the clicked item
                    if (isOpening) {
                        clickedItem.classList.add('active');
                        // Set maxHeight after a tiny delay to ensure calculation is correct
                        setTimeout(() => {
                           answer.style.maxHeight = answer.scrollHeight + 'px';
                        }, 10); // 10ms delay often sufficient
                    } else {
                        clickedItem.classList.remove('active');
                        answer.style.maxHeight = null;
                    }
                });
            } else {
                console.error("Missing .faq-question or .faq-answer in an .faq-item");
            }
        });
    } else {
        console.warn("No FAQ items found on the page.");
    }

}); // End of DOMContentLoaded