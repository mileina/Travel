import React, { useState, useEffect } from 'react';
import './App.css';
import Thailande from './Travel/Thailande';
import Egypte from './Travel/Egypte';
import France from './Travel/France';

function App() {
  const [setThailandeScrollPosition] = useState(0);
  const [franceScrollPosition, setFranceScrollPosition] = useState(0);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleThailandeScroll = () => {
      setThailandeScrollPosition(window.scrollY);
    };

    const handleFranceScroll = () => {
      setFranceScrollPosition(window.scrollY);
    };

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('scroll', handleThailandeScroll);
    window.addEventListener('scroll', handleFranceScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleThailandeScroll);
      window.removeEventListener('scroll', handleFranceScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="App">
      <div style={{ position: 'fixed', top: 0, width: '100%', height: windowHeight, zIndex: 1 }}>
        <Thailande />
      </div>
      <div style={{ marginTop: windowHeight }}>
        <div style={{ paddingTop: '100vh' }}>
          <Egypte />
        </div>
        <France scrollPosition={franceScrollPosition} />
      </div>
    </div>
  );
}

export default App;
