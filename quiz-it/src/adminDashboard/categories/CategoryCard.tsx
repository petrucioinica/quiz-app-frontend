import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Flex,
	Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { QIButton } from "../../common/QIButton";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";
import { CreateCategoryModal } from "./CreateCategoryModal";
import { Category } from "./types";

interface CategoryCardProps {
	category: Category;
	deleteCategory: (category: Category) => Promise<void>;
	updateCategory: (category: Partial<Category>) => Promise<void>;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
	category,
	deleteCategory,
	updateCategory,
}) => {
	const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
	const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
	const handleDelete = async () => {
		await deleteCategory(category);
		setDeleteModalOpen(false);
	};

	const onDeleteModalClose = () => {
		setDeleteModalOpen(false);
	};

	const onDeleteModalOpen = () => {
		setDeleteModalOpen(true);
	};

	const onUpdateModalClose = () => {
		setUpdateModalOpen(false);
	};

	const onUpdateModalOpen = () => {
		setUpdateModalOpen(true);
	};

	const handleUpdate = async (cat: Partial<Category>) => {
		updateCategory(cat);
		setUpdateModalOpen(false);
	};

	return (
		<AccordionItem
			my={4}
			borderColor="primary.500"
			borderRadius={12}
			borderWidth={2}
			minH="64px"
			display={"flex"}
			alignItems={"center"}
			justifyContent={"space-between"}
			px={4}>
			<Text
				fontWeight="bold"
				fontSize="xx-large"
				color="primary.500"
				display="block">
				{category.name}
			</Text>

			<Flex>
				<QIButton
					variant="solid"
					colorScheme={"warning"}
					mx={2}
					onClick={onUpdateModalOpen}>
					<EditIcon />
				</QIButton>

				<QIButton variant="solid" colorScheme={"danger"} mx={2}>
					<DeleteIcon onClick={onDeleteModalOpen} />
				</QIButton>

				{deleteModalOpen && (
					<ConfirmDeleteModal
						category={category}
						onClose={onDeleteModalClose}
						onConfirm={handleDelete}
					/>
				)}

				{updateModalOpen && (
					<CreateCategoryModal
						onFinish={handleUpdate}
						onClose={onUpdateModalClose}
						category={category}
					/>
				)}
			</Flex>
		</AccordionItem>
	);
};
