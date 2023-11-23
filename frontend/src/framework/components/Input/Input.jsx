import React from 'react';
import { ValidationMessage } from './components/ValidationMessage';
import { Label } from './components/Label';
import { getValidationClass, getValidationMessage } from './helpers/helper';
import { getUniqueId } from '../../helpers/utils';
import './input.css';

export function Input({
  className, label, size, success, error, ...props
}) {
  const componentId = getUniqueId();
  const validationClass = getValidationClass(success, error);
  const validationMessage = getValidationMessage(success, error);

  return (
    <Label label={label} htmlFor={componentId} size={size} validationClass={validationClass}>
      <ValidationMessage validationClass={validationClass} validationMessage={validationMessage}>
        <input
          id={componentId}
          className={`input ${size ?? ''} ${validationClass} ${className ?? ''}`.trim()}
          {...props}
        />
      </ValidationMessage>
    </Label>
  );
}
