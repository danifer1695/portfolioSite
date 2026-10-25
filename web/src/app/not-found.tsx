import { Container } from '@/components/ui/container';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function NotFound() {
	const t = useTranslations('pages.notFound')

	return (
		<Container className="space-y-4 py-24">
			<h1 className="text-4xl font-bold tracking-tight">{t('title')}</h1>
			<p className="text-muted">{t('body')}</p>
			<Link href="/" className="underline">
				{t('backHome')}
			</Link>
		</Container>
	);
}
