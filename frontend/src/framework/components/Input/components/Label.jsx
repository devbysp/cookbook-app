import React from 'react';

export function Label({
  label, htmlFor, size, validationClass, children,
}) {
  if (!label) { return children; }

  return (
    <label htmlFor={htmlFor} className={`label ${size ?? ''} ${validationClass}`.trim()}>
      {label}
      {children}
    </label>
  );
}
