document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (header) {
            header.classList.toggle('header-scrolled', window.scrollY > 50);
        }
    });
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.id === 'map-container') {
                    initBrazilMap();
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        if (el) {
            observer.observe(el);
        }
    });
    const solutionsCarousel = document.querySelector('.solutions-carousel');
    if (solutionsCarousel) {
        const track = solutionsCarousel;
        const cards = Array.from(track.children);
        const nextButton = document.querySelector('#solutions .carousel-arrow.next');
        const prevButton = document.querySelector('#solutions .carousel-arrow.prev');
        const dotsNav = document.querySelector('#solutions .carousel-dots');
        let currentIndex = 0;
        let slideInterval;
        let cardWidth = cards.length > 0 ? cards[0].offsetWidth : 0;
        cards.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                goToSlide(i);
                resetInterval();
            });
            dotsNav.appendChild(dot);
        });
        const dots = Array.from(dotsNav.children);
        const updateCarousel = () => {
            if (cards.length === 0) return;
            cardWidth = cards[0].offsetWidth;
            const offset = -currentIndex * cardWidth + (track.parentElement.offsetWidth - cardWidth) / 2;
            track.style.transform = `translateX(${offset}px)`;
            cards.forEach((card, index) => {
                card.classList.toggle('is-active', index === currentIndex);
            });
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
        nextButton.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            updateCarousel();
            resetInterval();
        });
        const startInterval = () => {
            slideInterval = setInterval(nextSlide, 5000);
        };
        const resetInterval = () => {
            clearInterval(slideInterval);
            startInterval();
        };
        const handleResize = () => {
            updateCarousel();
        }
        window.addEventListener('resize', handleResize);
        updateCarousel();
        startInterval();
    }
    const testimonialWrapper = document.querySelector('.testimonial-wrapper');
    if (testimonialWrapper) {
        const track = testimonialWrapper.querySelector('.testimonial-track');
        const slides = Array.from(track.children);
        const nextButton = testimonialWrapper.querySelector('.next');
        const prevButton = testimonialWrapper.querySelector('.prev');
        const dotsNav = testimonialWrapper.querySelector('.testimonial-dots');
        let currentIndex = 0;
        let autoPlayInterval;
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                goToTestimonialSlide(i);
                resetAutoPlay();
            });
            dotsNav.appendChild(dot);
        });
        const dots = Array.from(dotsNav.children);
        const setSlidePosition = () => {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        };
        const updateDots = () => {
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[currentIndex]) {
                dots[currentIndex].classList.add('active');
            }
        };
        const goToTestimonialSlide = (index) => {
            currentIndex = index;
            setSlidePosition();
            updateDots();
        };
        nextButton.addEventListener('click', () => {
            const nextIndex = (currentIndex + 1) % slides.length;
            goToTestimonialSlide(nextIndex);
            resetAutoPlay();
        });
        prevButton.addEventListener('click', () => {
            const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
            goToTestimonialSlide(prevIndex);
            resetAutoPlay();
        });
        const startAutoPlay = () => {
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(() => {
                const nextIndex = (currentIndex + 1) % slides.length;
                goToTestimonialSlide(nextIndex);
            }, 5000);
        };
        const resetAutoPlay = () => {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        };
        testimonialWrapper.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        testimonialWrapper.addEventListener('mouseleave', () => startAutoPlay());
        updateDots();
        startAutoPlay();
    }
    feather.replace();
    const openModal = (modal) => {
        if (modal) {
            modal.classList.add('visible');
            feather.replace();
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
    setTimeout(() => {
        if (promoModal) openModal(promoModal);
    }, 2000);
    [promoModal, planModal, reinforcementModal, contactModal].forEach(modal => {
        if (modal) {
            const closeBtn = modal.querySelector('.modal-close');
            closeBtn.addEventListener('click', () => closeModal(modal));
            modal.addEventListener('click', (event) => {
                if (event.target === modal) {
                    closeModal(modal);
                }
            });
        }
    });
    const planButtons = document.querySelectorAll('.plan-button');
    planButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const parentCard = event.target.closest('.pricing-card');
            if (parentCard && parentCard.querySelector('h3').innerText === 'Plus') {
                document.querySelector('a[href="#contact"]').click();
            } else {
                 openModal(planModal);
            }
        });
    });
    const headerCtaButton = document.getElementById('header-cta-button');
    if (headerCtaButton) {
        headerCtaButton.addEventListener('click', (event) => {
            event.preventDefault();
            openModal(contactModal);
        });
    }
    let reinforcementModalShown = false;
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!reinforcementModalShown) {
            clearTimeout(scrollTimeout);
            const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100;
            if (isAtBottom) {
                scrollTimeout = setTimeout(() => {
                    openModal(reinforcementModal);
                    reinforcementModalShown = true;
                }, 10000);
            }
        }
    });
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
                    feather.replace();
                    setTimeout(() => {
                        button.innerHTML = originalIcon;
                        button.classList.remove('copied');
                        feather.replace();
                    }, 2000);
                });
            }
        });
    });
    let mapInstance = null;

    function initBrazilMap() {
        if (mapInstance || typeof L === 'undefined') return;
        mapInstance = L.map('map-container', {
            center: [-15.5, -50.0],
            zoom: 4.49,
            zoomControl: false,
            dragging: false,
            touchZoom: false,
            doubleClickZoom: false,
            scrollWheelZoom: false,
            boxZoom: false,
            keyboard: false,
        });
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap &copy; CARTO',
            subdomains: 'abcd',
            maxZoom: 8,
            minZoom: 4
        }).addTo(mapInstance);
        const zengaHQ = [-25.4411, -49.2908];
        const ufCoordinates = {
            'PE': { lat: -8.0476, lon: -34.8770, name: 'Pernambuco' },
            'SP': { lat: -23.5505, lon: -46.6333, name: 'São Paulo' },
            'MG': { lat: -19.9167, lon: -43.9345, name: 'Minas Gerais' },
            'ES': { lat: -20.3192, lon: -40.3378, name: 'Espírito Santo'},
            'AM': { lat: -3.1190, lon: -60.0217, name: 'Amazonas' },
            'MT': { lat: -15.6014, lon: -56.0977, name: 'Mato Grosso' },
            'PR': { lat: -25.4284, lon: -49.2733, name: 'Paraná' },
            'SC': { lat: -27.5954, lon: -48.5480, name: 'Santa Catarina' },
            'RS': { lat: -30.0346, lon: -51.2177, name: 'Rio Grande do Sul' },
            'RO': { lat: -10.83, lon: -63.22, name: 'Rondônia' },
            'TO': { lat: -10.1848, lon: -48.3338, name: 'Tocantins' }
        };
        const clientUFs = ['PE', 'MG', 'SP', 'AM', 'SP', 'SP', 'SP', 'MT', 'PR', 'PR', 'MG', 'SC', 'RS', 'RO', 'TO', 'ES'];
        L.marker(zengaHQ, {
            icon: L.divIcon({
                className: 'pulsing-marker hq',
                iconSize: [18, 18]
            })
        }).addTo(mapInstance).bindTooltip("Sede ZengaTax", {
            permanent: false,
            direction: 'top',
            className: 'custom-leaflet-tooltip'
        });

        function getArc(start, end) {
            const points = [];
            const startLat = start[0];
            const startLng = start[1];
            const endLat = end[0];
            const endLng = end[1];
            const midLat = (startLat + endLat) / 2;
            const midLng = (startLng + endLng) / 2;
            const latOffset = (endLng - startLng) * 0.20;
            const lngOffset = -(endLat - startLat) * 0.20;
            const controlLat = midLat + latOffset;
            const controlLng = midLng + lngOffset;
            for (let i = 0; i <= 100; i++) {
                const t = i / 100;
                const lat = Math.pow(1 - t, 2) * startLat + 2 * (1 - t) * t * controlLat + Math.pow(t, 2) * endLat;
                const lng = Math.pow(1 - t, 2) * startLng + 2 * (1 - t) * t * controlLng + Math.pow(t, 2) * endLng;
                points.push([lat, lng]);
            }
            return points;
        }
        const drawnLocations = {};
        clientUFs.forEach((uf, index) => {
            const loc = ufCoordinates[uf];
            if (!loc) return;
            const offsetLat = (Math.random() - 0.5) * 0.8;
            const offsetLon = (Math.random() - 0.5) * 0.8;
            const destination = [loc.lat + offsetLat, loc.lon + offsetLon];
            const isHqState = loc.name === 'Paraná';
            if (isHqState && Math.random() < 0.5) {
                return;
            }
            const latlngs = getArc(zengaHQ, destination);
            const line = L.polyline(latlngs, {
                color: '#00aaff',
                weight: 2,
                opacity: 0.8
            }).addTo(mapInstance);
            const path = line.getElement();
            path.classList.add('map-line-path');
            path.style.animationDelay = `${index * 0.1}s`;
            const customIcon = L.divIcon({
                className: 'pulsing-marker',
                iconSize: [14, 14]
            });
            if (!drawnLocations[loc.name]) {
                L.marker(destination, {
                    icon: customIcon
                }).addTo(mapInstance).bindTooltip(loc.name, {
                    permanent: false,
                    direction: 'top',
                    className: 'custom-leaflet-tooltip'
                });
                drawnLocations[loc.name] = true;
            } else {
                L.marker(destination, {
                    icon: customIcon
                }).addTo(mapInstance);
            }
        });
        setTimeout(() => mapInstance.invalidateSize(), 400);
    }
});