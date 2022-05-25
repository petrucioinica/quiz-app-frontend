import { TriangleDownIcon } from "@chakra-ui/icons";
import {
	Box,
	BoxProps,
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from "@chakra-ui/react";
import React, { ReactNode, useEffect, useState } from "react";

export interface QiDropdownOption {
	value: string;
	display: ReactNode;
}

//@ts-ignore
interface QiDropdownProps extends BoxProps {
	options: QiDropdownOption[];
	error?: string;
	placeholder?: string;
	onChange?: (newVal: string) => void;
	value?: string;
	removeBorder?: boolean;
	name?: string;
}

export const QiDropdown: React.FC<QiDropdownProps> = (props) => {
	const {
		options,
		error,
		placeholder,
		onChange,
		value,
		removeBorder,
		name,
		...other
	} = props;

	const [currentOption, setCurrentOption] = useState<QiDropdownOption>(
		props.value
			? props.options.filter((option) => option.value == props.value)[0]
			: props.options[0]
	);

	useEffect(() => {
		if (props.onChange) {
			props.onChange(currentOption.value);
		}
	}, [currentOption]);

	const changeOption = (option: QiDropdownOption) => {
		setCurrentOption(option);
	};
	return (
		<Box {...other}>
			<Menu matchWidth>
				<MenuButton
					width="100%"
					border={!props.removeBorder ? "2px solid" : ""}
					h={10}
					borderColor={props.error ? "danger.300" : "primary.300"}
					borderRadius={10}
					color={props.error ? "danger.500" : "primary.500"}
					_hover={{ boderColor: props.error ? "danger.500" : "primary.500" }}
					_focus={{
						borderColor: props.error ? "danger.500" : "primary.700",
					}}
					p={2}>
					<Flex
						width="100%"
						height="100%"
						justifyContent="space-between"
						alignItems="center">
						{currentOption.display}

						<TriangleDownIcon />
					</Flex>
				</MenuButton>

				<MenuList
					border="2px solid"
					borderRadius={10}
					borderColor="primary.500"
					zIndex={100}
					maxH="80vh"
					overflowY={"auto"}>
					{props.options.map((option) => (
						<MenuItem
							onClick={() => changeOption(option)}
							key={option.value}
							value={option.value}>
							{option.display}
						</MenuItem>
					))}
				</MenuList>
			</Menu>
			{props.error && (
				<Box textAlign="right" width="100%" px={2}>
					<Text fontFamily="primary" fontSize="sm" color="danger.500">
						{props.error}
					</Text>
				</Box>
			)}
		</Box>
	);
};
