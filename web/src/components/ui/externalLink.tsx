import { cn } from "@/lib/cn";

//External link component
export function ExternalLink({ className, ...props }: React.ComponentProps<'a'>) {
	return (
		<a
			{...props}
			target="_blank" //opens a new tab every time this is clicked on
			//noreferrer: prevents passing the referrer information to the target website by removing the referral info from the HTTP header
			//noopener: new links must not have an opener browsing context (?) aka- security stuff.
			rel="noopener noreferrer"
			className={cn('underline-offset-4 hover:underline', className)}
		/>
	);
}
