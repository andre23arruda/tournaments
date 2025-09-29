const CheckIcon = () => (
    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
    </svg>
);

const CircleIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
    </svg>
);

const LoadingIcon = () => (
    <img src="/loading.svg" title="Em andamento" alt="Em andamento" width={25} />
);

const ReloadIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-refresh-cw-icon lucide-refresh-cw"
    >
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
        <path d="M8 16H3v5" />
    </svg>
);

const ShareLinkIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-share-icon lucide-share"
    >
        <path d="M12 2v13" />
        <path d="m16 6-4-4-4 4" />
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    </svg>
);

const ShareLinkButton = ({pageName}) => {
    function copyLinkToClipboard() {
        const currentUrl = window.location.href;
        if (pageName) {
            window.open(`https://wa.me/?text=Acompanhe ${pageName} via Pódio Digital: ${currentUrl}`, '_blank');
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

const AdminButton = ({ darkMode }) => (
    <div className="fixed top-5 left-5 z-50">
        <button className={`cursor-pointer hover:brightness-90 opacity-70 px-3 py-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`} title="Editar torneio">
            ✏️
        </button>
    </div>
)

const ReloadButton = ({ loadData }) => (
    <button
        className="cursor-pointer hover:brightness-90 fixed bottom-5 right-5 w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center opacity-70 z-50"
        title="Recarregar"
        onClick={loadData}
    >
        <ReloadIcon />
    </button>
)

const Footer = () => (
    <footer className="w-full py-8 text-center">
        <span className="text-gray-500">
            Feito por <a href="https://andrearruda-links.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline">ALCA Inovações Tecnológicas</a>
        </span>
    </footer>
)

function ToggleTheme({ darkMode, toggleTheme }) {
    return (
        <div className="fixed top-5 right-5 z-50">
            <button
                onClick={toggleTheme}
                className={`cursor-pointer hover:brightness-90 w-10 h-10 rounded-full flex items-center justify-center opacity-70 bg-gray-400`}
                title="Alternar modo escuro"
            >
                {darkMode ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-sun-icon lucide-sun"
                    >
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v2" />
                        <path d="M12 20v2" />
                        <path d="m4.93 4.93 1.41 1.41" />
                        <path d="m17.66 17.66 1.41 1.41" />
                        <path d="M2 12h2" />
                        <path d="M20 12h2" />
                        <path d="m6.34 17.66-1.41 1.41" />
                        <path d="m19.07 4.93-1.41 1.41" />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-moon-icon lucide-moon"
                    >
                        <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
                    </svg>
                )}
            </button>
        </div>
    )
}

function Loading({ children, darkMode, pageTitle }) {
    document.title = pageTitle;
    return (
        <div className={`min-h-screen flex justify-center items-center ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <div className="flex flex-col justify-center items-center">
                <img className="mb-5" src="/loading-trophy-w.svg" alt="Loading..." width={70} />
                <h1>{children}</h1>
            </div>
        </div>
    );
}

const statusIcons = {
    'P': <CircleIcon />,
    'A': <LoadingIcon />,
    'C': <CheckIcon />
}

function StatusIcon({ status }) {
    return statusIcons[status] || null;
}

export {
    AdminButton,
    CheckIcon,
    CircleIcon,
    Footer,
    Loading,
    LoadingIcon,
    ReloadButton,
    ShareLinkButton,
    StatusIcon,
    ToggleTheme,
};