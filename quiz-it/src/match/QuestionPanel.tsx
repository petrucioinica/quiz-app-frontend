import { Box, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { MatchContext } from ".";
import { AnswerButton } from "./AnswerButton";
import { Timer } from "./Timer";

export const QuestionPanel: React.FC = () => {
	const { matchInfo, currentQuestion } = useContext(MatchContext);
	return (
		<Flex
			direction="column"
			flex={1}
			m={4}
			mb="200px"
			fontSize="3xl"
			fontWeight={"bold"}>
			<Flex w="100%" justifyContent={"center"} px={12}>
				<Text textAlign={"center"}>
					{matchInfo?.questions[currentQuestion].question}
				</Text>
			</Flex>
			<SimpleGrid flex={1} columns={2} spacing="4px">
				<AnswerButton answer={1} />
				<AnswerButton answer={2} />
				<AnswerButton answer={3} />
				<AnswerButton answer={4} />
			</SimpleGrid>

			<Timer />
		</Flex>
	);
};
