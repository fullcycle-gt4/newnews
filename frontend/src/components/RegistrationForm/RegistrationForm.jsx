import { useState } from "react";
import {
    IconUser,
    IconMail,
    IconLock,
    IconEye,
    IconEyeOff,
    IconArrowRight,
    IconArrowLeft,
} from "@tabler/icons-react";
import "./RegistrationForm.css";



/**
 * Registration form component with built-in client-side validation.
 * Handles user input for full name, email, and password, displaying inline errors.
 * 
 * @param {Object} props
 * @param {Function} props.onSubmit - Callback triggered when the form is successfully validated and submitted
 */
export function RegistrationForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    // Form state management
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    /**
     * Updates form data and clears the error for the field being modified
     */
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    /**
     * Validates all form fields before submission.
     * @returns {boolean} True if the form is valid, false otherwise.
     */
    const validate = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Digite seu nome completo.";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Digite seu e-mail.";
        }

        if (!formData.password) {
            newErrors.password = "Digite uma senha.";
        } else if (formData.password.length < 8) {
            newErrors.password =
                "A senha deve ter no mínimo 8 caracteres.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    /**
     * Handles the form submission process, including validation and loading state
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setSubmitting(true);

        try {
            await onSubmit(formData);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="registration-container">
            {/* Decorative Globe Background Animations */}
            <div className="globo globo-one">
                <div className="globo-line line-one"></div>
                <div className="globo-line line-two"></div>
                <div className="globo-horizontal horizontal-one"></div>
                <div className="globo-horizontal horizontal-two"></div>
            </div>

            <div className="globo globo-two">
                <div className="globo-line line-one"></div>
                <div className="globo-horizontal horizontal-one"></div>
            </div>

            <div className="registration-content">
                {/* Brand Logo Section */}
                <div className="news-logo">
                    <div className="logo-box">
                        NN
                    </div>

                    <div>
                        <h1>NEW NEWS</h1>
                        <span>SEU PORTAL DE NOTÍCIAS</span>
                    </div>
                </div>


                <form
                    className="registration-form"
                    onSubmit={handleSubmit}
                >
                    <a
                        href="/"
                        className="registration-back-home"
                    >
                        <IconArrowLeft size={20} />
                        <span>Voltar para a home</span>
                    </a>

                    <h2>Criar conta</h2>

                    <p className="form-description">
                        Preencha os dados abaixo para começar
                        <br />
                        a usar o New News.
                    </p>

                    {/* Full Name Input Field */}
                    <div className="form-group">
                        <label htmlFor="fullName">
                            <IconUser size={21} />
                            Nome completo
                        </label>

                        <div className="input-container">

                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                placeholder="João Maria da Silva"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </div>

                        {errors.fullName && (
                            <span className="error">
                                {errors.fullName}
                            </span>
                        )}
                    </div>


                    <div className="form-group">
                        <label htmlFor="email">
                            <IconMail size={21} />
                            E-mail
                        </label>

                        <div className="input-container">

                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="joaomaria@exemplo.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        {errors.email && (
                            <span className="error">
                                {errors.email}
                            </span>
                        )}
                    </div>


                    <div className="form-group">
                        <label htmlFor="password">
                            <IconLock size={21} />
                            Senha
                        </label>

                        <div className="input-container">

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                id="password"
                                name="password"
                                placeholder="xxxxxxxx"
                                value={formData.password}
                                onChange={handleChange}
                            />

                            <button
                                type="button"
                                className="password-button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                            >
                                {showPassword ? (
                                    <IconEyeOff size={21} />
                                ) : (
                                    <IconEye size={21} />
                                )}
                            </button>
                        </div>

                        {errors.password && (
                            <span className="error">
                                {errors.password}
                            </span>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="register-button"
                        disabled={submitting}
                    >
                        <span>
                            {submitting
                                ? "Criando..."
                                : "Criar conta"}
                        </span>

                        {!submitting && (
                            <IconArrowRight size={23} />
                        )}
                    </button>

                    {/* Alternative Actions (Login) */}
                    <div className="divider">
                        <span></span>
                        <p>ou</p>
                        <span></span>
                    </div>


                    <p className="login-link">
                        Já tem uma conta?{" "}
                        <a href="/login">Entrar</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

