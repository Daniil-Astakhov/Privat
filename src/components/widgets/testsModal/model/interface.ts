import React from "react";
import {
	EducationQuizAnswers,
	EducationQuizType,
	QuizQuestionType,
} from "@/components/shared/types/interface";

export interface PropsType {
	questionToIterate: QuizQuestionType;
	questionNumber: number;
	quizData: EducationQuizType;
	setQuestionNumber: React.Dispatch<React.SetStateAction<number>>;
	quizAnswers: EducationQuizAnswers;
}
