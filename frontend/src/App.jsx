import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ConfigPage from '@/pages/Config';
import ErrorBoundary from "@/components/ErrorBoundary";
import HomePage from "@/pages/Home";
import NewsPage from "@/pages/NewsPage";
import RegisterPage from "@/pages/RegistePage";
import LoginPage from "./components/LoginForm";
import { useUserStore, useNavigationStore } from "@/stores";

/**
 * Root application component.
 * Bootstraps global application state (user profile and navigation items)
 * and establishes client-side page routing.
 */
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
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/config" element={<ConfigPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage/>}/>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
