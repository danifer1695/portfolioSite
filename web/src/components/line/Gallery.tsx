import { GalleryImage } from '@/content/media';
import Image from 'next/image';

export function Gallery({ images }: { images: readonly GalleryImage[] }) {
	if (images.length === 0) return null;

	//overflow-x-auto: makes the row scroll sideways
	//snap-x, snap-center, snap-mandatory: make it so scroll settles with an image in the middle

	return (
		<ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
			{images.map((img) => (
				<li key={img.src} className="shrink-0 snap-center">
					<Image
						src={img.src}
						alt={img.alt}
						width={img.width}
						height={img.height}
						className="h-48 w-auto rounded-md object-cover md:h-64"
					/>
				</li>
			))}
		</ul>
	);
}
