import { LoginForm } from "@/components/LoginForm";
import "./LoginPage.css";

export function LoginPage() {
    return (
        <div className="login-page">
            <div className="login-globe">
                <div className="login-globe-line login-line-one"></div>
                <div className="login-globe-line login-line-two"></div>
                <div className="login-globe-horizontal login-horizontal-one"></div>
                <div className="login-globe-horizontal login-horizontal-two"></div>
            </div>

            <LoginForm showBackLink={true} />
        </div>
    );
}