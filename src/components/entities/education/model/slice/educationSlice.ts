/* eslint-disable no-unused-expressions */
/* eslint-disable eqeqeq */

"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { fetchAllCourses } from "../api/allCourses";
// import { fetchCourse } from "../api/course";
// import { fetchCorrectAnswers } from "../api/correctsAnswers";
// import { fetchQuizResults } from "../api/quizResults";
// import { fetchAllQuizzes } from "../api/allQuizzes";
// import { fetchUpdatePosition } from "../api/updatePosition";
// import { fetchDeleteCourse } from "../api/deleteCourse";
import i18n from "i18next";
import { fetchAllCourses } from "@/components/entities/education/model/actions/allCourses";
import { fetchLecture } from "@/components/entities/education/model/actions/lecture";
import { fetchProfile } from "@/components/entities/welcome/model/actions/profile";
import { fetchQuiz } from "@/components/entities/education/model/actions/quiz";
import { fetchQuizResults } from "@/components/entities/education/model/actions/quizResults";
import { fetchMyQuizResults } from "@/components/entities/analytics/model/actions/myQuizResults";
import { shuffle } from "@/components/shared/functions/functions";
import {
	EducationArrayType,
	EducationQuizType,
	EducationCorrectsType,
	EducationQuizResults,
	EducationDataProps,
} from "@/components/shared/types/interface";
import { EducationSchema } from "../types/interfaces";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import rootExtractor from "../../../features/editor/toJson/functions/rootExtractor.js";
// import { fetchProfile } from "../api/profile";

const initialState: EducationSchema = {
	educationArray: [],
	isMaterialsLoading: true,
	filteredArray: [],
	copyOfEducationArray: [],
	testsArray: [],
	copyOfTestsArray: [],
	lectureData: {} as EducationArrayType,
	quizData: {} as EducationQuizType,
	quizAnswers: {
		lang: "",
		quiz_uuid: "",
		questions: [],
		title: "",
		quiz_id: 0,
	},
	fetchedCorrects: [] as Array<EducationCorrectsType>,
	quizResults: {} as EducationQuizResults,
	quizLayout: "Quiz",
	// quizLayout: "Results",
	isQuizLoading: false,
	count: 0,
	currentEducationPage: 1,
	currentEducationLanguage: i18n.language?.split("-")[0],
	currentEducationRole: 0,
	isLectureLoading: false,
};

