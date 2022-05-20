export interface RegisterFormState {
	username: string;
	password: string;
	email: string;
	repeatPassword: string;
}

export interface RegisterErrorsState {
	username: string;
	password: string;
	email: string;
	repeatPassword: string;
	global: string;
}
