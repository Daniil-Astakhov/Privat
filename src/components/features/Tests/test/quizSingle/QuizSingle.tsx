/* eslint-disable no-return-assign */
/* eslint-disable no-unsafe-optional-chaining */
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import React, { FC, useState } from "react";
import { Button, Radio, RadioGroup } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

import { PropsType } from "@/components/widgets/testsModal/model/interface";

import { useAppDispatch } from "@/providers/storeProvider";
import { educationActions } from "@/components/entities/education/model/slice/educationSlice";
import { validationQuizActions } from "@/components/entities/quiz/model/slice/validationQuizSlice";
import { getValidArr } from "@/components/entities/quiz/model/selectors/validQuizSelectors";
import { animationOpacity } from "@/components/shared/styles/motion/animation";
import styles from "./quizSingle.module.sass";

// interface FormInput {
// 	uuid: string;
// }

const QuizSingle: FC<PropsType> = (props) => {
	const [answerId, setAnswerId] = useState<string>("");

	const { questionToIterate, setQuestionNumber, questionNumber, quizData } =
		props;
	const {
		translation: { questions },
	} = quizData;

	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const validArr = useSelector(getValidArr);

	// const currentLanguage = i18n.language.split("-")[0];

	const tempSubmit = async () => {
		if (validArr && answerId) {
			const id = answerId.split("||");
			await dispatch(
				validationQuizActions.setValidArrStep([
					...validArr,
					{
						question_id: questionToIterate.id,
						choices: [
							{
								id: id[0],
							},
						],
					},
				])
			);
		}
		if (questionNumber !== questions?.length - 1)
			setQuestionNumber((prev) => (prev += 1));
		if (questionNumber === questions?.length - 1) {
			await dispatch(educationActions.setQuizLayoutAsDiagram());
		}
	};

	const btnLabel = () => {
		if (!answerId) return t("Test.Main.choose");
		if (questionNumber + 1 === questions?.length) return t("Test.Main.finish");

		return t("Test.Main.next");
	};

	const isArabicLanguage = Boolean(quizData.translation.lang === "ar");

	return (
		<form className={styles.form}>
			<motion.div
				{...animationOpacity}
				transition={{
					duration: 0.5,
					stiffness: 0,
					ease: "backInOut",
				}}
				className="maxPc:max-w-[100%] max-w-[50%] flex justify-start items-start pr-[10px]"
			>
				<p
					className={`${styles.title} ${
						isArabicLanguage && styles.titleArabic
					}`}
				>
					{questionToIterate?.title}
				</p>
			</motion.div>

			<div className={styles.groupWrapper}>
				<motion.div
					{...animationOpacity}
					transition={{
						duration: 0.5,
						stiffness: 0,
						ease: "backInOut",
					}}
				>
					<RadioGroup
						onValueChange={(e: any) => {
							setAnswerId(e);
						}}
						className={styles.group}
					>
						{questionToIterate?.answers?.map((answer: any) => (
							<Radio
								className={`${styles.choice} ${
									isArabicLanguage && styles.choiceArabic
								}`}
								key={answer.id}
								value={`${answer.id}||${answer.text}`}
							>
								{answer.text}
							</Radio>
						))}
					</RadioGroup>
				</motion.div>

				<div className={styles.buttonWrapper}>
					<Button
						className="text-white w-[fit-content] h-[34px] text-base st bg-black border-2 border-black  hover:border-pinkColor border-solid  hover:bg-pinkColor transition"
						variant="bordered"
						isLoading={answerId.length === 0}
						type="submit"
						spinner={<span className="hidden" />}
						onClick={tempSubmit}
					>
						{btnLabel()}
					</Button>
				</div>
			</div>
		</form>
	);
};

export default QuizSingle;
