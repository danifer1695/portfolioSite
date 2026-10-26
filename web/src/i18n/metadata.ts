import { routing, type Locale } from "./routings";
import { Metadata } from "next";


export function alternatesFor(path: string, locale: Locale): Metadata['alternates']
{
	return{
		canonical: `/${locale}${path}`,
		languages: {
			...Object.fromEntries(routing.locales.map((l) => [l, `/${l}${path}`])),
			'x-default': `/${routing.defaultLocale}${path}`
		}
	}
}
