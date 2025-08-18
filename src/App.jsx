import { BrowserRouter, Routes, Route } from 'react-router-dom';
import League from './League';
import Tournament from './Tournament';
import NotFound from './NotFound';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/torneio/:tournamentId" element={<Tournament />} />
        <Route path="/rei-rainha/:tournamentId" element={<League />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