const educationSlice = createSlice({
	name: "education",
	initialState,
	reducers: {
		setLectureData: (state, action: PayloadAction<string>) => {
			const lecture = state.educationArray.find(
				(x) => x.uuid === action.payload
			);
			if (lecture) {
				// state.lectureData = lecture;
			}
		},
		setQuizAnswer: (state, action: PayloadAction<EducationCorrectsType>) => {
			state.quizAnswers.questions.push(action.payload);
		},
		setQuizUuid: (state, action: PayloadAction<string>) => {
			state.quizAnswers.quiz_uuid = action.payload;
		},
		setQuizLayoutAsDiagram: (state) => {
			state.quizLayout = "Diagram";
		},
		setQuizLayoutAsResults: (state) => {
			state.quizLayout = "Results";
		},
		changeEducationArrayOrder: (state, action) => {
			state.educationArray = action.payload;
		},
		changeTestsArrayOrder: (state, action) => {
			state.testsArray = action.payload;
		},
		setCopyOfEducationArray: (state) => {
			state.copyOfEducationArray = state.educationArray;
		},
		setCopyOfTestsArray: (state) => {
			state.copyOfTestsArray = state.testsArray;
		},
		setCurrentEducationPage: (state, action: PayloadAction<number>) => {
			state.currentEducationPage = action.payload;
		},
		setCurrentEducationLanguage: (state, action: PayloadAction<string>) => {
			state.currentEducationLanguage = action.payload;
		},
		setIsRead: (state, action: PayloadAction<string>) => {
			state.educationArray.forEach((el) => {
				if (el.uuid === action.payload) {
					if (el.isRead == 0) {
						el.isRead = 1;
						state.lectureData.isRead = 1;
					}
				}
			});
		},
		setIsLectureLoading: (state, action: PayloadAction<boolean>) => {
			state.isLectureLoading = action.payload;
		},
		setPassed: (state, action: PayloadAction<string>) => {
			state.educationArray.forEach((el) => {
				if (el.quiz.uuid === action.payload) {
					if (el.quiz.passed == 0 || el.quiz.passed === null) {
						el.quiz.passed = 1;
					}
				}
			});
		},
		setEducationCurrentRole: (state, action: PayloadAction<number>) => {
			state.currentEducationRole = action.payload;
		},
		resetLectureData: (state) => {
			state.lectureData = {} as EducationArrayType;
		},
		resetQuizAnswers: (state) => {
			state.quizAnswers = {
				lang: "",
				quiz_uuid: "",
				questions: [],
				title: "",
				quiz_id: 0,
			};
		},
		resetQuizAnswersQuestions: (state) => {
			state.quizAnswers.questions = [];
		},
		resetQuizData: (state) => {
			state.quizData = {} as EducationQuizType;
		},
		resetFetchCorrects: (state) => {
			state.fetchedCorrects = [] as Array<EducationCorrectsType>;
		},
		resetQuizLayout: (state) => {
			state.quizLayout = "Quiz";
		},
		resetQuizResults: (state) => {
			state.quizResults = {} as EducationQuizResults;
		},
		updateEducationArrayPositions: (state) => {
			for (let i = 0; i < state.educationArray.length; i += 1) {
				state.educationArray[i].position = i;
			}
			state.filteredArray = state.educationArray.map((education, index) => {
				return {
					uuid: education.uuid,
					position: index,
					title: education.title,
				};
			});
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProfile.fulfilled, (state, action) => {
				const jobId = action.payload?.data.job.id;
				jobId === 9
					? (state.currentEducationRole = 1)
					: (state.currentEducationRole = jobId);
			})
			.addCase(fetchAllCourses.pending, (state) => {
				state.isMaterialsLoading = true;
			})
			.addCase(fetchAllCourses.rejected, (state) => {
				state.isMaterialsLoading = false;
			})
			.addCase(
				fetchAllCourses.fulfilled,
				(state, action: PayloadAction<any>) => {
					state.count = action.payload?.count;
					state.educationArray = action.payload?.data.filter(
						(el: EducationDataProps) => el.title
					);
					state.isMaterialsLoading = false;
				}
			)
			// 		.addCase(
			// 			fetchAllQuizzes.fulfilled,
			// 			(
			// 				state,
			// 				action: PayloadAction<{
			// 					count: number;
			// 					data: Array<QuizType>;
			// 					message: string;
			// 					status: string;
			// 				}>
			// 			) => {
			// 				state.testsArray = action.payload.data;
			// 			}
			// 		)
			.addCase(fetchLecture.pending, (state) => {
				state.isLectureLoading = true;
			})
			.addCase(fetchLecture.rejected, (state) => {
				state.isLectureLoading = false;
			})
			.addCase(fetchLecture.fulfilled, (state, action: PayloadAction<any>) => {
				state.lectureData = action.payload;
				state.isLectureLoading = false;
			})
			.addCase(fetchQuiz.pending, (state) => {
				state.isQuizLoading = true;
			})
			.addCase(fetchQuiz.rejected, (state) => {
				state.isQuizLoading = false;
			})
			.addCase(
				fetchQuiz.fulfilled,
				(state, action: PayloadAction<EducationQuizType>) => {
					state.quizData = action.payload;
					state.quizData.translation.questions =
						action.payload.translation.questions;

					state.quizData.translation.questions.forEach((question: any) => {
						if (question.type !== "Select") {
							question.answers = shuffle(question.answers);
						}
						if (question.type === "Select") {
							if (question.options) {
								question.options = shuffle(question.options);
							}
						}
					});
					state.quizAnswers.quiz_uuid = action.payload.uuid;
					state.isQuizLoading = false;
				}
			)
			// 		.addCase(
			// 			fetchCorrectAnswers.fulfilled,
			// 			(state, action: PayloadAction<Array<EducationCorrectsType>>) => {
			// 				// console.log(action.payload);
			// 			}
			// 		)
			.addCase(fetchQuizResults.fulfilled, (state, action) => {
				const { data } = action.payload;
				state.quizResults = data;
			})
			.addCase(fetchMyQuizResults.fulfilled, (state, action) => {
				const { data } = action.payload;
				state.quizResults = data;
			});
		// 		.addCase(fetchUpdatePosition.fulfilled, (state, action) => {
		// 			state.filteredArray = [];
		// 		})
		// 		.addCase(fetchDeleteCourse.fulfilled, (state, action) => {
		// 			const uuid = action.meta.arg;
		// 			const deletableSample = state.educationArray.findIndex(
		// 				// (el) => el.uuid === uuid
		// 				(el) => el.id === uuid.id
		// 			);
		// 			if (deletableSample > -1)
		// 				state.educationArray.splice(deletableSample, 1);
		// 			state.count -= 1;
		// 		});
	},
});

export default educationSlice;

export const educationActions = educationSlice.actions;
