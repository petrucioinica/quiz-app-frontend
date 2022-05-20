import axios from "axios";

export const baseURL = "http://localhost:3001";

export const apiClientFactory = () => {
	const token = localStorage.getItem("token");

	return axios.create({
		baseURL: baseURL,
		responseType: "json",
		headers: {
			"Content-Type": "application/json",
			Authorizaton: `Bearer ${token}`,
		},
	});
};
