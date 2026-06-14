document.addEventListener('DOMContentLoaded', function() {
    const jogosInline = document.querySelector('#jogos-tab .js-inline-admin-formset.inline-group');
    const jogoInlineGroup = document.querySelector('#jogo_set-group');
    if (!jogoInlineGroup || !jogosInline) return;

    // Coleta todas as linhas de jogos como um array para facilitar a manipulação
    const jogosRows = Array.from(jogoInlineGroup.querySelectorAll('.form-row:not(.add-row, .empty-form)'));
    const totalJogos = jogosRows.length;
    
    // Configurações de Estado
    let pageSize = 50;
    let currentPage = 1;
    let filteredRows = [...jogosRows];

    // Verificação de Ativação (segue a lógica definida pelo usuário: > 15 jogos e 1 grupo)
    const qtdGruposField = document.querySelector('#id_quantidade_grupos');
    const isOneGroup = qtdGruposField && (qtdGruposField.value === '1' || qtdGruposField.options?.[qtdGruposField.selectedIndex]?.text === '1');

    if (totalJogos <= 15 || !isOneGroup) return;

    // --- Configuração da Interface (UI) ---
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'row mx-2 align-items-center';
    controlsDiv.innerHTML = `
        <div class="col-md-6 pt-2">
            <input type="text" id="inline-search-input" class="form-control" placeholder="🔍 Buscar por jogador..." style="width: 100%; border-radius: 4px; padding: 10px;">
        </div>
        <div class="col-md-6 pt-2 d-flex justify-content-end align-items-center" id="pagination-controls">
            <!-- Os botões de paginação serão injetados aqui -->
        </div>
    `;
    
    // Insere os controles no topo do inline (substituindo ou complementando o que houver)
    jogosInline.prepend(controlsDiv);

    const searchInput = document.getElementById('inline-search-input');
    const paginationControls = document.getElementById('pagination-controls');

    /**
     * Função principal que atualiza a visibilidade das linhas baseada em busca e paginação
     */
    function updateDisplay() {
        const query = searchInput.value.toLowerCase();
        
        // 1. Filtrar todas as linhas pela busca
        filteredRows = jogosRows.filter(row => {
            const d1 = row.querySelector('.field-dupla_1')?.textContent.toLowerCase() || '';
            const d2 = row.querySelector('.field-dupla_2')?.textContent.toLowerCase() || '';
            return d1.includes(query) || d2.includes(query);
        });

        const totalFiltered = filteredRows.length;
        const totalPages = Math.ceil(totalFiltered / pageSize) || 1;

        // Ajusta a página atual se estiver fora do intervalo após o filtro
        if (currentPage > totalPages) currentPage = totalPages;
        if (currentPage < 1) currentPage = 1;

        // 2. Ocultar todas as linhas e mostrar apenas a fatia da página atual
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;

        jogosRows.forEach(row => {
            row.style.display = 'none';
        });

        filteredRows.slice(start, end).forEach(row => {
            row.style.display = '';
        });

        // 3. Renderizar os controles de navegação
        renderPaginationUI(totalPages, totalFiltered);
    }

    /**
     * Renderiza os botões e informações de página
     */
    function renderPaginationUI(totalPages, totalFiltered) {
        // Se as linhas filtradas couberem em uma página e não houver busca, não precisa mostrar controles
        if (totalFiltered <= pageSize && searchInput.value === '') {
            paginationControls.innerHTML = '';
            return;
        }

        const startIdx = totalFiltered === 0 ? 0 : (currentPage - 1) * pageSize + 1;
        const endIdx = Math.min(currentPage * pageSize, totalFiltered);

        paginationControls.innerHTML = `
            <span class="mr-3 small text-muted">
                Exibindo ${startIdx}-${endIdx} de ${totalFiltered}
            </span>
            <div class="btn-group btn-group-sm">
                <button type="button" class="btn btn-primary btn-outline" id="prev-page" ${currentPage === 1 ? 'disabled' : ''} style="margin-right: 2px;">
                    «
                </button>
                <button type="button" class="btn btn-default disabled" style="pointer-events: none;">
                    ${currentPage}/${totalPages}
                </button>
                <button type="button" class="btn btn-primary btn-outline" id="next-page" ${currentPage === totalPages ? 'disabled' : ''} style="margin-left: 2px;">
                    »
                </button>
            </div>
        `;

        // Eventos dos botões
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');

        if (prevBtn) {
            prevBtn.onclick = (e) => {
                e.preventDefault();
                if (currentPage > 1) {
                    currentPage--;
                    updateDisplay();
                    // scrollToInlineTop();
                }
            };
        }

        if (nextBtn) {
            nextBtn.onclick = (e) => {
                e.preventDefault();
                if (currentPage < totalPages) {
                    currentPage++;
                    updateDisplay();
                    // scrollToInlineTop();
                }
            };
        }
    }

    /**
     * Auxiliar para voltar o scroll para o topo do inline ao trocar de página
     */
    function scrollToInlineTop() {
        controlsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Evento de busca: reseta para a página 1 sempre que o filtro muda
    searchInput.addEventListener('input', () => {
        currentPage = 1;
        updateDisplay();
    });

    // Inicialização
    updateDisplay();
});
