import { useInterval, useTimeout, useToast } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../authentication";
import { calculatePoints } from "../utils/mathUtils";
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
	const [currentQuestion, setCurrentQuestion] = useState<number>(0);
	const [selectedAnswer, setSelectedAnswer] = useState<1 | 2 | 3 | 4 | null>(
		null
	);
	const [points, setPoints] = useState<number>(0);
	const [timer, setTimer] = useState<number>(-1);
	const [timerInterval, setTimerInterval] = useState<number | null>(null);
	const toast = useToast();
	const { user } = useContext(AuthContext);

	const getMatchInfo = async () => {
		try {
			const res = matchData;
			const userPlayer = res.p1.id === user?.id ? res.p1 : res.p2;
			const q1Time = res.questions[0].availableTime;
			setTimeout(() => {
				setMatchInfo(res);
				setPlayer(userPlayer);
				setTimer(q1Time);
				setTimerInterval(1000);
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

	const answerQuestion = () => {
		if (timer !== -1 && matchInfo) {
			if (selectedAnswer) {
				if (
					selectedAnswer === matchInfo?.questions[currentQuestion].correctAnswer
				) {
					const pointsToAdd = calculatePoints(
						matchInfo?.questions[currentQuestion].availableTime as number,
						timer
					);

					setPoints(points + pointsToAdd);
				}
			}

			if (currentQuestion + 1 < (matchInfo?.questions?.length as number)) {
				setCurrentQuestion(currentQuestion + 1);
			} else {
				finishMatch();
			}
		}
	};

	useEffect(() => {
		getMatchInfo();
	}, []);

	useEffect(() => {
		if (currentQuestion !== 0) {
			setSelectedAnswer(null);
			setTimer(matchInfo?.questions[currentQuestion].availableTime as number);
			setTimerInterval(1000);
		}
	}, [currentQuestion]);

	useEffect(() => {
		if (selectedAnswer !== null) {
			answerQuestion();
		}
	}, [selectedAnswer]);

	useEffect(() => {
		if (timer === 0) {
			answerQuestion();
		}
	}, [timer]);

	const finishMatch = async () => {
		console.log("finishing match");
	};

	useInterval(() => {
		if (timer !== -1) {
			if (timer) {
				setTimer(timer - 1);
			} else {
				setTimerInterval(null);
			}
		}
	}, timerInterval);

	return {
		isLoading,
		matchInfo,
		points,
		player,
		currentQuestion,
		selectedAnswer,
		setSelectedAnswer,
		timer,
	};
};
