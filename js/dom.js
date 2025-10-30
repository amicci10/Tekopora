// js/dom.js
/**
 * MÓDULO DOM: Funções para manipulação de elementos e templates.
 * * ESPECIFICAÇÕES ATENDIDAS:
 * - Implementar sistema de Single Page Application (SPA) básico.
 * - Criar sistema de templates JavaScript.
 */

// 1. TEMPLATES JAVASCRIPT (Simulação de conteúdo de cada página)

const TEMPLATES = {
    'index.html': `
        <section id="home">
            <h2 id="home-title">O Movimento Tekoporã: Pelo Bem Viver Originário</h2>
            <article>
                <h3>Nossa Missão:</h3>
                <p>O <strong>Tekoporã</strong> significa "Modo de Vida Correto" ou "Bem Viver" em Guarani. Dedicamo-nos a articular e fortalecer as comunidades indígenas contra ameaças a sua cultura e territórios, como o Marco Temporal.</p>
                <p><strong>Promover a União:</strong> Fortalecer os laços e a troca de saberes entre diferentes etnias e regiões, unificando a grande luta indígena.</p>
                <img src="imagens/Tekoporã, pela paz indígena.PNG" alt="Povo Indígena representando sua cultura">
                <h3>Informações de Contato</h3>
                <address>
                    <p><strong>E-mail:</strong> contato@tekopora.org.br</p>
                    <p><strong>Telefone:</strong> (11) 97299-9946</p>
                    <p><strong>Endereço Sede:</strong> Articulação Pataxó, São Paulo - SP (Fictício)</p>
                </address>
            </article>
            <figure>
                <img src="imagens/aldeia pataxo.png" alt="Imagem que representa a união e a resistência de povos indígenas." style="max-width: 100%; height: auto;">
                <figcaption>Imagem para ilustrar a sede.</figcaption>
            </figure>
        </section>
    `,
'projetos.html': `
        <section id="projetos">
            <h2 id="projetos-title">Projetos Sociais e Como Ajudar</h2>
            
            <div class="flex-container"> 
                
                <article class="card">
                    <img src="imagens/mãe terra.PNG" alt="Mulher indígena grávida, representando a mãe terra com raizes" class="card-image">
                    
                    <div class="card-content">
                        <h3>Voluntariado: Seja um agente de mudança</h3>

                        <p>Na cosmovisão indígena, a terra (Tekoha) é a base da vida. Ao proteger os Povos Originários, protegemos a saúde do planeta. Sua contribuição em tempo ou habilidade é essencial.</p>

                        <h3 style="margin-top: 0;">Áreas de Contribuição</h3>
                        
                        <div class="badges" style="margin-bottom: 24px;">
                            <span class="badge badge-territorio">Voz e Articulação</span>
                            <span class="badge badge-territorio">Defesa Jurídica</span>
                            <span class="badge badge-social">Comunicação e Mídias</span>
                            <span class="badge badge-social">Captação de Recursos</span>
                        </div>
                        
                        <p class="alert alert-warning">
                            Como voluntário(a) do Tekoporã, você se torna parte essencial dessa resistência.
                        </p>

                        <a href="cadastro.html" class="btn btn-primary">Inscreva-se como Voluntário!</a>
                    </div>
                </article>

                <article class="card">
                    <div class="card-content">
                        <h3>Como Doar</h3>
                        <p>Sua doação garante recursos para eventos, defesa territorial e apoio direto às comunidades. A transparência é nossa prioridade.</p>
                        
                        <p><strong>Conta para Depósito:</strong></p>
                        
                        <dl>
                            <dt>Banco:</dt><dd>Banco Originário (999)</dd>
                            <dt>Agência:</dt><dd>0001</dd>
                            <dt>Conta Corrente:</dt><dd>123456-7</dd>
                            <dt>CNPJ:</dt><dd>00.000.000/0001-00</dd>
                        </dl>
                        
                        <p class="alert alert-info" style="margin-top: 24px;">Todo valor é revertido integralmente para a causa originária.</p>
                        
                        <figure style="margin-top: 32px;">
                            <img 
                                src="imagens/crianças pataxós.jpg" 
                                alt="Foto de crianças, representando o apoio e o futuro." 
                                class="card-image"
                            >
                            <figcaption>O futuro dos Povos Originários depende de nosso apoio.</figcaption>
                        </figure>

                    </div>
                </article>
                
            </div>
            
            </section>
    `,
    'cadastro.html': `
        <section id="cadastro">
            <h2 id="cadastro-title">Formulário de Cadastro</h2>
            <p>Preencha seus dados para se juntar à rede.</p>
            <div class="alert alert-warning" id="form-feedback" style="display:none;"></div>
            
            <form id="cadastroForm">
                <fieldset class="fieldset">
                    <legend>Parte 1: Dados Pessoais</legend>
                    <div class="form-group"><label for="nome">Nome Completo *</label><input type="text" id="nome" name="nome" required></div>
                    <div class="form-group"><label for="email">E-mail *</label><input type="email" id="email" name="email" required></div>
                    <div class="form-group"><label for="cpf">CPF *</label><input type="text" id="cpf" name="cpf" required pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}" title="999.999.999-99" maxlength="14"></div>
                    <div class="form-group"><label for="telefone">Telefone *</label><input type="tel" id="telefone" name="telefone" required pattern="\\(\\d{2}\\) \\d{4,5}-\\d{4}" title="(99) 99999-9999" maxlength="15"></div>
                    <div class="form-group"><label for="nascimento">Data de Nascimento *</label><input type="date" id="nascimento" name="nascimento" required></div>
                </fieldset>
                
                <fieldset class="fieldset">
                    <legend>Parte 2: Endereço</legend>
                    <div class="form-group"><label for="cep">CEP *</label><input type="text" id="cep" name="cep" required pattern="\\d{5}-\\d{3}" title="99999-999" maxlength="9"></div>
                    <div class="form-group"><label for="endereco">Endereço (Rua e Número) *</label><input type="text" id="endereco" name="endereco" required></div>
                    <div class="form-group"><label for="cidade">Cidade *</label><input type="text" id="cidade" name="cidade" required></div>
                    <div class="form-group"><label for="estado">Estado (UF) *</label><input type="text" id="estado" name="estado" maxlength="2" required></div>
                    <div class="form-group"><label for="complemento">Complemento</label><input type="text" id="complemento" name="complemento"></div>
                </fieldset>
                
                <button type="submit" class="btn btn-primary">Mandar Dados do Cadastro!</button>
            </form>
        </section>
    `
};

/**
 * Carrega o conteúdo de uma "página" no container principal da SPA.
 * @param {string} pageName - O nome do arquivo (ex: 'index.html').
 */
export function loadPage(pageName) {
    const container = document.getElementById('app-container');
    const template = TEMPLATES[pageName];

    if (container && template) {
        // Altera o conteúdo principal
        container.innerHTML = template;

        // Atualiza a URL e o histórico (sem recarregar a página)
        if (pageName !== window.location.pathname.split('/').pop()) {
            history.pushState(null, '', pageName);
        }
        
        // Dispara um evento para o módulo 'form.js' saber que o formulário foi carregado
        if (pageName === 'cadastro.html') {
            document.dispatchEvent(new Event('formLoaded'));
        }

        updateActiveLink(pageName);
    } else {
        container.innerHTML = `<p class="alert alert-error">Página ${pageName} não encontrada.</p>`;
    }
}

/**
 * Atualiza o link ativo na navegação.
 * @param {string} currentPage - A página atual.
 */
function updateActiveLink(currentPage) {
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active-link');
        const href = link.getAttribute('href');
        
        // Lógica de destaque: se o href é a página atual
        if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active-link');
        }
    });
}