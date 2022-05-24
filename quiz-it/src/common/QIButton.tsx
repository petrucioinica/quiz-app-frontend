import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

interface QIButtonProps extends ButtonProps {}

export const QIButton: React.FC<QIButtonProps> = (props) => {
	return (
		<Button
			{...props}
			variant="solid"
			_focus={{ boxShadow: "none" }}
			fontFamily="secondary"
			fontSize={"3xl"}
			py={3}>
			{props.children}
		</Button>
	);
};
