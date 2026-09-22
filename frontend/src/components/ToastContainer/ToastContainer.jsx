import { useToast } from '../../context/ToastContext.jsx'
import './Toast.css'

export default function ToastContainer({ toastNotifications: propsNotifications, onDismissToast: propsDismiss }) {
  const toastCtx = useToast()

  const toastNotifications = propsNotifications ?? toastCtx?.toastNotifications ?? []
  const onDismissToast = propsDismiss ?? toastCtx?.dismissToast

  if (!toastNotifications.length) return null

  return (
    <div className="nn-toast-container" aria-live="polite" aria-atomic="true">
      {toastNotifications.map((toast) => (
        <div key={toast.id} className={`nn-toast nn-toast--${toast.type || 'info'}`} role="status">
          <span className="nn-toast__icon" style={{ fontSize: '1.1rem' }}>
            {toast.icon || (toast.type === 'success' ? '✓' : 'ℹ️')}
          </span>
          <div className="flex-grow-1" style={{ fontSize: '0.85rem' }}>
            {toast.message}
          </div>
          <button
            type="button"
            className="btn-close ms-2"
            style={{ fontSize: '0.65rem' }}
            onClick={() => onDismissToast?.(toast.id)}
            aria-label="Fechar notificação"
          />
        </div>
      ))}
    </div>
  )
}
