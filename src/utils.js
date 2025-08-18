function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

export { formatDate };