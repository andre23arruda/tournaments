import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast';
import {
    Footer,
    Loading,
    ShareLinkButton,
    ToggleTheme
} from '../Components';
import { formatDate } from '../utils';

export default function LeagueRanking() {
    const [darkMode, setDarkMode] = useState(false);
    const { rankingId } = useParams();
    const [rankingData, setRankingData] = useState(null);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    async function loadData() {
        setIsLoading(true);
        const API_ROUTE = import.meta.env.VITE_APP_ROUTE_API
        const resp = await fetch(`${API_ROUTE}/rei-rainha/ranking/${rankingId}/json`)
        if (!resp.ok) {
            toast.error('Erro ao carregar os dados do ranking!')
            console.error('Erro ao carregar os dados do ranking:', resp.statusText);
            setError(true);
            setIsLoading(false);
            return;
        }
        const data = await resp.json()
        setRankingData(data);
        document.title = `Ranking: ${data.ranking.nome}`;
        setIsLoading(false);
    }

    function handleSearch(event) {
        setSearch(event.target.value);
    }

    useEffect(() => {
        loadData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rankingId])

    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode') === 'true'
        setDarkMode(savedDarkMode);
    }, []);

    const toggleTheme = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode)
    };

    const filterPlayers = (players, searchTerm) => {
        if (!searchTerm) return players;

        return players.filter(jogador => {
            const nome = jogador.nome.toLowerCase();
            const searchLower = searchTerm.toLowerCase();
            return nome.includes(searchLower);
        });
    };

    const getRankingColor = (posicao) => {
        if (posicao === 1) return 'text-yellow-500 font-bold'; // Ouro
        if (posicao === 2) return 'text-gray-400 font-bold';   // Prata
        if (posicao === 3) return 'text-orange-400 font-bold'; // Bronze
        return '';
    };

    if (isLoading) {
        return (
            <Loading
                darkMode={darkMode}
                pageTitle="Carregando ranking..."
            >
                Carregando ranking...
            </Loading>
        );
    } else if (error) {
        return (
            <Loading
                darkMode={darkMode}
                pageTitle="Erro ao carregar o ranking!"
            >
                <p className="text-center">
                    Erro ao carregar o ranking.
                    <br />
                    Verifique se o ID do ranking está correto.
                </p>
            </Loading>
        );
    }

    const { ranking, estatisticas, jogadores } = rankingData;

    return (
        <div className={`min-h-screen  ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <ShareLinkButton pageName={ranking.nome} />

            <ToggleTheme darkMode={darkMode} toggleTheme={toggleTheme} />

            <div className="max-w-8xl container mx-auto px-4 min-h-screen flex flex-col justify-between">
                <div className="pt-20">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold mb-2">{ranking.nome}</h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className={`rounded-lg shadow p-6 text-center ${darkMode ? 'bg-gray-700' : 'bg-white border border-gray-300'}`}>
                            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {estatisticas.num_torneios}
                            </h3>

                            <p className="text-gray-600 dark:text-gray-400">Torneios</p>
                        </div>

                        <div className={`rounded-lg shadow p-6 text-center ${darkMode ? 'bg-gray-700' : 'bg-white border border-gray-300'}`}>
                            <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {estatisticas.num_jogadores}
                            </h3>

                            <p className="text-gray-600 dark:text-gray-400">Jogadores</p>
                        </div>

                        <div className={`rounded-lg shadow p-6 text-center ${darkMode ? 'bg-gray-700' : 'bg-white border border-gray-300'}`}>
                            <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                {ranking.jogos}
                            </h3>

                            <p className="text-gray-600 dark:text-gray-400">Jogos</p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <div className={`rounded-lg shadow ${darkMode ? 'bg-gray-700' : 'bg-white border border-gray-300'}`}>
                                <h5 className={`text-center py-3 px-4 rounded-t-lg font-semibold ${darkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
                                    Classificação Geral
                                </h5>

                                <div className="p-4">
                                    <div className="overflow-x-auto">
                                        <input
                                            type="text"
                                            placeholder="Buscar jogador..."
                                            className="w-full mb-4 p-2 rounded border border-gray-300 focus:outline-sky-400 placeholder:text-gray-400"
                                            value={search}
                                            onChange={handleSearch}
                                        />

                                        <table className="w-full text-center">
                                            <thead>
                                                <tr className={darkMode ? 'bg-gray-600' : 'bg-gray-100'}>
                                                    <th className="py-2 px-3 border border-gray-300">#</th>
                                                    <th className="py-2 px-3 border border-gray-300">Jogador</th>
                                                    <th className="py-2 px-3 border border-gray-300">V</th>
                                                    <th className="py-2 px-3 border border-gray-300">D</th>
                                                    {/* <th className="py-2 px-3 border border-gray-300">%V</th> */}
                                                    <th className="py-2 px-3 border border-gray-300">S</th>
                                                    <th className="py-2 px-3 border border-gray-300">P</th>
                                                    <th className="py-2 px-3 border border-gray-300">J</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {filterPlayers(jogadores, search).map((jogador, index) => (
                                                    <tr key={jogador.id} className={index % 2 === 0 ? (darkMode ? 'bg-gray-600' : 'bg-gray-50') : ''}>
                                                        <td className={`py-2 px-3 border border-gray-300 ${getRankingColor(jogador.posicao)}`}>
                                                            {jogador.posicao}
                                                            {jogador.posicao <= 3 && (
                                                                <span className="ml-1">
                                                                    {jogador.posicao === 1 && '🥇'}
                                                                    {jogador.posicao === 2 && '🥈'}
                                                                    {jogador.posicao === 3 && '🥉'}
                                                                </span>
                                                            )}
                                                        </td>

                                                        <td className={`py-2 px-3 border border-gray-300 text-left font-medium`}>
                                                            <div>{jogador.nome}</div>
                                                            {/* <div className="text-xs text-gray-500 dark:text-gray-400">
                                                                {jogador.nome_curto}
                                                            </div> */}
                                                        </td>

                                                        <td className={`py-2 px-3 border border-gray-300 font-semibold text-green-600 dark:text-green-400`}>
                                                            {jogador.vitorias}
                                                        </td>

                                                        <td className={`py-2 px-3 border border-gray-300 font-semibold text-red-500 dark:text-red-400`}>
                                                            {jogador.derrotas}
                                                        </td>

                                                        <td className={`py-2 px-3 border border-gray-300 ${jogador.saldo_pontos >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                                                            {jogador.saldo_pontos > 0 ? '+' : ''}{jogador.saldo_pontos}
                                                        </td>

                                                        {/* <td className={`py-2 px-3 border border-gray-300`}>
                                                            {jogador.percentual_vitorias}%
                                                        </td> */}

                                                        <td className={`py-2 px-3 border border-gray-300`}>
                                                            {jogador.pontos_totais}
                                                        </td>

                                                        <td className={`py-2 px-3 border border-gray-300`}>
                                                            {jogador.jogos_total}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Torneios do Ranking */}
                        <div>
                            <div className={`rounded-lg shadow ${darkMode ? 'bg-gray-700' : 'bg-white border border-gray-300'}`}>
                                <h5 className={`text-center py-3 px-4 rounded-t-lg font-semibold ${darkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
                                    Torneios
                                </h5>

                                <div className="p-4">
                                    <div className="space-y-3">
                                        {estatisticas.torneios.map((torneio) => (
                                            <div key={torneio.id} className={`p-3 rounded border ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-gray-50 border-gray-200'}`}>
                                                <div className="flex items-center justify-between mb-1">
                                                    <h6 className="font-medium text-sm">{torneio.nome}</h6>

                                                    <span className={`text-xs px-2 py-1 rounded ${torneio.finalizado
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                                                        }`}>
                                                        {torneio.finalizado ? '✅ Finalizado' : '🎾 Em andamento'}
                                                    </span>
                                                </div>

                                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                                    <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                                                        <p>{formatDate(torneio.data)}</p>
                                                        <p>{torneio.jogadores} jogadores • {torneio.jogos} jogos</p>
                                                    </div>
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Top 3 destacado */}
                            {jogadores.length >= 3 && (
                                <div className={`rounded-lg shadow mt-6 ${darkMode ? 'bg-gray-700' : 'bg-white border border-gray-300'}`}>
                                    <h5 className={`text-center py-3 px-4 rounded-t-lg font-semibold ${darkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
                                        🏆 Pódio
                                    </h5>

                                    <div className="p-4 space-y-2">
                                        {jogadores.slice(0, 3).map((jogador, index) => (
                                            <div
                                                key={jogador.id}
                                                className={`flex items-center justify-between p-2 rounded ${index === 0 ? 'bg-yellow-100 dark:bg-yellow-200 text-yellow-900' :
                                                    index === 1 ? 'bg-gray-100 dark:bg-gray-200 text-gray-900' : 'bg-[#efdbb7] dark:bg-[#efdbb7] text-amber-900'
                                                    }`}
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-lg">
                                                        {index === 0 && '🥇'}
                                                        {index === 1 && '🥈'}
                                                        {index === 2 && '🥉'}
                                                    </span>

                                                    <div>
                                                        <div className="font-medium text-sm">
                                                            {jogador.nome_curto}
                                                        </div>

                                                        <div className="text-xs text-gray-600 dark:text-gray-400">
                                                            {jogador.vitorias} vitórias / {jogador.derrotas} derrotas
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm font-semibold">
                                                        {jogador.saldo_pontos > 0 ? '+' : ''}{jogador.saldo_pontos}
                                                    </div>

                                                    <div className="text-xs text-gray-600 dark:text-gray-400">
                                                        {jogador.percentual_vitorias}%
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
};