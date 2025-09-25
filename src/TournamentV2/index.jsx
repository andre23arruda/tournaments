import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom'
import classNames from 'classnames';
import {
  AdminButton,
  Footer,
  Loading,
  ReloadButton,
  ShareLinkButton,
  StatusIcon,
  ToggleTheme
} from '../Components';
import { formatDate } from '../utils';

function renderTeam(torneio, number = '') {
  const teamType = torneio.tipo === 'S' ? 'Jogador' : 'Dupla'
  return teamType + ' ' + number
}

export default function Tournament() {
  const [darkMode, setDarkMode] = useState(false);
  const { tournamentId } = useParams();
  const [tournamentData, setTournamentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const scrollPositionRef = useRef(0);

  async function loadData() {
    scrollPositionRef.current = window.pageYOffset;
    setIsLoading(true);
    const API_ROUTE = import.meta.env.VITE_APP_ROUTE_API
    const resp = await fetch(`${API_ROUTE}/torneio-v2/${tournamentId}/json`)
    if (!resp.ok) {
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

  const formatTeamName = (dupla) => {
    return dupla.replace('<br/>', '\n');
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
        Erro ao carregar o torneio. Verifique se o ID do torneio está correto.
      </Loading>
    );
  }

  const { torneio, grupos, fases_finais, groups_finished, can_edit, card_style } = tournamentData;

  const playoffClass = classNames({
    'w-1/2 flex flex-col justify-center items-center gap-4 p-2': true,
    'md:w-1/3': card_style === '1/3',
    'md:w-1/4': card_style === '1/4',
  })

  return (
    <div className={`min-h-screen  ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>

      {can_edit && (
        <AdminButton darkMode={darkMode} />
      )}

      {torneio.ativo && (
        <>
          <ReloadButton loadData={loadData} />
          <ShareLinkButton darkMode={darkMode} />
          <ToggleTheme darkMode={darkMode} toggleTheme={toggleTheme} />
        </>
      )}


      <div className="max-w-8xl container mx-auto px-4 min-h-screen flex flex-col justify-between">
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
                <h3 className="text-2xl font-bold text-blue-600">
                  Em andamento
                </h3>
              ) : (
                <h3 className="text-2xl font-bold text-green-600">
                  Finalizado
                </h3>
              )}
            </div>

            <div className={`rounded-lg shadow p-6 text-center ${darkMode ? 'bg-gray-700' : 'bg-white border border-gray-300'}`}>
              <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {torneio.duplas}
              </h3>

              <p className="text-gray-600 dark:text-gray-400">Duplas</p>
            </div>

            <div className={`rounded-lg shadow p-6 text-center ${darkMode ? 'bg-gray-700' : 'bg-white border border-gray-300'}`}>
              <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {Object.keys(grupos).length}
              </h3>

              <p className="text-gray-600 dark:text-gray-400">Grupos</p>
            </div>

            <div className={`rounded-lg shadow p-6 text-center ${darkMode ? 'bg-gray-700' : 'bg-white border border-gray-300'}`}>
              <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
                {torneio.jogos}
              </h3>

              <p className="text-gray-600 dark:text-gray-400">Jogos</p>
            </div>
          </div>

          {/* Groups Section */}
          <div>
            {Object.keys(fases_finais).length > 0 && (
              <h3 className="text-center text-2xl mb-6">Grupos e Classificação</h3>
            )}

            {Object.entries(grupos).map(([grupoNome, grupoData]) => (
              <div key={grupoNome} className="mb-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Games */}
                  <div>
                    <div className={`rounded-lg shadow ${darkMode ? 'bg-gray-700' : 'bg-white border border-gray-300'}`}>
                      <h5 className={`text-center py-3 px-4 rounded-t-lg font-semibold ${darkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
                        {Object.keys(grupos).length > 1 ? `${grupoNome} - Jogos` : 'Jogos'}
                      </h5>

                      <div className="p-4">
                        <div className="overflow-x-auto">
                          <table className="w-full text-center">
                            <thead>
                              <tr className={darkMode ? 'bg-gray-600' : 'bg-gray-100'}>
                                <th className="py-2 px-3 border border-gray-300">{renderTeam(torneio, 1)}</th>
                                <th className="py-2 px-3 border border-gray-300">Placar</th>
                                <th className="py-2 px-3 border border-gray-300">{renderTeam(torneio, 2)}</th>
                                <th className="py-2 px-5 md:px-3 border border-gray-300" />
                              </tr>
                            </thead>

                            <tbody>
                              {grupoData.jogos.map((jogo, index) => (
                                <tr key={jogo.id} className={index % 2 === 0 ? (darkMode ? 'bg-gray-600' : 'bg-gray-50') : ''}>
                                  <td className={`py-2 px-3 border border-gray-300`}>
                                    {formatTeamName(jogo.dupla1).split('\n').map((line, i) => (
                                      <div className={`${getWinnerClass(
                                        jogo.concluido === 'C' && jogo.placar_dupla1 > jogo.placar_dupla2,
                                        jogo.concluido === 'C' && jogo.placar_dupla1 < jogo.placar_dupla2
                                      )}`} key={i}>{line}</div>
                                    ))}
                                  </td>
                                  <td className="py-2 px-3 border border-gray-300">
                                    {jogo.placar_dupla1 || jogo.placar_dupla1 === 0 ? jogo.placar_dupla1 : ''} X {jogo.placar_dupla2 || jogo.placar_dupla2 === 0 ? jogo.placar_dupla2 : ''}
                                  </td>
                                  <td className={`py-2 px-3 border border-gray-300`}>
                                    {formatTeamName(jogo.dupla2).split('\n').map((line, i) => (
                                      <div className={`${getWinnerClass(
                                        jogo.concluido === 'C' && jogo.placar_dupla2 > jogo.placar_dupla1,
                                        jogo.concluido === 'C' && jogo.placar_dupla2 < jogo.placar_dupla1
                                      )}`} key={i}>{line}</div>
                                    ))}
                                  </td>
                                  <td className="border border-gray-300">
                                    <span className={`flex items-center justify-center`}>
                                      <StatusIcon status={jogo.concluido} />
                                    </span>
                                  </td>
                                </tr>
                              ))}
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
                        {Object.keys(grupos).length > 1 ? `${grupoNome} - Classificação` : 'Classificação'}
                      </h5>

                      <div className="p-4">
                        <div className="overflow-x-auto">
                          <table className="w-full text-center">
                            <thead>
                              <tr className={darkMode ? 'bg-gray-600' : 'bg-gray-100'}>
                                <th className="py-2 px-3 border border-gray-300">#</th>
                                <th className="py-2 px-3 border border-gray-300">{renderTeam(torneio)}</th>
                                <th className="py-2 px-3 border border-gray-300">V</th>
                                <th className="py-2 px-3 border border-gray-300">S</th>
                                <th className="py-2 px-3 border border-gray-300">P</th>
                                <th className="py-2 px-3 border border-gray-300">J</th>
                              </tr>
                            </thead>

                            <tbody>
                              {grupoData.classificacao.map((dupla, index) => (
                                <tr key={index} className={index % 2 === 0 ? (darkMode ? 'bg-gray-600' : 'bg-gray-50') : ''}>
                                  <td className={`py-2 px-3 border border-gray-300 ${groups_finished && dupla.posicao < 3 ? 'bg-green-300 border-green-500 font-bold text-black' : ''}`}>
                                    {dupla.posicao}
                                  </td>
                                  <td className={`py-2 px-3 border border-gray-300 ${groups_finished && dupla.posicao < 3 ? 'bg-green-300 border-green-500 font-bold text-black' : ''}`}>
                                    {formatTeamName(dupla.dupla).split('\n').map((line, i) => (
                                      <div key={i}>{line}</div>
                                    ))}
                                  </td>
                                  <td className={`py-2 px-3 border border-gray-300 ${groups_finished && dupla.posicao < 3 ? 'bg-green-300 border-green-500 font-bold text-black' : ''}`}>
                                    {dupla.vitorias}
                                  </td>
                                  <td className={`py-2 px-3 border border-gray-300 ${groups_finished && dupla.posicao < 3 ? 'bg-green-300 border-green-500 font-bold text-black' : ''}`}>
                                    {dupla.saldo}
                                  </td>
                                  <td className={`py-2 px-3 border border-gray-300 ${groups_finished && dupla.posicao < 3 ? 'bg-green-300 border-green-500 font-bold text-black' : ''}`}>
                                    {dupla.pontos}
                                  </td>
                                  <td className={`py-2 px-3 border border-gray-300 ${groups_finished && dupla.posicao < 3 ? 'bg-green-300 border-green-500 font-bold text-black' : ''}`}>
                                    {dupla.jogos}
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
            ))}
          </div>

          {/* Playoffs Section */}
          {Object.keys(fases_finais).length > 0 && (
            <>
              <hr className="my-8" />
              <div>
                <h3 className="text-center text-2xl mb-6">Playoffs</h3>
                <div className="flex flex-wrap items-center justify-center">
                  {/* Oitavas */}
                  {fases_finais.OITAVAS && (
                    <div className={playoffClass}>
                      <h5 className="text-center font-semibold">Oitavas de Final</h5>
                      {fases_finais.OITAVAS.map((jogo) => (
                        <div key={jogo.id} className={`rounded-lg shadow p-3 w-full ${darkMode ? 'bg-gray-700' : 'bg-white border border-gray-300'} ${jogo.concluido === 'A' ? 'border-2 animate-border' : ''}`}>
                          <div className="flex justify-between items-center py-1 border-b border-gray-300">
                            <span className={getWinnerClass(
                              jogo.concluido === 'C' && jogo.placar_dupla1 > jogo.placar_dupla2,
                              jogo.concluido === 'C' && jogo.placar_dupla1 < jogo.placar_dupla2
                            )}>
                              {jogo.dupla1 ? formatTeamName(jogo.dupla1).split('\n').map((line, i) => (
                                <div key={i}>{line}</div>
                              )) : <span className="text-gray-500">A definir</span>}
                            </span>
                            <span className="font-bold">{jogo.placar_dupla1 || jogo.placar_dupla1 === 0 ? jogo.placar_dupla1 : '-'}</span>
                          </div>
                          <div className="flex justify-between items-center py-1">
                            <span className={getWinnerClass(
                              jogo.concluido === 'C' && jogo.placar_dupla2 > jogo.placar_dupla1,
                              jogo.concluido === 'C' && jogo.placar_dupla2 < jogo.placar_dupla1
                            )}>
                              {jogo.dupla2 ? formatTeamName(jogo.dupla2).split('\n').map((line, i) => (
                                <div key={i}>{line}</div>
                              )) : <span className="text-gray-500">A definir</span>}
                            </span>
                            <span className="font-bold">{jogo.placar_dupla2 || jogo.placar_dupla2 === 0 ? jogo.placar_dupla2 : '-'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Quartas */}
                  {fases_finais.QUARTAS && (
                    <div className={playoffClass}>
                      <h5 className="text-center font-semibold">Quartas de Final</h5>
                      {fases_finais.QUARTAS.map((jogo) => (
                        <div key={jogo.id} className={`rounded-lg shadow p-3 w-full ${darkMode ? 'bg-gray-700' : 'bg-white border border-gray-300'} ${jogo.concluido === 'A' ? 'border-2 animate-border' : ''}`}>
                          <div className="flex justify-between items-center py-1 border-b border-gray-300">
                            <span className={getWinnerClass(
                              jogo.concluido === 'C' && jogo.placar_dupla1 > jogo.placar_dupla2,
                              jogo.concluido === 'C' && jogo.placar_dupla1 < jogo.placar_dupla2
                            )}>
                              {jogo.dupla1 ? formatTeamName(jogo.dupla1).split('\n').map((line, i) => (
                                <div key={i}>{line}</div>
                              )) : <span className="text-gray-500">A definir</span>}
                            </span>
                            <span className="font-bold">{jogo.placar_dupla1 || jogo.placar_dupla1 === 0 ? jogo.placar_dupla1 : '-'}</span>
                          </div>
                          <div className="flex justify-between items-center py-1">
                            <span className={getWinnerClass(
                              jogo.concluido === 'C' && jogo.placar_dupla2 > jogo.placar_dupla1,
                              jogo.concluido === 'C' && jogo.placar_dupla2 < jogo.placar_dupla1
                            )}>
                              {jogo.dupla2 ? formatTeamName(jogo.dupla2).split('\n').map((line, i) => (
                                <div key={i}>{line}</div>
                              )) : <span className="text-gray-500">A definir</span>}
                            </span>
                            <span className="font-bold">{jogo.placar_dupla2 || jogo.placar_dupla2 === 0 ? jogo.placar_dupla2 : '-'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Semifinals */}
                  {fases_finais.SEMIFINAIS && (
                    <div className={playoffClass}>
                      <h5 className="text-center font-semibold">Semifinal</h5>
                      {fases_finais.SEMIFINAIS.map((jogo) => (
                        <div
                          key={jogo.id}
                          className={`rounded-lg shadow p-3 w-full ${darkMode ? 'bg-gray-700' : 'bg-white border border-gray-300'} ${jogo.concluido === 'A' ? 'border-2 animate-border' : ''}`}
                        >
                          <div className="flex justify-between items-center py-1 border-b border-gray-300">
                            <span className={getWinnerClass(
                              jogo.concluido === 'C' && jogo.placar_dupla1 > jogo.placar_dupla2,
                              jogo.concluido === 'C' && jogo.placar_dupla1 < jogo.placar_dupla2
                            )}>
                              {jogo.dupla1 ? formatTeamName(jogo.dupla1).split('\n').map((line, i) => (
                                <div key={i}>{line}</div>
                              )) : <span className="text-gray-500">A definir</span>}
                            </span>
                            <span className="font-bold">{jogo.placar_dupla1 || jogo.placar_dupla1 === 0 ? jogo.placar_dupla1 : '-'}</span>
                          </div>
                          <div className="flex justify-between items-center py-1">
                            <span className={getWinnerClass(
                              jogo.concluido === 'C' && jogo.placar_dupla2 > jogo.placar_dupla1,
                              jogo.concluido === 'C' && jogo.placar_dupla2 < jogo.placar_dupla1
                            )}>
                              {jogo.dupla2 ? formatTeamName(jogo.dupla2).split('\n').map((line, i) => (
                                <div key={i}>{line}</div>
                              )) : <span className="text-gray-500">A definir</span>}
                            </span>
                            <span className="font-bold">{jogo.placar_dupla2 || jogo.placar_dupla2 === 0 ? jogo.placar_dupla2 : '-'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Final */}
                  {fases_finais.FINAL && (
                    <div className={playoffClass}>
                      {fases_finais.FINAL.map((jogo) => (
                        <div className="w-full" key={jogo.id}>
                          <h5 className="text-center font-semibold">Final</h5>
                          <div key={jogo.id} className={`rounded-lg shadow p-3 w-full ${darkMode ? 'bg-gray-700' : 'bg-white border border-gray-300'} ${jogo.concluido === 'A' ? 'border-2 animate-border' : ''}`}>
                            <div className="flex justify-between items-center py-1 border-b border-gray-300">
                              <span className={getWinnerClass(
                                jogo.concluido === 'C' && jogo.placar_dupla1 > jogo.placar_dupla2,
                                jogo.concluido === 'C' && jogo.placar_dupla1 < jogo.placar_dupla2
                              )}>
                                {jogo.dupla1 ? formatTeamName(jogo.dupla1).split('\n').map((line, i) => (
                                  <div key={i}>{line}</div>
                                )) : <span className="text-gray-500">A definir</span>}
                              </span>
                              <span className="font-bold">{jogo.placar_dupla1 || jogo.placar_dupla1 === 0 ? jogo.placar_dupla1 : '-'}</span>
                            </div>
                            <div className="flex justify-between items-center py-1">
                              <span className={getWinnerClass(
                                jogo.concluido === 'C' && jogo.placar_dupla2 > jogo.placar_dupla1,
                                jogo.concluido === 'C' && jogo.placar_dupla2 < jogo.placar_dupla1
                              )}>
                                {jogo.dupla2 ? formatTeamName(jogo.dupla2).split('\n').map((line, i) => (
                                  <div key={i}>{line}</div>
                                )) : <span className="text-gray-500">A definir</span>}
                              </span>
                              <span className="font-bold">{jogo.placar_dupla2 || jogo.placar_dupla2 === 0 ? jogo.placar_dupla2 : '-'}</span>
                            </div>
                          </div>
                        </div>
                      ))}

                      {fases_finais['TERCEIRO LUGAR']?.map((jogo) => (
                        <div className="w-full" key={jogo.id}>
                          <h5 className="text-center font-semibold">Terceiro lugar</h5>
                          <div key={jogo.id} className={`rounded-lg shadow p-3 w-full ${darkMode ? 'bg-gray-700' : 'bg-white border border-gray-300'} ${jogo.concluido === 'A' ? 'border-2 animate-border' : ''}`}>
                            <div className="flex justify-between items-center py-1 border-b border-gray-300">
                              <span className={getWinnerClass(
                                jogo.concluido === 'C' && jogo.placar_dupla1 > jogo.placar_dupla2,
                                jogo.concluido === 'C' && jogo.placar_dupla1 < jogo.placar_dupla2
                              )}>
                                {jogo.dupla1 ? formatTeamName(jogo.dupla1).split('\n').map((line, i) => (
                                  <div key={i}>{line}</div>
                                )) : <span className="text-gray-500">A definir</span>}
                              </span>
                              <span className="font-bold">{jogo.placar_dupla1 || jogo.placar_dupla1 === 0 ? jogo.placar_dupla1 : '-'}</span>
                            </div>
                            <div className="flex justify-between items-center py-1">
                              <span className={getWinnerClass(
                                jogo.concluido === 'C' && jogo.placar_dupla2 > jogo.placar_dupla1,
                                jogo.concluido === 'C' && jogo.placar_dupla2 < jogo.placar_dupla1
                              )}>
                                {jogo.dupla2 ? formatTeamName(jogo.dupla2).split('\n').map((line, i) => (
                                  <div key={i}>{line}</div>
                                )) : <span className="text-gray-500">A definir</span>}
                              </span>
                              <span className="font-bold">{jogo.placar_dupla2 || jogo.placar_dupla2 === 0 ? jogo.placar_dupla2 : '-'}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <Footer />
      </div >
    </div >
  );
};
