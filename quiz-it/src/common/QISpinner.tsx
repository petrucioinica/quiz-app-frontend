import { Spinner } from "@chakra-ui/react";
import React from "react";

export const QISpinner: React.FC = () => {
	return (
		<Spinner
			color="primary.500"
			size="lg"
			emptyColor="primary.200"
			thickness="8px"
		/>
	);
};
