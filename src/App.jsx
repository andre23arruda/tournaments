import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import League from './League';
import LeagueRanking from './League/Ranking';
import Tournament from './Tournament';
import NotFound from './NotFound';


const App = () => {
  return (
    <React.Fragment>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />

      <BrowserRouter>
        <Routes>
          <Route path="/torneio/:tournamentId" element={<Tournament />} />
          <Route path="/rei-rainha/:tournamentId" element={<League />} />
          <Route path="/rei-rainha/:rankingId/ranking" element={<LeagueRanking />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
