import { useNavigate } from "react-router-dom";
import RegistrationForm from "../../components/RegistrationForm/index.jsx";
import "./style.css";


const RegisterPage = () => {
    const navigate = useNavigate();

    const handleRegister = async (formData) => {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorData = await response
                .json()
                .catch(() => null);

            throw new Error(
                errorData?.message || "Erro ao criar conta."
            );
        }

        navigate("/login");
    };

    return (
        <div className="register-page">
            <RegistrationForm onSubmit={handleRegister} />
        </div>
    );
};

export default RegisterPage;