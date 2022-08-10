import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { MatchContext } from ".";
import { DivisionBadge } from "../common/DivisionBadge";

export const USerPlayerPanel: React.FC = () => {
	const { player, points, matchInfo } = useContext(MatchContext);

	const opponent =
		matchInfo?.p1.id === player.id ? matchInfo.p2 : matchInfo?.p1;
	return (
		<Flex
			position="absolute"
			direction={"column"}
			bottom="0"
			left="30%"
			right="30%"
			minW="30%"
			justifyContent={"space-between"}
			alignItems="center"
			h="200px"
			bgColor="primary.900"
			borderRadius={"24px"}
			border="2px solid"
			borderColor={"white"}
			borderBottom="0px"
			color="white"
			borderBottomRadius={"0px"}
			p={2}>
			<Flex w="100%">
				<Flex direction="column" h="100%" justifyContent={"space-around"}>
					<Heading fontWeight={"bold"} fontFamily="secondary">
						{player.username}
					</Heading>

					<Flex my={1}>
						<Text fontSize="2xl" fontWeight={"bold"}>
							ELO:
						</Text>

						<Text color="primary.500" fontSize={"2xl"} fontWeight="bold" mx={4}>
							{player.elo}
						</Text>
					</Flex>

					<DivisionBadge division={player.divisionId as 1 | 2 | 3} />
				</Flex>

				<Flex justifyContent="center" alignItems={"center"} flex={1} h="100%">
					<Text fontSize={"5xl"} fontWeight="bold" fontFamily={"secondary"}>
						VS
					</Text>
				</Flex>

				<Flex direction="column" h="100%" justifyContent={"space-around"}>
					<Heading fontWeight={"bold"} fontFamily="secondary">
						{opponent?.username}
					</Heading>

					<Flex my={1}>
						<Text fontSize="2xl" fontWeight={"bold"}>
							ELO:
						</Text>

						<Text color="primary.500" fontSize={"2xl"} fontWeight="bold" mx={4}>
							{opponent?.elo}
						</Text>
					</Flex>

					<DivisionBadge division={opponent?.divisionId as 1 | 2 | 3} />
				</Flex>
			</Flex>

			<Flex
				fontFamily="secondary"
				fontWeight={"bold"}
				fontSize="3xl"
				w="100%"
				justifyContent={"center"}>
				<Text>Points:</Text>

				<Text mx={4}>{points}</Text>
			</Flex>
		</Flex>
	);
};
