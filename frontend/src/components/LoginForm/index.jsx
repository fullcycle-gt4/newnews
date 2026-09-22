import React, { useState } from 'react';
import './style.css';
import { IconMail, IconLock, IconEye, IconEyeOff } from '@tabler/icons-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="login-page-wrapper">
      {/* O corpo principal do formulário */}
      <div className="login-body">
        <h2>Login</h2>

        <form onSubmit={(e) => e.preventDefault()}>
          {/* Grupo de input do Email */}
          <div className="login-input-group">
            <IconMail className="login-icon" size={20} />
            <input
              type="email"
              className="login-input"
              placeholder="email"
            />
          </div>

          {/* Grupo de input da Senha */}
          <div className="login-input-group login-password-group">
            <IconLock className="login-icon" size={20} />
            <input
              type={showPassword ? 'text' : 'password'}
              className="login-input"
              placeholder="senha"
            />
            <button
              type="button"
              className="toggle-password-button"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
            </button>
          </div>

          {/* Botão de envio */}
          <button type="submit" className="login-button">
            Login
          </button>

          {/* Divisor "ou" */}
          <div className="login-divider">
            <span></span>
            <p>ou</p>
            <span></span>
          </div>

          {/* Link para o cadastro */}
          <p className="login-register-link">
            Não tem uma conta ?{" "}
            <a href="/register">Registre-se</a>
          </p>
        </form>
      </div>
    </div>
  );
}