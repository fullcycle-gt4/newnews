import { LoginForm } from '@/components/LoginForm';
import './LoginPage.css';

/**
 * Full-screen login page route component.
 * Acts as a wrapper for the LoginForm component, providing page-level layout and decorative backgrounds.
 */
export function LoginPage() {
  return (
    <div className="login-page">
      {/* Decorative Background Globe Animation */}
      <div className="login-globe">
        <div className="login-globe-line login-line-one" />
        <div className="login-globe-line login-line-two" />
        <div className="login-globe-horizontal login-horizontal-one" />
        <div className="login-globe-horizontal login-horizontal-two" />
      </div>

      {/* Main Authentication Form Container */}
      <LoginForm showBackLink={true} />
    </div>
  );
}
