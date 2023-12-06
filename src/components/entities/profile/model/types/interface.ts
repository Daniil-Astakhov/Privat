import { User } from "@/components/shared/types/interface";

export interface ProfileSchema
	extends Omit<
		User,
		"materials" | "materialsCount" | "passedQuizzes" | "quizzes"
	> {
	isLoading: boolean;
	isProfileRejected: boolean;
	isLogoutSuccessful: boolean;
	jobTitlesArray: Array<{ id: number; title: string }>;
}
