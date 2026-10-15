'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';
import { focusRing } from '@/lib/styles';

type Props = { href: string; dotClass?: string; children: React.ReactNode };

export function NavLink({ href, dotClass, children }: Props) {
	//to highlight the link when href maatches current page
	const isActive = usePathname() === href;

	return (
		<Link
			href={href}
			aria-current={isActive ? 'page' : undefined}
			className={cn('flex items-center gap-2 underline-offset-4 hover:underline', isActive && 'font-semibold underline', focusRing)}
		>
			{dotClass && <span aria-hidden="true" className={cn('size-3 rounded-full ring-2 ring-white', dotClass)} />}
			{children}
		</Link>
	);
}
