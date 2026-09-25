import React, { useState } from "react";

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

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
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

                    <form onSubmit={(e) => e.preventDefault()}>
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
                                />
                            </div>
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
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    className="login-input"
                                    placeholder="xxxxxxxx"
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
                        </div>

                        <button
                            type="submit"
                            className="login-button"
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
                            Não tem uma conta?{" "}
                            <a href="/register">Cadastre-se</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}