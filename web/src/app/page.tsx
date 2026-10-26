import Link from 'next/link';
import './globals.css';

export default function RootPage() {
	return (
		<html lang="en">
			<body className="flex min-h-screen items-center justify-center gap-8 bg-background text-foreground">
				<Link href="/en" lang="en" className="text-xl underline-offset-4 hover:underline">
					English
				</Link>
				<Link href="/fr" lang="fr" className="text-xl underline-offset-4 hover:underline">
					French
				</Link>
			</body>
		</html>
	);
}
