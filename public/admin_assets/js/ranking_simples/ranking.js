window.addEventListener('load', function() {
    function updateAddButtons() {
        const addButtons = document.querySelectorAll('tr.add-row a.btn.btn-sm.btn-default');
        addButtons.forEach(button => {
            button.textContent = '➕️';
            button.title = 'Adicionar';
        })
    }

    updateAddButtons();
});
