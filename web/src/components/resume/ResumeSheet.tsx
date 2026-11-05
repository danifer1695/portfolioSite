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
				w-full m
				ax-w-[210mm]
				bg-white
				p-[12mm]
				text-sm
				text-neutral-900
				shadow-lg
				print:max-w-none
				print:p-0
				print:shadow-none
		"
		>
			{/*Resume header*/}
			<header className="p-4 mb-10 bg-metroBlue shadow-lg [print-color-adjust:exact]">
				<div className="flex flex-row gap-8 w-full h-full relative">
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
							absolute
							left-2
						"
					/>

					{/*Name plus title plus location*/}
					<div className="flex flex-col h-full justify-content-center ml-40">
						<h1 className="text-white text-3xl font-bold tracking-tight">{view.name}</h1>
						<p className="text-white/70 text-neutral-600">{profile.location}</p>
						<h2 className="text-white/70 text-xl font-bold">{profile.headline}</h2>
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
			<div className="space-y-5">
				{/*Put Work experience and projects side by side*/}
				<div className="flex flex-row space-x-4 gap-8">
					<div className="flex-1 flex flex-col gap-5">
						{/*Work experience*/}
						<ResumeSection section={view.sections[0]} />

						{/*Skills list*/}
						<div className="flex flex-col space-y-8 py-4 px-4 outline-metroBlue outline-4 rounded-xl">
							<section className="break-inside-avoid">
								<h2 className="mb-2 text-xl font-bold uppercase tracking-widest text-metroBlue">{view.skillHeading}</h2>
								<p>{view.skills.join(' • ')}</p>
							</section>
						</div>
					</div>

					<div className="flex-1 flex flex-col gap-5">
						{/*Project sections*/}
						<ResumeSection section={view.sections[2]} />

						{/*Academic bg*/}
						<ResumeSection section={view.sections[1]} />
					</div>
				</div>
			</div>
		</article>
	);
}
