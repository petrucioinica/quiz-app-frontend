import { Alert, AlertIcon, Box, Flex, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { InputLabel } from "../../common/InputLabel";
import { PageLoader } from "../../common/PageLoader";
import { QIButton } from "../../common/QIButton";
import { QiDropdown } from "../../common/QIDropdown";
import { apiClientFactory } from "../../utils/apiClient";
import { Category } from "../categories/types";
import { CreateQuestionModal } from "./CreateQuestionModal";
import { QuestionsTable } from "./QuestionsTable";
import { Question } from "./types";

export const Questions: React.FC = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [selectedCategory, setSelectedCategory] = useState<string>("");
	const [questions, setQuestions] = useState<Question[]>([]);
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
	};

	const getQuestions = async () => {
		const apiUrl = selectedCategory
			? `/api/question/get-all/${selectedCategory}`
			: "/api/question/get-all";
		try {
			const apiClient = apiClientFactory();
			const res = await apiClient.get(apiUrl);
			setQuestions(res.data);
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

	useEffect(() => {
		getQuestions();
	}, [selectedCategory]);

	useEffect(() => {
		console.log(questions);
	}, [questions]);

	const handleSelectedCategoryChange = (val: string) => {
		setSelectedCategory(val);
	};

	const onCreateModalClose = () => {
		setCreateModalOpen(false);
	};

	const onCreateModalOpen = () => {
		setCreateModalOpen(true);
	};

	const createQuestion = async (question: Question) => {
		if (
			!question.question ||
			!question.second ||
			!question.first ||
			!question.third ||
			!question.fourth
		) {
			toast({
				title: "All fields are required!",
				description: "Please fill in all fields in order to create a question!",
				status: "error",
				isClosable: true,
			});
			return;
		}

		try {
			const apiClient = apiClientFactory();
			const res = await apiClient.post("/api/question/create", question);
			console.log(res);
			getQuestions();
			toast({
				title: `Question created`,
				status: "success",
				position: "bottom",
				isClosable: true,
			});
			setCreateModalOpen(false);
		} catch (err) {
			console.log(err);
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

	return loading ? (
		<PageLoader />
	) : (
		<Box overflowY={"auto"}>
			<Flex direction={"column"} px={[2, 2, 30, 40, 40]} my={7}>
				<Flex width="100%" justifyContent={"space-between"} alignItems="center">
					<InputLabel label="Filter by category:" color="primary.500">
						<QiDropdown
							options={[
								{
									value: "",
									display: (
										<Flex>
											<Text color="primary.200" fontWeight={"bold"}>
												None
											</Text>
										</Flex>
									),
								},
								...categories.map((category) => {
									return {
										value: category.id,
										display: (
											<Text fontWeight={"bold"} color="primary.500">
												{category.name}
											</Text>
										),
									};
								}),
							]}
							placeholder="Category"
							value={selectedCategory}
							onChange={handleSelectedCategoryChange}
							width="300px"
						/>
					</InputLabel>

					<QIButton
						variant="solid"
						colorScheme={"primary"}
						px={8}
						onClick={onCreateModalOpen}>
						Add Question
					</QIButton>
				</Flex>

				{createModalOpen && (
					<CreateQuestionModal
						categories={categories}
						selectedCategory={selectedCategory}
						onClose={onCreateModalClose}
						onFinish={createQuestion}
					/>
				)}
			</Flex>

			<Flex py={[2, 2, 10, 20, 20]} width="100%">
				{questions ? (
					<QuestionsTable
						questions={questions}
						setQuestions={setQuestions}
						getQuestions={getQuestions}
						categories={categories}
					/>
				) : (
					<Alert status="info">
						<AlertIcon />
						There are no questions
					</Alert>
				)}
			</Flex>
		</Box>
	);
};
