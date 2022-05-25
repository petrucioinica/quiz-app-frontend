import { Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { InputLabel } from "../../common/InputLabel";
import { PageLoader } from "../../common/PageLoader";
import { QIButton } from "../../common/QIButton";
import { QiDropdown } from "../../common/QIDropdown";
import { apiClientFactory } from "../../utils/apiClient";
import { Category } from "../categories/types";
import { Question } from "./types";

export const Questions: React.FC = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [selectedCategory, setSelectedCategory] = useState<string>("");
	const [questions, setQuestions] = useState<Question[]>([]);

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

	return loading ? (
		<PageLoader />
	) : (
		<Flex direction={"column"} px={[2, 2, 30, 40, 40]} my={7}>
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
				/>
			</InputLabel>

			<Flex py={[2, 2, 10, 20, 20]} width="100%">
				{/*questions show here */}
			</Flex>
		</Flex>
	);
};
function toast(arg0: {
	//@ts-ignore
	title: any; //@ts-ignore
	description: any;
	status: string;
}) {
	throw new Error("Function not implemented.");
}
