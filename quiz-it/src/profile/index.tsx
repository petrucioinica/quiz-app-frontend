import { Flex, useColorModeValue, Text, Heading } from "@chakra-ui/react";
import React, { useContext } from "react";
import { AuthContext } from "../authentication";
import { DivisionBadge } from "../common/DivisionBadge";
import { QITheme } from "../QITheme";

export const UserProfileComponent: React.FC = () => {
	const { colors } = QITheme;
	const bgColor = useColorModeValue("gray.100", "black");
	const border = useColorModeValue("", `2px solid ${colors.gray[500]}`);
	const { user } = useContext(AuthContext);
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
				alignItems="center"
				p={4}
				width={["100%", "100%", "600px"]}
				mx={8}
				bgColor={bgColor}
				border={border}
				borderRadius="24px"
				boxShadow={"0px 10px 15px 10px rgba(0,0,0,0.1)"}>
				<Heading fontWeight={"bold"}>{user?.username}</Heading>

				<Flex w="100%" alignItems="cennter" justifyContent={"space-between"}>
					<Text
						fontSize="3xl"
						fontWeight={"semibold"}
						fontFamily="secondary"
						display="block">
						Division:
					</Text>
					<DivisionBadge division={user?.divisionId as 1 | 2 | 3} />
				</Flex>

				<Text fontSize="3xl" fontWeight={"semibold"} fontFamily="secondary">
					ELO:
				</Text>
				<Text fontSize="3xl" fontWeight={"semibold"} fontFamily="secondary">
					{user?.elo}
				</Text>

				<Flex w="100%" alignItems="cennter" justifyContent={"space-between"}>
					<Text
						fontSize="3xl"
						fontWeight={"semibold"}
						fontFamily="secondary"
						display="block">
						Email:
					</Text>

					<Text fontSize="3xl" fontWeight={"semibold"} display="block">
						{user?.email}
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};
