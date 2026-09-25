import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/LoginForm";
import "./style.css";

export default function LoginPage(){
    return (
        <div className="login-page">
            <LoginForm />
        </div>
    );
}