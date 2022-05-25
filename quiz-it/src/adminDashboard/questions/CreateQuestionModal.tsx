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
import { QiDropdown } from "../../common/QIDropdown";
import { QIInput } from "../../common/QIInput";
import { QiTextArea } from "../../common/QiTextArea";
import { Category } from "../categories/types";
import { Question } from "./types";

interface CreateCategoryModalProps {
	selectedCategory: string;
	onFinish: (question: Question) => Promise<void>;
	onClose: () => void;
	categories: Category[];
	question?: Question;
}

export const CreateQuestionModal: React.FC<CreateCategoryModalProps> = ({
	selectedCategory,
	onFinish,
	onClose,
	categories,
	question,
}) => {
	const [formState, setFormState] = useState<Question>(
		question ?? {
			question: "",
			first: "",
			second: "",
			third: "",
			fourth: "",
			correctAnswer: 1,
			availableTime: 5,
			categoryId: selectedCategory === "" ? categories[0].id : selectedCategory,
		}
	);

	const handleCategoryChange = (val: string) => {
		setFormState({
			...formState,
			categoryId: val,
		});
	};

	const handleFinish = () => {
		onFinish(formState);
	};

	const handleCorrectAnswerChange = (val: string) => {
		setFormState({
			...formState,
			correctAnswer: parseInt(val),
		});
	};

	const handleAvailableTimeChange = (val: string) => {
		setFormState({
			...formState,
			availableTime: parseInt(val),
		});
	};

	const handleFirstChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormState({
			...formState,
			first: e.target.value,
		});
	};

	const handleSecondChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormState({
			...formState,
			second: e.target.value,
		});
	};

	const handleThirdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormState({
			...formState,
			third: e.target.value,
		});
	};

	const handleFourthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormState({
			...formState,
			fourth: e.target.value,
		});
	};

	const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setFormState({
			...formState,
			question: e.target.value,
		});
	};
	return (
		<Modal isOpen={true} onClose={onClose} size="3xl">
			<ModalOverlay />
			<ModalContent>
				<ModalHeader fontFamily="secondary" fontSize="3xl" color="primary.500">
					{question ? "Edit Question" : "Create Question"}
				</ModalHeader>
				<ModalCloseButton _focus={{ outline: "none" }} />
				<ModalBody>
					<Flex direction="column" color="primary.500">
						<InputLabel label="Category: ">
							<QiDropdown
								options={categories.map((category) => {
									return {
										value: category.id,
										display: (
											<Text fontWeight={"bold"} color="primary.500">
												{category.name}
											</Text>
										),
									};
								})}
								placeholder="Category"
								value={formState.categoryId}
								onChange={handleCategoryChange}
							/>
						</InputLabel>

						<InputLabel label="Question text:">
							<QiTextArea
								value={formState.question}
								onChange={handleQuestionChange}
							/>
						</InputLabel>

						<InputLabel label="First answer:">
							<QIInput value={formState.first} onChange={handleFirstChange} />
						</InputLabel>

						<InputLabel label="Second answer:">
							<QIInput value={formState.second} onChange={handleSecondChange} />
						</InputLabel>

						<InputLabel label="Third answer:">
							<QIInput value={formState.third} onChange={handleThirdChange} />
						</InputLabel>

						<InputLabel label="Fourth answer:">
							<QIInput value={formState.fourth} onChange={handleFourthChange} />
						</InputLabel>

						<Flex justifyContent={"space-between"}>
							<InputLabel label="Correct answer:">
								<QiDropdown
									options={[
										{
											value: "1",
											display: (
												<Text fontWeight={"bold"} color="primary.500">
													First
												</Text>
											),
										},
										{
											value: "2",
											display: (
												<Text fontWeight={"bold"} color="primary.500">
													Second
												</Text>
											),
										},
										{
											value: "3",
											display: (
												<Text fontWeight={"bold"} color="primary.500">
													Third
												</Text>
											),
										},
										{
											value: "4",
											display: (
												<Text fontWeight={"bold"} color="primary.500">
													Fourth
												</Text>
											),
										},
									]}
									width="100px"
									value={formState.correctAnswer.toString()}
									onChange={handleCorrectAnswerChange}
								/>
							</InputLabel>

							<InputLabel label="Available time:">
								<QiDropdown
									options={[
										{
											value: "5",
											display: (
												<Text fontWeight={"bold"} color="primary.500">
													5s
												</Text>
											),
										},
										{
											value: "10",
											display: (
												<Text fontWeight={"bold"} color="primary.500">
													10s
												</Text>
											),
										},
										{
											value: "15",
											display: (
												<Text fontWeight={"bold"} color="primary.500">
													15s
												</Text>
											),
										},
										{
											value: "20",
											display: (
												<Text fontWeight={"bold"} color="primary.500">
													20s
												</Text>
											),
										},
										{
											value: "30",
											display: (
												<Text fontWeight={"bold"} color="primary.500">
													30s
												</Text>
											),
										},
										{
											value: "45",
											display: (
												<Text fontWeight={"bold"} color="primary.500">
													45s
												</Text>
											),
										},
									]}
									width="100px"
									value={formState.availableTime.toString()}
									onChange={handleAvailableTimeChange}
								/>
							</InputLabel>
						</Flex>
					</Flex>
				</ModalBody>

				<ModalFooter>
					<Flex justifyContent={"flex-end"}>
						<QIButton
							onClick={onClose}
							variant="ghost"
							mx={6}
							colorScheme="secondary">
							CLOSE
						</QIButton>
						<QIButton
							onClick={handleFinish}
							variant="solid"
							colorScheme="primary">
							{question ? "Save" : "Create"}
						</QIButton>
					</Flex>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
