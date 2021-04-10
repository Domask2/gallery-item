import React from 'react';
import BgContent from './comps/BgContent/BgContent';
import Drag from './comps/Drag';
import Gallery from './comps/Gallery';
import Header from './comps/Header/Header';
import Form from './comps/Header/Form';

function App() {
  return (
    <div className="App">
      <BgContent />
      <Header />
      <Gallery />
    </div>
  );
}

export default App;
