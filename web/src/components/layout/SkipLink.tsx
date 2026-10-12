//Use: a keyboard user moves through a page with Tab, one focuseable element at a time.
//This lets them skip straight to 'main' without having to tab through each header element each time.

//the item is normally visually hidden ("sr-only") and will only appear as a button when focused on
export function SkipLink() {
	return (
		<a
			href="#main"
			className="
				sr-only
				focus:not-sr-only
				focus:fixed
				focus:top-4
				focus:left-4
				focus:z-50
				focus:rounded-md
				focus:bg-accent
				focus:px-4
				focus:py-2
				focus:text-accent-foreground
			"
		>
			Skip to Content
		</a>
	);
}
