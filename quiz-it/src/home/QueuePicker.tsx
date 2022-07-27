import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { QIButton } from "../common/QIButton";
import { QITheme } from "../QITheme";
import { QueueType } from "./types";

interface QueuePickerProps {
	setQueue: (val: QueueType) => void;
}

export const QueuePicker: React.FC<QueuePickerProps> = ({ setQueue }) => {
	const { colors } = QITheme;
	const bgColor = useColorModeValue("gray.100", "black");
	const border = useColorModeValue("", `2px solid ${colors.gray[500]}`);

	const handleRankedClick = () => {
		setQueue("ranked");
	};

	const handleUnrankedClick = () => {
		setQueue("unranked");
	};

	return (
		<Flex
			justifyContent={"center"}
			width="100%"
			maxW="100vw"
			alignItems={"center"}
			my={4}
			direction={["column", "column", "row"]}>
			<QIButton
				width="200px"
				m={8}
				height="200px"
				bgColor={bgColor}
				border={border}
				borderRadius="24px"
				boxShadow={"0px 10px 15px 10px rgba(0,0,0,0.1)"}
				justifyContent={"center"}
				alignItems="center"
				onClick={handleRankedClick}>
				<Text color="alternate.500" fontWeight={"bold"} fontSize="3xl">
					Play <br /> ranked
				</Text>
			</QIButton>

			<QIButton
				onClick={handleUnrankedClick}
				width="200px"
				m={8}
				height="200px"
				bgColor={bgColor}
				border={border}
				borderRadius="24px"
				boxShadow={"0px 10px 15px 10px rgba(0,0,0,0.1)"}
				justifyContent={"center"}
				alignItems="center">
				<Text color="secondary.500" fontWeight={"bold"} fontSize="3xl">
					Play <br /> Unranked
				</Text>
			</QIButton>
		</Flex>
	);
};
