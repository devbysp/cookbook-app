import React from 'react';
import { Dialog } from './components/Dialog';

export function ModalDialog({
  title, actions, open, onClose, children,
}) {
  if (!open) return null;

  return (
    <div className="modal">
      <Dialog title={title} actions={actions} onClose={onClose}>
        {children}
      </Dialog>
    </div>
  );
}
