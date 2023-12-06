/* eslint-disable no-unsafe-optional-chaining */
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Tabs, Tab, RadioGroup, Radio, Button } from "@nextui-org/react";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getValidArr } from "@/components/entities/quiz/model/selectors/validQuizSelectors";
import { QuizQuestionType } from "@/components/shared/types/interface";
import { useAppDispatch } from "@/providers/storeProvider";
import { validationQuizActions } from "@/components/entities/quiz/model/slice/validationQuizSlice";
import { educationActions } from "@/components/entities/education/model/slice/educationSlice";
import { animationOpacity } from "@/components/shared/styles/motion/animation";

interface PropsType {
	styles: {
		readonly [key: string]: string;
	};
	questionToIterate: QuizQuestionType;
	isArabicLanguage: boolean;
	questionNumber: number;
	setQuestionNumber: any;

	questions: Array<QuizQuestionType>;
	options?: Array<{
		value: string;
		label: string;
	}>;
	answers?: Array<{
		value: string;
		label: string;
	}>;
}

const TabsQuestions: FC<PropsType> = (props) => {
	const {
		styles,
		questionToIterate,
		isArabicLanguage,
		questionNumber,
		setQuestionNumber,
		questions,
		options,
	} = props;
	const [selected, setSelected] = useState<any>("0");
	const dispatch = useAppDispatch();
	const validArr = useSelector(getValidArr);
	const [answerArr, setAnswerArr] = useState<any>([]);
	const { t } = useTranslation();

	const [valid, setValid] = useState(false);

	const [defaultValue, setDefaultValue] = useState<any>();

	useEffect(() => {
		setAnswerArr({
			question_id: questionToIterate.id,
			choices: questionToIterate.answers.map(() => {
				return {
					id: 0,
					belongsTo: 0,
				};
			}),
		});

		setDefaultValue(
			questionToIterate.answers.map(() => {
				return {
					flag: null,
				};
			})
		);
	}, []);

	useEffect(() => {
		defaultValue?.forEach((item: any) => {
			if (item.flag) {
				setValid(true);
			} else {
				setValid(false);
			}
		});
	}, [answerArr]);

	const tempSubmit = async () => {
		if (validArr && answerArr) {
			// const id = answerId.split("||");
			await dispatch(
				validationQuizActions.setValidArrStep([...validArr, answerArr])
			);
		}
		if (questionNumber !== questions?.length - 1)
			// eslint-disable-next-line no-return-assign
			setQuestionNumber((prev: any) => (prev += 1));
		if (questionNumber === questions?.length - 1) {
			dispatch(educationActions.setQuizLayoutAsDiagram());
		}
	};

	const btnLabel = () => {
		if (!valid) return t("Test.Main.match");
		if (questionNumber + 1 === questions?.length) return t("Test.Main.finish");

		return t("Test.Main.next");
	};

	return (
		<div className={styles.groupWrapper}>
			<motion.div
				{...animationOpacity}
				transition={{
					duration: 0.5,
					stiffness: 0,
					ease: "backInOut",
				}}
			>
				<Tabs
					className={styles.questions}
					selectedKey={selected}
					onSelectionChange={setSelected}
				>
					{questionToIterate?.answers?.map((question, index) => (
						<Tab key={index} title={index + 1}>
							<p
								className={`${styles.optionTitle} ${
									isArabicLanguage && styles.arabicOptionTitle
								}`}
							>
								{question.text}
							</p>
							<RadioGroup
								defaultValue={defaultValue?.[index]?.flag}
								onValueChange={(e: any) => {
									setAnswerArr((prev: any) => {
										const updatedChoices = [...prev.choices];
										updatedChoices[index] = {
											id: questionToIterate?.answers?.[index].id,
											belongsTo: e.split("||")[0],
										};
										return {
											question_id: questionToIterate.id,
											choices: updatedChoices,
										};
									});
									setDefaultValue((prev: any) => {
										const updatedFlags = [...prev];
										updatedFlags[index] = {
											flag: e,
										};
										return updatedFlags;
									});
								}}
								className={styles.group}
							>
								{options?.map((answer) => {
									return (
										<Radio
											className={`${styles.choice} ${
												isArabicLanguage && styles.choiceArabic
											}`}
											key={`${answer.value}-${index}`}
											value={answer.value}
										>
											{answer.label}
										</Radio>
									);
								})}
								<div className="w-full flex justify-end">
									<Button
										isLoading={
											// eslint-disable-next-line no-unsafe-optional-chaining
											selected === `${questionToIterate?.answers.length - 1}`
										}
										variant="light"
										spinner={<span className="hidden" />}
										onClick={() => setSelected((prev: any) => `${+prev + 1}`)}
									>
										Дальше
									</Button>
								</div>
							</RadioGroup>
						</Tab>
					))}
				</Tabs>
			</motion.div>

			<div className={styles.buttonWrapper}>
				<Button
					className="text-white w-[fit-content] h-[34px] text-base  bg-black border-2 border-black  hover:border-pinkColor border-solid  hover:bg-pinkColor transition"
					variant="bordered"
					isLoading={!valid}
					type="submit"
					spinner={<span className="hidden" />}
					onClick={tempSubmit}
				>
					{btnLabel()}
				</Button>
			</div>
		</div>
	);
};

export default TabsQuestions;
