declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    ymClientId?: string;
  }
}
