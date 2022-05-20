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

export const App = () => (
	<ChakraProvider theme={QITheme}>
		<BrowserRouter>
			<AuthWrapper>
				<NavigationWrapper>
					<Routes>
						<Route path="/login" element={<LogIn />} />
						<Route path="/register" element={<Register />} />
						<Route path="/" element={<PageLoader />} />
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</NavigationWrapper>
			</AuthWrapper>
		</BrowserRouter>
	</ChakraProvider>
);
