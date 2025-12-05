import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './page/home';
import DestinyFinder from './page/destinyFinder';
import DestinyFinderList from './page/destinyFinderList';
import HeartRateMeasure from './page/heartRateMeasure';
import Compatibility from './page/compatibility';
import Result from './page/result';
import { ProfilesProvider } from '@/contexts/UserContext';

const App: React.FC = () => {
  return (
    <ProfilesProvider>
      <ProfilesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destiny-finder" element={<DestinyFinder />} />
            <Route
              path="/destiny-finder/list"
              element={<DestinyFinderList />}
            />
            <Route path="/heart-rate-measure" element={<HeartRateMeasure />} />
            <Route path="/compatibility" element={<Compatibility />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </BrowserRouter>
      </ProfilesProvider>
    </ProfilesProvider>
  );
};

export default App;
