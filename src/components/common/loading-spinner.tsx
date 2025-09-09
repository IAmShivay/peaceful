import { cn } from '@/lib/utils/cn';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  text?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
};

export function LoadingSpinner({ size = 'md', className, text }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div
        className={cn(
          'animate-spin rounded-full border-2 border-secondary-300 border-t-primary-600',
          sizeClasses[size],
          className
        )}
      />
      {text && (
        <p className="text-sm text-secondary-600">{text}</p>
      )}
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoadingSpinner size="lg" text="Loading..." />
    </div>
  );
}

export function ComponentLoader() {
  return (
    <div className="flex items-center justify-center p-8">
      <LoadingSpinner size="md" />
    </div>
  );
}
