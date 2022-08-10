import { Flex, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { MatchContext } from ".";
import { QIButton } from "../common/QIButton";

interface AnswerButtonProps {
	answer: 1 | 2 | 3 | 4;
}

export const AnswerButton: React.FC<AnswerButtonProps> = ({ answer }) => {
	const { matchInfo, currentQuestion, selectedAnswer, setSelectedAnswer } =
		useContext(MatchContext);

	const getText = () => {
		switch (answer) {
			case 1:
				return matchInfo?.questions[currentQuestion].first;
			case 2:
				return matchInfo?.questions[currentQuestion].second;
			case 3:
				return matchInfo?.questions[currentQuestion].third;
			case 4:
				return matchInfo?.questions[currentQuestion].fourth;
		}
	};

	const isSelected = () => {
		return selectedAnswer === answer;
	};

	const handleClick = () => {
		setSelectedAnswer(answer);
	};

	return (
		<Flex
			h="100%"
			borderColor="white"
			border="2px solid"
			borderRadius={"16px"}
			justifyContent="center"
			alignItems={"center"}
			p={2}
			bgColor={isSelected() ? "primary.300" : "primary.600"}
			color="white"
			fontFamily={"secondary"}
			fontSize="2xl"
			textAlign="center"
			cursor="pointer"
			_hover={{ backgroundColor: isSelected() ? "primary.300" : "primary.700" }}
			_active={{
				backgroundColor: "primary.800",
			}}
			onClick={handleClick}>
			{getText()}
		</Flex>
	);
};
