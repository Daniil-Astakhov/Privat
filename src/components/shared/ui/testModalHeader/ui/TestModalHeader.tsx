import {
	EducationQuizLayout,
	EducationQuizType,
} from "@/components/shared/types/interface";
import { Progress } from "@nextui-org/react";
import { t } from "i18next";
import { FC } from "react";

interface PropsType {
	quizData: EducationQuizType;
	quizLayout: EducationQuizLayout;
	questionsLength: number;
	questionNumber: number;
	tabletSize: boolean;
}

const TestModalHeader: FC<PropsType> = (props) => {
	const { quizData, quizLayout, questionNumber, questionsLength, tabletSize } =
		props;

	return (
		<>
			{/* <div className={styles.topHeaderBlock}> */}

			<div className="relative w-full flex justify-between">
				<p className={tabletSize ? "w-[40%]" : ""}>
					{quizData?.translation?.title}
				</p>
				<div
					className={
						tabletSize
							? "text-center absolute left-[50%] translate-x-[-50%]"
							: ""
					}
				>
					{quizLayout !== "Results" && (
						<p>
							{questionNumber + 1} {t("Test.Main.from")} {questionsLength}
						</p>
					)}
				</div>
			</div>
			{quizLayout !== "Results" && (
				<Progress
					aria-label="loading"
					size="sm"
					value={((questionNumber + 1) / questionsLength) * 100}
					color="default"
				/>
			)}
		</>
	);
};

export default TestModalHeader;
