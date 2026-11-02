'use client';

import { Profile } from '@/content/profile';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Container } from '../ui/container';
import { LinkButton } from '../ui/button';
import { ArrowUpDown, CircleSmall, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

//UPDATE IF I WANT A BG IMAGE
const background: string = '';

//Add motion features to a react component
const MotionImage = motion.create(Image);

export function Bio({ profile }: { profile: Profile }) {
	const t = useTranslations();

	//to trigger profile pic rotation animation
	const [rotation, setRotation] = useState(0);
	function FaceRotation() {
		setRotation((r) => r + 360);
	}

	return (
		<section className="relative isolate overflow-hidden bg-metroBlue">
			{
				//only display an image if there is one
				background !== '' && <Image src={background} alt="" fill sizes="100vw" loading="eager" className="-z-10 object-cover" />
			}

			<div aria-hidden="true" className="absolute inset-0 -z-10 bg-metroBlue/50" />

			<Container className="grid items-center gap-8 py-12 md:grid-cols-[auto_1fr]">
				<div className="flex place-self-center flex-col space-y-8 w-fit h-full">
					{/*Profile photo*/}
					<MotionImage
						src={profile.photo.src}
						width={profile.photo.width}
						height={profile.photo.height}
						animate={{ rotate: rotation }}
						transition={{ type: 'spring', duration: 1.5 }}
						alt={t('pages.home.photoAlt', { name: profile.name })}
						className="
							size-48
							md:size-72
							place-self-center
							object-cover
							rounded-full
							outline-16
							outline-white
							-outline-offset-1
						"
					/>

					<div className="flex flex-col w-full">
						<h1 className="text-6xl place-self-center font-bold tracking-widest uppercase">Daniel</h1>
						<h1 className="text-2xl place-self-center font-bold tracking-wide">Fernandez Matinez</h1>
					</div>
				</div>

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
					<h1 className="text-4xl font-bold tracking-tight">{t('pages.home.planJourney')}</h1>
					<p className="text-lg text-muted">{profile.intro}</p>

					{/*Destination selection fields & button*/}
					<div className="relative">
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

						{/*Flip icon*/}
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={FaceRotation}
							className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-foreground shadow-lg"
						>
							<ArrowUpDown className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" color="var(--background)" />
						</motion.button>
					</div>

					<ul className="flex flex-wrap gap-2">
						{profile.skills.map((skill) => (
							<li key={skill} className="rounded-full border border-border px-3 py-0.5 text-sm">
								{skill}
							</li>
						))}
					</ul>
					<LinkButton href="/contact" textClass="font-bold text-xl" className="w-full mt-4">
						{t('pages.home.letsGo')}
					</LinkButton>
				</div>
			</Container>
		</section>
	);
}
