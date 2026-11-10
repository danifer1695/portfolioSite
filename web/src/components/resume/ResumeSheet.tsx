import type { ResumeView } from '@/content/resume-view';
import { ResumeSection } from './ResumeSection';
import Image from 'next/image';
import { getProfile } from '@/content/profile';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';

export function ResumeSheet({ view }: { view: ResumeView }) {
	const locale = useLocale();
	const t = useTranslations();
	const profile = getProfile(locale);

	return (
		<article
			className="
				mx-auto
				w-full
				max-w-[210mm]
				bg-white
				text-sm
				text-neutral-900
				shadow-lg
				print:max-w-none
				print:p-0
				print:shadow-none
		"
		>
			{/*Resume header*/}
			<header className="p-8 mb-10 bg-metroBlue shadow-lg [print-color-adjust:exact]">
				<div className="flex flex-row gap-8 w-full h-full relative">
					{/*Left-justified section*/}
					<div className="flex flex-row w-fit gap-8">
						{/*Profile photo*/}
						<Image
							src={profile.photo.src}
							width={profile.photo.width}
							height={profile.photo.height}
							alt={t('pages.home.photoAlt', { name: profile.name })}
							className="
								size-30
								rounded-full
								outline-8
								outline-white
								-outline-offset-1
							"
						/>

						{/*Name plus title plus location*/}
						<div className="flex flex-col h-full justify-center">
							<h1 className="text-white text-2xl font-bold tracking-tight">{view.name}</h1>
							<h2 className="text-white/70 text-xl font-bold">{profile.headline}</h2>
							<p className="text-white/70 text-neutral-600">{profile.location}</p>
						</div>
					</div>

					{/*Contacts*/}
					<ul className="mt-2 flex flex-col ml-auto gap-x-4 gap-y-1 text-white text-xs">
						{/*Contact Links*/}
						{view.contacts.map((c) => (
							<li key={c.href}>
								<span className="sr-only">{c.label}: </span>
								<a href={c.href} className="underline-offset-2 hover:underline">
									{c.text}
								</a>
							</li>
						))}
					</ul>
				</div>
			</header>

			{/*Resume sections: Professional, Academic, Projects*/}
			<div className="flex flex-col space-y-5 px-8 mb-8">
				{/*Work experience*/}
				<ResumeSection section={view.sections[0]} />

				{/*Project sections*/}
				<ResumeSection section={view.sections[2]} />

				{/*Academic bg*/}
				<ResumeSection section={view.sections[1]} />
			</div>

			{/*Footer*/}
			<div className="flex flex-col py-4 px-4 bg-metroBlue [print-color-adjust:exact]">
				{/*Skills list*/}
				<section className="flex flex-row break-inside-avoid text-white">
					<p className="mb-2 font-bold uppercase tracking-widest mr-2">{view.skillHeading}</p>
					<p className="text-xs">{view.skills.join(' • ')}</p>
				</section>

				{/*Language list*/}
				<section className="flex flex-row break-inside-avoid text-white">
					<p className="mb-2 font-bold uppercase tracking-widest mr-2">{view.languageHeading}</p>
					<p className="text-xs">{view.languages.join(' • ')}</p>
				</section>
			</div>
		</article>
	);
}
