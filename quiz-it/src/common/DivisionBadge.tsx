import { Text } from "@chakra-ui/react";
import React from "react";

interface DivisionBadgeProps {
	division: 1 | 2 | 3;
}

export const DivisionBadge: React.FC<DivisionBadgeProps> = ({ division }) => {
	const getTextColor = () => {
		if (division === 1) {
			return "#ffd700";
		}
		if (division === 2) {
			return "#C0C0C0";
		}
		return "#CD7F32";
	};

	const getText = () => {
		if (division === 1) {
			return "GOLD";
		}
		if (division === 2) {
			return "SILVER";
		}
		return "BRONZE";
	};
	return (
		<Text
			color={getTextColor()}
			fontWeight="bold"
			fontSize={"2xl"}
			fontFamily="secondary">
			{getText()}
		</Text>
	);
};
