export const ui = {
	lines: {
		professional: {
			name: 'Professional',
			tagline: 'Professional Experience',
		},
		academics: {
			name: 'Academics',
			tagline: 'Education',
		},
		technical: {
			name: 'Technical',
			tagline: 'Projects',
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
			title: 'Professional',
			intro: 'Placeholder intro.',
		},
		academics: {
			title: 'Academics',
			intro: 'Placeholder intro.',
		},
		technical: {
			title: 'Technical',
			intro: 'Placeholder intro.',
		},
		resume: {
			title: 'Resume',
			placeholder: 'Coming soon',
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
