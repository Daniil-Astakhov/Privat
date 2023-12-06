import { QuizQuestionType } from "@/components/shared/types/interface";

export interface TranslationType {
	backgroundImage: string | null;
	content: string;
	initialEditorState: string;
	coursetranslateable_id: number;
	coursetranslateable_type: string;
	language: string;
	parent_uuid: string;
	lectureTitle: string;
}

export interface LectureSchema {
	lectureTitle: string;
	content: string;
	initialEditorState: string;
	isFinal: boolean;
	targeted: Array<string>;
	uuid: string;
	backgroundImage: string | null;
	language: string;
	// translation: TranslationType;
	toUpdate: boolean;
	isDraftLoading?: boolean;
	position?: number;
}

export interface AddCourse {
	lecture: {
		isFinal: 0 | 1;
		translation: {
			title: string;
			initialEditorState: string;
			lang: string;
			content: string;
			backgroundImage: string | null;
		};
		targeted: Array<string>;
		uuid?: string;
		position?: number;
	};
	quiz?: {
		duration: number;
		percent: number;
		attempts: number;
		translation: {
			title: string;
			synopsis: string;
			lang: string;
			questions: Array<QuizQuestionType>;
		};
		uuid?: string;
	};
}
