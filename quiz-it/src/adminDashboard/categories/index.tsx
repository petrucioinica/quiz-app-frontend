import { Accordion, Alert, AlertIcon, Flex, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PageLoader } from "../../common/PageLoader";
import { QIButton } from "../../common/QIButton";
import { apiClientFactory } from "../../utils/apiClient";
import { CategoryCard } from "./CategoryCard";
import { CreateCategoryModal } from "./CreateCategoryModal";
import { Category } from "./types";

export const Categories: React.FC = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
	const toast = useToast();

	const getCategories = async () => {
		try {
			const apiClient = apiClientFactory();
			const res = await apiClient.get("/api/category/get-all");
			setCategories(res.data);
		} catch (err) {
			toast({
				//@ts-ignore
				title: err.response.data.error, //@ts-ignore
				description: err.response.data.message,
				status: "error",
				isClosable: true,
			});
		}
		setLoading(false);
	};

	useEffect(() => {
		getCategories();
	}, []);

	const deleteCategory = async (category: Category) => {
		try {
			const apiClient = apiClientFactory();
			await apiClient.delete(`/api/category/${category.id}`);
			setCategories(categories.filter((cat) => cat.id !== category.id));
			toast({
				title: `${category.name} deleted`,
				status: "success",
				position: "bottom",
				isClosable: true,
			});
		} catch (err) {
			toast({
				//@ts-ignore
				title: err.response.data.error, //@ts-ignore
				description: err.response.data.message,
				status: "error",
				position: "bottom",
				isClosable: true,
			});
		}
	};

	const createCategory = async (newCategory: Partial<Category>) => {
		{
			try {
				const apiClient = apiClientFactory();
				const res = await apiClient.post("/api/category/create", newCategory);
				setCategories([...categories, res.data]);
				toast({
					title: `Category created`,
					status: "success",
					position: "bottom",
					isClosable: true,
				});
				setCreateModalOpen(false);
			} catch (err) {
				toast({
					//@ts-ignore
					title: err.response.data.error, //@ts-ignore
					description: err.response.data.message,
					status: "error",
					position: "bottom",
					isClosable: true,
				});
			}
		}
	};

	const updateCategory = async (cat: Partial<Category>) => {
		try {
			const apiClient = apiClientFactory();
			const res = await apiClient.put(`/api/category/${cat.id}`, cat);
			setCategories(
				categories.map((category) => {
					if (category.id === cat.id) {
						return res.data;
					}
					return category;
				})
			);
			toast({
				title: `Category updated`,
				status: "success",
				position: "bottom",
				isClosable: true,
			});
			setCreateModalOpen(false);
		} catch (err) {
			toast({
				//@ts-ignore
				title: err.response.data.error, //@ts-ignore
				description: err.response.data.message,
				status: "error",
				position: "bottom",
				isClosable: true,
			});
		}
	};

	const onCreateCategoryClose = () => {
		setCreateModalOpen(false);
	};

	const onCreateCategoryOpen = () => {
		setCreateModalOpen(true);
	};

	return loading ? (
		<PageLoader />
	) : (
		<Flex direction={"column"} px={[2, 2, 30, 40, 40]} my={7}>
			<QIButton
				variant={"solid"}
				colorScheme="primary"
				width="200px"
				onClick={onCreateCategoryOpen}>
				Add category
			</QIButton>

			<Flex py={[2, 2, 10, 20, 20]} width="100%">
				{categories ? (
					<Accordion allowMultiple width="100%">
						{categories.map((category) => (
							<CategoryCard
								key={category.id}
								category={category}
								deleteCategory={deleteCategory}
								updateCategory={updateCategory}
							/>
						))}
					</Accordion>
				) : (
					<Alert status="info">
						<AlertIcon />
						There are no categories
					</Alert>
				)}
			</Flex>

			{createModalOpen && (
				<CreateCategoryModal
					onFinish={createCategory}
					onClose={onCreateCategoryClose}
				/>
			)}
		</Flex>
	);
};
