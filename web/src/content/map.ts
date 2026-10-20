import type { LineId } from './lines';

export type GridPoint = { x: number; y: number }; //coordinates in grid, not pixels

//orientation of a stop's label
export type LabelSide = 'ne' | 'se' | 'sw' | 'nw';

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
export const mapGrid = { width: 12, height: 16 };

//This is where we map out all the lines. (Maybe we could automate it in the future)
export const linePaths: readonly LinePath[] = [
	{
		id: 'academics',
		points: [
			{ kind: 'stop', slug: 'syn-2018', x: 2, y: 13, labelSide: 'nw' },
			{ kind: 'corner', x: 2, y: 11 },
			{ kind: 'stop', slug: 'concordia-2025', x: 5, y: 8, labelSide: 'nw' },
		],
	},
	{
		id: 'technical',
		points: [
			{ kind: 'stop', slug: 'shirabeyou', x: 6, y: 8, labelSide: 'se' },
			{ kind: 'stop', slug: 'portfolio-site', x: 6, y: 3, labelSide: 'nw' },
		],
	},
	{
		id: 'professional',
		points: [
			{ kind: 'stop', slug: 'freelance', x: 11, y: 14, labelSide: 'nw' },
			{ kind: 'corner', x: 11, y: 10 },
			{ kind: 'stop', slug: 'readality', x: 8, y: 7, labelSide: 'ne' },
			{ kind: 'stop', slug: 'virtuos', x: 8, y: 5, labelSide: 'ne' },
			{ kind: 'stop', slug: 'kabam', x: 8, y: 3, labelSide: 'ne' },
		],
	},
];

//we define the connected interchanges
export const interchanges: readonly Interchange[] = [['concordia-2025', 'shirabeyou']];
