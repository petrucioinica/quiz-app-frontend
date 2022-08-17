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
	{ value: "/categories", title: "Categories" },
	{ value: "/questions", title: "Manage Questions" },
];

const playerPossibleRoutes: NavRoute[] = [
	{ value: "/home", title: "PLAY" },
	{ value: "/my-profile", title: "MY PROFILE" },
];

export const useNav: UseNav = () => {
	const { user, didMount } = useContext(AuthContext) as UseAuthReturn;
	const [possibleRoutes, setPossibleRoutes] = useState<NavRoute[]>([]);
	const location = useLocation();
	const navigate = useNavigate();
	useEffect(() => {
		if (didMount) {
			if (!user) {
				setPossibleRoutes(unauthenticatedPossibleRoutes);
			} else {
				if (user.roleId === 0) {
					setPossibleRoutes(adminPossibleRoutes);
				} else {
					setPossibleRoutes(playerPossibleRoutes);
				}
			}
		}
	}, [user, didMount]);

	useEffect(() => {
		if (possibleRoutes.length) {
			if (
				possibleRoutes.filter((item) =>
					item.value.includes(location?.pathname.split("/")[1])
				).length === 0 ||
				location?.pathname === "/"
			) {
				navigate(possibleRoutes[0]?.value);
			}
		} //eslint-disalbe-next-line
	}, [location, possibleRoutes]);

	return { possibleRoutes, setPossibleRoutes };
};
