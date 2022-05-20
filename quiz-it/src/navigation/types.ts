export interface NavRoute {
	value: string;
	title: string;
}

export interface UseNavReturn {
	possibleRoutes: NavRoute[];
	setPossibleRoutes: (val: NavRoute[]) => void;
}

export type UseNav = () => UseNavReturn;
