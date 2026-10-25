import { useTranslations } from 'next-intl';
import { lineIds, lines } from './lines';
import type { LineId } from './lines';
import { ui } from './ui';

type NavLabelKey =
	`lines.${LineId}.name` |
	'nav.resume' |
	'nav.contact'

export type NavItem = {
	labelKey: NavLabelKey;
	href: string;
	dotClass?: string;
};

const t = useTranslations('')

export const mainNav: readonly NavItem[] = [
	...lineIds.map((id) => ({
		labelKey: `lines.${id}.name` as const,
		href: lines[id].href,
		dotClass: lines[id].bgClass,
	})),
	{ labelKey: 'nav.resume', href: '/resume' },
	{ labelKey: 'nav.contact', href: '/contact' },
];
