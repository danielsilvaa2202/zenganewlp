document.addEventListener('DOMContentLoaded', () => {

    // --- LISTA COMPLETA DE PASSOS (12 TOTAL) ---
    const steps = [
        {
            image: 'image1.png',
            title: 'Tela Inicial: Visão Geral do MIT',
            text: `Bem-vindo ao seu painel de controle. Aqui você tem uma visão panorâmica do status de processamento de todas as suas empresas no Módulo de Inclusão de Tributos (MIT).`
        },
        {
            image: 'image1.png',
            title: 'Filtros Rápidos de Status',
            text: `Use os cards no topo como filtros. Clique em <strong>"Erros - MIT"</strong> para ver só o que precisa de atenção, ou <strong>"Aguardando Arquivo"</strong> para saber o que ainda falta enviar.`
        },
        {
            image: 'image2.png',
            title: 'Enviando Novos Arquivos',
            text: `Para começar, clique no botão <strong>"Uploader"</strong>. Na janela que se abre, arraste os arquivos <strong>.JSON</strong> gerados pelo seu sistema contábil.`
        },
        {
            image: 'image2.png',
            title: 'Automação da DCTFWeb',
            text: `Dica de ouro: Ative a opção <strong>"Transmitir DCTFWeb automaticamente"</strong> antes de enviar. Assim, o sistema já faz a transmissão assim que processar o MIT, economizando seu tempo.`
        },
        {
            image: 'image3.png',
            title: 'Acompanhamento e Ações',
            text: `Na coluna 'Ações', use o <strong>ícone de olho (👁️)</strong> para ver o comprovante de retorno da Receita Federal. Se algo der errado, use a <strong>seta circular (🔄)</strong> para reprocessar a empresa.`
        },
        {
            image: 'image4.png',
            title: 'MIT Sem Movimento',
            text: `Empresas sem movimento no período? Clique no botão <strong>"Sem movimento"</strong>, selecione-as na lista e gere o arquivo em massa para garantir o fechamento correto da competência.`
        },
        {
            image: 'image5.png',
            title: 'Gestão da DCTFWeb',
            text: `No módulo DCTFWeb, você gerencia tudo o que não foi enviado automaticamente. Use o botão <strong>"Enviar DCTFWeb"</strong> para transmitir em lote ou exporte os recibos e relatórios para conferência.`
        },
        {
            image: 'image6.png',
            title: 'Emissão de DARF (MIT)',
            text: `As guias do MIT são geradas automaticamente após o processamento. Nesta tela, você pode baixar cada guia individualmente ou usar <strong>"Exportar Lote"</strong> para baixar todas de uma vez.`
        },
        {
            image: 'image8.png',
            title: 'DARF Previdenciário: Emissão',
            text: `Para guias previdenciárias (INSS), clique em <strong>"Nova Emissão"</strong>. Selecione as fontes (eSocial, Reinf, MIT) e as empresas desejadas para que o sistema consulte e gere as guias atualizadas.`
        },
        {
            image: 'image7.png',
            title: 'DARF Previdenciário: Download',
            text: `Após a emissão, as guias aparecem na lista. Você pode baixar uma a uma pelo ícone de download (⬇️) ou pegar todas de uma vez via <strong>"Exportar Lote"</strong>.`
        },
        // --- NOVOS PASSOS (SITUAÇÃO FISCAL) ---
        {
            image: 'image9.png',
            title: 'Situação Fiscal: Solicitação',
            text: `O novo módulo <strong>Situação Fiscal</strong> permite monitorar pendências na Receita Federal. Para começar, clique no botão <strong>"Solicitar Relatório"</strong> e selecione a empresa desejada na lista.`
        },
        {
            image: 'image10.png',
            title: 'Análise de Pendências',
            text: `Após o processamento, a coluna 'Situação' mostrará se a empresa está <strong>Regular</strong> (verde) ou <strong>Irregular</strong> (vermelho).<br><br>Clique no ícone de download (⬇️) para baixar o <strong>Relatório de Pendências</strong> completo em PDF.`
        }
    ];

    // --- ELEMENTOS E LÓGICA ---
    const currentImage = document.getElementById('current-image');
    const instructionTitle = document.getElementById('instruction-title');
    const instructionText = document.getElementById('instruction-text');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress-bar');
    const stepCounter = document.getElementById('step-counter');
    let currentStepIndex = 0;

    function updateUI() {
        const step = steps[currentStepIndex];
        instructionTitle.classList.remove('visible');
        instructionText.classList.remove('visible');
        currentImage.classList.add('fade-out');

        setTimeout(() => {
            const imgLoader = new Image();
            imgLoader.src = step.image;
            imgLoader.onload = () => {
                currentImage.src = step.image;
                currentImage.classList.remove('fade-out');
            };
            instructionTitle.textContent = step.title;
            instructionText.innerHTML = step.text;
            instructionTitle.classList.add('visible');
            instructionText.classList.add('visible');
            const progressPercent = ((currentStepIndex + 1) / steps.length) * 100;
            progressBar.style.width = `${progressPercent}%`;
            stepCounter.textContent = `Passo ${currentStepIndex + 1} de ${steps.length}`;
            prevBtn.disabled = currentStepIndex === 0;
            nextBtn.disabled = currentStepIndex === steps.length - 1;
        }, 300);
    }

    prevBtn.addEventListener('click', () => { if (currentStepIndex > 0) { currentStepIndex--; updateUI(); } });
    nextBtn.addEventListener('click', () => { if (currentStepIndex < steps.length - 1) { currentStepIndex++; updateUI(); } });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' && !nextBtn.disabled) nextBtn.click();
        if (e.key === 'ArrowLeft' && !prevBtn.disabled) prevBtn.click();
    });
    updateUI();
});