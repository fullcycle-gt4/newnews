import { useEffect } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ConfigPage from '@/pages/Config';
import ErrorBoundary from '@/components/ErrorBoundary';
import HomePage from '@/pages/Home';
import RegisterPage from '@/pages/RegistePage';
import LoginPage from './components/LoginForm';

import { useUserStore, useNavigationStore } from '@/stores';

export default function App() {
  const loadUserData = useUserStore((state) => state.loadUserData);
  const loadNavigation = useNavigationStore((state) => state.loadNavigation);

  useEffect(() => {
    loadUserData();
    loadNavigation();
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          {/* Página inicial */}
          <Route path="/" element={<HomePage />} />

          {/* Configurações */}
          <Route path="/config" element={<ConfigPage />} />

          {/* Cadastro */}
          <Route path="/register" element={<RegisterPage />} />

          {/* Login */}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}