"use client";

/* eslint-disable no-console */
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import React, { FC, useEffect, useState } from "react";
// import { setQuizLayoutAsResults } from "@/entities/education/model/slice/educationSlice";
// import LichiButton from "@/shared/lichiButton/ui/LichiButton";
import { useSessionStorage } from "@uidotdev/usehooks";
import { Button, CircularProgress } from "@nextui-org/react";
import { educationActions } from "@/components/entities/education/model/slice/educationSlice";
import { useAppDispatch } from "@/providers/storeProvider";
import { getValidArr } from "@/components/entities/quiz/model/selectors/validQuizSelectors";
import { fetchQuizResults } from "@/components/entities/education/model/actions/quizResults";
import { getResult } from "@/components/entities/education/model/selectors/educationSelectors";

import { animationOpacity } from "@/components/shared/styles/motion/animation";
import styles from "./quizDiagram.module.sass";

interface PropsType {
	onClose: () => void;
}

const QuizDiagram: FC<PropsType> = (props): JSX.Element => {
	const [correctsAnswers, setCorrectsAnswers] = useState([]);
	const dispatch = useAppDispatch();
	const { t } = useTranslation();

	const { onClose } = props;
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

	const validArr = useSelector(getValidArr);

	useEffect(() => {
		if (validArr.length) {
			dispatch(
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				fetchQuizResults({ quiz_id: materialUuid, questions: [...validArr] })
			);
		}
	}, [validArr]);

	return (
		<motion.div
			{...animationOpacity}
			transition={{
				duration: 0.5,
				stiffness: 0,
				ease: "backInOut",
			}}
			className={styles.wrapper}
		>
			<h3 className={styles.congratulations}>
				{t("Results.Main.congratulation")}
			</h3>
			<div className={styles.progressWrapper}>
				<CircularProgress
					aria-label="loading"
					classNames={{
						svg: styles.svg,
						indicator: styles.indicator,
						track: styles.track,
						value: styles.value,
					}}
					value={resilt.answered_percentage}
					strokeWidth={5}
					showValueLabel
				/>
				<div className={styles.percentWrapper}>
					<p className={styles.result}>{t("Results.Main.result")}:</p>
					<p className={styles.corrects}>
						{t("Results.Main.correct")} {correctsAnswers}/
						{resilt?.questions?.length}
					</p>
					{/* <p className={styles.corrects}>
						Правильных ответов: {correctsAnswers}/{overallAnswers}
					</p> */}
					<p className={styles.passed}>
						{resilt.answered_percentage >= resilt.pass_percent
							? t("Results.Main.passed")
							: t("Results.Main.failed")}
					</p>
				</div>
			</div>
			<div className={styles.btnsWrapper}>
				<Button
					className="text-[#71717A] w-[fit-content] h-[34px] text-base bg-none hover:bg-[#fff0] hover:text-[#52525B] active:text-[#52525B] disabled:text-disabledColor "
					variant="light"
					type="button"
					onClick={() => dispatch(educationActions.setQuizLayoutAsResults())}
				>
					{t("Results.Main.answers")}
				</Button>

				<Button
					className="text-white w-[fit-content] h-[34px] text-base  bg-black border-2 border-black  hover:border-pinkColor border-solid  hover:bg-pinkColor transition"
					variant="bordered"
					onClick={() => {
						onClose();
						dispatch(educationActions.resetQuizLayout());
					}}
				>
					{t("Test.Main.finish")}
				</Button>
			</div>
		</motion.div>
	);
	// }

	// return <LichiLoader />;
};

export default QuizDiagram;
