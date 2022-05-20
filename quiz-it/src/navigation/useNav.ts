import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../authentication";
import { UseAuthReturn } from "../authentication/useAuth.types";
import { NavRoute, UseNav } from "./types";

const unauthenticatedPossibleRoutes: NavRoute[] = [
	{ value: "/login", title: "Log In" },
	{ value: "/register", title: "Register" },
];

const adminPossibleRoutes: NavRoute[] = [
	{ value: "/admin-dashboard", title: "Manage Questions" },
];

const playerPossibleRoutes: NavRoute[] = [{ value: "/home", title: "Home" }];

export const useNav: UseNav = () => {
	const { user } = useContext(AuthContext) as UseAuthReturn;
	const [possibleRoutes, setPossibleRoutes] = useState<NavRoute[]>([]);
	const location = useLocation();
	const navigate = useNavigate();
	useEffect(() => {
		if (!localStorage.getItem("token")) {
			setPossibleRoutes(unauthenticatedPossibleRoutes);
		} else {
			setPossibleRoutes(adminPossibleRoutes);
		}
	}, [user]);

	useEffect(() => {
		if (possibleRoutes.length) {
			if (
				!possibleRoutes.filter((item) =>
					item.value.includes(location?.pathname)
				) ||
				location?.pathname === "/"
			) {
				navigate(possibleRoutes[0]?.value);
			}
		}
	}, [location, possibleRoutes]);

	return { possibleRoutes, setPossibleRoutes };
};
