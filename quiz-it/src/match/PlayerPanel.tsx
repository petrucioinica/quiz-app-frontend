import { Flex, Heading, Text } from "@chakra-ui/react";
import React, { useContext, useMemo } from "react";
import { MatchContext } from ".";
import { DivisionBadge } from "../common/DivisionBadge";
import { MatchPlayerInterface } from "./types";

interface PlayerPanelProps {
	playerNumber: 1 | 2;
}

export const PlayerPanel: React.FC<PlayerPanelProps> = ({ playerNumber }) => {
	const match = useContext(MatchContext);
	const player = useMemo<MatchPlayerInterface | null>(() => {
		if (match && match.matchInfo) {
			if (playerNumber === 1) {
				return match.matchInfo?.p1;
			} else {
				return match.matchInfo?.p2;
			}
		} else {
			return null;
		}
	}, [match]);

	return (
		<Flex
			direction="column"
			m={4}
			bgColor="primary.900"
			w={["200px", "260px", "320px", "360px"]}
			borderRadius={"24px"}
			border="2px solid"
			borderColor={"primary.500"}
			alignItems={"center"}
			color="white"
			p={4}
			justifyContent="space-between">
			<Flex w="100%" direction="column" alignItems={"center"}>
				<Heading fontWeight={"bold"} fontFamily="secondary">
					{player?.username}
				</Heading>

				<Flex w="100%" justifyContent={"space-between"} my={2}>
					<Text fontSize="2xl" fontWeight={"bold"}>
						ELO:
					</Text>

					<Text color="primary.500" fontSize={"2xl"} fontWeight="bold">
						{player?.elo}
					</Text>
				</Flex>
				<DivisionBadge division={player?.divisionId as 1 | 2 | 3} />
			</Flex>

			<Flex
				justifyContent={"space-between"}
				fontFamily="secondary"
				fontWeight={"bold"}
				fontSize="3xl"
				w="100%">
				<Text>Points:</Text>

				<Text>{playerNumber === 1 ? match.points.p1 : match.points.p2}</Text>
			</Flex>
		</Flex>
	);
};
