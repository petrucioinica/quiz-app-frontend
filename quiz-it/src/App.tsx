import * as React from "react";
import {
	ChakraProvider,
	Box,
	Text,
	Link,
	VStack,
	Code,
	Grid,
	theme,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import { QITheme } from "./QITheme";
import { NavigationWrapper } from "./navigation";
import { AuthWrapper } from "./authentication";

export const App = () => (
	<ChakraProvider theme={QITheme}>
		<AuthWrapper>
			<NavigationWrapper>Hello</NavigationWrapper>
		</AuthWrapper>
	</ChakraProvider>
);
