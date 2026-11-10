'use client';

import { Profile } from '@/content/profile';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Container } from '../ui/container';
import { motion } from 'motion/react';
import { useState } from 'react';
import { PlanJourney } from './PlanJourney';

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

					<div className="flex flex-col w-full text-white">
						<h1 className="text-6xl place-self-center font-bold tracking-widest uppercase">Daniel</h1>
						<h1 className="text-2xl place-self-center font-bold tracking-wide">Fernandez Matinez</h1>
					</div>
				</div>

				{/*Profile box*/}
				<PlanJourney profile={profile} onFlip={FaceRotation} />
			</Container>
		</section>
	);
}
