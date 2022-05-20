import { Flex, FlexProps, Text } from "@chakra-ui/react";
import React from "react";

interface InputLabelProps extends FlexProps {
	label: string;
}

export const InputLabel: React.FC<InputLabelProps> = (props) => {
	const { label, ...other } = props;
	return (
		<Flex direction={"column"} {...other} my={3} width="100%">
			<Text fontSize="2xl" my={2} fontWeight="bold">
				{label}
			</Text>
			{props.children}
		</Flex>
	);
};
