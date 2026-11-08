'use client';

import { Button } from '../ui/button';

export function PrintButton({ label }: { label: string }) {
	return (
		<Button onClick={() => window.print()} className="text-white print:hidden">
			{label}
		</Button>
	);
}
