import { cn } from '@/lib/cn';
import { MessageCircleMore, OctagonAlert, TriangleAlert } from 'lucide-react';

type MessageType = 'info' | 'warning' | 'error';

const styles: Record<MessageType, string> = {
	info: 'border-info-fg text-info-fg bg-info-bg',
	warning: 'border-warning-fg text-warning-fg bg-warning-bg',
	error: 'border-error-fg text-error-fg bg-error-bg',
};

export default function MessageBox({ type, children, className }: { type: MessageType; children: React.ReactNode; className?: string }) {
	//Determine which icon to show
	function determineIcon(type: MessageType) {
		switch (type) {
			case 'info':
				return <MessageCircleMore color="var(--info-fg)" />;
			case 'warning':
				return <TriangleAlert color="var(--warning-fg)" />;
			default:
				return <OctagonAlert color="var(--error-fg)" />;
		}
	}

	return (
		<div className={cn('flex gap-4 border-dashed rounded-xl border-2 px-6 py-4', styles[type], className)}>
			{determineIcon(type)}
			{children}
		</div>
	);
}
