'use client';

import { useEffect } from 'react';

export function OpenStopFromId() {
	useEffect(() => {
		const openFromId = () => {
			//look for the element using its id
			const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
			//if target is one of these collapsable elements
			if (target instanceof HTMLDetailsElement) target.open = true;
		};

		openFromId();
		window.addEventListener('hashchange', openFromId);

		//cleanup function
		return () => window.removeEventListener('hashchange', openFromId);
	}, []);

	return null;
}
