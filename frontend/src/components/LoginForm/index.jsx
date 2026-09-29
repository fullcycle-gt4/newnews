import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaLogin } from "../Validation/"; // Ajuste o caminho do schema se necessário

import "./style.css";

import {
  IconMail,
  IconLock,
  IconEye,
  IconEyeOff,
  IconArrowRight,
  IconArrowLeft,
} from "@tabler/icons-react";

export default function LoginPage({ isModal = false, titleId }) {
  const [showPassword, setShowPassword] = useState(false);

  // Configuração do React Hook Form com o Zod
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schemaLogin),
    mode: "onChange", // Valida em tempo real para ativar/desativar o botão
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit = (data) => {
    console.log("Dados do Login:", data);
  };

  return (
    <div
      className={`login-page-wrapper${
        isModal ? " login-modal-form-wrapper" : ""
      }`}
    >
      {!isModal && (
        <div className="login-globe">
          <div className="login-globe-line login-line-one"></div>
          <div className="login-globe-line login-line-two"></div>
          <div className="login-globe-horizontal login-horizontal-one"></div>
          <div className="login-globe-horizontal login-horizontal-two"></div>
        </div>
      )}

      <div className="login-content">
        {!isModal && (
          <div className="login-logo">
            <div className="login-logo-box">NN</div>

            <div>
              <h1>NEW NEWS</h1>
              <span>SEU PORTAL DE NOTÍCIAS</span>
            </div>
          </div>
        )}

        <div className="login-body">
          {!isModal && (
            <a href="/" className="login-back-home">
              <IconArrowLeft size={20} />
              <span>Voltar para a home</span>
            </a>
          )}

          <div className="login-heading">
            <h2 id={titleId}>Bem-vindo de volta!</h2>
            <p>Faça login para continuar</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="login-input-group">
              <label className="login-label">
                <IconMail className="login-icon" size={20} />
                <span>E-mail</span>
              </label>

              <div className="login-input-container">
                <IconMail size={21} />

                <input
                  type="email"
                  className="login-input"
                  placeholder="joaomaria@exemplo.com"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <span className="login-error-message">{errors.email.message}</span>
              )}
            </div>

            <div className="login-input-group">
              <label className="login-label">
                <IconLock className="login-icon" size={20} />
                <span>Senha</span>
              </label>

              <div className="login-password-wrapper">
                <IconLock
                  className="login-password-icon"
                  size={21}
                />

                <input
                  type={showPassword ? "text" : "password"}
                  className="login-input"
                  placeholder="xxxxxxxx"
                  {...register("senha")}
                />

                <button
                  type="button"
                  className="toggle-password-button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <IconEyeOff size={20} />
                  ) : (
                    <IconEye size={20} />
                  )}
                </button>
              </div>
              {errors.senha && (
                <span className="login-error-message">{errors.senha.message}</span>
              )}
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={!isValid}
            >
              <span>Entrar</span>
              <IconArrowRight size={23} />
            </button>

            <div className="login-divider">
              <span></span>
              <p>ou</p>
              <span></span>
            </div>

            <p className="login-register-link">
              Não tem uma conta? <a href="/register">Cadastre-se</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}