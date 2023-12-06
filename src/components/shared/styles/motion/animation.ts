export const animationOpacity = {
	initial: { opacity: 0 }, // Начальное состояние: невидимость
	animate: { opacity: 1 }, // Конечное состояние: видимость
};

export const animationRocket = {
	y: [0, -5, 5, 0],
	x: [0, 2, 4, 0, 2, -2, 0],
};
export const animationRocketTransition = {
	y: {
		duration: 1.5,
		ease: "easeInOut",
		repeat: Infinity,
	},
	x: {
		duration: 1.5,
		ease: "easeInOut",
		repeat: Infinity,
	},
};
