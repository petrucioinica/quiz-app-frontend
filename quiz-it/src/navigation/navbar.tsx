import { ChevronDownIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	useColorMode,
	useColorModeValue,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { AuthContext } from "../authentication";
import { UseAuthReturn } from "../authentication/useAuth.types";
import { Divider } from "@chakra-ui/react";
import { NavContext } from ".";
import { UseNavReturn } from "./types";
import { Link, useLocation } from "react-router-dom";
import { QIButton } from "../common/QIButton";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

const NAVBAR_HEIGHT = "64px";

export const Navbar: React.FC = () => {
	const { user, logOut } = useContext(AuthContext) as UseAuthReturn;
	const { toggleColorMode } = useColorMode();
	const text = useColorModeValue("dark", "light");
	const SwitchIcon = useColorModeValue(FaMoon, FaSun);
	const { possibleRoutes } = useContext(NavContext) as UseNavReturn;
	const location = useLocation();

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const onOpen = () => {
		setIsOpen(true);
	};

	const onClose = () => {
		setIsOpen(false);
	};

	return (
		<Flex
			height={NAVBAR_HEIGHT}
			bgColor={"primary.700"}
			color="primary.300"
			alignItems={"center"}
			justifyContent={[
				"flex-end",
				"flex-end",
				"space-between",
				"space-between",
				"space-between",
			]}
			px={[4, 4, 20, 20, 20]}>
			<Flex display={["none", "none", "flex", "flex", "flex"]}>
				{possibleRoutes.map((route) => (
					<Text
						key={route.value}
						fontWeight={"bold"}
						fontSize="xxx-large"
						fontFamily={"secondary"}
						mx={8}
						color={
							(location.pathname.includes(route.value) &&
								location.pathname !== "/") ||
							(location.pathname === "/" &&
								route.title.toLowerCase() === "play")
								? "secondary.500"
								: "primary.500"
						}
						_hover={{ color: "secondary.300" }}>
						<Link to={route.value}>{route.title}</Link>
					</Text>
				))}
			</Flex>

			<Menu>
				<MenuButton
					as={Button}
					rightIcon={<ChevronDownIcon />}
					variant="solid"
					colorScheme={"primary"}
					_focus={{ boxShadow: "none" }}
					fontFamily="secondary"
					fontSize={"3xl"}
					py={3}
					display={["none", "none", "flex", "flex", "flex"]}>
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

			<QIButton
				variant="solid"
				colorScheme={"primary"}
				onClick={onOpen}
				display={["flex", "flex", "none", "none", "none"]}
				alignItems="center">
				<HamburgerIcon />
			</QIButton>

			<Drawer isOpen={isOpen} placement="right" onClose={onClose}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton
						variant="solid"
						colorScheme={"primary"}
						_focus={{ boxShadow: "none" }}
						fontSize={20}
						mt={3}
						color="primary.700"
					/>
					<DrawerHeader>
						<Text
							fontFamily={"secondary"}
							fontSize="xx-large"
							color="primary.700">
							{user?.username}
						</Text>
					</DrawerHeader>

					<DrawerBody>
						<Flex
							direction="column"
							justifyContent={"space-between"}
							height="70vh">
							<Flex direction="column" color="primary.500">
								{possibleRoutes.map((route) => (
									<Text
										key={route.title}
										fontWeight={"bold"}
										fontSize="xx-large"
										fontFamily={"secondary"}
										py={2}>
										<Link to={route.value}>{route.title}</Link>
									</Text>
								))}
								<Divider mx={2} color="primary.500" />
								<ColorModeSwitcher />
							</Flex>
						</Flex>

						<Flex
							color="primary.500"
							justifyContent={"center"}
							direction="column">
							<QIButton
								variant="solid"
								colorScheme={"warning"}
								onClick={logOut}>
								Log out
							</QIButton>
						</Flex>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</Flex>
	);
};
