document.addEventListener('DOMContentLoaded', function() {
    function adjustRows() {
        // Find all rows of the Jogo inline
        const rows = document.querySelectorAll('#jogo_set-group tbody tr.form-row:not(.empty-form)');
        
        rows.forEach(row => {
            // Group Dupla 1 players
            const j1_1 = row.querySelector('.field-dupla1_jogador1');
            const j1_2 = row.querySelector('.field-dupla1_jogador2');
            if (j1_1 && j1_2 && !j1_1.querySelector('.field-dupla1_jogador2-container')) {
                const container = document.createElement('div');
                container.className = 'field-dupla1_jogador2-container';
                container.style.marginTop = '8px';
                
                // Move all child elements from j1_2 to container
                while (j1_2.firstChild) {
                    container.appendChild(j1_2.firstChild);
                }
                j1_1.appendChild(container);
                j1_2.style.display = 'none';
            }

            // Group Dupla 2 players
            const j2_1 = row.querySelector('.field-dupla2_jogador1');
            const j2_2 = row.querySelector('.field-dupla2_jogador2');
            if (j2_1 && j2_2 && !j2_1.querySelector('.field-dupla2_jogador2-container')) {
                const container = document.createElement('div');
                container.className = 'field-dupla2_jogador2-container';
                container.style.marginTop = '8px';
                
                // Move all child elements from j2_2 to container
                while (j2_2.firstChild) {
                    container.appendChild(j2_2.firstChild);
                }
                j2_1.appendChild(container);
                j2_2.style.display = 'none';
            }

            // Customize the delete button
            const deleteLink = row.querySelector('td.delete a.inline-deletelink');
            if (deleteLink) {
                deleteLink.textContent = 'Sim';
                deleteLink.style.fontSize = '10pt';
            }
        });
        
        // Hide the table headers for the second players
        const header1_2 = document.querySelector('#jogo_set-group thead th.column-dupla1_jogador2');
        if (header1_2) header1_2.style.display = 'none';
        
        const header2_2 = document.querySelector('#jogo_set-group thead th.column-dupla2_jogador2');
        if (header2_2) header2_2.style.display = 'none';
        
        // Rename columns to make the inline header simpler and clean
        const header1_1 = document.querySelector('#jogo_set-group thead th.column-dupla1_jogador1');
        if (header1_1) header1_1.textContent = 'Dupla 1';
        
        const header2_1 = document.querySelector('#jogo_set-group thead th.column-dupla2_jogador1');
        if (header2_1) header2_1.textContent = 'Dupla 2';
    }

    adjustRows();

    // Listen for new rows added (Django 4.0+ native custom event)
    document.addEventListener('formset:added', function(event) {
        if ((event.detail && event.detail.formsetName === 'jogo_set') || (event.target && event.target.closest('#jogo_set-group'))) {
            adjustRows();
        }
    });
});
