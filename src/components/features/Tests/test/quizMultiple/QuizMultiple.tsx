/* eslint-disable no-return-assign */
/* eslint-disable no-unsafe-optional-chaining */
import { useSelector } from "react-redux";
import React, { FC, useState } from "react";
import { motion } from "framer-motion";
import { Button, Checkbox, CheckboxGroup } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

import { PropsType } from "@/components/widgets/testsModal/model/interface";
import { useAppDispatch } from "@/providers/storeProvider";
import { educationActions } from "@/components/entities/education/model/slice/educationSlice";
import { getValidArr } from "@/components/entities/quiz/model/selectors/validQuizSelectors";
import { validationQuizActions } from "@/components/entities/quiz/model/slice/validationQuizSlice";
import { animationOpacity } from "@/components/shared/styles/motion/animation";
import styles from "./quizMultiple.module.sass";

const QuizMultiple: FC<PropsType> = (props) => {
	const [selectedId, setSelectedId] = useState<any>([]);

	const { questionToIterate, setQuestionNumber, questionNumber, quizData } =
		props;

	const {
		translation: { questions },
	} = quizData;
	const validArr = useSelector(getValidArr);
	// const { currentEducationLanguage } = useAppSelector(
	// 	(state) => state.education
	// );
	const dispatch = useAppDispatch();
	const { t } = useTranslation();

	// const currentLanguage = i18n.language.split("-")[0];

	const tempSubmit = async () => {
		if (validArr && selectedId.length) {
			await dispatch(
				validationQuizActions.setValidArrStep([
					...validArr,
					{
						question_id: questionToIterate.id,
						choices: selectedId.map((itemId: any) => ({
							id: itemId,
						})),
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

	// const onSubmit = (val: any) => {
	// 	try {
	// 		const formattedVal = val.uuid.map((el: any) => {
	// 			const textAndUuid = el.split("||");
	// 			return { uuid: textAndUuid[0], text: textAndUuid[1] };
	// 		});
	// 		const finishVal = {
	// 			question_uuid: questionToIterate.uuid,
	// 			choices: formattedVal,
	// 		};
	// 		// dispatch(setQuizAnswer(finishVal));

	// 		if (questionNumber + 1 === questions?.length) {
	// 			dispatch(
	// 				fetchQuizResults({
	// 					quiz_id: quizAnswers.quiz_id,
	// 					questions: [...quizAnswers.questions, finishVal],
	// 				})
	// 			).then((data: any) => {
	// 				if (data.meta.requestStatus === "fulfilled") {
	// 					const res = data.payload.data;
	// 					if (res.answered_percentage >= res.pass_percent) {
	// 						// dispatch(setPassed(quizData.uuid));
	// 						if (!passed) dispatch(analyticsActions.increasePassedQuizzes());
	// 					}
	// 				}
	// 			});
	// 			dispatch(educationActions.setQuizLayoutAsDiagram());
	// 		} else {
	// 			setQuestionNumber((prev) => prev + 1);
	// 		}
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// };

	const isArabicLanguage = Boolean(quizData.translation.lang === "ar");

	const btnLabel = () => {
		if (!selectedId.length) return t("Test.Main.choose");
		if (questionNumber + 1 === questions?.length) return t("Test.Main.finish");

		return t("Test.Main.next");
	};

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
					<CheckboxGroup
						value={selectedId}
						onValueChange={setSelectedId}
						className={styles.group}
					>
						{questionToIterate?.answers?.map((answer: any) => (
							<Checkbox
								className={`${styles.choice} ${
									isArabicLanguage && styles.choiceArabic
								}`}
								key={answer.id}
								value={answer.id}
							>
								{answer.text}
							</Checkbox>
						))}
					</CheckboxGroup>
				</motion.div>

				<div className={styles.buttonWrapper}>
					<Button
						className="text-white w-[fit-content] h-[34px] text-base  bg-black border-2 border-black  hover:border-pinkColor border-solid  hover:bg-pinkColor transition "
						variant="bordered"
						isLoading={selectedId.length === 0}
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

export default QuizMultiple;
