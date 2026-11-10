'use client';

import { cn } from '@/lib/cn';
import { focusRing } from '@/lib/styles';
import { THEME_KEY } from '@/lib/theme';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
	function toggle() {
		const root = document.documentElement;
		const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
		root.dataset.theme = next;
		try {
			localStorage.setItem(THEME_KEY, next);
		} catch {}
	}

	return (
		<button type="button" onClick={toggle} className={cn('p-1', focusRing)}>
			{/* Light mode active - show moon icon*/}
			<span className="dark:hidden">
				<Moon aria-hidden className="size-5" />
			</span>

			{/* Dark mode active - show sun icon*/}
			<span className="hidden dark:inline">
				<Sun aria-hidden className="size-5" />
			</span>
		</button>
	);
}
