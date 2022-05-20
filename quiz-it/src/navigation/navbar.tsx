import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const NAVBAR_HEIGHT = "64px";

export const Navbar: React.FC = () => {
	return (
		<Flex
			width="100%"
			height={NAVBAR_HEIGHT}
			bgColor={"primary.700"}
			color="primary.300"
			alignItems={"center"}>
			<Text fontWeight={"bold"} fontSize="xxx-large" fontFamily={"secondary"}>
				HOME
			</Text>
		</Flex>
	);
};
