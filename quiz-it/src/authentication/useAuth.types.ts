import { LogInFormState } from "../logIn/types";
import { RegisterFormState } from "../register/types";

export interface QIUser {
	username: string;
	email: string;
	elo: number;
	roleId: number;
	id: string;
	divisionId: number;
	role: {
		id: number;
		name: string;
	};
	division: {
		id: number;
		name: string;
	};
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
	logIn: (formState: LogInFormState) => Promise<void | ErrorInterface>;
	getUserDetails: () => Promise<void>;
}

export type UseAuth = () => UseAuthReturn;
