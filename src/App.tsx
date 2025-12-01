import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './page/home';
import DestinyFinder from './page/destinyFinder';
import Compatibility from './page/compatibility';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destiny-finder" element={<DestinyFinder />} />
        <Route path="/compatibility" element={<Compatibility />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
