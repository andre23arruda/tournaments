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

const PencilIcon = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
   <path d="m 2.9304781,22.12261 c -0.187216,-0.03637 -0.438593,-0.205683 -0.5486323,-0.369526 -0.061413,-0.09143 -0.1088114,-0.222049 -0.1300132,-0.358232 -0.02015,-0.129488 -0.029382,-1.172822 -0.023313,-2.635741 0.00927,-2.238038 0.014654,-2.431749 0.070969,-2.557893 0.043978,-0.09849 1.8724281,-1.94881 6.5680587,-6.6466229 3.5789139,-3.5805786 6.6069209,-6.5844789 6.7288989,-6.6753346 0.326007,-0.2428289 0.624552,-0.3944234 0.98947,-0.5024327 0.296125,-0.087648 0.371323,-0.095946 0.870057,-0.096014 0.501421,-7.05e-5 0.572334,0.0078 0.870053,0.097014 0.692412,0.2073991 0.94775,0.3999386 2.186622,1.6488392 1.042476,1.0509123 1.19833,1.2472808 1.396889,1.7599952 0.276424,0.7137822 0.274244,1.5726572 -0.0058,2.2769904 -0.245432,0.6173365 0.117815,0.2352045 -6.951786,7.3131634 -3.595754,3.600009 -6.5918044,6.580477 -6.6578791,6.623264 -0.229834,0.148824 -0.351392,0.15525 -2.8584903,0.151114 -1.3079955,-0.0022 -2.4352973,-0.01502 -2.5051148,-0.02858 z M 11.996804,15.945316 16.50052,11.441502 14.717731,9.6587471 12.934939,7.8759937 8.4312074,12.380075 3.9274728,16.884158 v 1.782486 1.782485 h 1.7828069 1.7828061 z m 8.26921,-8.39346 c 0.206711,-0.4242223 0.208018,-0.8218703 0.0042,-1.25757 C 20.176538,6.0942063 20.060565,5.9650383 19.23684,5.1433962 18.435197,4.3437796 18.278811,4.2032929 18.087199,4.110648 17.644565,3.8966301 17.264303,3.8966667 16.82477,4.1107825 c -0.194106,0.094549 -0.373998,0.2593465 -1.441561,1.3205802 -0.67088,0.6669018 -1.219782,1.2286992 -1.219782,1.248439 0,0.019743 0.794564,0.8308951 1.7657,1.8025684 l 1.765695,1.7666789 1.231575,-1.2377009 c 1.0795,-1.0848907 1.244912,-1.2650995 1.339637,-1.4594937 z" />
</svg>

);

const ReloadIcon = () => (
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
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
        <path d="M8 16H3v5" />
    </svg>
);

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

function AdminButton({ route }) {
    function onClick() {
        const API_ROUTE = import.meta.env.VITE_APP_ROUTE_API
        window.open(`${API_ROUTE}/admin/${route}`, '_blank');
    }

    return (
        <button
            className="cursor-pointer hover:brightness-90 fixed bottom-20 right-5 w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center opacity-70 z-50"
            title="Editar torneio"
            onClick={onClick}
        >
            <PencilIcon />
        </button>
    )
}

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
    PencilIcon,
    ReloadButton,
    ShareLinkButton,
    StatusIcon,
    ToggleTheme,
};