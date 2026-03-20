import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast';
import classNames from 'classnames';
import {
  AdminButton,
  Footer,
  Loading,
  LogoHeader,
  ReloadButton,
  ShareLinkButton,
  ToggleTheme
} from '../Components';
import { formatDate } from '../utils';

function renderPoints(jogo, dupla) {
  if (jogo.help_text.includes('BYE')) {
    return '-';
  } 
  return jogo[dupla] || jogo[dupla] === 0 ? jogo[dupla] : '-'
}

export default function FutevoleiTournament() {
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

  const formatTeamNameHelp = (dupla, jogo, index) => {
    if (jogo.dupla1 === null && jogo.dupla2 === null) {
      const help_text = jogo.help_text
      if (help_text) {
        return help_text.split('x')[index]
      } else {
        return 'A definir'
      }
    }
    return (dupla || 'A definir').replace('<br/>', '\n');
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

  const { torneio, jogos, can_edit, card_style } = tournamentData;

  const playoffClass = classNames({
    'w-1/2 flex flex-col justify-center items-center gap-4 p-2': true,
    'md:w-1/3': card_style === '1/3',
    'md:w-1/4': card_style === '1/4',
    'md:w-1/5': card_style === '1/5',
    'md:w-1/6': card_style === '1/6',
  })

  return (
    <div className={`min-h-screen  ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>

      {can_edit && (
        <AdminButton route={`cup/torneio/${torneio.id}/change/#jogos-tab`} />
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
          {Object.keys(jogos).length > 0 && (
            <div>
              <div className="flex flex-wrap items-center justify-center">
                {Object.entries(jogos).map(([faseNome, jogos]) => (
                  <div className={playoffClass} key={faseNome}>
                    <h5 className="text-center font-semibold opacity-0">{faseNome}</h5>

                    {jogos.map((jogo) => (
                      <div key={jogo.id} className={`rounded-lg shadow p-3 w-full ${darkMode ? 'bg-gray-700' : 'bg-white border border-gray-300'} ${jogo.concluido === 'A' ? 'border-2 animate-border' : ''}`}>
                        <div style={{transform: 'translateY(-1.3rem)', height: '0', textAlign: 'center', fontSize: '.75rem'}}>Jogo {jogo.playoff_number}</div>
                        {jogo.obs && <div onClick={() => handleScoreClick(jogo.obs)} className="text-center cursor-pointer hover:transform hover:scale-110">ℹ️</div>}

                        <div className="flex justify-between items-center py-1 border-b border-gray-300">
                          <span className={getWinnerClass(
                            jogo.concluido === 'C' && jogo.pontos_dupla1 > jogo.pontos_dupla2,
                            jogo.concluido === 'C' && jogo.pontos_dupla1 < jogo.pontos_dupla2
                          )}>
                            {jogo.dupla1 ? formatTeamName(jogo.dupla1).split('\n').map((line, i) => (
                              <div key={i}>{line}</div>
                            )) : <span className="text-gray-500">{formatTeamNameHelp(jogo.dupla1, jogo, 0)}</span>}
                          </span>
                          <span className="font-bold">{renderPoints(jogo, 'pontos_dupla1')}</span>
                        </div>

                        <div className="flex justify-between items-center py-1">
                          <span className={getWinnerClass(
                            jogo.concluido === 'C' && jogo.pontos_dupla2 > jogo.pontos_dupla1,
                            jogo.concluido === 'C' && jogo.pontos_dupla2 < jogo.pontos_dupla1
                          )}>
                            {jogo.dupla2 ? formatTeamName(jogo.dupla2).split('\n').map((line, i) => (
                              <div key={i}>{line}</div>
                            )) : <span className="text-gray-500">{formatTeamNameHelp(jogo.dupla2, jogo, 1)}</span>}
                          </span>
                          <span className="font-bold">{renderPoints(jogo, 'pontos_dupla2')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <Footer />
      </div >
    </div >
  );
};
