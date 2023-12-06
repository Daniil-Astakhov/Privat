import React, { FC, useEffect } from "react";
// import { useTranslation } from "react-i18next";
import QuizMultiple from "@/components/features/Tests/test/quizMultiple/QuizMultiple";
import QuizSelect from "@/components/features/Tests/test/quizSelect/QuizSelect";
import QuizSingle from "@/components/features/Tests/test/quizSingle/QuizSingle";
import { PropsType } from "@/components/widgets/testsModal/model/interface";
import styles from "./quizController.module.sass";

const QuizController: FC<PropsType> = (props): JSX.Element => {
	const {
		quizData,
		quizAnswers,
		questionNumber,
		questionToIterate,
		setQuestionNumber,
	} = props;

	useEffect(() => {
		return () => setQuestionNumber(0);
	}, []);

	return (
		<div className={styles.wrapper} key={questionToIterate?.id}>
			{questionToIterate?.type === "Single" && (
				<QuizSingle
					quizData={quizData}
					questionNumber={questionNumber}
					setQuestionNumber={setQuestionNumber}
					questionToIterate={questionToIterate}
					quizAnswers={quizAnswers}
				/>
			)}
			{questionToIterate?.type === "Multiple" && (
				<QuizMultiple
					quizData={quizData}
					questionNumber={questionNumber}
					setQuestionNumber={setQuestionNumber}
					questionToIterate={questionToIterate}
					quizAnswers={quizAnswers}
				/>
			)}
			{questionToIterate?.type === "Select" && (
				<QuizSelect
					quizData={quizData}
					questionNumber={questionNumber}
					setQuestionNumber={setQuestionNumber}
					questionToIterate={questionToIterate}
					quizAnswers={quizAnswers}
				/>
			)}
		</div>
	);
};

export default QuizController;
