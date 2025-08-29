import { useCallback } from 'react';

export const useIntersection = (onIntersect: () => void) => {
  return useCallback(
    (el: HTMLDivElement | null) => {
      if (!el) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((intersection) => {
          if (intersection.isIntersecting) {
            onIntersect();
          }
        });
      });

      observer.observe(el);

      return () => observer.disconnect();
    },
    [onIntersect],
  );
};
