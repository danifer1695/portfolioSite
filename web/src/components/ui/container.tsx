import { cn } from '@/lib/cn';

export function Container({ className, ...props }: React.ComponentProps<'div'>) {
	return <div className={cn('mx-auto w-full max-w-2xl md:max-w-6xl px-4 sm:px-6', className)} {...props} />;
}
