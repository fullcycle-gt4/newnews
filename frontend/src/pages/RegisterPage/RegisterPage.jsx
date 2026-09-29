import { useNavigate } from "react-router-dom";
import { RegistrationForm } from "@/components/RegistrationForm";
import "./RegisterPage.css";


/**
 * Full-screen registration page route component.
 * Manages the API submission logic and routing for the user registration flow.
 */
export const RegisterPage = () => {
    const navigate = useNavigate();

    /**
     * Submits user registration data to the backend API.
     * On success, redirects the user to the login page.
     * 
     * @param {Object} formData - Validated user registration details
     */
    const handleRegister = async (formData) => {
        // Send registration request to API
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        // Error handling for failed registration
        if (!response.ok) {
            const errorData = await response
                .json()
                .catch(() => null);

            throw new Error(
                errorData?.message || "Erro ao criar conta."
            );
        }

        // Redirect to login upon successful account creation
        navigate("/login");
    };

    return (
        <div className="register-page">
            {/* Main Registration Form Component */}
            <RegistrationForm onSubmit={handleRegister} />
        </div>
    );
};

