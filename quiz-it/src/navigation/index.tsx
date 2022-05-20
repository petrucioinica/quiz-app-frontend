import { Flex } from "@chakra-ui/react";
import React, { createContext, useContext } from "react";
import { AuthContext } from "../authentication";
import { UseAuthReturn } from "../authentication/useAuth.types";
import { PageLoader } from "../common/PageLoader";
import { Navbar } from "./navbar";
import { UseNavReturn } from "./types";
import { useNav } from "./useNav";

export const NavContext = createContext<UseNavReturn | null>(null);

export const NavigationWrapper: React.FC = (props) => {
	const nav = useNav();
	const { user } = useContext(AuthContext) as UseAuthReturn;

	return (
		<NavContext.Provider value={nav}>
			<Flex width="100vw" height="100vh" overflowX={"auto"} overflowY="hidden">
				{nav.possibleRoutes ? (
					<>
						{user && <Navbar />}
						{props.children}
					</>
				) : (
					<PageLoader />
				)}
			</Flex>
		</NavContext.Provider>
	);
};
