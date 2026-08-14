const ShareLinkIcon = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 2v13" />
        <path d="m16 6-4-4-4 4" />
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    </svg>
);


const ShareLinkButton = ({ pageName, text='Acompanhe' }) => {
    function copyLinkToClipboard() {
        const currentUrl = window.location.href;
        if (pageName) {
            window.open(`https://wa.me/?text=${text} ${pageName} via Pódio Digital: ${currentUrl}`, '_blank');
        } else {
            window.open(`https://wa.me/?text=${currentUrl}`, '_blank');
        }
    }

    return (
        <div className="fixed top-5 left-5 z-50">
            <button
                className={`cursor-pointer hover:brightness-90 w-10 h-10 rounded-full flex items-center justify-center opacity-70 bg-gray-400`}
                title="Compartilhar link"
                onClick={copyLinkToClipboard}
            >
                <ShareLinkIcon />
            </button>
        </div>
    )
}

export default ShareLinkButton
