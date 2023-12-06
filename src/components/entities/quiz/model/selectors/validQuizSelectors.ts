import { StateSchema } from "@/providers/storeProvider";

export const getCoutn = (state: StateSchema): any => state.validationQuiz.count;

export const getValidArr = (state: StateSchema): any =>
	state.validationQuiz.validArr;
