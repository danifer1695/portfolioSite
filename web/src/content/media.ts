//where do images go:
//web/public/images/<line>/<slug>/image.webp
export type GalleryImage = {
	src: string; //to the image
	alt: string; //description of the image for when it does not load
	width: number; //real pixel size of the file, to prevent layout shift
	height: number;
};
