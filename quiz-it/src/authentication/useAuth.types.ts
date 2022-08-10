import { LogInFormState } from "../logIn/types";
import { RegisterFormState } from "../register/types";

export interface QIUser {
	username: string;
	role: number;
	email: string;
	elo: number;
	roleId: number;
	id: string;
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
}

export type UseAuth = () => UseAuthReturn;
