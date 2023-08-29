export function getUniqueId() {
  return Date.now() + Math.ceil(1000 * Math.random());
}
