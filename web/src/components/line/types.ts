import { GalleryImage } from '@/content/media';

export type Stop = {
	slug: string;
	title: string;
	subtitle: string;
	period: string; //formatted with lib/format's formatPeriod
	summary: string;
	links?: { github?: string; live?: string };
	highlights: readonly string[];
	images: readonly GalleryImage[];
};
