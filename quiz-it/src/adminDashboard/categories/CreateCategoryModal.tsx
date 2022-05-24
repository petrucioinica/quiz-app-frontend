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
import React, { useState } from "react";
import { InputLabel } from "../../common/InputLabel";
import { QIButton } from "../../common/QIButton";
import { QIInput } from "../../common/QIInput";
import { Category } from "./types";

interface CreateCategoryModalProps {
	category?: Category;
	onFinish: (category: Partial<Category>) => Promise<void>;
	onClose: () => void;
}

export const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({
	category,
	onFinish,
	onClose,
}) => {
	const [categoryState, setCategoryState] = useState<Partial<Category>>(
		category ?? { name: "" }
	);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCategoryState({ ...categoryState, name: e.target.value });
	};

	const handleFinish = () => {
		onFinish(categoryState);
	};
	return (
		<Modal isOpen={true} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader fontFamily="secondary" fontSize="3xl" color="primary.500">
					{category ? "Update Category" : "Create category"}
				</ModalHeader>
				<ModalCloseButton _focus={{ outline: "none" }} />
				<ModalBody>
					<InputLabel label="Name">
						<QIInput onChange={handleInputChange} value={categoryState.name} />
					</InputLabel>
				</ModalBody>

				<ModalFooter>
					<Flex justifyContent={"flex-end"}>
						<QIButton onClick={onClose} variant="ghost" mx={6}>
							CLOSE
						</QIButton>
						<QIButton
							onClick={handleFinish}
							variant="solid"
							colorScheme={category ? "warning" : "primary"}>
							{category ? "SAVE" : "CREATE"}
						</QIButton>
					</Flex>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
