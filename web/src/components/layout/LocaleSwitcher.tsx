'use client';

import { useLocale } from "next-intl"
import { Link, usePathname } from "@/i18n/navigation"
import { routing } from "@/i18n/routings";
import { cn } from "@/lib/cn";
import { focusRing } from "@/lib/styles";

export function LocaleSwitcher()
{
	const current = useLocale()
	const pathname = usePathname()	//without the locale: '/professional'

	return (
		<ul className="flex gap-2 text-sm">
			{routing.locales.map((locale) => (
				<li key={locale}>
					<Link
						href={pathname}
						locale={locale}
						lang={locale}
						aria-current={locale === current ? 'true' : undefined}
						className={
							cn('uppercase underline-offset-4 hover:underline',
							  locale === current && 'font-bold underline',
							  focusRing)
					}>
						{locale}
					</Link>
				</li>
			))}
		</ul>
	)
}
