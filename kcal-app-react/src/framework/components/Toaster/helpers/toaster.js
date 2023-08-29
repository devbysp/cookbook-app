import { getUniqueId } from '../../../helpers/utils';

export const ToastType = {
  success: 'success',
  error: 'error',
  warning: 'warning',
};

export function getToastClassForToastType(toastType) {
  const toastTypes = Object.getOwnPropertyNames(ToastType);

  if (toastTypes.includes(toastType)) {
    return `${ToastType[toastType]}`;
  }
  return '';
}

export function createToast(content, type, onClose) {
  return ({
    id: getUniqueId(), content, type, onClose,
  });
}
