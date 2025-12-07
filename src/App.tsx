import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './page/home';
import DestinyFinder from './page/destinyFinder';
import DestinyFinderList from './page/destinyFinderList';
import DestinyResult from './page/destinyResult';
import HeartRateMeasure from './page/heartRateMeasure';
import Compatibility from './page/compatibility';
import Result from './page/result';
import Propose from './page/propose';
import ProposeSuccess from './page/proposeSuccess';
import ProposeFail from './page/proposeFail';
import Ranking from './page/ranking';
import RankingDetail from './page/rankingDetail';
import { ProfilesProvider } from '@/contexts/UserContext';
import { AlertProvider } from '@/contexts/AlertContext';

const App: React.FC = () => {
  return (
    <ProfilesProvider>
      <AlertProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destiny-finder" element={<DestinyFinder />} />
            <Route
              path="/destiny-finder/list"
              element={<DestinyFinderList />}
            />
            <Route path="/destiny-result" element={<DestinyResult />} />
            <Route path="/heart-rate-measure" element={<HeartRateMeasure />} />
            <Route path="/compatibility" element={<Compatibility />} />
            <Route path="/result" element={<Result />} />
            <Route path="/propose" element={<Propose />} />
            <Route path="/propose-success" element={<ProposeSuccess />} />
            <Route path="/propose-fail" element={<ProposeFail />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/ranking-detail" element={<RankingDetail />} />
          </Routes>
        </BrowserRouter>
      </AlertProvider>
    </ProfilesProvider>
  );
};

export default App;
