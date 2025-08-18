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

const ReloadIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 118.04 122.88" fill="white">
        <path d="M16.08,59.26A8,8,0,0,1,0,59.26a59,59,0,0,1,97.13-45V8a8,8,1,1,16.08,0V33.35a8,8,0,0,1-8,8L80.82,43.62a8,8,0,1,1-1.44-15.95l8-.73A43,43,0,0,0,16.08,59.26Zm22.77,19.6a8,8,0,0,1,1.44,16l-10.08.91A42.95,42.95,0,0,0,102,63.86a8,8,0,0,1,16.08,0A59,59,0,0,1,22.3,110v4.18a8,8,0,0,1-16.08,0V89.14h0a8,8,0,0,1,7.29-8l25.31-2.3Z" />
    </svg>
);

const AdminButton = ({ darkMode }) => (
    <div className="fixed top-5 left-5 z-50">
        <button className={`cursor-pointer hover:brightness-90 opacity-70 px-3 py-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`} title="Editar torneio">
            ✏️
        </button>
    </div>
)

const ReloadButton = ({ loadData }) => (
    <button
        className="cursor-pointer hover:brightness-90 fixed bottom-5 right-5 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center opacity-70 z-50"
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
                className={`cursor-pointer hover:brightness-90 w-10 h-10 rounded-full flex items-center justify-center opacity-70 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}
                title="Alternar modo escuro"
            >
                {darkMode ? '☀️' : '🌙'}
            </button>
        </div>
    )
}

export { AdminButton, CheckIcon, CircleIcon, Footer, ReloadButton, ToggleTheme };