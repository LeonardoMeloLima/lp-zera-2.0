import { useEffect, useCallback } from "react";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
    };
  }
}

const CALENDLY_URL = "https://calendly.com/zeraapp";

export function useCalendly() {
  useEffect(() => {
    const CALENDLY_CSS = "https://assets.calendly.com/assets/external/widget.css";
    const CALENDLY_JS = "https://assets.calendly.com/assets/external/widget.js";

    if (!document.querySelector(`link[href="${CALENDLY_CSS}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = CALENDLY_CSS;
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    }
    if (!document.querySelector(`script[src="${CALENDLY_JS}"]`)) {
      const script = document.createElement("script");
      script.src = CALENDLY_JS;
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }
  }, []);

  const openCalendly = useCallback(async (e?: React.MouseEvent) => {
    e?.preventDefault();

    const waitForCalendly = () =>
      new Promise<void>((resolve, reject) => {
        let attempts = 0;
        const check = () => {
          if (window.Calendly) {
            resolve();
          } else if (attempts >= 6) {
            reject(new Error("Calendly script failed to load"));
          } else {
            attempts++;
            setTimeout(check, 500);
          }
        };
        check();
      });

    await waitForCalendly();
    window.Calendly!.initPopupWidget({ url: CALENDLY_URL });
  }, []);

  return openCalendly;
}
