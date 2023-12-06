/* eslint-disable no-return-assign */
/* eslint-disable no-unsafe-optional-chaining */

import React, { FC } from "react";
import { motion } from "framer-motion";
import TabsQuestions from "@/components/features/Tests/test/quizSelect/tabsQuestions/TabsQuestions";
import { PropsType } from "@/components/widgets/testsModal/model/interface";

import { animationOpacity } from "@/components/shared/styles/motion/animation";
import styles from "./quizSelect.module.sass";

const QuizSelect: FC<PropsType> = (props) => {
	const { questionToIterate, setQuestionNumber, questionNumber, quizData } =
		props;
	const { translation } = quizData;
	const { questions } = translation;

	const options = questionToIterate?.options?.map((correct: any) => {
		return {
			value: `${correct.content_id}||`,
			label: correct.text,
		};
	});
	const answers = questionToIterate?.answers?.map((correct: any) => {
		return {
			value: `${correct.id}||`,
			label: correct.text,
		};
	});

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

			<TabsQuestions
				styles={styles}
				questionToIterate={questionToIterate}
				isArabicLanguage={isArabicLanguage}
				questionNumber={questionNumber}
				questions={questions}
				options={options}
				answers={answers}
				setQuestionNumber={setQuestionNumber}
			/>
		</form>
	);
};

export default QuizSelect;
