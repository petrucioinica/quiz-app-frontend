import { Flex, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { MatchContext } from ".";

export const Timer: React.FC = () => {
	const { timer } = useContext(MatchContext);
	return (
		<Flex w="100%" justifyContent={"center"}>
			<Text fontWeight={"bold"} fontFamily="secondary" fontSize={"5xl"}>
				{`${timer}`}
			</Text>
		</Flex>
	);
};
