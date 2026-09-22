import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error(
      'ErrorBoundary capturou um erro não tratado:',
      error,
      errorInfo,
    );
  }

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
