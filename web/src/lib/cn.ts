import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

//resolves tailwind class conflicts: if component has px-4 and caller passes px-6,
//the result has only px-6 and not both
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
