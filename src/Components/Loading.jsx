export default function Loading({ children, darkMode, pageTitle }) {
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