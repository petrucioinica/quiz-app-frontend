import { useState } from "react";
import { QIUser, UseAuth } from "./useAuth.types";

export const useAuth: UseAuth = () => {
	const [user, setUser] = useState<QIUser | null>(null);
	return { user, setUser };
};
