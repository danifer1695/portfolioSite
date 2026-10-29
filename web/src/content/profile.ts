import { Text, TextList, tr, trList } from "@/i18n/i18n"
import { Locale } from "@/i18n/routings"


export type ProfileSource = {
	name: string
	initials: string
	headline: Text
	intro: Text
	about: TextList
	skills: readonly string[]
	description: Text
	siteURL: string
	email: string
	phone: string
	social: readonly { label: string; href: string}[]
}

export type Profile = Omit<ProfileSource, 'headline' | 'intro' | 'about' | 'description'> & {
	headline: string
	intro: string
	about: readonly string[]
	description: string
}

const profile = {
	name: 'Daniel Fernandez Martinez',
	initials: 'DF',
	headline: {
		en: 'Software Developer',
		fr: 'Développement logiciel',
	},
	intro: {
		en: 'Software developer with experience in Full-Stack development, Game Development and Production Design',
		fr: 'Développement logiciel, avec une expérience en développement Full-Stack, en développement de jeux vidéo et en conception visuelle',
	},
	about: {
		en: ['Currently based in Lille, France', '5 years of experience in game development'],
		fr: ['Actuellement basé à Lille, France', '5 ans d’expérience dans le développement de jeux vidéo'],
	},
	skills: ['TypeScript', 'React', 'Next.js', 'Node.js', 'JavaScript', 'PostgreSQL', 'Java', 'C/C++', 'C#', 'Unity', 'OpenGL'],
	description: {
		en: 'Software Developer. Portfolio, projects and contact.',
		fr: 'Développement logiciel. Portfolio, projets et contact.',
	},
	siteURL: 'https://danifer.dev',
	email: 'danifer1695@gmail.com',
	phone: '+33 7 80 97 67 79',
	social: [
		{ label: 'GitHub', href: 'https://github.com/danifer1695' },
		{ label: 'LinkedIn', href: 'https://linkedin.com/in/danifer1695' },
	],
} as const satisfies ProfileSource;

export function getProfile(locale: Locale): Profile {
	return {
		...profile,
		headline: tr(profile.headline, locale),
		intro: tr(profile.intro, locale),
		about: trList(profile.about, locale),
		description: tr(profile.description, locale),
	}
}
