import { useState } from 'react';
import {
  IconArrowRight,
  IconEye,
  IconEyeOff,
  IconLock,
  IconMail,
} from '@tabler/icons-react';
import './style.css';

export default function LoginFormModal({ titleId, onRegister }) {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="login-form-modal-container">
      <div className="login-form-modal-content">
        <div className="login-form-modal-logo">
          <div className="login-form-modal-logo-box">NN</div>
          <div>
            <h1>NEW NEWS</h1>
            <span>SEU PORTAL DE NOTÍCIAS</span>
          </div>
        </div>

        <form className="login-form-modal-form" onSubmit={handleSubmit}>
          <h2 id={titleId}>Bem-vindo de volta</h2>
          <p className="login-form-modal-description">
            Faça login para continuar
          </p>

          <div className="login-form-modal-group">
            <label htmlFor="modal-login-email">
              E-mail
            </label>
            <div className="login-form-modal-input-container">
              <IconMail className="login-form-modal-input-icon" size={20} />
              <input
                id="modal-login-email"
                name="email"
                type="email"
                placeholder="seunome@exemplo.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="login-form-modal-group">
            <label htmlFor="modal-login-password">
              Senha
            </label>
            <div className="login-form-modal-input-container">
              <IconLock className="login-form-modal-input-icon" size={20} />
              <input
                id="modal-login-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite sua senha"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="login-form-modal-password-button"
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
              </button>
            </div>
          </div>

          <div className="login-form-modal-options">
            <label className="login-form-modal-remember">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
              />
              <span>Lembrar de mim</span>
            </label>
            <a href="#forgot-password">Esqueceu a senha?</a>
          </div>

          <button type="submit" className="login-form-modal-submit">
            Entrar
            <IconArrowRight size={20} />
          </button>

          <div className="login-form-modal-divider" aria-hidden="true">
            <span></span>
            <p>ou</p>
            <span></span>
          </div>

          <p className="login-form-modal-register">
            Não tem conta?{' '}
            <a href="/register" onClick={onRegister}>
              Cadastre-se
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}