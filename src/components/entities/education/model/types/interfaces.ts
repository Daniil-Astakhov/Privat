import {
	EducationArrayType,
	EducationCorrectsType,
	EducationDataProps,
	EducationQuizAnswers,
	EducationQuizLayout,
	EducationQuizResults,
	EducationQuizType,
	QuizType,
} from "@/components/shared/types/interface";

export interface EducationSchema {
	educationArray: Array<EducationDataProps>;
	isMaterialsLoading: boolean;
	filteredArray: Array<{ uuid: string; position: number; title: string }>;
	testsArray: Array<QuizType>;
	copyOfTestsArray: Array<QuizType>;
	copyOfEducationArray: Array<EducationDataProps>;
	lectureData: EducationArrayType;
	quizData: EducationQuizType;
	quizAnswers: EducationQuizAnswers;
	fetchedCorrects: Array<EducationCorrectsType>;
	quizResults: EducationQuizResults;
	quizLayout: EducationQuizLayout;
	isQuizLoading: boolean;
	count: number;
	currentEducationPage: number;
	currentEducationLanguage: string;
	currentEducationRole: number;
	isLectureLoading: boolean;
}
