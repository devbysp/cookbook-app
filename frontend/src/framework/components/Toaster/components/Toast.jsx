import React from 'react';
import { Button } from '../../Button/Button';
import { getToastClassForToastType } from '../helpers/toaster';
import '../toaster.css';

export function Toast({
  id, message, toastType, onClose,
}) {
  return (
    <div className={`toast ${getToastClassForToastType(toastType)}`.trim()}>
      <div className="toast-body">
        {message}
      </div>
      <Button size="xs" onClick={() => onClose(id)}>X</Button>
    </div>
  );
}
