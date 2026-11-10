import { Text, TextList, tr, trList } from '@/i18n/i18n';
import { Locale } from '@/i18n/routings';
import { GalleryImage } from './media';

export type ProfileSource = {
	name: string;
	photo: Omit<GalleryImage, 'alt'>;
	location: Text;
	initials: string;
	headline: Text;
	intro: Text;
	about: TextList;
	skills: readonly string[];
	languages: TextList;
	description: Text;
	siteURL: string;
	email: string;
	phone: string;
	social: readonly { label: string; href: string }[];
};

export type Profile = Omit<ProfileSource, 'headline' | 'location' | 'intro' | 'about' | 'description' | 'languages'> & {
	headline: string;
	location: string;
	intro: string;
	about: readonly string[];
	languages: readonly string[];
	description: string;
};

const profile = {
	name: 'Daniel Fernandez Martinez',
	photo: {
		src: '/images/profile/profil.png',
		width: 600,
		height: 600,
	},
	location: {
		en: 'Lille, France',
		fr: 'Lille, Hauts-de-France',
	},
	initials: 'DF',
	headline: {
		en: 'Software Developer',
		fr: 'Développement logiciel',
	},
	intro: {
		en: 'Software developer with full-stack experience and a background in visual and game development.',
		fr: 'Développeur logiciel avec de l’expérience en développement full-stack et une formation en développement visuel et en conception de jeux vidéo.',
	},
	about: {
		en: ['Currently based in Lille, France', '5 years of experience in game development'],
		fr: ['Actuellement basé à Lille, France', '5 ans d’expérience dans le développement de jeux vidéo'],
	},
	skills: ['TypeScript', 'React', 'Next.js', 'Node.js', 'JavaScript', 'PostgreSQL', 'Java', 'C/C++', 'C#', 'Unity', 'OpenGL'],
	languages: {
		en: ['English', 'Spanish', 'French', 'Japanese'],
		fr: ['Anglais', 'Espagnol', 'Français', 'Japonais'],
	},
	description: {
		en: 'Software Developer. Portfolio, projects and contact.',
		fr: 'Développement logiciel. Portfolio, projets et contact.',
	},
	siteURL: 'https://danifer.dev',
	email: 'danifer1695@gmail.com',
	phone: '+33 7 80 97 67 79',
	social: [
		{ label: 'Portfolio', href: 'https://danifer.dev' },
		{ label: 'GitHub', href: 'https://github.com/danifer1695' },
		{ label: 'LinkedIn', href: 'https://linkedin.com/in/danifer1695' },
	],
} as const satisfies ProfileSource;

export function getProfile(locale: Locale): Profile {
	return {
		...profile,
		headline: tr(profile.headline, locale),
		intro: tr(profile.intro, locale),
		location: tr(profile.location, locale),
		about: trList(profile.about, locale),
		languages: trList(profile.languages, locale),
		description: tr(profile.description, locale),
	};
}
