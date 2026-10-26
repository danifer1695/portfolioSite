import type { Locale } from './routings';

export type Text = string | Record<Locale, string>;
export type TextList = readonly string[] | Record<Locale, readonly string[]>;

export const tr = (text: Text, locale: Locale) => (typeof text === 'string' ? text : text[locale]);
export const trList = (list: TextList, locale: Locale) =>
	Array.isArray(list) ? list : (list as Record<Locale, readonly string[]>)[locale];
