export function normalize(path) {
  if (!path.length) return '/';

  const slash = (path[0] !== '/') ? '/' : '';
  return `${slash}${path}`;
}
