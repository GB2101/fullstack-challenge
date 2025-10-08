export function getPaginationFormat(pages: number, current: number) {
	return {
		active: current,
		buttons: {
			prev: current > 1,
			next: current < pages,
		},
		ellipsis: {
			before: current > 3,
			after: current < pages - 2,
		},
		limits: {
			start: current >= 3,
			end: current < pages - 1,
		},
		pages: [ current - 1, current, current + 1 ].filter(page => page > 0 && page <= pages),
	};
}
