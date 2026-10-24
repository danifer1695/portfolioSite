export const ui = {
	lines: {
		professional: {
			name: 'Work Experience',
			tagline: 'Listing of previous positions.',
		},
		academics: {
			name: 'Academic Background',
			tagline: 'Completed programs.',
		},
		technical: {
			name: 'Projects',
			tagline: 'Personal and group projects.',
		},
	},
	nav: {
		home: 'Home',
		resume: 'Resume',
		contact: 'Contact',
	},
	footer: {
		contact: 'Contact',
		copyright: '© {year} {name}',
	},
	common: {
		present: 'Present',
	},
	pages: {
		home: {
			intro: 'Placeholder intro.',
			legendTitle: 'Lines',
			mapTitle: 'Career Map',
		},
		professional: {
			title: 'Work Experience',
			intro: 'Placeholder intro.',
		},
		academics: {
			title: 'Academic Background',
			intro: 'Placeholder intro.',
		},
		technical: {
			title: 'Projects',
			intro: 'Placeholder intro.',
		},
		resume: {
			title: 'Resume',
			print: 'Print / Save as PDF',
			skills: 'Skills',
		},
		contact: {
			title: 'Contact',
			intro: 'Placeholder intro.',
			formPlaceholder: 'Form coming soon',
			emailLabel: 'Email',
			phoneLabel: 'Phone',
		},
		notFound: {
			title: 'Page not found.',
			body: 'That page does not exist.',
			backHome: 'Back to Home',
		},
	},
} as const;
