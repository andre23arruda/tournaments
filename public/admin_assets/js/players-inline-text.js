document.addEventListener('DOMContentLoaded', function () {
    const group = document.getElementById('Torneio_jogadores-group');
    if (!group) return;

    let badge = document.querySelector('.duplas-count-badge');
    const isActive = document.querySelector('#id_ativo')?.value === 'True'
    if (!badge) {
        badge = document.createElement('p');
        badge.className = 'duplas-count-badge text-center mb-0 text-bold';
        badge.style.cssText = 'margin-left: 8px;';
        group.parentNode.insertBefore(badge, group);
    }
    badge.innerHTML = isActive ? `Verifique se o jogador já está cadastrado no sistema.` : ``;
})
