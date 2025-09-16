document.addEventListener('DOMContentLoaded', () => {
    
    const initChatbot = () => {
        const fab = document.getElementById('chatbot-fab');
        if (!fab) return;

        const fabBubble = document.getElementById('chatbot-fab-bubble');
        const chatWindow = document.getElementById('chatbot-window');
        const closeBtnMobile = document.getElementById('chatbot-close-mobile');
        const sendBtn = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');
        const messagesContainer = document.getElementById('chatbot-messages');
        const suggestionChipsContainer = document.getElementById('chatbot-suggestion-chips');

        let isChatOpen = false;
        let botState = 'initial';

        const welcomeMessage = "Olá! Sou o assistente virtual da ZengaTax. Como posso ajudar você a mudar sua rotina fiscal hoje?";
        const initialSuggestions = ["Como funciona?", "Quais as soluções?", "Agendar Reunião"];

        setTimeout(() => {
            if (!isChatOpen && fabBubble) {
                fabBubble.classList.add('active');
            }
        }, 2000);

        const toggleChat = () => {
            isChatOpen = !isChatOpen;
            if (fabBubble) fabBubble.classList.remove('active');
            fab.classList.toggle('active');
            chatWindow.classList.toggle('active');
            if (isChatOpen && messagesContainer.children.length === 0) {
                addBotMessage(welcomeMessage);
                addSuggestionChips(initialSuggestions);
            }
            if (isChatOpen) {
                input.focus();
            }
        };

        fab.addEventListener('click', toggleChat);
        if(closeBtnMobile) closeBtnMobile.addEventListener('click', toggleChat);

        const addMessage = (text, sender) => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}-message`;
            const bubble = document.createElement('div');
            bubble.className = 'message-bubble';
            bubble.innerHTML = text;
            messageDiv.appendChild(bubble);
            messagesContainer.appendChild(messageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        };

        const addBotMessage = (text) => addMessage(text, 'bot');
        const addUserMessage = (text) => addMessage(text, 'user');

        const addSuggestionChips = (suggestions) => {
            suggestionChipsContainer.innerHTML = '';
            if (!suggestions || suggestions.length === 0) return;
            
            suggestions.forEach(text => {
                const chip = document.createElement('button');
                chip.className = 'chip';
                chip.innerText = text;
                chip.addEventListener('click', () => {
                    handleSendMessage(text);
                });
                suggestionChipsContainer.appendChild(chip);
            });
        };
        
        const showTypingIndicator = () => {
            const indicator = document.createElement('div');
            indicator.className = 'message bot-message typing-indicator';
            indicator.innerHTML = '<span></span><span></span><span></span>';
            messagesContainer.appendChild(indicator);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        };
        
        const removeTypingIndicator = () => {
            const indicator = messagesContainer.querySelector('.typing-indicator');
            if (indicator) messagesContainer.removeChild(indicator);
        };

        const getBotResponse = (userInput) => {
            const text = userInput.toLowerCase();
            let response = { text: '', suggestions: [] };
            const defaultResponse = 'Desculpe, não entendi. Que tal escolher uma das opções abaixo?';
            const encodedText = encodeURIComponent("Olá! Gostaria de agendar uma reunião de apresentação do sistema ZengaTax.");
            const whatsappLink = `https://wa.me/5541987132156?text=${encodedText}`;

            if (botState === 'awaiting_schedule_confirmation' && (text.includes('sim') || text.includes('quero'))) {
                response.text = `Ótimo! Para agendar, por favor, nos chame diretamente no WhatsApp clicando no link: <a href="${whatsappLink}" target="_blank">Iniciar Conversa</a>. Já deixei uma mensagem pronta para você!`;
                botState = 'initial';
                response.suggestions = initialSuggestions;
            } else if (text.includes('preço') || text.includes('plano') || text.includes('valor')) {
                response.text = 'Temos planos flexíveis para atender sua necessidade! O plano <strong>Básico</strong> começa em R$ 299,00 e o <strong>Avançado</strong> em R$ 499,00. Também temos opções personalizadas. Você pode ver todos os detalhes na nossa seção de <a href="#plans" onclick="document.getElementById(\'chatbot-fab\').click()">Planos</a>.';
            } else if (text.includes('dctfweb') || text.includes('dctf')) {
                response.text = `Nossa solução para a <strong>DCTFWeb</strong> foi projetada para eliminar o trabalho manual. Com o ZengaTax, você consegue:<br><br>
                - <strong>Transmitir em lote:</strong> Envie centenas de declarações de uma só vez, sem precisar acessar o eCAC.<br>
                - <strong>Baixar recibos e guias em lote:</strong> Obtenha todos os documentos com um único clique.<br>
                - <strong>Monitorar o status:</strong> Acompanhe em tempo real o andamento de cada transmissão.`;
                response.suggestions = ["O que é MIT?", "E os DARFs?", "Agendar Reunião"];
            } else if (text.includes('mit')) {
                response.text = `Com nossa automação para o <strong>MIT</strong> (Módulo de Integração Tributária), você tem o encerramento e o <strong>controle total</strong> das suas obrigações, com acompanhamento visual em tela e a possibilidade de exportar relatórios completos.`;
                response.suggestions = ["E a DCTFWeb?", "Como funciona a importação?", "Ver Planos"];
            } else if (text.includes('darf')) {
                 response.text = `Sim! Facilitamos a <strong>emissão e download em lote de Recibos e DARFs</strong>, tanto dos tributos do MIT (PIS, COFINS, IRPJ, CSLL, IPI) quanto do DARF Previdenciário gerado pela DCTFWeb.`;
                 response.suggestions = ["Como funciona?", "Ver Planos", "Agendar Reunião"];
            } else if (text.includes('como funciona') || text.includes('passos')) {
                response.text = 'Nosso processo é simples e feito em 4 passos: <strong>1. Upload</strong> dos arquivos, <strong>2. Validação</strong> e fila, <strong>3. Envio e Monitoramento</strong> e <strong>4. Obtenção de Recibos e Guias</strong>. Tudo para facilitar sua rotina!';
                response.suggestions = ["Quais as soluções?", "É seguro?", "Agendar Reunião"];
            } else if (text.includes('soluç')) {
                 response.text = `Nossas principais soluções de automação fiscal são para <strong>MIT</strong>, <strong>DCTFWeb</strong> e <strong>DARF</strong>. Qual delas você gostaria de conhecer melhor?`;
                 response.suggestions = ["Sobre a DCTFWeb", "Sobre o MIT", "Sobre os DARFs"];
            } else if (text.includes('importar') || text.includes('transmitir') || text.includes('lote')) {
                response.text = 'Sim! Nossa plataforma é feita para otimizar seu tempo. Você pode fazer a <strong>importação de arquivos em lote</strong> e realizar a <strong>transmissão em massa</strong> para a fila de processamento, sem esforço manual.';
            } else if (text.includes('monitorar') || text.includes('acompanhar') || text.includes('status')) {
                response.text = 'Com certeza. Oferecemos um painel para <strong>acompanhamento centralizado</strong> onde você monitora o status de todas as obrigações em <strong>tempo real</strong>.';
            } else if (text.includes('integra') || text.includes('parceiro') || text.includes('domínio') || text.includes('sci')) {
                response.text = 'Nosso sistema faz parte de um ecossistema com parceiros confiáveis, incluindo <strong>Domínio Sistemas</strong> e <strong>SCI Sistemas</strong>, garantindo uma integração fluida com seu software contábil.';
            } else if (text.includes('reunião') || text.includes('apresentação') || text.includes('conversar') || text.includes('contato') || text.includes('agendar')) {
                response.text = `Claro! Adoraríamos apresentar o ZengaTax para você. Nosso e-mail é <strong>zenga@scryta.com.br</strong> e nosso WhatsApp é <strong>+55 (41) 98713-2156</strong>. Deseja agendar uma apresentação agora?`;
                response.suggestions = ['Sim, quero agendar!', 'Não, obrigado.'];
                botState = 'awaiting_schedule_confirmation';
            } else if (text.includes('olá') || text.includes('oi')) {
                response.text = 'Olá! Que bom ver você por aqui. Em que posso ajudar?';
                response.suggestions = initialSuggestions;
            } else if (text.includes('obrigado') || text.includes('obrigada') || text.includes('não')) {
                response.text = 'De nada! Se precisar de mais alguma coisa, é só chamar.';
                response.suggestions = initialSuggestions;
                botState = 'initial';
            } else {
                response.text = defaultResponse;
                response.suggestions = initialSuggestions;
                botState = 'initial';
            }
            
            return response;
        };

        const handleSendMessage = (messageOverride = null) => {
            const messageText = messageOverride || input.value.trim();
            if (messageText === '') return;

            addUserMessage(messageText);
            input.value = '';
            suggestionChipsContainer.innerHTML = '';

            showTypingIndicator();

            setTimeout(() => {
                removeTypingIndicator();
                const botResponse = getBotResponse(messageText);
                addBotMessage(botResponse.text);
                if (botResponse.suggestions && botResponse.suggestions.length > 0) {
                    addSuggestionChips(botResponse.suggestions);
                }
            }, 1500);
        };

        sendBtn.addEventListener('click', () => handleSendMessage());
        input.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') handleSendMessage();
        });
    };
    
    initChatbot();
});