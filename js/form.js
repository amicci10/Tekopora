// js/form.js
/**
 * MÓDULO FORM: Funções para validação e lógica do formulário de cadastro.
 * * ESPECIFICAÇÕES ATENDIDAS:
 * - Sistema de verificação de consistência de dados em formulários, com aviso.
 */

// Armazenamento Local (Simulação de um banco de dados local)
const STORAGE_KEY = 'tekopora_cadastro_data';


/**
 * Inicializa os ouvintes de eventos do formulário.
 */
export function initializeFormListeners() {
    const form = document.getElementById('cadastroForm');
    
    // Se o formulário não existir (ainda não foi carregado pelo SPA), sai.
    if (!form) return; 

    // 1. OUVINTE DE ENVIO DO FORMULÁRIO
    form.addEventListener('submit', handleFormSubmit);

    // 2. OUVINTE DE VALIDAÇÃO (Executa a validação avançada ao sair do campo)
    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('blur', () => validateInput(input));
    });

    // 3. OUVINTE PARA MÁSCARAS E VALIDAÇÃO AO DIGITAR
    applyInputMasks(form);
}


/**
 * Simula a aplicação de máscaras (CPF e Telefone).
 * @param {HTMLElement} form - O elemento do formulário.
 */
function applyInputMasks(form) {
    const cpfInput = form.querySelector('#cpf');
    const telInput = form.querySelector('#telefone');

    if (cpfInput) {
        cpfInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, ''); 
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = value.substring(0, 14);
        });
    }

    if (telInput) {
        telInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            value = value.replace(/(\d)(\d{4})$/, '$1-$2');
            e.target.value = value.substring(0, 15);
        });
    }
}


/**
 * Verifica a consistência de um campo e exibe um aviso visual.
 * @param {HTMLInputElement} input - O campo de formulário a ser validado.
 * @returns {boolean} - Retorna true se o campo for válido.
 */
function validateInput(input) {
    clearError(input);

    // 1. Validação Nativa (HTML5)
    if (input.checkValidity() === false) {
        const message = input.validationMessage || input.title || 'Campo incorreto ou incompleto.';
        displayError(input, message);
        return false;
    }

    // 2. Validação de Consistência (Exemplo: Data de Nascimento)
    if (input.id === 'nascimento') {
        const birthDate = new Date(input.value);
        const today = new Date();
        if (birthDate >= today) {
            displayError(input, 'A data de nascimento deve ser anterior à data atual.');
            return false;
        }
    }

    // 3. Validação de Consistência (Exemplo: E-mail)
    if (input.id === 'email' && !input.value.includes('@')) {
        // Embora o checkValidity já pegue isso, é um bom exemplo de validação manual
        displayError(input, 'Por favor, insira um e-mail completo, incluindo o "@".');
        return false;
    }
    
    return true;
}


/**
 * Função principal para lidar com o envio do formulário.
 * @param {Event} e - O evento de envio.
 */
function handleFormSubmit(e) {
    e.preventDefault(); 
    
    const form = e.target;
    let isFormValid = true;
    const inputs = form.querySelectorAll('input[required]');
    
    // Roda a validação em todos os campos obrigatórios
    inputs.forEach(input => {
        if (!validateInput(input)) {
            isFormValid = false;
        }
    });

    const feedbackArea = document.getElementById('form-feedback');
    if (!feedbackArea) return;

    if (isFormValid) {
        // Simulação de Envio e Armazenamento Local
        const formData = getFormData(form);
        saveToLocalStorage(formData);
        
        feedbackArea.textContent = 'Sucesso! Dados salvos localmente e cadastro enviado. Obrigado!';
        feedbackArea.classList.remove('alert-warning');
        feedbackArea.classList.add('alert-success');
        feedbackArea.style.display = 'block';

        form.reset();
        
    } else {
        // Aviso ao usuário de preenchimento incorreto
        feedbackArea.textContent = 'Erro! Existem campos obrigatórios incorretos ou incompletos. Corrija-os.';
        feedbackArea.classList.remove('alert-success');
        feedbackArea.classList.add('alert-warning');
        feedbackArea.style.display = 'block';
    }
}


// --- Funções Auxiliares de Feedback ---

/**
 * Cria/Atualiza a mensagem de erro sob o campo.
 */
function displayError(input, message) {
    // Adiciona uma classe de erro para o CSS estilizar a borda
    input.classList.add('input-error');

    let errorElement = input.parentNode.querySelector('.form-error-message');
    if (!errorElement) {
        errorElement = document.createElement('p');
        errorElement.classList.add('form-error-message');
        input.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

/**
 * Remove a mensagem de erro.
 */
function clearError(input) {
    input.classList.remove('input-error');
    const errorElement = input.parentNode.querySelector('.form-error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// --- Funções de Armazenamento ---

/**
 * Converte os dados do formulário em um objeto JSON.
 */
function getFormData(form) {
    const data = {};
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        data[input.name] = input.value;
    });
    return data;
}

/**
 * Salva os dados no Armazenamento Local (localStorage).
 * @param {Object} data - Os dados do formulário.
 */
function saveToLocalStorage(data) {
    let registrations = localStorage.getItem(STORAGE_KEY);
    registrations = registrations ? JSON.parse(registrations) : [];
    
    // Adiciona um timestamp para rastreamento
    data.timestamp = new Date().toLocaleString(); 
    registrations.push(data);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
    console.log('Dados salvos no localStorage:', registrations);
}