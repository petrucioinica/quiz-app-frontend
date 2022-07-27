export interface CategoryInterface {
	id: string;
	name: string;
	createdAt: string;
	updatedAt: string;
}

export interface Question {
	id: string;
	question: string;
	first: string;
	second: string;
	third: string;
	fourth: string;
	availableTime: number;
	picture: null | string;
	correctAnswer: number;
	createdAt: string;
	updatedAt: string;
	categoryId: string;
	category: CategoryInterface;
}
