document.addEventListener('DOMContentLoaded', function() {
    const jogosInline = document.querySelector('#jogos-tab .js-inline-admin-formset.inline-group');
    const jogoInlineGroup = document.querySelector('#jogo_set-group');
    if (!jogoInlineGroup || !jogosInline) return;

    // Coleta dados dos jogos
    const jogosRows = jogoInlineGroup.querySelectorAll('.form-row:not(.add-row, .empty-form)');
    const totalJogos = jogosRows.length;
    let jogosConcluidos = 0;

    // Conta jogos concluídos
    jogosRows.forEach(row => {
        const concluidoSelect = row.querySelector('select[id*="-concluido"]');
        if (concluidoSelect && concluidoSelect.value === 'C') {
            jogosConcluidos++;
        }

        const concluidoText = row.querySelector('.field-concluido p');
        if (concluidoText && concluidoText.textContent.includes('✅')) {
            jogosConcluidos++;
        }
    });
    const jogosPendentes = totalJogos - jogosConcluidos;

    if (jogosInline) {
        // Criar o container do contador
        const counterDiv = document.createElement('div');
        counterDiv.className = 'row mx-2';
        
        counterDiv.innerHTML = `
            <div class="col-12 col-md-4 text-center text-bold text-sm">
                Jogos: ${totalJogos}
            </div>
            <div class="col-12 col-md-4 text-center text-bold text-sm">
                Concluídos: <span id="text-concluidos">${jogosConcluidos}</span>
            </div>
            <div class="col-12 col-md-4 text-center text-bold text-sm">
                Pendentes: <span id="text-pendentes">${jogosPendentes}</span>
            </div>
        `;

        jogosInline.prepend(counterDiv);
    }
});
