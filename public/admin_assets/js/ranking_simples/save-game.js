(function() {
    'use strict';

    // Converte a data do formato DD/MM/YYYY HH:mm para YYYY-MM-DD HH:mm
    function strToDateTime(dataInput, timeInput) {
        try {
            const parts = dataInput.value.split('/');
            const dateFormatted = parts.length === 3
                ? `${parts[2]}-${parts[1]}-${parts[0]}`
                : dataInput.value;
            return `${dateFormatted} ${timeInput.value}`;
        } catch (error) {
            console.error('Erro ao converter data:', error);
            return null;
        }
    }

    // Função para extrair o índice do jogo do name do input
    function getJogoIndex(element) {
        const name = element.name || element.getAttribute('name');
        const match = name.match(/jogo_set-(\d+)-/);
        return match ? match[1] : null;
    }

    // Função para obter o ID do jogo
    function getJogoId(index) {
        // Procura por um input hidden com o ID do jogo
        const idInput = document.querySelector(`input[name="jogo_set-${index}-id"]`);
        return idInput ? idInput.value : null;
    }

    // Função para obter os dados do jogo
    function getJogoData(index) {
        const statusSelect = document.querySelector(`select[name="jogo_set-${index}-concluido"]`);
        const dupla1Jogador1 = document.querySelector(`select[name="jogo_set-${index}-dupla1_jogador1"]`);
        const dupla1Jogador2 = document.querySelector(`select[name="jogo_set-${index}-dupla1_jogador2"]`);
        const dupla2Jogador1 = document.querySelector(`select[name="jogo_set-${index}-dupla2_jogador1"]`);
        const dupla2Jogador2 = document.querySelector(`select[name="jogo_set-${index}-dupla2_jogador2"]`);
        const pontosDupla1Input = document.querySelector(`input[name="jogo_set-${index}-placar_dupla1"]`) || document.querySelector(`input[name="jogo_set-${index}-pontos_dupla1"]`);
        const pontosDupla2Input = document.querySelector(`input[name="jogo_set-${index}-placar_dupla2"]`) || document.querySelector(`input[name="jogo_set-${index}-pontos_dupla2"]`);
        const dataInput = document.querySelector(`input[name="jogo_set-${index}-data_0"]`);
        const timeInput = document.querySelector(`input[name="jogo_set-${index}-data_1"]`);

        if (!statusSelect) return null;

        // Extrai o ID do ranking a partir da URL atual
        const urlMatch = window.location.href.match(/ranking_simples\/ranking\/([^\/]+)\/change/);
        const rankingId = urlMatch ? urlMatch[1] : null;

        return {
            status: statusSelect.value,
            ranking: rankingId,
            dupla1_jogador1: dupla1Jogador1 ? dupla1Jogador1.value : null,
            dupla1_jogador2: dupla1Jogador2 ? dupla1Jogador2.value : null,
            dupla2_jogador1: dupla2Jogador1 ? dupla2Jogador1.value : null,
            dupla2_jogador2: dupla2Jogador2 ? dupla2Jogador2.value : null,
            pontos_dupla1: pontosDupla1Input ? pontosDupla1Input.value : null,
            pontos_dupla2: pontosDupla2Input ? pontosDupla2Input.value : null,
            placar_dupla1: pontosDupla1Input ? pontosDupla1Input.value : null,
            placar_dupla2: pontosDupla2Input ? pontosDupla2Input.value : null,
            data_jogo: strToDateTime(dataInput, timeInput)
        };
    }

    // Função para salvar o jogo via AJAX
    function autoSaveJogo(jogoId, data, rowElement, index) {
        const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

        // Mostrar indicador de carregamento
        showSavingIndicator(rowElement);

        fetch(`/api/ranking/${jogoId}/save-game/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                showSuccessIndicator(rowElement);
                // Se era um jogo novo, atualiza o ID no input hidden para que futuras edições usem o ID correto
                if (jogoId === 'new' && result.jogo_id) {
                    const idInput = document.querySelector(`input[name="jogo_set-${index}-id"]`);
                    if (idInput) {
                        idInput.value = result.jogo_id;
                    }
                }
            } else {
                showErrorIndicator(rowElement, result.error || 'Erro ao salvar');
            }
            updateCounter();
        })
        .catch(error => {
            console.error('Erro:', error);
            showErrorIndicator(rowElement, 'Erro na comunicação com o servidor');
        });
    }

    // Função para mostrar indicador de salvamento
    function showSavingIndicator(rowElement) {
        const statusCell = rowElement.querySelector('.field-concluido');
        if (!statusCell) return;

        removeIndicators(statusCell);

        const indicator = document.createElement('span');
        indicator.className = 'auto-save-indicator saving';
        indicator.innerHTML = '⏳ Salvando...';
        indicator.style.position = 'absolute'
        indicator.style.right = '10%'
        statusCell.appendChild(indicator);
    }

    // Função para mostrar sucesso
    function showSuccessIndicator(rowElement) {
        const statusCell = rowElement.querySelector('.field-concluido');
        if (!statusCell) return;

        removeIndicators(statusCell);

        const indicator = document.createElement('span');
        indicator.className = 'auto-save-indicator success';
        indicator.innerHTML = '✓ Salvo';
        indicator.style.position = 'absolute'
        indicator.style.right = '10%'
        statusCell.appendChild(indicator);

        // Remover após 3 segundos
        setTimeout(() => {
            indicator.remove();
        }, 3000);
    }

    // Função para mostrar erro
    function showErrorIndicator(rowElement, message) {
        const statusCell = rowElement.querySelector('.field-concluido');
        if (!statusCell) return;

        removeIndicators(statusCell);

        const indicator = document.createElement('span');
        indicator.className = 'auto-save-indicator error';
        indicator.innerHTML = `✗ ${message}`;
        indicator.title = message;
        indicator.style.position = 'absolute'
        indicator.style.right = '10%'
        statusCell.appendChild(indicator);

        // Remover após 5 segundos
        setTimeout(() => {
            indicator.remove();
        }, 5000);
    }

    function updateCounter() {
        const allStatusSelects = document.querySelectorAll('select[name*="jogo_set-"][name*="-concluido"]');
        let pendentesCount = 0;
        let concluidosCount = 0;

        allStatusSelects.forEach(select => {
            if (select.value !== 'C') {
                pendentesCount++;
            } else {
                concluidosCount++;
            }
        });

        // Atualizar o texto no elemento
        const pendentesElement = document.getElementById('text-pendentes');
        if (pendentesElement) {
            pendentesElement.textContent = pendentesCount;
        }
        const concluidosElement = document.getElementById('text-concluidos');
        if (concluidosElement) {
            concluidosElement.textContent = concluidosCount;
        }
    }

    // Função para remover indicadores existentes
    function removeIndicators(cell) {
        const existingIndicators = cell.querySelectorAll('.auto-save-indicator');
        existingIndicators.forEach(ind => ind.remove());
    }

    // Função para encontrar a linha (tr) do elemento
    function findRow(element) {
        let current = element;
        while (current && current.tagName !== 'TR') {
            current = current.parentElement;
        }
        return current;
    }

    // Handler para mudança no select de status
    function handleStatusChange(event) {
        const select = event.target;
        const status = select.value;

        const index = getJogoIndex(select);
        if (!index) return;

        let jogoId = getJogoId(index);
        const data = getJogoData(index);
        if (!data) return;

        if (!jogoId) {
            jogoId = 'new';
            // Se for jogo novo, só salvamos se os jogadores principais estiverem selecionados
            if (!data.dupla1_jogador1 || !data.dupla2_jogador1) {
                console.warn('Selecione os jogadores principais antes de alterar o status');
                return;
            }
        }

        const row = findRow(select);
        autoSaveJogo(jogoId, data, row, index);
    }

    // Inicializar quando DOM estiver pronto
    function init() {
        // Observar mudanças nos selects de status
        document.addEventListener('change', function(e) {
            if (e.target.matches('select[name*="jogo_set-"][name*="-concluido"]')) {
                handleStatusChange(e);
            }
        });

        // Para Select2 (se estiver usando)
        document.addEventListener('DOMContentLoaded', function() {
            // Esperar o Select2 inicializar
            setTimeout(() => {
                jQuery(document).on('select2:select', function(e) {
                    const target = e.target;
                    if (target && target.name && target.name.includes('concluido')) {
                        handleStatusChange({ target: target });
                    }
                });
            }, 500);
        });
    }

    // Inicializar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();