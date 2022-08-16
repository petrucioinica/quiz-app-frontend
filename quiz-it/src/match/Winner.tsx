import { Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { QITheme } from "../QITheme";

export const Winner: React.FC = () => {
	const { colors } = QITheme;
	const bgColor = useColorModeValue("gray.100", "black");
	const border = useColorModeValue("", `2px solid ${colors.gray[500]}`);
	return (
		<Flex
			justifyContent={"center"}
			width="100%"
			maxW="100vw"
			alignItems={"center"}
			my={4}
			direction="column">
			<Flex
				direction="column"
				p={4}
				width={["100%", "100%", "500px"]}
				mx={8}
				bgColor={bgColor}
				border={border}
				borderRadius="24px"
				boxShadow={"0px 10px 15px 10px rgba(0,0,0,0.1)"}
				textAlign="center">
				<Heading color="secondary.500" fontFamily="secondary">
					You WIN
				</Heading>
			</Flex>
		</Flex>
	);
};
