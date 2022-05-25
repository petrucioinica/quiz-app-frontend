import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
	Box,
	Divider,
	Flex,
	Grid,
	GridItem,
	SimpleGrid,
	Text,
	useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { QIButton } from "../../common/QIButton";
import { apiClientFactory } from "../../utils/apiClient";
import { CreateCategoryModal } from "../categories/CreateCategoryModal";
import { Category } from "../categories/types";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";
import { CreateQuestionModal } from "./CreateQuestionModal";
import { Question } from "./types";

interface QuestionsTableProps {
	questions: Question[];
	setQuestions: (val: Question[]) => void;
	getQuestions: () => Promise<void>;
	categories: Category[];
}

export const QuestionsTable: React.FC<QuestionsTableProps> = ({
	questions,
	setQuestions,
	getQuestions,
	categories,
}) => {
	const [questionToDelete, setQuestionToDelete] = useState<string>("");
	const [questionToEdit, setQuestionToEdit] = useState<Question | null>(null);
	const toast = useToast();

	const handleDeleteClick = (question: Question) => {
		setQuestionToDelete(question.id ?? "");
	};

	const handleEditClick = (question: Question) => {
		setQuestionToEdit(question);
	};

	const onDeleteModalClose = () => {
		setQuestionToDelete("");
	};

	const deleteQuestion = async () => {
		try {
			const apiClient = apiClientFactory();
			await apiClient.delete(`/api/question/${questionToDelete}`);
			await getQuestions();
			toast({
				title: `Question deleted`,
				status: "success",
				position: "bottom",
				isClosable: true,
			});
			setQuestionToDelete("");
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

	const editQuestion = async (question: Question) => {
		try {
			const apiClient = apiClientFactory();
			await apiClient.put(
				`/api/question/${questionToEdit?.id ?? ""}`,
				question
			);
			await getQuestions();
			toast({
				title: `Question updated`,
				status: "success",
				position: "bottom",
				isClosable: true,
			});
			setQuestionToEdit(null);
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

	const onEditModalClose = () => {
		setQuestionToEdit(null);
	};

	const onEditModalOpen = (question: Question) => {
		setQuestionToEdit(question);
	};

	return (
		<Grid templateColumns="repeat(9,1fr)" width="100%" gap="20px" mx={2}>
			<Text fontFamily={"secondary"} color="primary.500" fontSize={"large"}>
				Question
			</Text>

			<Text fontFamily={"secondary"} color="secondary.700" fontSize={"large"}>
				First
			</Text>

			<Text fontFamily={"secondary"} color="primary.500" fontSize={"large"}>
				Second
			</Text>

			<Text fontFamily={"secondary"} color="secondary.700" fontSize={"large"}>
				Third
			</Text>

			<Text fontFamily={"secondary"} color="primary.500" fontSize={"large"}>
				Fourth
			</Text>

			<Text fontFamily={"secondary"} color="secondary.700" fontSize={"large"}>
				Available time
			</Text>

			<Text fontFamily={"secondary"} color="primary.500" fontSize={"large"}>
				Correct answer
			</Text>

			<Text fontFamily={"secondary"} color="secondary.700" fontSize={"large"}>
				Category
			</Text>

			<GridItem colSpan={9} h="2px" bgColor="primary.700" />

			{questions.map((question, index) => {
				return (
					<>
						<Text color="primary.500">{question.question}</Text>

						<Text color="secondary.700"> {question.first}</Text>

						<Text color="primary.500">{question.second}</Text>

						<Text color="secondary.700">{question.third}</Text>

						<Text color="primary.500">{question.fourth}</Text>

						<Text color="secondary.700">{`${question.availableTime}s`}</Text>

						<Text color="primary.500">{question.correctAnswer}</Text>

						<Text color="secondary.700">{`${question.category?.name}`}</Text>

						<Flex
							direction={"column"}
							justifyContent="center"
							alignItems={"center"}>
							<QIButton
								variant="solid"
								colorScheme={"warning"}
								my={2}
								onClick={() => onEditModalOpen(question)}>
								<EditIcon />
							</QIButton>

							<QIButton
								variant="solid"
								colorScheme={"danger"}
								my={2}
								onClick={() => handleDeleteClick(question)}>
								<DeleteIcon />
							</QIButton>
						</Flex>

						<GridItem colSpan={9} h="2px" bgColor="primary.500" />
					</>
				);
			})}

			{questionToDelete && (
				<ConfirmDeleteModal
					onClose={onDeleteModalClose}
					onConfirm={deleteQuestion}
				/>
			)}

			{questionToEdit && (
				<CreateQuestionModal
					selectedCategory={questionToEdit.categoryId}
					onFinish={editQuestion}
					categories={categories}
					onClose={onEditModalClose}
					question={questionToEdit}
				/>
			)}
		</Grid>
	);
};
