/**
 * ZengaTax - Lógica da Seção de Planos
 * Controla o Toggle de Mensal/Anual e a estilização dos botões
 */

document.addEventListener('DOMContentLoaded', () => {
    const priceToggle = document.getElementById('price-toggle');
    const plansGrid = document.querySelector('.plans-grid');
    const labelMonthly = document.getElementById('label-monthly');
    const labelAnnual = document.getElementById('label-annual');
    
    if (priceToggle && plansGrid && labelMonthly && labelAnnual) {
        
        // Função para atualizar a UI do toggle
        const updatePricingUI = (isAnnual) => {
            // Alterna a classe na grid que controla a exibição CSS (display: none/block)
            if (isAnnual) {
                plansGrid.classList.add('show-annual');
                labelAnnual.classList.add('active');
                labelMonthly.classList.remove('active');
            } else {
                plansGrid.classList.remove('show-annual');
                labelMonthly.classList.add('active');
                labelAnnual.classList.remove('active');
            }
        };

        // Event listener para o switch
        priceToggle.addEventListener('change', function() {
            updatePricingUI(this.checked);
        });

        // Permitir clique nos textos (labels) para mudar o switch
        labelMonthly.addEventListener('click', () => {
            if (priceToggle.checked) {
                priceToggle.checked = false;
                updatePricingUI(false);
            }
        });

        labelAnnual.addEventListener('click', () => {
            if (!priceToggle.checked) {
                priceToggle.checked = true;
                updatePricingUI(true);
            }
        });

        // Opcional: Animação sutil ao entrar na seção
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const planCards = document.querySelectorAll('.plan-card');
        const planObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = entry.target.classList.contains('popular') && window.innerWidth > 992 
                            ? 'scale(1.03) translateY(0)' 
                            : 'translateY(0)';
                    }, index * 150); // Efeito cascata
                    planObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Prepara os cards para animação
        planCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px)';
            card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            planObserver.observe(card);
        });
    }
});