import React, { createContext } from "react";
import { useAuth } from "./useAuth";
import { UseAuthReturn } from "./useAuth.types";

export const AuthContext = createContext<UseAuthReturn | null>(null);

export const AuthWrapper: React.FC = (props) => {
	const auth = useAuth();
	return (
		<AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
	);
};
