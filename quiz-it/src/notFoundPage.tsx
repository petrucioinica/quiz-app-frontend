import { Flex, Text } from "@chakra-ui/react";
import React from "react";

export const NotFoundPage: React.FC = () => {
	return (
		<Flex
			width={"100%"}
			height="100%"
			justifyContent={"center"}
			alignItems="center">
			<Text fontSize={"3xl"} fontWeight="bold" color="primary.500">
				Oops! The page you are looking for does not exist.
			</Text>
		</Flex>
	);
};
