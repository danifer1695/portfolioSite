import './globals.css';
import en from '../../messages/en.json';
import fr from '../../messages/fr.json';

export default function NotFound() {
	return (
		<html lang="en">
			<body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background text-foreground">
				<h1 className="text-4xl font-bold tracking-tight">
					{en.pages.notFound.title} · <span lang="fr">{fr.pages.notFound.title}</span>
				</h1>
				<p className="flex gap-4">
					<a href="/en" className="underline">
						{en.pages.notFound.backHome}
					</a>
					<a href="/fr" lang="fr" className="underline">
						{fr.pages.notFound.backHome}
					</a>
				</p>
			</body>
		</html>
	);
}
