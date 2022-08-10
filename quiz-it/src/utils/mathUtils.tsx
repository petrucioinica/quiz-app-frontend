export const calculatePoints = (availableTime: number, timeLeft: number) => {
	return Math.floor((timeLeft * 100) / availableTime);
};
