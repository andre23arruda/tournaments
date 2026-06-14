'use strict';

(function () {
    function countDuplas() {
        const rows = document.querySelectorAll(
            '#duplas-group tr.form-row.dynamic-duplas:not(.deleted)'
        );
        return rows.length;
        // const deletedRows = document.querySelectorAll(
        //     '#duplas-group tr.form-row.dynamic-duplas .delete input[type="checkbox"]:checked'
        // );
        // return rows.length - deletedRows.length;
    }

    function updateLabel() {
        const count = countDuplas();
        const group = document.getElementById('duplas-group');
        if (!group) return;

        let badge = document.querySelector('.duplas-count-badge');
        if (!badge) {
            badge = document.createElement('p');
            badge.className = 'duplas-count-badge text-center mb-0 text-bold';
            badge.style.cssText = 'margin-left: 8px;';
            group.parentNode.insertBefore(badge, group);
        }
        badge.textContent = `Inscritos: ${count}`;
    }

    function updateColumnHeader() {
        const tipoSelect = document.querySelector('#id_tipo');
        if (!tipoSelect) return;
        const isSimples = tipoSelect.value === 'S';
        const th = document.querySelector('#duplas-group th.column-jogador1');
        if (th && isSimples) th.textContent = 'Jogador';
    }

    function init() {
        updateLabel();
        updateColumnHeader();

        const group = document.getElementById('duplas-group');
        if (!group) return;

        // Observa adições/remoções de linhas e mudanças de classe no inline
        const observer = new MutationObserver(updateLabel);
        observer.observe(group, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });

        // Atualiza ao marcar/desmarcar checkboxes de exclusão
        group.addEventListener('change', function (e) {
            if (e.target.matches('input[type="checkbox"]')) {
                updateLabel();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
