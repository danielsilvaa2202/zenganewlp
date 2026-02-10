// carousel-infinite.js
document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector('.clients-track');
    
    if (track) {
        // Seleciona todos os itens originais
        const originalItems = Array.from(track.children);
        
        // Clona cada item e adiciona ao final da lista
        originalItems.forEach(item => {
            const clone = item.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true'); // Boa prática de acessibilidade para itens decorativos
            track.appendChild(clone);
        });
    }
});