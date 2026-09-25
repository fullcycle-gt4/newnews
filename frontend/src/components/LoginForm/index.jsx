import React, { useState } from 'react';
import './style.css';
import { IconMail, IconLock, IconEye, IconEyeOff, IconArrowLeft,} from '@tabler/icons-react';

export default function LoginPage({ isModal = false, titleId }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };


  return (
    <div className={`login-page-wrapper${isModal ? ' login-modal-form-wrapper' : ''}`}>
      <div className="login-body">
        <h2 id={titleId}>Login</h2>

        <form onSubmit={(e) => e.preventDefault()}>

          <div className="login-input-group">
            <label className="login-label">
              <IconMail className="login-icon" size={20} />
              <span>Email</span>
            </label>

            <div className="login-input-container">
                <IconMail size={21} />
            
            <input
              type="email"
              className="login-input"
              placeholder="joaomaria@exemplo.com"
            />
          </div>
          </div> 
          <div className="login-input-group">
            <label className="login-label">
              <IconLock className="login-icon" size={20} />
              <span>Senha</span>
            </label>
            
            <div className="login-password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                className="login-input"
                placeholder="xxxxxxxx"
                maxLength={8}
              />
              <button
                type="button"
                className="toggle-password-button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
              </button>
            </div>
          </div>

          <button type="submit" className="login-button">
            Entrar
          </button>

          <div className="login-divider">
            <span></span>
            <p>ou</p>
            <span></span>
          </div>

          <p className="login-register-link">
            Não tem uma conta ?{" "}
            <a href="/register">Cadastre-se</a>
          </p>
        </form>
      </div>
    </div>
  );
}