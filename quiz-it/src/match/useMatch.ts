import { useToast } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../authentication";
import matchData from "./matchData.json";
import {
	MatchInterface,
	MatchPlayerInterface,
	UseMatchReturnInterface,
} from "./types";

export const useMatch = (): UseMatchReturnInterface => {
	const params = useParams();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [matchInfo, setMatchInfo] = useState<MatchInterface | null>(null);
	const [player, setPlayer] = useState<MatchPlayerInterface>(
		{} as MatchPlayerInterface
	);
	const [points, setPoints] = useState<number>(0);
	const toast = useToast();
	const { user } = useContext(AuthContext);

	const getMatchInfo = async () => {
		try {
			const res = matchData;
			const userPlayer = res.p1.id === user?.id ? res.p1 : res.p2;
			setTimeout(() => {
				setMatchInfo(res);
				setPlayer(userPlayer);
			}, 1000);
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
		player,
	};
};
