import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schemaLogin } from '../Validation/';
import './LoginForm.css';
import {
  IconMail,
  IconLock,
  IconEye,
  IconEyeOff,
  IconArrowRight,
  IconArrowLeft,
} from '@tabler/icons-react';
import { useUserStore } from '@/stores';
import { MOCK_USER_PROFILE } from '@/mocks';

/**
 * Reusable Login Form component.
 * Can be rendered standalone in a page or within a modal dialog.
 * Handles state for email, password, and the "remember me" option.
 *
 * @param {Object} props
 * @param {string} [props.titleId] Accessibility ID for the heading
 * @param {Function} [props.onRegister] Callback when the register link is clicked (e.g. to close a modal)
 * @param {boolean} [props.showBackLink=false] Whether to show the "Back to home" link
 */
export function LoginForm({ titleId, onRegister, showBackLink = false }) {
  // Form and UI state
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const login = useUserStore((state) => state.login);

  // React Hook Form integration with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schemaLogin),
    mode: 'all', // Valida em tempo real (onBlur + onChange) para garantir estado do botão
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  /**
   * Handles authentication form submission
   */
  const handleFormSubmit = (data) => {
    // Authentication logic will be implemented here
    console.log('Dados do formulário válidos:', { ...data, rememberMe });
    login(MOCK_USER_PROFILE);
    onRegister?.();
  };

  return (
    <div className="login-content">
      {/* Brand Logo Section */}
      <div className="login-logo">
        <div className="login-logo-box">NN</div>
        <div>
          <h1>NEW NEWS</h1>
          <span>SEU PORTAL DE NOTÍCIAS</span>
        </div>
      </div>

      <div className="login-body">
        {/* Conditional Back Link (used in full-page layout) */}
        {showBackLink && (
          <a href="/" className="login-back-home">
            <IconArrowLeft size={20} />
            <span>Voltar para a home</span>
          </a>
        )}

        <div className="login-heading">
          <h2 id={titleId}>Bem-vindo de volta!</h2>
          <p>Faça login para continuar</p>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {/* Email Input Field */}
          <div className="login-input-group">
            <label className="login-label" htmlFor="login-email">
              <IconMail className="login-icon" size={20} />
              <span>E-mail</span>
            </label>

            <div className="login-input-container">
              <IconMail size={21} />
              <input
                id="login-email"
                type="email"
                className="login-input"
                placeholder="seunome@exemplo.com"
                autoComplete="email"
                {...register('email')}
              />
            </div>
            {/* Mensagem de erro do e-mail */}
            {errors.email && (
              <span className="login-error-message">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password Input Field with Visibility Toggle */}
          <div className="login-input-group">
            <label className="login-label" htmlFor="login-password">
              <IconLock className="login-icon" size={20} />
              <span>Senha</span>
            </label>

            <div className="login-password-wrapper">
              <IconLock className="login-password-icon" size={21} />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                className="login-input"
                placeholder="Digite sua senha"
                autoComplete="current-password"
                {...register('senha')}
              />
              <button
                type="button"
                className="toggle-password-button"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? (
                  <IconEyeOff size={20} />
                ) : (
                  <IconEye size={20} />
                )}
              </button>
            </div>
            {/* Mensagem de erro da senha */}
            {errors.senha && (
              <span className="login-error-message">
                {errors.senha.message}
              </span>
            )}
          </div>

          {/* Additional Options: Remember Me & Forgot Password */}
          <div className="login-options">
            <label className="login-remember">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
              />
              <span>Lembrar de mim</span>
            </label>
            <a href="#forgot-password">Esqueceu a senha?</a>
          </div>

          {/* Login Submit Button (Desabilitado quando inválido) */}
          <button
            type="submit"
            onClick={handleFormSubmit}
            className="login-button"
            disabled={!isValid}
          >
            <span>Entrar</span>
            <IconArrowRight size={23} />
          </button>

          <div className="login-divider" aria-hidden="true">
            <span />
            <p>ou</p>
            <span />
          </div>

          {/* Link to Registration Page */}
          <p className="login-register-link">
            Não tem uma conta?{' '}
            <a href="/register" onClick={onRegister}>
              Cadastre-se
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
