import { Profile } from '@/content/profile';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Container } from '../ui/container';
import { LinkButton } from '../ui/button';
import { CircleSmall, MapPin } from 'lucide-react';

//UPDATE IF I WANT A BG IMAGE
const background: string = '';

export function Bio({ profile }: { profile: Profile }) {
	const t = useTranslations();

	return (
		<section className="relative isolate overflow-hidden bg-metroBlue">
			{
				//only display an image if there is one
				background !== '' && <Image src={background} alt="" fill sizes="100vw" loading="eager" className="-z-10 object-cover" />
			}

			<div aria-hidden="true" className="absolute inset-0 -z-10 bg-metroBlue/50" />

			<Container className="grid items-center gap-8 py-12 md:grid-cols-[auto_1fr]">
				{/*Profile photo*/}
				<Image
					src={profile.photo.src}
					width={profile.photo.width}
					height={profile.photo.height}
					alt={t('pages.home.photoAlt', { name: profile.name })}
					className="
						size-48
						md:size-72
						justify-self-center
						object-cover
						rounded-full
						outline-16
						outline-white
						-outline-offset-1
					"
				/>

				{/*Profile box*/}
				<div
					className="
					md:max-w-150
					md:justify-self-end
					space-y-4
					rounded-2xl
					bg-background/90
					p-6
					text-foreground
					shadow-lg"
				>
					<h1 className="text-4xl font-bold tracking-tight">{profile.name}</h1>
					<p className="text-lg text-muted">{profile.intro}</p>
					<ul className="space-y-2">
						{/*Location*/}
						<li key="location" className="flex items-center gap-4">
							<MapPin aria-hidden="true" className="shrink-0" />
							<div className="w-full rounded-lg bg-muted-md/70 px-4 py-2">{profile.location}</div>
						</li>

						{/*Open to relocation*/}
						<li key="relocation" className="flex items-center gap-4">
							<CircleSmall aria-hidden="true" className="shrink-0" />
							<div className="w-full rounded-lg bg-muted-md/70 px-4 py-2">{t('pages.home.openToRelocation')}</div>
						</li>
					</ul>
					<ul className="flex flex-wrap gap-2">
						{profile.skills.map((skill) => (
							<li key={skill} className="rounded-full border border-border px-3 py-0.5 text-sm">
								{skill}
							</li>
						))}
					</ul>
					<LinkButton href="/resume" textClass="font-bold text-xl" className="w-full mt-4">
						{t('pages.home.goToResume')}
					</LinkButton>
				</div>
			</Container>
		</section>
	);
}
