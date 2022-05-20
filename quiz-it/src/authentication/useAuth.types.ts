import { RegisterFormState } from "../register/types";

export interface QIUser {
	username: string;
	role: number;
	email: string;
	elo: number;
	roleId: number;
}

export interface ErrorInterface {
	error: string;
	message: string;
}

export interface UseAuthReturn {
	user: QIUser | null;
	setUser: (val: QIUser | null) => void;
	registerUser: (val: RegisterFormState) => Promise<null | ErrorInterface>;
	logInFromActivation: (token: string) => void;
	didMount: boolean;
	logOut: () => void;
}

export type UseAuth = () => UseAuthReturn;
