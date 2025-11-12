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
            dot.setAttribute('aria-label', `Ir para slide ${i + 1}`);
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

        const prevSlide = () => {
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
                prevSlide();
                resetInterval();
            });
        }


        const startInterval = () => {
            clearInterval(slideInterval);
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
        const nextButton = testimonialWrapper.querySelector('.slider-arrow.next');
        const prevButton = testimonialWrapper.querySelector('.slider-arrow.prev');
        const dotsNav = testimonialWrapper.querySelector('.testimonial-dots');
        let currentIndex = 0;
        let autoPlayInterval;

        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.setAttribute('aria-label', `Ir para depoimento ${i + 1}`);
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

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                const nextIndex = (currentIndex + 1) % slides.length;
                goToTestimonialSlide(nextIndex);
                resetAutoPlay();
            });
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
                goToTestimonialSlide(prevIndex);
                resetAutoPlay();
            });
        }


        const startAutoPlay = () => {
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(() => {
                const nextIndex = (currentIndex + 1) % slides.length;
                goToTestimonialSlide(nextIndex);
            }, 7000);
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

    const blogWrapper = document.querySelector('.blog-carousel-wrapper');
    if (blogWrapper) {
        const track = blogWrapper.querySelector('.blog-track');
        const slides = Array.from(track.children);
        const nextButton = blogWrapper.querySelector('#blog-next');
        const prevButton = blogWrapper.querySelector('#blog-prev');
        const dotsNav = blogWrapper.querySelector('.blog-carousel-dots');
        
        let currentIndex = 0;
        let slidesToShow = 2;
        let slidesToScroll = 1; 
        let maxIndex = slides.length - slidesToShow;
        let autoPlayInterval;

        function updateBlogMetrics() {
            if (window.innerWidth <= 768) {
                slidesToShow = 1;
            } else {
                slidesToShow = 2;
            }
            slidesToScroll = 1; 
            maxIndex = slides.length - slidesToShow;
            
            if (dotsNav) {
                dotsNav.innerHTML = '';
                for (let i = 0; i <= maxIndex; i++) {
                    const dot = document.createElement('button');
                    dot.classList.add('dot');
                    dot.setAttribute('aria-label', `Ir para slide ${i + 1}`);
                    dot.addEventListener('click', () => {
                        goToBlogSlide(i);
                        resetAutoPlayBlog();
                    });
                    dotsNav.appendChild(dot);
                }
            }
            updateBlogDots();
        }

        function updateBlogDots() {
            const dots = Array.from(dotsNav.children);
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[currentIndex]) {
                dots[currentIndex].classList.add('active');
            }
        }

        function goToBlogSlide(index) {
            currentIndex = Math.max(0, Math.min(index, maxIndex));
            
            const slideWidth = slides[0].offsetWidth;
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
            
            updateBlogDots();
        }

        const nextBlogSlide = () => {
            let nextIndex = currentIndex + slidesToScroll;
            if (nextIndex > maxIndex) {
                nextIndex = 0; 
            }
            goToBlogSlide(nextIndex);
        };

        const prevBlogSlide = () => {
            let prevIndex = currentIndex - slidesToScroll;
            if (prevIndex < 0) {
                prevIndex = maxIndex; 
            }
            goToBlogSlide(prevIndex);
        };

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                nextBlogSlide();
                resetAutoPlayBlog();
            });
        }
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                prevBlogSlide();
                resetAutoPlayBlog();
            });
        }

        const startAutoPlayBlog = () => {
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(nextBlogSlide, 7000);
        };

        const resetAutoPlayBlog = () => {
            clearInterval(autoPlayInterval);
            startAutoPlayBlog();
        };
        
        window.addEventListener('resize', () => {
            updateBlogMetrics();
            goToBlogSlide(currentIndex); 
        });
        blogWrapper.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        blogWrapper.addEventListener('mouseleave', () => startAutoPlayBlog());
        
        updateBlogMetrics();
        goToBlogSlide(0);
        startAutoPlayBlog();
    }

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

    if (promoModal) {
        setTimeout(() => {
            openModal(promoModal);
        }, 5000);
    }

    [promoModal, planModal, reinforcementModal, contactModal].forEach(modal => {
        if (modal) {
            const closeBtn = modal.querySelector('.modal-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => closeModal(modal));
            }
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
            if (parentCard && (parentCard.querySelector('h3').innerText.toLowerCase() === 'plus' || parentCard.querySelector('.price-value').innerText.toLowerCase() === 'consultar')) {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            } else if (parentCard && parentCard.classList.contains('free-plan')) {
                openModal(contactModal);
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
        if (!reinforcementModalShown && reinforcementModal) {
            clearTimeout(scrollTimeout);
            const isNearBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200;

            if (isNearBottom) {
                scrollTimeout = setTimeout(() => {
                    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
                        openModal(reinforcementModal);
                        reinforcementModalShown = true;
                    }
                }, 5000);
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
                }).catch(err => {});
            }
        });
    });

    let mapInstance = null;

    function initBrazilMap() {
        if (mapInstance || typeof L === 'undefined' || !document.getElementById('map-container')) return;

        try {
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
                attributionControl: false
            });

            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
                subdomains: 'abcd',
                maxZoom: 7,
                minZoom: 4
            }).addTo(mapInstance);

            const zengaHQ = [-25.4411, -49.2908];

            const ufCoordinates = {
                'PE': {
                    lat: -8.0476,
                    lon: -34.8770,
                    name: 'Pernambuco'
                },
                'SP': {
                    lat: -23.5505,
                    lon: -46.6333,
                    name: 'São Paulo'
                },
                'MG': {
                    lat: -19.9167,
                    lon: -43.9345,
                    name: 'Minas Gerais'
                },
                'ES': {
                    lat: -20.3192,
                    lon: -40.3378,
                    name: 'Espírito Santo'
                },
                'AM': {
                    lat: -3.1190,
                    lon: -60.0217,
                    name: 'Amazonas'
                },
                'MT': {
                    lat: -15.6014,
                    lon: -56.0977,
                    name: 'Mato Grosso'
                },
                'PR': {
                    lat: -25.4284,
                    lon: -49.2733,
                    name: 'Paraná'
                },
                'SC': {
                    lat: -27.5954,
                    lon: -48.5480,
                    name: 'Santa Catarina'
                },
                'RS': {
                    lat: -30.0346,
                    lon: -51.2177,
                    name: 'Rio Grande do Sul'
                },
                'RO': {
                    lat: -10.83,
                    lon: -63.22,
                    name: 'Rondônia'
                },
                'TO': {
                    lat: -10.1848,
                    lon: -48.3338,
                    name: 'Tocantins'
                }
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
                    if (!drawnLocations[loc.name]) {
                        L.marker(destination, {
                            icon: L.divIcon({
                                className: 'pulsing-marker',
                                iconSize: [14, 14]
                            })
                        })
                           .addTo(mapInstance)
                           .bindTooltip(loc.name, {
                                permanent: false,
                                direction: 'top',
                                className: 'custom-leaflet-tooltip'
                            });
                        drawnLocations[loc.name] = true;
                    } else {
                        L.marker(destination, {
                            icon: L.divIcon({
                                className: 'pulsing-marker',
                                iconSize: [14, 14]
                            })
                        }).addTo(mapInstance);
                    }
                    return;
                }

                const latlngs = getArc(zengaHQ, destination);
                const line = L.polyline(latlngs, {
                    color: '#00aaff',
                    weight: 2,
                    opacity: 0.7
                }).addTo(mapInstance);

                const path = line.getElement();
                if (path) {
                    path.classList.add('map-line-path');
                    path.style.animationDelay = `${index * 0.08}s`;
                }

                const customIcon = L.divIcon({
                    className: 'pulsing-marker',
                    iconSize: [14, 14]
                });

                if (!drawnLocations[loc.name]) {
                    L.marker(destination, {
                            icon: customIcon
                        })
                        .addTo(mapInstance)
                        .bindTooltip(loc.name, {
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

        } catch (error) {
            const mapContainer = document.getElementById('map-container');
            if (mapContainer) mapContainer.innerHTML = "<p>Erro ao carregar o mapa.</p>";
        }
    }

    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(clickedItem => {
            const question = clickedItem.querySelector('.faq-question');
            const answer = clickedItem.querySelector('.faq-answer');

            if (question && answer) {
                question.addEventListener('click', () => {
                    const isCurrentlyActive = clickedItem.classList.contains('active');

                    faqItems.forEach(item => {
                        if (item !== clickedItem) {
                            item.classList.remove('active');
                            item.querySelector('.faq-answer').style.maxHeight = null;
                        }
                    });

                    if (isCurrentlyActive) {
                        clickedItem.classList.remove('active');
                        answer.style.maxHeight = null;
                    } else {
                        clickedItem.classList.add('active');
                        setTimeout(() => {
                            answer.style.maxHeight = answer.scrollHeight + 'px';
                        }, 10);
                    }
                });
            }
        });
    }

    try {
        feather.replace();
    } catch (e) {}

});