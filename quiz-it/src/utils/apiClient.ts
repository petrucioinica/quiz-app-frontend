import axios from "axios";

export const baseURL = "http://localhost:3001";

export const apiClientFactory = () => {
	const token = localStorage.getItem("token");

	const instance = axios.create({
		baseURL: baseURL,
		responseType: "json",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	});

	instance.interceptors.response.use(
		(res) => {
			return res;
		},
		(err) => {
			console.log(err);
			if (err.response.status === 401) {
				localStorage.removeItem("token"); //@ts-ignore
				window.location.reload();
			} else {
				throw err;
			}
		}
	);

	return instance;
};
