import {
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
import React from "react";
import { QIButton } from "../../common/QIButton";
import { Category } from "./types";

interface ConfirmDeleteProps {
	category: Category;
	onConfirm: () => Promise<void>;
	onClose: () => void;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteProps> = ({
	category,
	onConfirm,
	onClose,
}) => {
	return (
		<Modal isOpen={true} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader fontFamily="secondary" fontSize="3xl" color="primary.500">
					CONFIRM DELETE
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Text fontSize={"2xl"} color="primary.500">
						{`Are you sure you want to delete ${category.name}? This will also delete the categoy's questions.`}
					</Text>
				</ModalBody>

				<ModalFooter>
					<Flex justifyContent={"flex-end"}>
						<QIButton
							onClick={onClose}
							variant="solid"
							colorScheme={"secondary"}
							mx={6}>
							NO
						</QIButton>
						<QIButton
							onClick={onConfirm}
							variant="solid"
							colorScheme={"danger"}>
							YES
						</QIButton>
					</Flex>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
