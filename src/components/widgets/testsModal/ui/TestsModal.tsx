"use client";

import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	useDisclosure,
} from "@nextui-org/react";
import { FC, useEffect, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";

import QuizDiagram from "@/components/features/Tests/test/quizDiagram/QuizDiagram";
import QuizResults from "@/components/features/Tests/test/quizResults/QuizResults";
import QuizController from "@/components/features/Tests/test/ui/QuizController";
import { fetchQuiz } from "@/components/entities/education/model/actions/quiz";

import { useAppDispatch, useAppSelector } from "@/providers/storeProvider";
import TestModalHeader from "@/components/shared/ui/testModalHeader/ui/TestModalHeader";
import LichiLoader from "@/components/shared/ui/lichiLoader/ui/LichiLoader";
import { QuizQuestionType } from "@/components/shared/types/interface";
import { validationQuizActions } from "@/components/entities/quiz/model/slice/validationQuizSlice";
import styles from "./testsModal.module.sass";
import { againHandler } from "../../../shared/functions/functions";

interface LichiModalProps {
	quiz_id: number;
	open?: boolean;
	onChange?: (value: boolean) => void;
	closeCallback?: () => void;
	okCallback?: () => void;
}

const TestsModal: FC<LichiModalProps> = ({
	quiz_id,
	open = false,
	onChange = () => {
		return null;
	},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	okCallback = () => console.warn("closed"),
	closeCallback = () => console.warn("closed"),
}): JSX.Element => {
	const { quizData, quizLayout, quizAnswers, quizResults } = useAppSelector(
		(state) => state.education
	);
	const dispatch = useAppDispatch();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [questionNumber, setQuestionNumber] = useState(0);
	const size = useWindowSize();

	const questionToIterate = quizData?.translation?.questions?.[questionNumber];
	const questionsLength = quizData?.translation?.questions?.length;

	useEffect(() => {
		if (open && quiz_id) {
			onOpen();
			dispatch(fetchQuiz({ quiz_id }));
		}
	}, [open, quiz_id]);

	useEffect(() => {
		onChange(isOpen);
	}, [isOpen]);

	const tabletSize = size.width !== null && size?.width < 1024;

	return (
		<Modal
			classNames={{
				wrapper: styles.wrapper,
				base: styles.base,
				backdrop: styles.backdrop,
				header: styles.header,
				body: styles.body,
				footer: styles.footer,
				closeButton: styles.closeButton,
			}}
			size="3xl"
			isOpen={isOpen}
			onClose={() => {
				if (closeCallback) closeCallback();
				againHandler(dispatch);
				dispatch(validationQuizActions.setValidArrStep([]));
				// dispatch(resetQuizLayout());
				onClose();
			}}
			backdrop="blur"
		>
			<ModalContent>
				{() => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							{!tabletSize && (
								<TestModalHeader
									quizData={quizData}
									quizLayout={quizLayout}
									questionsLength={questionsLength}
									questionNumber={questionNumber}
									tabletSize={tabletSize}
								/>
							)}
						</ModalHeader>
						<ModalBody>
							<>
								{Boolean(!questionsLength && !quizResults) && <LichiLoader />}
								{Boolean(questionsLength || quizResults) && (
									<>
										{tabletSize && (
											<TestModalHeader
												quizData={quizData}
												quizLayout={quizLayout}
												questionsLength={questionsLength}
												questionNumber={questionNumber}
												tabletSize={tabletSize}
											/>
										)}
										{quizLayout === "Quiz" && (
											<QuizController
												quizData={quizData}
												questionNumber={questionNumber}
												setQuestionNumber={setQuestionNumber}
												questionToIterate={
													questionToIterate as QuizQuestionType
												}
												quizAnswers={quizAnswers}
											/>
										)}
										{quizLayout === "Diagram" && (
											<QuizDiagram onClose={onClose} />
										)}
										{quizLayout === "Results" && <QuizResults />}
									</>
								)}
							</>
						</ModalBody>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default TestsModal;
