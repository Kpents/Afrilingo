export function assetPath(path = "") {
  if (!path || /^(?:[a-z]+:|\/\/|data:|blob:)/i.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}
