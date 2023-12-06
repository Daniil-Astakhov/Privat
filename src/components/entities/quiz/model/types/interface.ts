import { QuizQuestionType } from "@/components/shared/types/interface";

export interface QuizSchema {
	synopsis: string;
	questions: Array<QuizQuestionType>;
	uuid?: string;
}
