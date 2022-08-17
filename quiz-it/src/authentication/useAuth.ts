import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { LogInFormState } from "../logIn/types";
import { RegisterFormState } from "../register/types";
import { apiClientFactory } from "../utils/apiClient";
import { QIUser, UseAuth } from "./useAuth.types";

export const useAuth: UseAuth = () => {
	const [user, setUser] = useState<QIUser | null>(null);
	const [didMount, setDidMount] = useState<boolean>(false);
	const navigate = useNavigate();

	const getUserDetails = async () => {
		const apiClient = await apiClientFactory();
		await apiClient
			.get("/api/user/get-user-details")
			.then((res) => {
				console.log(res.data);
				setUser(res.data);
			})
			.catch((err) => console.error(err))
			.finally(() => setDidMount(true));
	};

	useEffect(() => {
		if (!didMount) {
			const token = localStorage.getItem("token") ?? "";
			if (token) {
				getUserDetails();
				setUser(jwt_decode(token));
			} else {
				setDidMount(true);
			}
		}
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

	const logIn = async (formData: LogInFormState) => {
		try {
			const apiClient = apiClientFactory();
			const res = await apiClient.post("/api/user/login", formData);
			localStorage.setItem("token", res.data.token);
			setUser(jwt_decode(res.data.token));
			navigate("/");
		} catch (err) {
			console.error(err); //@ts-ignore
			return err.response.data;
		}
	};
	return {
		user,
		setUser,
		registerUser,
		logInFromActivation,
		didMount,
		logOut,
		logIn,
		getUserDetails,
	};
};
