import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { SpeedInsights } from "@vercel/speed-insights/next"
import League from './League';
import LeagueRanking from './League/Ranking';
import Main from './Main';
import Tournament from './Tournament';
import TournamentV2 from './TournamentV2';
import TournamentV2Ranking from './TournamentV2/Ranking';
import NotFound from './NotFound';


const App = () => {
  return (
    <React.Fragment>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/torneio/:tournamentId" element={<Tournament />} />
          <Route path="/torneio-v2/:tournamentId" element={<TournamentV2 />} />
          <Route path="/torneio-v2/:rankingId/ranking" element={<TournamentV2Ranking />} />
          <Route path="/rei-rainha/:tournamentId" element={<League />} />
          <Route path="/rei-rainha/:rankingId/ranking" element={<LeagueRanking />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      <SpeedInsights />
    </React.Fragment>
  );
};

export default App;
