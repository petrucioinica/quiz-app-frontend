import { ChevronDownIcon } from "@chakra-ui/icons";
import {
	Button,
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { AuthContext } from "../authentication";
import { UseAuthReturn } from "../authentication/useAuth.types";
import { QIButton } from "../common/QIButton";

const NAVBAR_HEIGHT = "64px";

export const Navbar: React.FC = () => {
	const { user, logOut } = useContext(AuthContext) as UseAuthReturn;
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
					<MenuItem onClick={logOut}>Log Out</MenuItem>
				</MenuList>
			</Menu>
		</Flex>
	);
};
