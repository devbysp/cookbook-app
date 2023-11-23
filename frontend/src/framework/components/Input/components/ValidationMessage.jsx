import React from 'react';

export function ValidationMessage({ validationClass, validationMessage, children }) {
  if (!validationClass) { return children; }

  const messageText = `${typeof validationMessage === 'string' ? validationMessage : ''}`;
  if (!messageText) { return children; }

  return (
    <div className="wrapped">
      {children}
      <div className={`message ${validationClass}`}>
        {messageText}
      </div>
    </div>
  );
}
