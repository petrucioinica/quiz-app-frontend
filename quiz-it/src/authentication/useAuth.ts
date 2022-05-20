import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { RegisterFormState } from "../register/types";
import { apiClientFactory } from "../utils/apiClient";
import { QIUser, UseAuth } from "./useAuth.types";

export const useAuth: UseAuth = () => {
	const [user, setUser] = useState<QIUser | null>(null);
	const [didMount, setDidMount] = useState<boolean>(false);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token") ?? "";
		if (token) {
			setUser(jwt_decode(token));
		}
		setDidMount(true);
	}, [didMount]);
	//returns null if it worked and the error if it did not
	const registerUser = async (formData: RegisterFormState) => {
		try {
			const apiClient = apiClientFactory();
			await apiClient.post("/api/user/register", formData);
			return null;
		} catch (err) {
			console.error(err); //@ts-ignore
			return err.response.data;
		}
	};

	const logInFromActivation = (token: string) => {
		localStorage.setItem("token", token);
		setUser(jwt_decode(token));
		navigate("/");
	};

	const logOut = () => {
		localStorage.removeItem("token");
		setUser(null);
		navigate("/login");
	};
	return { user, setUser, registerUser, logInFromActivation, didMount, logOut };
};
