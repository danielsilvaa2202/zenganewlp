document.addEventListener('DOMContentLoaded', function() {
    feather.replace();

    const baseUrl = 'https://zengatax.com.br';
    const currentPath = window.location.pathname;
    const fileName = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    const finalUrl = `${baseUrl}/paginas/${fileName}`;
    const encodedFinalUrl = encodeURIComponent(finalUrl);
    const pageTitle = encodeURIComponent(document.title.split(" - ")[0]);

    const shareLinks = {
        whatsapp: `https://api.whatsapp.com/send?text=${pageTitle}%0A${encodedFinalUrl}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedFinalUrl}`
    };

    const whatsappLink = document.getElementById('share-whatsapp');
    if (whatsappLink) whatsappLink.href = shareLinks.whatsapp;

    const facebookLink = document.getElementById('share-facebook');
    if (facebookLink) facebookLink.href = shareLinks.facebook;

    const copyButton = document.getElementById('copy-link-button');
    if (copyButton) {
        const originalIcon = copyButton.innerHTML;
        
        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(finalUrl).then(() => {
                copyButton.innerHTML = '<i data-feather="check"></i>';
                feather.replace();
                copyButton.classList.add('copied');
                
                setTimeout(() => {
                    copyButton.innerHTML = originalIcon;
                    copyButton.classList.remove('copied');
                    feather.replace();
                }, 2000); 

            }, () => {
                alert('Erro ao copiar o link.');
            });
        });
    }
});