export const parseDate = (date: string) => new Date(date).toLocaleDateString();
export const parseDateTime = (date: string) => new Date(date).toLocaleString();

export const formatTitle = (title: string) => {
	return title.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}
