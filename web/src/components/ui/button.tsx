import { cn } from '@/lib/cn';
import Link from 'next/link';
import { ReactNode } from 'react';

const base =
	'inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium ' +
	//only display transitions when user hasnt asked the OS for reduced motion
	'motion-safe:transition-colors disabled:opacity-50 ' +
	//keeping keyboard-only users in mind
	'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

const variants = {
	primary: 'bg-accent text-accent-foreground hover:bg-accent/90',
	secondary: 'border border-border hover:bg-metroBlue',
	ghost: 'hover:bg-metroBlue',
} as const;

//Base button component
type ButtonProps = React.ComponentProps<'button'> & { variant?: keyof typeof variants };

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
	return <button type="button" className={cn(base, variants[variant], className)} {...props} />;
}

//Link button component
export function LinkButton({
	variant = 'primary',
	bgClass,
	textClass,
	borderClass,
	href,
	className = '',
	children,
}: {
	variant?: keyof typeof variants;
	bgClass?: string;
	textClass?: string;
	borderClass?: string;
	href: string;
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<Link href={href} type="button" className={cn(base, variants[variant], textClass, borderClass, bgClass, className)}>
			{children}
		</Link>
	);
}
