import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "../authentication";
import { ErrorInterface, UseAuthReturn } from "../authentication/useAuth.types";
import { PageLoader } from "../common/PageLoader";
import { apiClientFactory } from "../utils/apiClient";

export const ActivateAccount: React.FC = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [error, setError] = useState<ErrorInterface | null>(null);
	const { logInFromActivation } = useContext(AuthContext) as UseAuthReturn;

	const activateEmail = async (email: string, token: string) => {
		try {
			const apiClient = apiClientFactory();
			const res = await apiClient.get(
				`/api/user/confirm-email/${email}/${token}`
			);
			logInFromActivation(res.data.token);
		} catch (err) {
			console.error(err);
			//@ts-ignore
			setError(err.response.data);
		}
	};

	useEffect(() => {
		const email = searchParams.get("email") ?? "";
		const token = searchParams.get("token") ?? "";
		activateEmail(email, token);
	}, []);

	return error ? (
		<Modal isOpen={true} onClose={() => {}}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader fontFamily="secondary" fontSize="3xl" color="danger.700">
					{error.error}
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Text fontSize={"2xl"} color="primary.500">
						{error.message}
					</Text>
				</ModalBody>

				<ModalFooter></ModalFooter>
			</ModalContent>
		</Modal>
	) : (
		<PageLoader />
	);
};
