import {
	Box,
	Flex,
	Text,
	useColorModeValue,
	useInterval,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { QIButton } from "../common/QIButton";
import { QITheme } from "../QITheme";
import { QueueType } from "./types";

export interface QueueProps {
	setQueue: (val: QueueType) => void;
}

export const RankedQueue: React.FC<QueueProps> = ({ setQueue }) => {
	const { colors } = QITheme;
	const bgColor = useColorModeValue("gray.100", "black");
	const border = useColorModeValue("", `2px solid ${colors.gray[500]}`);
	const [timeElapsed, setTimeElapsed] = useState<number>(0);
	useInterval(() => {
		setTimeElapsed(timeElapsed + 1);
	}, 1000);

	const formatTimeElasped = () => {
		let minutes = Math.floor(timeElapsed / 10).toString();
		if (minutes.length < 2) {
			minutes = "0" + minutes;
		}

		let seconds = (timeElapsed % 60).toString();
		if (seconds.length < 2) {
			seconds = "0" + seconds;
		}
		return minutes + " : " + seconds;
	};

	const handleCancelClick = () => {
		setQueue("none");
	};

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
				boxShadow={"0px 10px 15px 10px rgba(0,0,0,0.1)"}>
				<Flex width="100%" justifyContent={"space-between"}>
					<Text fontWeight={"bold"} fontSize="3xl">
						Queued for:
					</Text>
					<Text
						fontWeight={"bold"}
						fontSize="3xl"
						color="alternate.500"
						fontFamily={"secondary"}>
						RANKED
					</Text>
				</Flex>

				<Box my={2}>
					<Text fontSize="2xl">Time elapsed:</Text>
					<Text fontSize="2xl">{formatTimeElasped()}</Text>
				</Box>

				<QIButton
					variant="solid"
					colorScheme={"warning"}
					mt="80px"
					onClick={handleCancelClick}>
					CANCEL
				</QIButton>
			</Flex>
		</Flex>
	);
};
