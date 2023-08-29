import React from 'react';
import { Button } from '../../Button/Button';
import '../modal.css';

export function Dialog({
  title, actions, onClose, children,
}) {
  return (
    <div className="dialog">
      <div className="dialog-header">
        <div className="dialog-title">
          {title}
        </div>
        <Button size="xs" color="danger" onClick={onClose}> X </Button>
      </div>
      <form className="dialog-content">
        {children}
        <div className="dialog-actions">
          {actions}
        </div>
      </form>
    </div>
  );
}
