function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return new Date(year, month - 1, day).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}


function openWhats() {
    const defaultText = 'Ol%C3%A1%2C+tudo+bem%3F+Gostaria+de+saber+como+funciona+o+sitema+P%C3%B3dio+Digital.'
    const phone = '5512982399873'
    window.open(`https://wa.me/${phone}?text=${defaultText}`, '_blank')
}

export { formatDate, openWhats };