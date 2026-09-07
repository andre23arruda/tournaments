'use strict';

(function () {
    function updateColumnHeader() {
        const tipoSelect = document.querySelector('#id_tipo');
        if (!tipoSelect) return;
        const isSimples = tipoSelect.value === 'S';
        const th = document.querySelector('#duplas-group th.column-jogador1');
        if (th && isSimples) th.textContent = 'Jogador';
    }

    function init() {
        updateColumnHeader();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
