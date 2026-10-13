export const lineIds = ['professional', 'academics', 'technical'] as const;
export type LineId = (typeof lineIds)[number];

export type Line = {
	code: 'P' | 'A' | 'T';
	href: string;
	bgClass: string;
	borderClass: string;
};

//Record<LineId, Line> forces an entry for every id.
export const lines: Record<LineId, Line> = {
	professional: {
		code: 'P',
		href: '/professional',
		bgClass: 'bg-line-p',
		borderClass: 'border-line-p',
	},
	academics: {
		code: 'A',
		href: '/academics',
		bgClass: 'bg-line-a',
		borderClass: 'border-line-a',
	},
	technical: {
		code: 'T',
		href: '/technical',
		bgClass: 'bg-line-t',
		borderClass: 'border-line-t',
	},
};
