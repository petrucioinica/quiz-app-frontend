import { ChevronDownIcon } from "@chakra-ui/icons";
import {
	Button,
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	useColorMode,
	useColorModeValue,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { AuthContext } from "../authentication";
import { UseAuthReturn } from "../authentication/useAuth.types";
import { Divider } from "@chakra-ui/react";

const NAVBAR_HEIGHT = "64px";

export const Navbar: React.FC = () => {
	const { user, logOut } = useContext(AuthContext) as UseAuthReturn;
	const { toggleColorMode } = useColorMode();
	const text = useColorModeValue("dark", "light");
	const SwitchIcon = useColorModeValue(FaMoon, FaSun);
	return (
		<Flex
			width="100%"
			height={NAVBAR_HEIGHT}
			bgColor={"primary.700"}
			color="primary.300"
			alignItems={"center"}
			justifyContent="space-between"
			px={20}>
			<Text fontWeight={"bold"} fontSize="xxx-large" fontFamily={"secondary"}>
				HOME
			</Text>

			<Menu>
				<MenuButton
					as={Button}
					rightIcon={<ChevronDownIcon />}
					variant="solid"
					colorScheme={"primary"}
					_focus={{ boxShadow: "none" }}
					fontFamily="secondary"
					fontSize={"3xl"}
					py={3}>
					{user?.username}
				</MenuButton>

				<MenuList color={"primary.500"} fontSize="xl" fontWeight={"bold"}>
					<MenuItem onClick={logOut}>
						<Flex
							width={"100%"}
							height="100%"
							justifyContent={"center"}
							alignItems="center">
							Log Out
						</Flex>
					</MenuItem>
					<Divider my={2} />
					<MenuItem
						onClick={toggleColorMode}
						aria-label={`Switch to ${text} mode`}>
						<Flex
							width={"100%"}
							height="100%"
							justifyContent={"center"}
							alignItems="center"
							py={4}>
							<SwitchIcon />
						</Flex>
					</MenuItem>
				</MenuList>
			</Menu>
		</Flex>
	);
};
