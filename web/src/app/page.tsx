import './globals.css';
import en from '../../messages/en.json';
import fr from '../../messages/fr.json';

export default function RootPage() {
	return (
		<html lang="en">
			<body className="flex min-h-screen items-center justify-center gap-8 bg-background text-foreground">
				<a href="/en" lang="en" className="text-xl underline-offset-4 hover:underline">
					English
				</a>
				<a href="/fr" lang="en" className="text-xl underline-offset-4 hover:underline">
					French
				</a>
			</body>
		</html>
	);
}
