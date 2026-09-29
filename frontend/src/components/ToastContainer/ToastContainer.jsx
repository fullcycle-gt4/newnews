import { useToastStore } from '@/stores';
import './ToastContainer.css';

/**
 * Global Toast Notification Container.
 * Renders a stack of temporary toast notifications at the bottom of the screen.
 * Connects to the global toast store or accepts props directly.
 *
 * @param {Object} props
 * @param {Array} [props.toastNotifications] - Optional array of toast objects to render
 * @param {Function} [props.onDismissToast] - Optional callback to dismiss a specific toast
 */
export function ToastContainer({
  toastNotifications: propsNotifications,
  onDismissToast: propsDismiss,
}) {
  const storeToastNotifications = useToastStore(
    (state) => state.toastNotifications,
  );
  const storeDismissToast = useToastStore((state) => state.dismissToast);

  const toastNotifications =
    propsNotifications ?? storeToastNotifications ?? [];
  const onDismissToast = propsDismiss ?? storeDismissToast;

  if (!toastNotifications.length) return null;

  return (
    <div className="nn-toast-container" aria-live="polite" aria-atomic="true">
      {toastNotifications.map((toast) => (
        <output
          key={toast.id}
          className={`nn-toast nn-toast--${toast.type || 'info'}`}
        >
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
        </output>
      ))}
    </div>
  );
}
