import React, { useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import Work from './pages/Work';
import Pricing from './pages/Pricing';
import Legal from './pages/Legal';
import FAQ from './pages/FAQ';
import Hyperdrive from './components/Hyperdrive';
import { Language } from './types';

const AnimatedRoutes: React.FC<{ lang: Language }> = ({ lang }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home lang={lang} />} />
        <Route path="/work" element={<Work lang={lang} />} />
        <Route path="/pricing" element={<Pricing lang={lang} />} />
        <Route path="/legal" element={<Legal lang={lang} />} />
        <Route path="/faq" element={<FAQ lang={lang} />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(Language.EN);
  const [isHyperdriveActive, setHyperdriveActive] = useState(false);

  // Function to manually trigger the hyperdrive animation
  // In a real router integration, we might delay the route change until this animation peaks
  // Here we use it as a visual overlay effect when clicking nav links
  const triggerHyperdrive = () => {
    setHyperdriveActive(true);
    setTimeout(() => {
      setHyperdriveActive(false);
    }, 1500); // Matches animation duration
  };

  return (
    <HashRouter>
      <Hyperdrive isActive={isHyperdriveActive} />
      <Layout lang={lang} setLang={setLang} triggerHyperdrive={triggerHyperdrive}>
        <AnimatedRoutes lang={lang} />
      </Layout>
    </HashRouter>
  );
};

export default App;
