import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import { AuthWrapper } from "./authentication";
import { LogIn } from "./logIn";
import { NavigationWrapper } from "./navigation";
import { QITheme } from "./QITheme";
import { Register } from "./register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageLoader } from "./common/PageLoader";
import { NotFoundPage } from "./notFoundPage";
import { ActivateAccount } from "./activateAccount";
import { Home } from "./home";
import { Categories } from "./adminDashboard/categories";
import { Questions } from "./adminDashboard/questions";
import { MatchComponent } from "./match";
import { UserProfileComponent } from "./profile";

export const App = () => (
	<ChakraProvider theme={QITheme}>
		<BrowserRouter>
			<AuthWrapper>
				<NavigationWrapper>
					<Routes>
						<Route path="/login" element={<LogIn />} />
						<Route path="/register" element={<Register />} />
						<Route path="/" element={<PageLoader />} />
						<Route path="/activate-account" element={<ActivateAccount />} />
						<Route path="/home" element={<Home />} />
						<Route path="/categories" element={<Categories />} />
						<Route path="/questions" element={<Questions />} />
						<Route path="*" element={<NotFoundPage />} />
						<Route path="/home/match/:matchId" element={<MatchComponent />} />
						<Route path="/my-profile" element={<UserProfileComponent />} />
					</Routes>
				</NavigationWrapper>
			</AuthWrapper>
		</BrowserRouter>
	</ChakraProvider>
);
