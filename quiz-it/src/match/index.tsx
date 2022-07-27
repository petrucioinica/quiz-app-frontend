import { Box } from "@chakra-ui/react";
import React from "react";
import { useLocation, useParams } from "react-router";

export const MatchComponent: React.FC = () => {
	const params = useParams();
	return <Box width="100%" maxW="100vw"></Box>;
};
