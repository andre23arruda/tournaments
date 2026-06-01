import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Checkout from './Checkout';
import FutevoleiTournament from './Futevolei';
import League from './League';
import LeagueRanking from './League/Ranking';
import LeagueRegister from './League/Register';
import Login from './Login';
import Main from './Main';
import NotFound from './NotFound';
import Tournament from './Tournament';
import TournamentRanking from './Tournament/Ranking';
import TournamentRegister from './Tournament/Register';
import TournamentV1 from './TournamentV1';


const App = () => {
  return (
    <React.Fragment>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/contratar" element={<Checkout />} />
          <Route path="/futevolei/:tournamentId" element={<FutevoleiTournament />} />
          <Route path="/login" element={<Login />} />
          <Route path="/torneio/:tournamentId" element={<Tournament />} />
          <Route path="/torneio/:tournamentId/inscricao" element={<TournamentRegister />} />
          <Route path="/torneio/:rankingId/ranking" element={<TournamentRanking />} />
          <Route path="/torneio-v1/:tournamentId" element={<TournamentV1 />} />
          <Route path="/rei-rainha/:tournamentId" element={<League />} />
          <Route path="/rei-rainha/:tournamentId/inscricao" element={<LeagueRegister />} />
          <Route path="/rei-rainha/:rankingId/ranking" element={<LeagueRanking />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
