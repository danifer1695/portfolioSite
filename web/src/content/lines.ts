export const lineIds = ['professional', 'academics', 'technical'] as const;
export type LineId = (typeof lineIds)[number];

export type Line = {
	code: 'P' | 'A' | 'T';
	href: string;
	bgClass: string; //tailwind class for line's color
	borderClass: string; //tailwind class for line's borders
	textClass: 'text-white' | 'text-black'; //tailwind class for line's text color
};

//Record<LineId, Line> forces an entry for every id.
export const lines: Record<LineId, Line> = {
	professional: {
		code: 'P',
		href: '/professional',
		bgClass: 'bg-line-p',
		borderClass: 'border-line-p',
		textClass: 'text-white',
	},
	academics: {
		code: 'A',
		href: '/academics',
		bgClass: 'bg-line-a',
		borderClass: 'border-line-a',
		textClass: 'text-white',
	},
	technical: {
		code: 'T',
		href: '/technical',
		bgClass: 'bg-line-t',
		borderClass: 'border-line-t',
		textClass: 'text-black',
	},
};
