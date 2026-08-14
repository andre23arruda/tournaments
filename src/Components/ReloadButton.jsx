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


const ReloadButton = ({ loadData }) => (
    <button
        className="cursor-pointer hover:brightness-90 fixed bottom-5 right-5 w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center opacity-70 z-50"
        title="Recarregar"
        onClick={loadData}
    >
        <ReloadIcon />
    </button>
)

export default ReloadButton
