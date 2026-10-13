import { lineIds, lines } from "./lines";
import { ui } from './ui';

export type NavItem = {
	label: string;
	href: string;
	dotClass?: string;
}

export const mainNav: readonly NavItem[] = [
	...lineIds.map((id) => ({
		label: ui.lines[id].name,
		href: lines[id].href,
		dotClass: lines[id].bgClass
	})),
	{ label: ui.nav.resume, href: '/resume'},
	{ label: ui.nav.contact, href: '/contact'},
];
