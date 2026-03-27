import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast';
import {
  AdminButton,
  Footer,
  Loading,
  LogoHeader,
  ReloadButton,
  ShareLinkButton,
  StatusIcon,
  ToggleTheme
} from '../Components';
import { formatDate } from '../utils';

export default function League() {
  const [darkMode, setDarkMode] = useState(false);
  const { tournamentId } = useParams();
  const [tournamentData, setTournamentData] = useState(null);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const scrollPositionRef = useRef(0);

  async function loadData() {
    scrollPositionRef.current = window.pageYOffset;
    setIsLoading(true);
    const API_ROUTE = import.meta.env.VITE_APP_ROUTE_API
    const resp = await fetch(`${API_ROUTE}/rei-rainha/${tournamentId}/json`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!resp.ok) {
      toast.error('Erro ao carregar os dados do torneio!')
      console.error('Erro ao carregar os dados do torneio:', resp.statusText);
      setError(true);
      setIsLoading(false);
      return;
    }
    const data = await resp.json()
    setTournamentData(data);
    document.title = `${data.torneio.nome} (${formatDate(data.torneio.data)})`;
    setIsLoading(false);

    setTimeout(() => {
      window.scrollTo({ top: scrollPositionRef.current, behavior: 'smooth' });
    }, 100)
  }

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tournamentId])

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(savedDarkMode);
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode)
  };

  const cleanTeam = (dupla) => {
    return dupla.replace(/<br\/>/g, '\n').replace(/<span>/g, '').replace(/<\/span>/g, '')
  }

  const renderTeam = (duplaStr) => {
    if (!duplaStr) return null;
    const cleanStr = duplaStr.replace(/<\/?span>/g, '');
    const names = cleanStr.split('<br/>');
    
    return names.map((name, index) => (
      <div key={index}>
        {name}{index === 0 && names.length > 1 ? ' &' : ''}
      </div>
    ));
  };

  const formatTeamName = (dupla) => {
    if (!dupla) return '';
    const result = cleanTeam(dupla);
    return result;
  };

  const filterGames = (games, searchTerm) => {
    if (!searchTerm) return games;

    return games.filter(jogo => {
      const dupla1 = cleanTeam(jogo.dupla1).toLowerCase();
      const dupla2 = cleanTeam(jogo.dupla2).toLowerCase();
      const searchLower = searchTerm.toLowerCase();

      return dupla1.includes(searchLower) || dupla2.includes(searchLower);
    });
  };

  const getWinnerClass = (isWinner, isLoser) => {
    if (isWinner) return 'font-bold text-green-600';
    if (isLoser) return 'text-red-500';
    return '';
  };

  if (isLoading) {
    return (
      <Loading
        darkMode={darkMode}
        pageTitle="Carregando torneio..."
      >
        Carregando torneio...
      </Loading>
    );
  } else if (error) {
    return (
      <Loading
        darkMode={darkMode}
        pageTitle="Erro ao carregar o torneio!"
      >
        <p className="text-center">
          Erro ao carregar o torneio.
          <br />
          Verifique se o ID do torneio está correto.
        </p>
      </Loading>
    );
  }

  const { torneio, jogos, ranking, estatisticas, can_edit } = tournamentData;
  const filteredJogos = filterGames(jogos, search);

  return (
    <div className={`min-h-screen  ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>

      {can_edit && (
        <AdminButton route={`bt_league/torneio/${torneio.id}/change/#jogos-tab`} />
      )}

      <ToggleTheme darkMode={darkMode} toggleTheme={toggleTheme} />

      {torneio.ativo && (
        <>
          <ReloadButton loadData={loadData} />
          <ShareLinkButton pageName={torneio.nome} />
        </>
      )}

      <div className="max-w-8xl container mx-auto px-4 min-h-screen flex flex-col justify-between">
        <LogoHeader darkMode={darkMode} />

        <div className="pt-20">
          {/* Title */}
          <h1 className="text-center text-3xl mb-2">
            {torneio.nome}
          </h1>

          <h2 className="text-center text-2xl mb-8">
            ({formatDate(torneio.data)})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className={`rounded-lg shadow p-6 flex flex-col justify-center items-center ${darkMode ? 'bg-gray-700' : 'bg-white border border-gray-300'}`}>
              {torneio.ativo ? (
                <h3 className="text-center text-2xl font-bold text-orange-400">
                  { torneio.nao_iniciado ? 'Não iniciado' : 'Em andamento' }
                </h3>
              ) : (
                <h3 className="text-center text-2xl font-bold text-green-600">
                  Finalizado
                </h3>
              )}
            </div>

            <div className={`rounded-lg shadow p-6 text-center ${darkMode ? 'bg-gray-700' : 'bg-white border border-gray-300'}`}>
              <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {ranking.length}
              </h3>

              <p className="text-gray-600 dark:text-gray-400">Jogadores</p>
            </div>

            <div className={`rounded-lg shadow p-6 text-center ${darkMode ? 'bg-gray-700' : 'bg-white border border-gray-300'}`}>
              <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
                {estatisticas.total_jogos}
              </h3>

              <p className="text-gray-600 dark:text-gray-400">Jogos</p>
            </div>

            <div className={`rounded-lg shadow p-6 text-center ${darkMode ? 'bg-gray-700' : 'bg-white border border-gray-300'}`}>
              <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {estatisticas.jogos_restantes}
              </h3>

              <p className="text-gray-600 dark:text-gray-400">Pendente</p>
            </div>
          </div>

          {/* Rules Accordion */}
          <div className={`mb-8 p-4 rounded-lg shadow ${darkMode ? 'bg-gray-700' : 'bg-white border border-gray-300'}`}>
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-lg">
                <span>Regras de classificação</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>

              <div className={`mt-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <p className="mb-2">Classificação de acordo com número de vitórias <strong>(V)</strong>, saldo <strong>(S)</strong> e pontos <strong>(P)</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  {torneio.regras.map((regraObj, index) => (
                    <li key={index}>{regraObj}</li>
                  ))}
                </ul>
              </div>
            </details>
          </div>

          {/* Games */}
          <div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className={`rounded-lg shadow ${darkMode ? 'bg-gray-700' : 'bg-white border border-gray-300'}`}>
                  <h5 className={`text-center py-3 px-4 rounded-t-lg font-semibold ${darkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
                    Jogos
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
                            <th className="py-2 px-4 border border-gray-300 " />
                            <th className="py-2 px-3 border border-gray-300 w-[30%]">Dupla 1</th>
                            <th className="py-2 px-3 border border-gray-300">Placar</th>
                            <th className="py-2 px-3 border border-gray-300 w-[30%]">Dupla 2</th>
                            <th className="py-2 px-4 border border-gray-300" />
                          </tr>
                        </thead>

                        <tbody>
                          {filteredJogos.length === 0 ? (
                            <tr>
                              <td colSpan="5" className={`py-6 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                Jogador não encontrado
                              </td>
                            </tr>
                          ) : (
                            filteredJogos.map((jogo, index) => (
                              <tr key={jogo.id} className={index % 2 === 0 ? (darkMode ? 'bg-gray-600' : 'bg-gray-50') : ''}>
                                <td className={`py-2 border border-gray-300`}>
                                  {jogo.quadra}
                                </td>

                                <td className={`py-2 px-3 border border-gray-300`}>
                                  <div className={`${getWinnerClass(
                                      jogo.concluido && jogo.placar_dupla1 > jogo.placar_dupla2,
                                      jogo.concluido && jogo.placar_dupla1 < jogo.placar_dupla2
                                    )}`}>
                                    {renderTeam(jogo.dupla1)}
                                  </div>
                                </td>

                                <td className="py-2 px-3 border border-gray-300">
                                  {jogo.placar_dupla1 || jogo.placar_dupla1 === 0 ? jogo.placar_dupla1 : ''}
                                  {' ✕ ' }
                                  {jogo.placar_dupla2 || jogo.placar_dupla2 === 0 ? jogo.placar_dupla2 : ''}
                                </td>

                                <td className={`py-2 px-3 border border-gray-300`}>
                                  <div className={`${getWinnerClass(
                                      jogo.concluido && jogo.placar_dupla2 > jogo.placar_dupla1,
                                      jogo.concluido && jogo.placar_dupla2 < jogo.placar_dupla1
                                    )}`}>
                                    {renderTeam(jogo.dupla2)}
                                  </div>
                                </td>
                                
                                <td className="border border-gray-300">
                                  <span className={`flex items-center justify-center`}>
                                    <StatusIcon status={jogo.concluido} />
                                  </span>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Classification */}
              <div>
                <div className={`rounded-lg shadow ${darkMode ? 'bg-gray-700' : 'bg-white border border-gray-300'}`}>
                  <h5 className={`text-center py-3 px-4 rounded-t-lg font-semibold ${darkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
                    Classificação
                  </h5>
                  <div className="p-4">
                    <div className="overflow-x-auto">
                      <table className="w-full text-center">
                        <thead>
                          <tr className={darkMode ? 'bg-gray-600' : 'bg-gray-100'}>
                            <th className="py-2 px-3 border border-gray-300">#</th>
                            <th className="py-2 px-3 border border-gray-300">Jogador</th>
                            <th className="py-2 px-3 border border-gray-300">V</th>
                            <th className="py-2 px-3 border border-gray-300">S</th>
                            <th className="py-2 px-3 border border-gray-300">P</th>
                            <th className="py-2 px-3 border border-gray-300">J</th>
                          </tr>
                        </thead>

                        <tbody>
                          {ranking.map((jogador, index) => (
                            <tr key={index} className={index % 2 === 0 ? (darkMode ? 'bg-gray-600' : 'bg-gray-50') : ''}>
                              <td className={`py-2 px-3 border border-gray-300`}>
                                {jogador.posicao}
                                {!torneio.ativo ? (
                                  <>
                                    {jogador.posicao === 1 && '🥇'}
                                    {jogador.posicao === 2 && '🥈'}
                                    {jogador.posicao === 3 && '🥉'}
                                  </>
                                ) : null}
                              </td>
                              <td className={`py-2 px-3 border border-gray-300`}>
                                {jogador.jogador}
                              </td>
                              <td className={`py-2 px-3 border border-gray-300`}>
                                {jogador.vitorias}
                              </td>
                              <td className={`py-2 px-3 border border-gray-300`}>
                                {jogador.saldo}
                              </td>
                              <td className={`py-2 px-3 border border-gray-300`}>
                                {jogador.pontos}
                              </td>
                              <td className={`py-2 px-3 border border-gray-300`}>
                                {jogador.jogos}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};
