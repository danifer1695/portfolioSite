import type { LineId } from './lines';

export type GridPoint = { x: number; y: number }; //coordinates in grid, not pixels

//orientation of a stop's label
export type LabelSide = 'ne' | 'se' | 'sw' | 'nw' | 'n' | 'e' | 's' | 'w';

//Map vertices: they can either be stops, or simple changes in direction of the line
export type LineStop = GridPoint & {
	kind: 'stop';
	slug: string;
	labelSide: LabelSide;
};
export type LineCorner = GridPoint & { kind: 'corner' };

//Single metro line data: composed of an array of either stops or corners
export type LinePath = {
	id: LineId;
	points: readonly (LineStop | LineCorner)[];
};

//Interchange connects two stops, without overlapping them.
export type Interchange = readonly [slugA: string, slugB: string];

//Map grid: portrait ratio - works on phones and desktop
export const mapGrid = { width: 10, height: 16 };

//This is where we map out all the lines. (Maybe we could automate it in the future)
export const linePaths: readonly LinePath[] = [
	{
		id: 'technical',
		points: [
			{ kind: 'stop', slug: 'portfolio-site', x: 10, y: 1, labelSide: 'nw' },
			{ kind: 'corner', x: 9, y: 2 },
			{ kind: 'stop', slug: 'shirabeyou', x: 9, y: 3, labelSide: 'se' },
			{ kind: 'corner', x: 8, y: 4 },
			{ kind: 'stop', slug: 'snake', x: 6, y: 4, labelSide: 'n' },
			{ kind: 'corner', x: 5, y: 4 },
			{ kind: 'stop', slug: 'graphics', x: 4, y: 3, labelSide: 'n' },
		],
	},
	{
		id: 'academics',
		points: [
			{ kind: 'stop', slug: 'concordia-2025', x: 6, y: 5, labelSide: 'se' },
			{ kind: 'stop', slug: 'syn-2018', x: 6, y: 7, labelSide: 'ne' },
			{ kind: 'corner', x: 7, y: 8 },
			{ kind: 'stop', slug: 'focalpoint', x: 7, y: 10, labelSide: 'ne' },
			{ kind: 'corner', x: 5, y: 12 },
			{ kind: 'stop', slug: 'digipen-2013', x: 5, y: 13, labelSide: 'se' },
			{ kind: 'stop', slug: 'parsons-2013', x: 5, y: 15, labelSide: 'se' },
		],
	},
	{
		id: 'professional',
		points: [
			{ kind: 'stop', slug: 'freelance', x: 3, y: 1, labelSide: 'n' },
			{ kind: 'corner', x: 2, y: 2 },
			{ kind: 'stop', slug: 'readality', x: 2, y: 5, labelSide: 'w' },
			{ kind: 'stop', slug: 'virtuos', x: 2, y: 7, labelSide: 'w' },
			{ kind: 'stop', slug: 'kabam', x: 3, y: 8, labelSide: 'sw' },
			{ kind: 'stop', slug: 'microsoft', x: 3, y: 10, labelSide: 'sw' },
			{ kind: 'corner', x: 3, y: 12 },
			{ kind: 'stop', slug: 'ta', x: 4, y: 13, labelSide: 'sw' },
		],
	},
];

//we define the connected interchanges
export const interchanges: readonly Interchange[] = [
	['digipen-2013', 'ta'],
	['concordia-2025', 'snake'],
];
