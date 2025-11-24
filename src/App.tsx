import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './page/home';
import DestinyFinder from './page/destinyFinder';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destiny-finder" element={<DestinyFinder />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
