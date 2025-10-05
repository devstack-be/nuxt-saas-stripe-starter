const publicConfig = useRuntimeConfig().public;
export function absoluteUrl(path: string) {
  return `${publicConfig.SiteUrl}${path}`;
}
