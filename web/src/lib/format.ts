
//format(ui.footer.copyright, { year: 2026, name: profile.name })
//turns into
//'© 2026 Daniel Fernandez Martinez'
export function format(template: string, values: Record<string, string | number>)
{
	return template.replace(/\{(\w+)\}/g, (match, key) => String(values[key] ?? match))
}
