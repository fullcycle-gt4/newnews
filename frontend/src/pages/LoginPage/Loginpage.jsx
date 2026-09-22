import React, { useState } from 'react';
import './LoginPage.css';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    /* Envolto em login-page-wrapper para isolar o fundo e o layout de login */
    <div className="login-page-wrapper">
      <div className="login-body">
        <h2>Login</h2>
        
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <input
              type="email"
              className="login-input"
              placeholder="email"
            />
          </div>

          <div className="input-group password-group">
            <input
              type={showPassword ? 'text' : 'password'}
              className="login-input"
              placeholder="senha"
            />
            <button
              type="button"
              className="toggle-password-btn"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}