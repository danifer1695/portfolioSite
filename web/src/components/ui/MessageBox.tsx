import { cn } from '@/lib/cn';

type MessageType = 'info' | 'warning' | 'error';

const styles: Record<MessageType, string> = {
	info: 'border-info-fg text-info-fg bg-info-bg',
	warning: 'border-warning-fg text-warning-fg bg-warning-bg',
	error: 'border-error-fg text-error-fg bg-error-bg',
};

export default function MessageBox({ type, children, className }: { type: MessageType; children: React.ReactNode; className?: string }) {
	return <div className={cn('w-fit border-dashed rounded-xl border-2 px-6 py-4 font-semibold', styles[type], className)}>{children}</div>;
}
