// eslint-disable-next-line import/no-extraneous-dependencies
import uuid from "react-uuid";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSessionStorage } from "@uidotdev/usehooks";
import React, { useEffect, useState } from "react";
import { Button, Card, CardBody } from "@nextui-org/react";
import { useAppDispatch } from "@/providers/storeProvider";

import ResultQuestion from "@/components/features/Tests/test/quizResults/resultQuestion/ResultQuestion";
import { handlePercentColor } from "@/components/shared/consts";

import { getResult } from "@/components/entities/education/model/selectors/educationSelectors";
import { educationActions } from "@/components/entities/education/model/slice/educationSlice";
// import { againHandler } from "@/components/shared/functions/functions";
// import { getValidArr } from "@/components/entities/quiz/model/selectors/validQuizSelectors";
import { animationOpacity } from "@/components/shared/styles/motion/animation";
import styles from "./quizResults.module.sass";

const QuizResults = (): JSX.Element => {
	const [correctsAnswers, setCorrectsAnswers] = useState([]);
	const [color, setColor] = useState("yellow");
	const dispatch = useAppDispatch();
	const { t } = useTranslation();

	const resilt = useSelector(getResult);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [materialUuid, setMaterialUuid] = useSessionStorage<any>(
		"materialUuid",
		""
	);

	useEffect(() => {
		if (resilt?.questions) {
			const correct = resilt?.questions?.filter((answer: any) => {
				return answer.result === "correct";
			});
			setCorrectsAnswers(correct.length);
		}
	}, [resilt]);

	const againHandler = () => {
		dispatch(educationActions.resetQuizLayout());
		dispatch(educationActions.resetQuizAnswersQuestions());
		dispatch(educationActions.resetFetchCorrects());
		dispatch(educationActions.resetQuizResults());
	};

	useEffect(() => {
		if (resilt.length) setColor(handlePercentColor(resilt.answered_percentage));
	}, [resilt]);

	return (
		<motion.div
			{...animationOpacity}
			transition={{
				duration: 0.5,
				stiffness: 0,
				ease: "backInOut",
			}}
		>
			<h2 className={styles.yourResult}>{t("Results.Main.result")}</h2>
			<div className={styles.wrapper}>
				<Card
					classNames={{
						base: "w-full h-[300px] sticky top-[105px]",
						body: styles.resultWrapper,
					}}
					shadow="none"
					radius="none"
					key="result"
				>
					<CardBody>
						<div className={styles.wrapper}>
							<div className={styles.resultWrapper}>
								<div className={styles.result}>
									<h3 className={`${styles.percent} ${styles[color]}`}>
										{resilt.answered_percentage}%
									</h3>
									<p className={styles.corrects}>
										{t("Results.Main.correct")} {correctsAnswers}/
										{resilt?.questions?.length}
									</p>
									<p className={styles.passed}>
										{resilt.answered_percentage >= resilt.pass_percent
											? `${t("Results.Main.passed")}`
											: `${t("Results.Main.failed")}`}
									</p>
								</div>
								<Button
									className="text-white w-[130px] h-[34px] text-base  bg-black border-2 border-black  hover:border-pinkColor border-solid  hover:bg-pinkColor transition"
									variant="bordered"
									onClick={() => againHandler()}
								>
									{t("Results.Main.again")}
								</Button>
							</div>
						</div>
					</CardBody>
				</Card>

				<Card
					classNames={{
						base: "w-full",
						body: styles.questions,
					}}
					shadow="none"
					radius="none"
					key="question"
				>
					<CardBody>
						{resilt?.questions?.map((question: any, index: number) => (
							<ResultQuestion index={index} question={question} key={uuid()} />
						))}
					</CardBody>
				</Card>
			</div>
		</motion.div>
	);
};

export default QuizResults;
