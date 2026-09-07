import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast';
import classNames from 'classnames';
import {Footer, Loading} from '../Components';
import TournamentHeader from '../Components/TournamentHeader';
import { useTheme } from '../ThemeContext';
import { formatDate } from '../utils';

function renderPoints(jogo, dupla) {
  if (jogo?.[dupla] !== null && jogo?.[dupla] !== undefined && jogo?.[dupla] !== '') {
    return jogo[dupla];
  }
  return '-';
}

export default function FutevoleiTournament() {
  const { darkMode } = useTheme();
  const { tournamentId } = useParams();
  const [tournamentData, setTournamentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const scrollPositionRef = useRef(0);

  async function loadData() {
    scrollPositionRef.current = window.pageYOffset;
    setIsLoading(true);
    const API_ROUTE = import.meta.env.VITE_APP_ROUTE_API
    const resp = await fetch(`${API_ROUTE}/futevolei/${tournamentId}/json`, {
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

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tournamentId])

  const isValidTeam = (team) => {
    if (team === null || team === undefined) return false;
    const str = String(team).trim();
    return str !== '' && str !== 'None' && str !== 'null' && str !== 'undefined';
  };

  const isPlaceholderTeam = (team) => {
    if (!team) return true;
    const str = String(team);
    return str.startsWith('Vencedor de ') || str.startsWith('Perdedor de ') || str === 'BYE' || str === 'A definir';
  };

  const formatTeamName = (dupla) => {
    if (dupla === null || dupla === undefined) return '';
    return String(dupla).replace(/<br\/>/g, '\n');
  };

  const formatTeamNameHelp = (dupla, jogo, index) => {
    if (jogo.dupla1 === null || jogo.dupla2 === null || jogo.dupla1 === undefined || jogo.dupla2 === undefined) {
      const help_text = jogo.help_text;
      if (help_text && typeof help_text === 'string') {
        return help_text.split('x')[index] || 'A definir';
      } else {
        return 'A definir';
      }
    }
    return String(dupla || 'A definir').replace(/<br\/>/g, '\n');
  };

  const renderTeamDisplay = (team, fallbackHelp) => {
    if (!isValidTeam(team)) {
      return <span className="text-gray-500 dark:text-gray-400 text-xs">{fallbackHelp}</span>;
    }
    const str = String(team);
    if (isPlaceholderTeam(str)) {
      return <span className="text-gray-500 dark:text-gray-400 text-xs italic">{str}</span>;
    }
    return formatTeamName(str).split('\n').map((line, i) => (
      <div key={i}>{line}</div>
    ));
  };

  const getWinnerClass = (isWinner, isLoser) => {
    if (isWinner) return 'font-bold text-green-600';
    if (isLoser) return 'text-red-500';
    return '';
  };

  const handleScoreClick = (obs) => {
    if (obs) {
      alert(obs);
    }
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

  const { torneio, template, jogos, can_edit, card_style } = tournamentData;
  const templateData = template || (!Array.isArray(jogos) && jogos ? { 'Jogos': jogos } : {});

  const jogosMap = {};
  if (Array.isArray(jogos)) {
    jogos.forEach((j) => {
      if (j && j.id !== undefined) {
        jogosMap[j.id] = j;
      }
    });
  }

  const playoffClass = classNames({
    'w-1/2 flex flex-col justify-center items-center gap-4 p-2': true,
    'md:w-1/3': card_style === '1/3',
    'md:w-1/4': card_style === '1/4',
    'md:w-1/5': card_style === '1/5',
    'md:w-1/6': card_style === '1/6',
  });

  const getSectionId = (chaveNome) => `chave-${String(chaveNome).toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

  const headerLinks = Object.keys(templateData).map((chaveNome) => ({
    to: getSectionId(chaveNome),
    label: chaveNome,
  }));

  return (
    <div className={`min-h-screen  ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <TournamentHeader loadData={loadData} links={headerLinks} />

      <div className="max-w-8xl container mx-auto px-4 min-h-screen flex flex-col justify-between">
        <div className="pt-10">
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
                {torneio.duplas}
              </h3>

              <p className="text-gray-600 dark:text-gray-400">
                {torneio.tipo === 'S' ? 'Jogadores' : 'Duplas'}
              </p>
            </div>

            <div className={`rounded-lg shadow p-6 text-center ${darkMode ? 'bg-gray-700' : 'bg-white border border-gray-300'}`}>
              <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
                {torneio.jogos}
              </h3>

              <p className="text-gray-600 dark:text-gray-400">Jogos</p>
            </div>

            <div className={`rounded-lg shadow p-6 text-center ${darkMode ? 'bg-gray-700' : 'bg-white border border-gray-300'}`}>
              <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {torneio.jogos_restantes}
              </h3>

              <p className="text-gray-600 dark:text-gray-400">Pendente</p>
            </div>
          </div>

          {/* GAMES */}
          {Object.keys(templateData).length > 0 && (
            <div className="space-y-12">
              {Object.entries(templateData).map(([chaveNome, fases]) => (
                <div key={chaveNome} id={getSectionId(chaveNome)} className="pt-4">
                  <hr className={`mb-8 ${darkMode ? 'border-gray-700' : 'border-gray-300'}`} />
                  <h3 className="text-center text-2xl font-bold mb-6 text-orange-500 dark:text-orange-400">
                    {chaveNome}
                  </h3>

                  <div className="flex flex-wrap items-center justify-center">
                    {Object.entries(fases || {}).map(([faseNome, rodadaData]) => {
                      const jogosList = Array.isArray(rodadaData)
                        ? rodadaData
                        : (rodadaData ? [rodadaData] : []);

                      return (
                        <div className={playoffClass} key={faseNome}>
                          <h5 className="text-center font-semibold mb-2">
                            {faseNome}
                          </h5>

                          {jogosList.map((templateJogo) => {
                            const realJogo = jogosMap[templateJogo.id];
                            const dupla1 = isValidTeam(realJogo?.dupla1) ? realJogo.dupla1 : templateJogo.dupla1;
                            const dupla2 = isValidTeam(realJogo?.dupla2) ? realJogo.dupla2 : templateJogo.dupla2;

                            const jogo = {
                              ...templateJogo,
                              ...realJogo,
                              referencia: templateJogo.referencia || realJogo?.referencia,
                              dupla1,
                              dupla2,
                            };

                            return (
                              <div
                                key={jogo.id}
                                className={`rounded-lg shadow p-3 w-full ${darkMode ? 'bg-gray-700' : 'bg-white border border-gray-300'} ${jogo.concluido === 'A' ? 'border-2 animate-border' : ''}`}
                              >
                                <div className="text-center text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                                  {jogo.referencia || (jogo.playoff_number ? `Jogo ${jogo.playoff_number}` : `Jogo ${jogo.id}`)}
                                </div>

                                {jogo.obs && (
                                  <div
                                    onClick={() => handleScoreClick(jogo.obs)}
                                    className="text-center cursor-pointer hover:transform hover:scale-110 mb-1"
                                  >
                                    ℹ️
                                  </div>
                                )}

                                <div className="flex justify-between items-center py-1 border-b border-gray-300 dark:border-gray-600 gap-2">
                                  <span className={`text-sm min-w-0 flex-1 ${getWinnerClass(
                                    jogo.concluido === 'C' && Number(jogo.pontos_dupla1) > Number(jogo.pontos_dupla2),
                                    jogo.concluido === 'C' && Number(jogo.pontos_dupla1) < Number(jogo.pontos_dupla2)
                                  )}`}>
                                    {renderTeamDisplay(jogo.dupla1, formatTeamNameHelp(jogo.dupla1, jogo, 0))}
                                  </span>
                                  <span className="font-bold text-sm shrink-0">{renderPoints(jogo, 'pontos_dupla1')}</span>
                                </div>

                                <div className="flex justify-between items-center py-1 gap-2">
                                  <span className={`text-sm min-w-0 flex-1 ${getWinnerClass(
                                    jogo.concluido === 'C' && Number(jogo.pontos_dupla2) > Number(jogo.pontos_dupla1),
                                    jogo.concluido === 'C' && Number(jogo.pontos_dupla2) < Number(jogo.pontos_dupla1)
                                  )}`}>
                                    {renderTeamDisplay(jogo.dupla2, formatTeamNameHelp(jogo.dupla2, jogo, 1))}
                                  </span>
                                  <span className="font-bold text-sm shrink-0">{renderPoints(jogo, 'pontos_dupla2')}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <Footer />
      </div >
    </div >
  );
};
