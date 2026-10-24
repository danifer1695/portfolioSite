import { formatPeriod } from '@/lib/format';
import { Line, LineId, lineIds, lines } from './lines';
import { getProfessional } from './professional';
import { getAcademic } from './academic';
import { ui } from './ui';
import { getProjects } from './projects';
import { profile } from './profile';

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

const entriesByLine: Record<LineId, () => readonly ResumeEntry[]> = {
	professional: () =>
		getProfessional().map((job) => ({
			id: job.slug,
			title: job.role,
			subtitle: job.company,
			location: job.location,
			period: formatPeriod(job.start, job.end, LOCALE, ui.common.present),
			points: job.highlights,
		})),
	academics: () =>
		getAcademic().map((study) => ({
			id: study.slug,
			title: study.title,
			subtitle: study.institution,
			location: study.location,
			period: formatPeriod(study.start, study.end, LOCALE, ui.common.present),
			points: study.highlights,
		})),
	technical: () =>
		getProjects().map((proj) => ({
			id: proj.slug,
			title: proj.title,
			subtitle: proj.tech.join(' - '),
			period: proj.year,
			points: proj.highlights,
		})),
};

export function getResumeView(): ResumeView {
	return {
		name: profile.name,
		headline: profile.headline,
		contacts: [
			{ label: ui.pages.contact.emailLabel, text: profile.email, href: `mailto:${profile.email}` },
			{ label: ui.pages.contact.phoneLabel, text: profile.phone, href: `tel:${profile.phone.replaceAll(' ', '')}` },
			...profile.social.map((social) => ({ label: social.label, text: displayURL(social.href), href: social.href })),
		],
		sections: lineIds.map((id) => ({ id, heading: ui.lines[id].name, line: lines[id], entries: entriesByLine[id]() })),
		skillHeading: ui.pages.resume.skills,
		skills: profile.skills,
	};
}
