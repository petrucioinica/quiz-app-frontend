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

export interface MatchPlayerInterface {
	id: string;
	username: string;
	email: string;
	elo: number;
	noOfRankedGames: number;
	noOfUnrankedGames: number;
	divisionId: number;
	roleId: number;
	role: {
		id: number;
		name: string;
	};
	timeInQueue: number;
}

export interface MatchInterface {
	p1: MatchPlayerInterface;
	p2: MatchPlayerInterface;
	matchId: string;
	questions: Question[];
}

export interface UseMatchReturnInterface {
	isLoading: boolean;
	matchInfo: MatchInterface | null;
	points: PointsInterface;
}

export interface PointsInterface {
	p1: number;
	p2: number;
}
