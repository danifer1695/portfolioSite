//format(ui.footer.copyright, { year: 2026, name: profile.name })
//turns into
//'© 2026 Daniel Fernandez Martinez'
export function format(template: string, values: Record<string, string | number>) {
	return template.replace(/\{(\w+)\}/g, (match, key) => String(values[key] ?? match));
}

//Transform '2026-09' into 'Sept 2026'
export function formatMonth(value: string, locale: string) {
	//separate month substring from the year substring
	const [year, month] = value.split('-').map(Number);

	//Intl.DateTimeFormat is the browser's and node's built-in formatter.
	//It will format the date differently depending on the locale
	return new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(Date.UTC(year, month - 1)));
}

//formats time periods.
//PresentLabel is a string saying 'Present', 'Presente', 'Maintenant'... changes depending on locale
export function formatPeriod(start: string, end: string | null, locale: string, presentLabel: string) {
	return `${formatMonth(start, locale)} - ${end ? formatMonth(end, locale) : presentLabel}`;
}
