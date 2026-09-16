'use strict';

(function () {
    function getFieldContainer(fieldName) {
        const input = document.getElementById(`id_${fieldName}`) || document.querySelector(`[name="${fieldName}"]`);
        if (input) {
            const container = input.closest('.form-group, .form-row, .field-' + fieldName);
            if (container) return container.parentElement;
        }
        return document.querySelector(`.field-${fieldName}`);
    }

    function toggleFormatoFields() {
        const tipoSelect = document.getElementById('id_tipo') || document.querySelector('[name="tipo"]');
        if (!tipoSelect) return;

        // 'D' = Duplas, 'S' = Simples
        const isDuplas = tipoSelect.value === 'D';

        const fieldsToToggle = ['draw_pairs', 'draw_mixed_pairs'];

        fieldsToToggle.forEach(function (fieldName) {
            const container = getFieldContainer(fieldName);
            if (container) {
                container.style.display = isDuplas ? '' : 'none';
            }
        });
    }

    function init() {
        toggleFormatoFields();

        const tipoSelect = document.getElementById('id_tipo') || document.querySelector('[name="tipo"]');
        if (tipoSelect) {
            tipoSelect.addEventListener('change', toggleFormatoFields);
        }

        // Support for jQuery / Select2 used by Jazzmin / Django admin
        const $ = window.jQuery || window.$ || (window.django && window.django.jQuery);
        if ($) {
            $(document).on('change select2:select', '#id_tipo, [name="tipo"]', function () {
                toggleFormatoFields();
            });

            // Re-apply whenever a tab is shown (e.g. switching to the "Formato" tab)
            $(document).on('shown.bs.tab', 'a[data-toggle="tab"], a[data-bs-toggle="tab"]', function () {
                toggleFormatoFields();
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();