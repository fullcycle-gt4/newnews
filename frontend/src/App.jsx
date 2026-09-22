import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import HomePage from "@/pages/Home";
import RegisterPage from "@/pages/RegistePage";
import { useUserStore, useNavigationStore } from "@/stores";

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
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
