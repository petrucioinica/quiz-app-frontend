import { Box, Input, InputProps, Text } from "@chakra-ui/react";
import React from "react";

interface QIInputProps extends InputProps {
	error?: string;
}

export const QIInput: React.FC<QIInputProps> = (props) => {
	const { error, ...other } = props;
	return (
		<Box width="100%">
			<Input
				{...other}
				colorScheme="primary"
				focusBorderColor={error ? "danger.500" : "primary.500"}
				borderColor={error ? "danger.500" : "primary.300"}
				width="100%"
			/>
			{!!error && <Text color="danger.500">{error}</Text>}
		</Box>
	);
};
