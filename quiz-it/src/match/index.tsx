import { Box, Flex, Spinner, useColorModeValue } from "@chakra-ui/react";
import React, { createContext } from "react";
import { QISpinner } from "../common/QISpinner";
import { PlayerPanel } from "./PlayerPanel";
import { QuestionPanel } from "./QuestionPanel";
import { UseMatchReturnInterface } from "./types";
import { useMatch } from "./useMatch";
import { motion } from "framer-motion";

export const MatchContext = createContext<UseMatchReturnInterface>(
	{} as UseMatchReturnInterface
);

export const MatchComponent: React.FC = () => {
	const match = useMatch();
	const bgColor = useColorModeValue("white", "black");
	return (
		<MatchContext.Provider value={match}>
			<Flex
				width="100%"
				maxW="100vw"
				h="100%"
				justifyContent={"center"}
				p={[2, 2, 4, 6]}>
				{match.isLoading ? (
					<QISpinner />
				) : (
					<Flex
						bgColor={bgColor}
						borderRadius="18px"
						w="100%"
						boxShadow={"xl"}
						border="2px solid"
						borderColor={"white"}>
						<PlayerPanel playerNumber={1} />
						<QuestionPanel />
						<PlayerPanel playerNumber={2} />
					</Flex>
				)}
			</Flex>
		</MatchContext.Provider>
	);
};