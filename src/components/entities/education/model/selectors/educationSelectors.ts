import { StateSchema } from "@/providers/storeProvider";

export const getResult = (state: StateSchema): any =>
	state.education.quizResults;
