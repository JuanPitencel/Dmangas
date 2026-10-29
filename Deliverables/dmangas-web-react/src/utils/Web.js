export const isDesktop = () => {
	return (parseFloat(window.innerWidth) > 900);
};
export const isMobile = () => {
	return (parseFloat(window.innerWidth) <= 900);
};