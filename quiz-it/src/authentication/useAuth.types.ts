export interface QIUser {
	username: string;
	role: number;
	email: string;
	elo: number;
	id: string;
}

export interface UseAuthReturn {
	user: QIUser | null;
	setUser: (val: QIUser | null) => void;
}

export type UseAuth = () => UseAuthReturn;
