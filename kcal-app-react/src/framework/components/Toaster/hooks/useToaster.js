import { useEffect, useState, useRef } from 'react';
import { ToastType, createToast } from '../helpers/toaster';

export function useToaster({ timeout }) {
  const timer = useRef(null);
  const [toasts, setToasts] = useState([]);

  function closeToasts() {
    timer.current = null;
    setToasts([]);
  }

  function timeoutSetup() {
    if (!timeout) { return; }

    if (timer.current && toasts.length) {
      clearTimeout(timer.current);
      timer.current = setTimeout(closeToasts, timeout);
      return;
    }

    if (timer.current && !toasts.length) {
      clearTimeout(timer);
      timer.current = null;
      return;
    }

    if (toasts.length) {
      timer.current = setTimeout(closeToasts, timeout);
    }
  }

  useEffect(() => {
    timeoutSetup();
  }, [toasts]);

  const closeToast = (idToClose) => {
    setToasts(
      (currentToasts) => currentToasts.filter((toast) => toast.id !== idToClose),
    );
  };

  const toastSuccess = (message) => {
    setToasts([...toasts, createToast(message, ToastType.success, closeToast)]);
  };

  const toastWarning = (message) => {
    setToasts([...toasts, createToast(message, ToastType.warning, closeToast)]);
  };

  const toastError = (message) => {
    setToasts([...toasts, createToast(message, ToastType.error, closeToast)]);
  };

  return {
    toasts, toastSuccess, toastWarning, toastError, closeToast,
  };
}
