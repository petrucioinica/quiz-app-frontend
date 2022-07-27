import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { QueuePicker } from "./QueuePicker";
import { RankedQueue } from "./RankedQueue";
import { QueueType } from "./types";
import { UnrankedQueue } from "./UnrankedQueue";

export const Home: React.FC = () => {
	const [currentQueue, setCurrentQueue] = useState<QueueType>("none");

	return (
		<Box width="100%" fontWeight={"bold"} px={4} textAlign="center">
			<Text fontSize="5xl" color="primary.500">
				QuizIt!
			</Text>

			{currentQueue === "none" && <QueuePicker setQueue={setCurrentQueue} />}
			{currentQueue === "ranked" && <RankedQueue setQueue={setCurrentQueue} />}
			{currentQueue === "unranked" && (
				<UnrankedQueue setQueue={setCurrentQueue} />
			)}
		</Box>
	);
};
