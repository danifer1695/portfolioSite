import { formatPeriod } from '@/lib/format';
import type { Line, LineId } from './lines';
import { lineIds, lines } from './lines';
import { getProfessional } from './professional';
import { getAcademic } from './academic';
import { getProjects } from './projects';
import { profile } from './profile';
import type { Locale } from '@/i18n/routings';
import { getTranslations } from 'next-intl/server';

export type ResumeEntry = {
	id: string;
	title: string;
	subtitle: string;
	period: string;
	location?: string;
	points: readonly string[];
};

export type ResumeContact = {
	label: string;
	text: string;
	href: string;
};

export type ResumeSectionView = {
	id: LineId;
	heading: string;
	line: Line;
	entries: readonly ResumeEntry[];
};

export type ResumeView = {
	name: string;
	headline: string;
	contacts: readonly ResumeContact[];
	sections: readonly ResumeSectionView[];
	skillHeading: string;
	skills: readonly string[];
};

const LOCALE = 'en';

//remove https and www to make links readable on paper
const displayURL = (href: string) => href.replace(/^https?:\/\/(www\.)?/, '');

export async function getResumeView(locale: Locale): Promise<ResumeView> {

	const t = await getTranslations({locale})
	const present = t('common.present')

	const entriesByLine: Record<LineId, () => readonly ResumeEntry[]> = {
		professional: () =>
			getProfessional(locale).map((job) => ({
				id: job.slug,
				title: job.role,
				subtitle: job.company,
				location: job.location,
				period: formatPeriod(job.start, job.end, LOCALE, present),
				points: job.highlights,
			})),
		academics: () =>
			getAcademic(locale).map((study) => ({
				id: study.slug,
				title: study.title,
				subtitle: study.institution,
				location: study.location,
				period: formatPeriod(study.start, study.end, LOCALE, present),
				points: study.highlights,
			})),
		technical: () =>
			getProjects(locale).map((proj) => ({
				id: proj.slug,
				title: proj.title,
				subtitle: proj.tech.join(' - '),
				period: proj.year,
				points: proj.highlights,
			})),
	};

	return {
		name: profile.name,
		headline: profile.headline,
		contacts: [
			{ label: t('pages.contact.emailLabel'), text: profile.email, href: `mailto:${profile.email}` },
			{ label: t('pages.contact.phoneLabel'), text: profile.phone, href: `tel:${profile.phone.replaceAll(' ', '')}` },
			...profile.social.map((social) => ({ label: social.label, text: displayURL(social.href), href: social.href })),
		],
		sections: lineIds.map((id) => ({
			id,
			heading: t(`lines.${id}.name`),
			line: lines[id],
			entries: entriesByLine[id]()
		})),
		skillHeading: t('pages.resume.skills'),
		skills: profile.skills,
	};
}
