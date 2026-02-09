import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ModalProvider } from './contexts/ModalContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import EstimatorPage from './pages/EstimatorPage';
import PortfolioPage from './pages/PortfolioPage';
import ContactsPage from './pages/ContactsPage';
import RequestCallModal from './components/RequestCallModal';

const ScrollToTop = () => {
    const { pathname } = useLocation();
  
    React.useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ModalProvider>
        <ScrollToTop />
        <RequestCallModal />
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/estimator" element={<EstimatorPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ModalProvider>
    </HashRouter>
  );
};

export default App;