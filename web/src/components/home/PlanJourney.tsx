'use client';

import type { Profile } from '@/content/profile';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { MapPin, CircleSmall, ArrowUpDown, CalendarDays } from 'lucide-react';
import { motion } from 'motion/react';
import { LinkButton } from '../ui/button';
import { cn } from '@/lib/cn';
import { focusRing } from '@/lib/styles';
import { toJourneyQuery } from '@/lib/journey';

//Tailwind classes
const box: string = 'flex flex-row w-full border-1 border-border rounded-lg bg-transparent px-4 py-2';

//Skill selection classes
const chip = {
	on: 'border-metroBlue bg-metroBlue text-white',
	off: 'border-border hover:bg-muted/20',
} as const;

export function PlanJourney({ profile, onFlip }: { profile: Profile; onFlip: () => void }) {
	const t = useTranslations('pages.home');

	//states
	const [company, setCompany] = useState('');
	const [from, setFrom] = useState('');
	const [to, setTo] = useState('');
	const [skills, setSkills] = useState<string[]>([]);

	function toggleSkill(skill: string) {
		setSkills((current) => (current.includes(skill) ? current.filter((s) => s !== skill) : [...current, skill]));
	}

	function changeFrom(value: string) {
		setFrom(value);
		if (to && value > to) setTo('');
	}

	return (
		<div
			className="
				md:max-w-150
				md:justify-self-end
				space-y-4
				rounded-2xl
				bg-background
				p-6
				text-foreground
				shadow-lg"
		>
			<h2 className="text-4xl text-metroBlue dark:text-foreground font-bold tracking-tight">{t('planJourney')}</h2>
			<p className="text-lg text-muted">{profile.intro}</p>

			{/*Destination selection fields & button*/}
			<div className="relative">
				{/*Dots connectiong icons*/}
				<div className="h-4 absolute left-2 top-1/2 -translate-y-1/2 border-l-5 border-dotted border-foreground" />

				<ul className="space-y-2">
					{/*From*/}
					<li className="flex items-center gap-4">
						<MapPin aria-hidden="true" className="shrink-0" />
						<div aria-label={t('journey.from')} className={box}>
							<div className="text-muted mr-4 font-medium min-w-12 border-r-1 border-border">{t('journey.from')} </div>
							{profile.location}
						</div>
					</li>
					{/*To*/}
					<li className="flex items-center gap-4">
						<CircleSmall aria-hidden="true" className="shrink-0" />
						<div aria-label={t('journey.to')} className={box}>
							<div className="text-muted mr-4 font-medium min-w-12 border-r-1 border-border">{t('journey.to')} </div>
							<input
								aria-label={t('journey.to')}
								placeholder={t('journey.toPlaceholder')}
								maxLength={100}
								value={company}
								onChange={(e) => setCompany(e.target.value)}
								className="w-full"
							/>
						</div>
					</li>
				</ul>

				{/*Flip icon*/}
				<motion.button
					type="button"
					aria-hidden="true"
					tabIndex={-1}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={onFlip}
					className="hidden md:block border-border/70 border-1 absolute -right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white shadow-lg"
				>
					<ArrowUpDown className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" color="black" />
				</motion.button>
			</div>

			{/*Dates*/}
			<div className="grid gap-2 md:grid-cols-2">
				{/*Starting*/}
				<label className="space-y-1">
					<span className="flex items-center gap-2 text-sm text-muted">
						<CalendarDays aria-hidden="true" className="size-4" />
						{t('journey.startDate')}
					</span>
					<input type="date" value={from} onChange={(e) => changeFrom(e.target.value)} className={box} />
				</label>

				{/*Ends*/}
				<label className="space-y-1">
					<span className="flex items-center gap-2 text-sm text-muted">
						<CalendarDays aria-hidden="true" className="size-4" />
						{t('journey.endDate')}
					</span>
					<input type="date" value={to} onChange={(e) => setTo(e.target.value)} className={box} />
				</label>
			</div>

			{/*Skills*/}
			<details className="group">
				<summary className={cn('cursor-pointer text-sm text-muted font-medium', focusRing)}>
					{t('journey.skillsToggle')}
					{skills.length > 0 && ` (${skills.length})`}
				</summary>
				<ul className="flex flex-wrap gap-2 py-4">
					{profile.skills.map((skill) => {
						const selected = skills.includes(skill);
						return (
							<li key={skill}>
								<button
									type="button"
									aria-pressed={selected}
									onClick={() => toggleSkill(skill)}
									className={cn('rounded-full border border-border px-3 py-0.5 text-sm', focusRing, selected ? chip.on : chip.off)}
								>
									{skill}
								</button>
							</li>
						);
					})}
				</ul>
			</details>

			{/*Send Button*/}
			<LinkButton
				href={{
					pathname: '/contact',
					query: toJourneyQuery({
						company,
						skills,
						from,
						to,
					}),
				}}
				textClass="font-bold text-white text-xl"
				className="w-full mt-4"
			>
				{t('letsGo')}
			</LinkButton>
		</div>
	);
}
