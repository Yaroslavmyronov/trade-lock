import { ReactNode, Suspense } from 'react';
import { Preloader } from './Preloader';

interface SuspenseBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export const SuspenseBoundary = ({
  children,
  fallback,
}: SuspenseBoundaryProps) => {
  return (
    <Suspense
      fallback={
        fallback || (
          <div className="flex size-full items-center justify-center">
            <Preloader />
          </div>
        )
      }
    >
      {children}
    </Suspense>
  );
};
