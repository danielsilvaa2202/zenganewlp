// Experiências de novembro de 2026, sem alterar os demais scripts da Zenga.
document.addEventListener('DOMContentLoaded', () => {
    // O pop-up original está comentado no index.html.
    // Após 18/11, comente o bloco Black Friday e descomente o original.
    // O vídeo e os demais recursos continuam funcionando sem outras mudanças.

    const overlay = document.getElementById('platformVideoModal');
    const trigger = document.getElementById('openPlatformVideo');
    const closeButton = document.getElementById('closePlatformVideo');
    const player = document.getElementById('platformVideo');
    if (!overlay || !trigger || !closeButton || !player) return;
    let returnFocus = null;

    const openVideo = () => {
        returnFocus = document.activeElement;
        // Não permitir que dois modais fiquem sobrepostos.
        document.querySelectorAll('.modal-overlay.visible').forEach(modal => {
            if (modal !== overlay) modal.classList.remove('visible');
        });
        overlay.classList.add('visible');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        closeButton.focus();
        const playPromise = player.play();
        if (playPromise && typeof playPromise.catch === 'function') playPromise.catch(() => {});
    };
    const closeVideo = () => {
        overlay.classList.remove('visible');
        overlay.setAttribute('aria-hidden', 'true');
        player.pause();
        player.currentTime = 0;
        if (!document.querySelector('.modal-overlay.visible')) document.body.classList.remove('modal-open');
        if (returnFocus && typeof returnFocus.focus === 'function') returnFocus.focus();
    };

    trigger.addEventListener('click', openVideo);
    closeButton.addEventListener('click', closeVideo);
    overlay.addEventListener('click', event => {
        if (event.target === overlay) closeVideo();
    });
    document.addEventListener('keydown', event => {
        if (!overlay.classList.contains('visible')) return;
        if (event.key === 'Escape') closeVideo();
        if (event.key === 'Tab') {
            const focusable = [...overlay.querySelectorAll('button, a[href], video[controls]')]
                .filter(el => el.getClientRects().length > 0);
            if (focusable.length === 0) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault(); last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault(); first.focus();
            }
        }
    });
});
