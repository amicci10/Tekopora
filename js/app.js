/*
 * ARQUIVO PRINCIPAL (APP): Ponto de entrada e lógica de roteamento.
 * * ESPECIFICAÇÕES ATENDIDAS:
 * - Código JavaScript Modular (importação dos módulos).
 * - Estrutura de pastas organizada.
 */

import { loadPage } from './dom.js';
import { initializeFormListeners } from './form.js';


/**
 * Gerencia a navegação da SPA (Simulação de Roteamento).
 * @param {Event} e - O evento de clique.
 */
function handleNavigation(e) {
    const target = e.target.closest('a');
    if (target && target.hasAttribute('href') && !target.hasAttribute('download')) {
        const href = target.getAttribute('href');
        
        // Se for um link interno para um arquivo HTML simulado
        // Mantive a verificação de '#' por ser um padrão comum em SPA, mas o foco é no '.html'
        if (href.endsWith('.html') || href.startsWith('#')) {
            e.preventDefault();
            
            // Pega o nome do arquivo, ex: 'cadastro.html'. Ignora o '#' se for o caso.
            const pageName = href.split('/').pop().replace('#', ''); 
            
            // Se o link for '#cadastro' (com hash), tratamos como 'cadastro.html'
            if (pageName === 'cadastro') {
                 loadPage('cadastro.html');
            } else if (pageName) {
                 loadPage(pageName);
            }
            
            return;
        }
    }
}

/**
 * Função de inicialização principal.
 */
function init() {
    // 1. Roteamento e Manipulação de Links
    // ALTERAÇÃO CRUCIAL: Ouve cliques em todo o corpo (document.body)
    // para interceptar links que estão DENTRO do conteúdo SPA injetado,
    // como o botão "Inscreva-se" na página de projetos.
    document.body.addEventListener('click', handleNavigation);
    
    // 2. Carrega a página inicial baseada na URL atual
    const initialPage = window.location.pathname.split('/').pop() || 'index.html';
    loadPage(initialPage);
    
    // 3. Ouve o evento 'formLoaded' (disparado pelo dom.js) para inicializar o form
    document.addEventListener('formLoaded', initializeFormListeners);

    // 4. Lidar com o botão Back/Forward do navegador
    window.addEventListener('popstate', () => {
        const statePage = window.location.pathname.split('/').pop() || 'index.html';
        loadPage(statePage);
    });

    // 5. Adiciona o listener para o Menu Hambúrguer (simples toggle)
    document.querySelector('.menu-toggle').addEventListener('click', () => {
        const nav = document.querySelector('nav ul');
        nav.classList.toggle('menu-open');
    });
}

// Inicia a aplicação quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', init);