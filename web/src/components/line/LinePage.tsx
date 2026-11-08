//this component will the the building blocks for the professional, academics and projects pages.
//they all work the same so it does not make sense to write them separately 3 times.

import { Container } from '../ui/container';
import { cn } from '@/lib/cn';
import type { Line } from '@/content/lines';
import { LineTrack } from './LineTrack';
import type { Stop } from './types';
import { OpenStopFromId } from './OpenStopFromId';
import MessageBox from '../ui/MessageBox';
import { useTranslations } from 'next-intl';

export function LinePage({ line, title, intro, stops }: { line: Line; title: string; intro: string; stops: readonly Stop[] }) {
	const t = useTranslations();

	return (
		<Container className="space-y-10 py-12 md:max-w-4xl">
			{/*Messages*/}
			<div className="flex flex-col space-y-2">
				{/*Warning message - WIP*/}
				<MessageBox type="warning">
					<p>{t('temp.wip')}</p>
				</MessageBox>
			</div>

			{/*Line - ordered list*/}
			<LineTrack intro={intro} title={title} line={line} stops={stops} />
			<OpenStopFromId />
		</Container>
	);
}
