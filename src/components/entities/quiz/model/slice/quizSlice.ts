/* eslint-disable no-lonely-if */

"use client";

import { v4 as uuidv4 } from "uuid";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	QuestionType,
	QuizCorrectType,
	QuizQuestionType,
} from "@/components/shared/types/interface";

import { QuizSchema } from "../types/interface";

// import { fetchNewCourse } from "../api/newCourse";
// import { fetchQuizQuestions } from "../api/quizQuestions";
// import { EducationQuizType } from "../education/interfaces";
// import { fetchEditorTemplate, fetchEducationTemplate } from "../api/template";
// import { isFinalConverter } from "../model/functions";
// import shuffle from "../../../shared/shuffle";

const initialState: QuizSchema = {
	synopsis: "",
	questions: [],
	uuid: "",
};

const quizSlice = createSlice({
	name: "quiz",
	initialState,
	reducers: {
		setSynopsis: (state, action) => {
			state.synopsis = action.payload;
		},
		setQuestion: (state, action: PayloadAction<QuestionType>) => {
			const sample: QuizQuestionType = {
				uuid: uuidv4(),
				title: "",
				type: action.payload,
				answers: [],
				corrects: action.payload === "Select" ? [] : [{ uuid: "" }],
			};

			state.questions.push(sample);
		},
		setCustomQuestions: (state, action) => {
			state.questions = action.payload;
		},
		setQuestionTitle: (
			state,
			action: PayloadAction<{ uuid: string; text: string }>
		) => {
			const { uuid, text } = action.payload;
			const question = state.questions.find((quest) => quest.uuid === uuid);

			if (question) {
				question.title = text;
			}
		},
		addQuestionAnswer: (
			state,
			action: PayloadAction<{ questionId: string; answerId: string }>
		) => {
			const { questionId, answerId } = action.payload;
			const question = state.questions.find(
				(quest) => quest.uuid === questionId
			);

			if (question) {
				question.answers = [...question.answers, { uuid: answerId, text: "" }];
			}
		},
		addQuestionCorrect: (
			state,
			action: PayloadAction<{ questionId: string; correctId: string }>
		) => {
			const { questionId, correctId } = action.payload;
			const question = state.questions.find(
				(quest) => quest.uuid === questionId
			);

			if (question) {
				question.corrects = [
					...(question.corrects as Array<QuizCorrectType>),
					{ uuid: correctId, text: "" },
				];
			}
		},
		setQuestionAnswer: (
			state,
			action: PayloadAction<{ uuid: string; text: string; answerId: string }>
		) => {
			const { uuid, text, answerId } = action.payload;
			const question = state.questions.find((quest) => quest.uuid === uuid);

			if (question) {
				const answer = question.answers.find(
					(ans: any) => ans.uuid === answerId
				);

				if (answer) {
					answer.text = text;
				}
			}
		},
		setQuestionCorrect: (
			state,
			action: PayloadAction<{
				uuid: string;
				answerId: string | Array<string>;
				type: QuestionType;
				text?: string;
			}>
		) => {
			const { uuid, answerId, text, type } = action.payload;
			const question = state.questions.find((quest) => quest.uuid === uuid);

			if (question) {
				if (type === "Select") {
					const corrects = question.corrects?.find(
						(specified: any) => specified.uuid === answerId
					);

					if (corrects) {
						corrects.text = text;
					}
				} else if (type === "Multiple") {
					question.corrects = (answerId as unknown as Array<string>).map(
						(id) => {
							return {
								uuid: id,
							};
						}
					);
				} else {
					if (question.corrects) {
						question.corrects[0].uuid = answerId as string;
					}
				}
			}
		},
		removeSpecialQuestion: (
			state,
			action: PayloadAction<{ index: number }>
		) => {
			const { index } = action.payload;

			state.questions.splice(index, 1);
		},
		removeSpecialAnswer: (
			state,
			action: PayloadAction<{ answer_uuid: string; index: number }>
		) => {
			const { answer_uuid, index } = action.payload;

			state.questions.forEach((question) => {
				question.answers.forEach((answer: any) => {
					if (answer.uuid === answer_uuid) {
						question.answers.splice(index, 1);
					}
				});

				if (question.type === "Multiple") {
					question.corrects = question.corrects?.filter(
						(correct: any) => correct.uuid !== answer_uuid
					);
				} else if (question.type === "Single") {
					if (question.corrects?.[0].uuid === answer_uuid) {
						question.corrects = [{ uuid: "" }];
					}
				} else if (question.type === "Select") {
					if (question.corrects?.[index]?.uuid === answer_uuid)
						question.corrects?.splice(index, 1);
				}
			});
		},
		resetQuizState: (state) => {
			state.synopsis = "";
			state.questions = [];
			state.uuid = "";
		},
		resetQuizUuid: (state) => {
			state.uuid = "";
		},
	},
	// extraReducers: (builder) => {
	// 	builder
	// 		.addCase(fetchNewCourse.fulfilled, (state) => {
	// 			state.synopsis = "";
	// 			state.questions = [];
	// 			state.uuid = "";
	// 		})
	// 		.addCase(
	// 			fetchQuizQuestions.fulfilled,
	// 			(state, action: PayloadAction<any>) => {
	// 				state.synopsis = action.payload.description;
	// 				state.questions = action.payload.questions;
	// 			}
	// 		)
	// 		.addCase(fetchEditorTemplate.fulfilled, (state, action) => {
	// 			console.log(action.payload);
	// 			if (action.payload.quiz !== null) {
	// 				state.synopsis = action.payload.quiz?.translation?.description || "";
	// 				state.questions = action.payload.quiz?.translation?.questions || [];
	// 				state.uuid = action.payload.quiz.uuid;
	// 			}
	// 		})
	// 		.addCase(fetchEducationTemplate.fulfilled, (state, action) => {
	// 			console.log(action.payload);
	// 			if (action.payload.quiz !== null) {
	// 				state.synopsis = action.payload.quiz?.translation?.description || "";
	// 				state.questions = action.payload.quiz?.translation?.questions || [];
	// 				state.uuid = action.payload.quiz.uuid;
	// 			}
	// 		});
	// },
});

export const {
	setQuestion,
	setQuestionTitle,
	addQuestionAnswer,
	addQuestionCorrect,
	setQuestionAnswer,
	setQuestionCorrect,
	setSynopsis,
	setCustomQuestions,
	removeSpecialQuestion,
	removeSpecialAnswer,
	resetQuizState,
	resetQuizUuid,
} = quizSlice.actions;

export default quizSlice;
