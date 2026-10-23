import { GalleryImage } from '@/content/media';

export type Stop = {
	slug: string;
	title: string;
	subtitle: string;
	period: string; //formatted with lib/format's formatPeriod
	summary: string;
	highlights: readonly string[];
	images: readonly GalleryImage[];
};
