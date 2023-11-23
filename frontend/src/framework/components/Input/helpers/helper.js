export function getValidationMessage(success, error) {
  if (success) { return success; }
  if (error) { return error; }
  return '';
}

export function getValidationClass(success, error) {
  if (success) { return 'success'; }
  if (error) { return 'error'; }
  return '';
}
