export interface Question {
	id?: string;
	question: string;
	first: string;
	second: string;
	third: string;
	fourth: string;
	availableTime: number;
	picture?: string;
	correctAnswer: number;
	categoryId: string;
	category?: {
		id: string;
		name: string;
	};
}
