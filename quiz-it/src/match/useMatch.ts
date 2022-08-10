import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import matchData from "./matchData.json";
import {
	MatchInterface,
	PointsInterface,
	UseMatchReturnInterface,
} from "./types";

export const useMatch = (): UseMatchReturnInterface => {
	const params = useParams();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [matchInfo, setMatchInfo] = useState<MatchInterface | null>(null);
	const [points, setPoints] = useState<PointsInterface>({
		p1: 0,
		p2: 0,
	});
	const toast = useToast();

	const getMatchInfo = async () => {
		try {
			const res = matchData;
			setTimeout(() => setMatchInfo(res), 1000);
		} catch (err) {
			toast({
				//@ts-ignore
				title: err.response.data.error, //@ts-ignore
				description: err.response.data.message,
				status: "error",
				isClosable: true,
			});
		}
		setTimeout(() => setIsLoading(false), 1000);
	};

	useEffect(() => {
		getMatchInfo();
	}, []);

	return {
		isLoading,
		matchInfo,
		points,
	};
};
