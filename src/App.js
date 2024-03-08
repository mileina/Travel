import React, { useState, useEffect } from 'react';
import './App.css';
import Thailande from './Travel/Thailande';
import Egypte from './Travel/Egypte';
import France from './Travel/France';

function App() {
  const [franceScrollPosition, setFranceScrollPosition] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleFranceScroll = () => {
      setFranceScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleFranceScroll);

    return () => {
      window.removeEventListener('scroll', handleFranceScroll);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <img src="/chargement.gif" alt="Chargement en cours..." className="loading-gif" />;
  }

  return (
    <div className="App">
      <div style={{ height: '100vh' }}>
        <Thailande />
      </div>
      <div style={{ paddingTop: '0vh' }}>
        <Egypte />
      </div>
      <France scrollPosition={franceScrollPosition} />
    </div>
  );
}

export default App;
