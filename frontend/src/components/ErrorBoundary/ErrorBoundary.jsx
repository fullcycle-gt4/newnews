import { Component } from 'react';

/**
 * ErrorBoundary component.
 * Catches JavaScript errors anywhere in their child component tree,
 * logs those errors, and displays a fallback UI instead of crashing the whole app.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    // Initialize state to keep track of caught errors
    this.state = { hasError: false, error: null };
  }

  /**
   * Update state so the next render will show the fallback UI.
   * @param {Error} error - The error that was thrown
   */
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  /**
   * Logs the error to an error reporting service or console
   * @param {Error} error - The error that was thrown
   * @param {React.ErrorInfo} errorInfo - Component stack trace
   */
  componentDidCatch(error, errorInfo) {
    console.error(
      'ErrorBoundary caught an unhandled exception:',
      error,
      errorInfo,
    );
  }

  /**
   * Reloads the application to try and recover from the error state
   */
  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="vh-100 d-flex align-items-center justify-content-center p-4 bg-body-tertiary">
          <div
            className="card border-0 shadow-lg p-4 rounded-4 text-center"
            style={{ maxWidth: 460 }}
          >
            <div className="fs-1 mb-2">⚠️</div>
            <h2 className="fw-bold mb-2 fs-4">Ops! Algo deu errado</h2>
            <p className="text-secondary small mb-4">
              Ocorreu um erro inesperado na aplicação. Tente recarregar a página
              para restaurar o sistema.
            </p>
            <button
              className="btn btn-primary rounded-pill px-4 fw-semibold"
              onClick={this.handleReload}
            >
              Recarregar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
