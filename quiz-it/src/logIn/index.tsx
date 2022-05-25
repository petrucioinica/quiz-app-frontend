import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../authentication";
import { UseAuthReturn } from "../authentication/useAuth.types";
import { InputLabel } from "../common/InputLabel";
import { QIButton } from "../common/QIButton";
import { QIInput } from "../common/QIInput";
import { QISpinner } from "../common/QISpinner";
import { LogInErrorsState, LogInFormState } from "./types";

export const LogIn: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState<LogInErrorsState>({
		email: "",
		password: "",
		global: "",
	});
	const [formState, setFormState] = useState<LogInFormState>({
		email: "",
		password: "",
	});
	const { logIn } = useContext(AuthContext) as UseAuthReturn;

	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormState({
			...formState,
			email: e.target.value,
		});
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormState({
			...formState,
			password: e.target.value,
		});
	};

	const handleLoginClick = async () => {
		setLoading(true);
		setErrors({
			...errors,
			global: "",
		});
		const err = await logIn(formState);
		if (err) {
			setErrors({
				...errors,
				global: err.message,
			});
		}
		setLoading(false);
	};

	return (
		<Flex
			height={"100%"}
			width="100%"
			color="primary.500"
			justifyContent={"center"}
			alignItems={["start", "start", "center", "center", "center"]}
			px={4}>
			<Flex
				direction={"column"}
				w={["100%", "100%", "600px", "600px", "600px"]}
				justifyContent={"center"}
				alignItems="center">
				<Text fontWeight={"bold"} fontSize="5xl" fontFamily={"secondary"}>
					Log In
				</Text>

				<InputLabel label="Username:">
					<QIInput value={formState.email} onChange={handleUsernameChange} />
				</InputLabel>

				<InputLabel label="Password:">
					<QIInput
						type="password"
						value={formState.password}
						onChange={handlePasswordChange}
					/>
				</InputLabel>

				<Box minW="60px" my={3}>
					<Text color="danger.500" fontSize={"2xl"}>
						{errors.global}
					</Text>
				</Box>

				<Text fontSize={"xl"}>
					Don't have an account? Click{" "}
					<Link to="/register">
						<Text
							decoration={"underline"}
							display="inline"
							color={"secondary.600"}>
							here
						</Text>
					</Link>{" "}
					to create one.
				</Text>

				<QIButton
					marginTop={[20, 20, 30, 40, 40]}
					width="100%"
					isDisabled={!formState.password || !formState.email}
					isLoading={loading}
					onClick={handleLoginClick}
					colorScheme="primary"
					variant="solid">
					Log In
				</QIButton>
			</Flex>
		</Flex>
	);
};
