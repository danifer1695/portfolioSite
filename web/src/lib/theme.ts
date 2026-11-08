export const THEME_KEY = 'theme';

export const themeScript = `
	(() => {
		try {
			const stored = localStorage.getItem('${THEME_KEY}');
			const theme = stored === 'light' || stored === 'dark'
				? stored
				: matchMedia('(prefers-color-cheme: dark)').matches ? 'dark' : 'light';
			document.documentElement.dataset.theme = theme;
		} catch {}
	})();
`;
