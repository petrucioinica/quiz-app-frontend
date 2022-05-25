import {
	Box,
	Flex,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../authentication";
import { UseAuthReturn } from "../authentication/useAuth.types";
import { InputLabel } from "../common/InputLabel";
import { QIButton } from "../common/QIButton";
import { QIInput } from "../common/QIInput";
import { validateEmail, validatePassword } from "../utils/validators";
import { RegisterErrorsState, RegisterFormState } from "./types";

export const Register: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState<RegisterErrorsState>({
		username: "",
		password: "",
		global: "",
		email: "",
		repeatPassword: "",
	});
	const [formState, setFormState] = useState<RegisterFormState>({
		username: "",
		password: "",
		email: "",
		repeatPassword: "",
	});
	const { registerUser } = useContext(AuthContext) as UseAuthReturn;
	const [emailModalOpen, setEmailModalOpen] = useState<boolean>(false);

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormState({
			...formState,
			email: e.target.value,
		});
	};

	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormState({
			...formState,
			username: e.target.value,
		});
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormState({
			...formState,
			password: e.target.value,
		});

		if (e.target.value === formState.repeatPassword) {
			setErrors({
				...errors,
				repeatPassword: "",
			});
		}
	};

	const handleRepeatPasswordChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setFormState({
			...formState,
			repeatPassword: e.target.value,
		});

		if (e.target.value === formState.password) {
			setErrors({
				...errors,
				repeatPassword: "",
			});
		}
	};

	const handleEmailBlur = () => {
		if (!formState.email) {
			setErrors({
				...errors,
				email: "This field is required.",
			});
			return;
		}

		if (!validateEmail(formState.email)) {
			setErrors({
				...errors,
				email: "Please enter a valid E-mail.",
			});
			return;
		}

		setErrors({
			...errors,
			email: "",
		});
	};

	const handlePasswordBlur = () => {
		if (!formState.password) {
			setErrors({
				...errors,
				password: "This field is required.",
			});
			return;
		}

		if (!validatePassword(formState.password)) {
			setErrors({
				...errors,
				password:
					"Please enter a valid password. It must have at least 8 characters, an uppercase letter, a lowercase letter, a number and a special character.",
			});
			return;
		}

		setErrors({
			...errors,
			password: "",
		});
	};

	const handleRepeatPasswordBlur = () => {
		if (formState.password !== formState.repeatPassword) {
			setErrors({
				...errors,
				repeatPassword: "Make sure this matches the password field.",
			});
		}
	};

	const handleUsernameBlur = () => {
		if (!formState.username) {
			setErrors({
				...errors,
				username: "This field is required.",
			});
			return;
		}

		setErrors({
			...errors,
			username: "",
		});
	};

	const canClickButton = () => {
		if (
			!formState.email ||
			!formState.password ||
			!formState.repeatPassword ||
			!formState.username
		) {
			return false;
		}

		for (const key of Object.keys(errors)) {
			if (key !== "global") {
				//@ts-ignore
				if (errors[key]) {
					return false;
				}
			}
		}
		return true;
	};

	const handleRegisterClick = async () => {
		setLoading(true);
		setErrors({
			...errors,
			global: "",
		});
		const err = await registerUser(formState);
		if (err) {
			setErrors({
				...errors,
				global: err.message,
			});
		} else {
			setEmailModalOpen(true);
		}

		setLoading(false);
	};

	const onModalClose = () => {
		setEmailModalOpen(false);
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
					Register
				</Text>

				<InputLabel label="Email:">
					<QIInput
						value={formState.email}
						onChange={handleEmailChange}
						onBlur={handleEmailBlur}
						error={errors.email}
					/>
				</InputLabel>
				<InputLabel label="Username:">
					<QIInput
						value={formState.username}
						onChange={handleUsernameChange}
						onBlur={handleUsernameBlur}
						error={errors.username}
					/>
				</InputLabel>

				<InputLabel label="Password:">
					<QIInput
						type="password"
						value={formState.password}
						onChange={handlePasswordChange}
						onBlur={handlePasswordBlur}
						error={errors.password}
					/>
				</InputLabel>

				<InputLabel label="Repeat password:">
					<QIInput
						type="password"
						value={formState.repeatPassword}
						onChange={handleRepeatPasswordChange}
						onBlur={handleRepeatPasswordBlur}
						error={errors.repeatPassword}
					/>
				</InputLabel>

				<Box minW="60px" my={3}>
					<Text color="danger.500" fontSize={"xl"}>
						{errors.global}
					</Text>
				</Box>

				<Text fontSize={"xl"}>
					Already have an account? Click{" "}
					<Link to="/login">
						<Text
							decoration={"underline"}
							display="inline"
							color={"secondary.600"}>
							here
						</Text>
					</Link>{" "}
					to log in.
				</Text>

				<QIButton
					marginTop={[2, 2, 20, 30, 30]}
					width="100%"
					isDisabled={!canClickButton()}
					isLoading={loading}
					onClick={handleRegisterClick}
					colorScheme="primary"
					variant="solid">
					Register
				</QIButton>
			</Flex>

			<Modal isOpen={emailModalOpen} onClose={onModalClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader
						fontFamily="secondary"
						fontSize="3xl"
						color="primary.700">
						Registration succeded
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text fontSize={"2xl"} color="primary.500">
							Your account has been created! We have sent you an E-mail with a
							link in order to activate your account. Remember to also check
							spam!
						</Text>
					</ModalBody>

					<ModalFooter>
						<QIButton
							colorScheme="primary"
							mr={3}
							onClick={onModalClose}
							px={12}>
							OK
						</QIButton>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Flex>
	);
};
