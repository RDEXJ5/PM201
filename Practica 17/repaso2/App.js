import React, { useEffect, useState } from 'react';
import SplashScreenRepaso from './Screens/SplashScreenRepaso';
import RegistroLibrosScreen from './Screens/RegistroLibrosScreen';

export default function App() {
  const [mostrarSplash, setMostrarSplash] = useState(true);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      setMostrarSplash(false);
    }, 2000);

    return () => clearTimeout(temporizador);
  }, []);

  return mostrarSplash ? <SplashScreenRepaso /> : <RegistroLibrosScreen />;
}
