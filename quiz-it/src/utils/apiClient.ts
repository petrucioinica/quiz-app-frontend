import axios from "axios";

export const baseURL = "http://localhost:3001";

export const apiClientFactory = () => {
	const token = localStorage.getItem("token");

	return axios.create({
		baseURL: baseURL,
		responseType: "json",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	});
};
