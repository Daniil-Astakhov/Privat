import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface QuizSlice {
	count: number;
	validArr: object;
}

const initialState: QuizSlice = {
	count: 0,
	validArr: [],
};

export const validationQuizSlice = createSlice({
	name: "validationQuizSlice",
	initialState,
	reducers: {
		setValidArrStep: (state, action: PayloadAction<any>) => {
			state.validArr = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { actions: validationQuizActions } = validationQuizSlice;
export const { reducer: validationQuizReducer } = validationQuizSlice;
