import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";

export const PageLoader: React.FC = () => {
	return (
		<Flex
			width={"100%"}
			height="100%"
			justifyContent={"center"}
			alignItems="center">
			<Spinner
				color="primary.500"
				size="xl"
				emptyColor="primary.200"
				thickness="12px"
			/>
		</Flex>
	);
};
