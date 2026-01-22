import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import League from './League';
import LeagueRanking from './League/Ranking';
import LeagueRegister from './League/Register';
import Login from './Login';
import Main from './Main';
import TournamentV1 from './TournamentV1';
import Tournament from './Tournament';
import TournamentRanking from './Tournament/Ranking';
import TournamentRegister from './Tournament/Register';
import NotFound from './NotFound';


const App = () => {
  return (
    <React.Fragment>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/torneio-v1/:tournamentId" element={<TournamentV1 />} />
          <Route path="/torneio/:tournamentId" element={<Tournament />} />
          <Route path="/torneio/:tournamentId/inscricao" element={<TournamentRegister />} />
          <Route path="/torneio/:rankingId/ranking" element={<TournamentRanking />} />
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
