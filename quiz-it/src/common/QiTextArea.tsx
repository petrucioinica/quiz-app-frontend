import { Box, Text, Textarea, TextareaProps } from "@chakra-ui/react";
import React from "react";

interface QIInputProps extends TextareaProps {
	error?: string;
}

export const QiTextArea: React.FC<QIInputProps> = (props) => {
	const { error, ...other } = props;
	return (
		<Box width="100%">
			<Textarea
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
