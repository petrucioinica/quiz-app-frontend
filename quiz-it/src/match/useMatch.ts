import { useInterval, useToast } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../authentication";
import { apiClientFactory } from "../utils/apiClient";
import { calculatePoints } from "../utils/mathUtils";
import {
	MatchInterface,
	MatchPlayerInterface,
	ScreenEnum,
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
	const [finishMatchInterval, setFinishMatchInterval] = useState<number | null>(
		null
	);
	const [currentScreen, setCurrentScreen] = useState<ScreenEnum>("game");
	const toast = useToast();
	const { user, getUserDetails } = useContext(AuthContext);

	const getMatchInfo = async () => {
		try {
			const apiClient = await apiClientFactory();
			const res = await apiClient.get(
				`/api/matchmaking/get-match-info/${params.matchId}`
			);
			const userPlayer =
				res.data.p1.id === user?.id ? res.data.p1 : res.data.p2;
			const q1Time = res.data.questions[0].availableTime;

			setMatchInfo(res.data);
			setPlayer(userPlayer);
			setTimer(q1Time);
			setTimerInterval(1000);
			setIsLoading(false);
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

	const finishMatchOnBe = async () => {
		const apiClient = await apiClientFactory();

		if (currentScreen === "game" || currentScreen === "waiting") {
			setCurrentScreen("waiting");
			await apiClient
				.post("/api/matchmaking/finish-match", {
					points,
					matchId: params.matchId,
				})
				.then(async (res) => {
					if (res.data.winnerId) {
						if (res.data.winnerId === user?.id) {
							toast({
								title: "Winner",
								status: "success",
							});
							setCurrentScreen("winner");
						} else {
							toast({
								title: "Loser",
								status: "info",
							});

							setCurrentScreen("loser");
						}

						if (res.data.isRanked) {
							await getUserDetails();
						}
						setFinishMatchInterval(null);
						setTimerInterval(null);
					} else {
						if (res.data.endedAt) {
							setCurrentScreen("draw");
						}
					}
				})
				.catch((err) => {
					toast({
						//@ts-ignore
						title: err.response.data.error, //@ts-ignore
						description: err.response.data.message,
						status: "error",
						isClosable: true,
					});
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	};

	useInterval(finishMatchOnBe, finishMatchInterval);

	const finishMatch = () => {
		setFinishMatchInterval(1000);
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
		currentScreen,
	};
};
