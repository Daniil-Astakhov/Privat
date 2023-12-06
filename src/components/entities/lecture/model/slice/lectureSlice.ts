"use client";

import { createSlice } from "@reduxjs/toolkit";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { v4 as uuidv4 } from "uuid";
import { LectureSchema } from "../types/interface";
// import { fetchNewCourse } from "../api/newCourse";
// import { fetchEditorTemplate, fetchEducationTemplate } from "../api/template";
// import { isFinalConverter } from "../model/functions";

const initialState: LectureSchema = {
	lectureTitle: "",
	content: "",
	initialEditorState: "",
	isFinal: false,
	targeted: [],
	language: "",
	uuid: "",
	backgroundImage: null,
	isDraftLoading: false,
	toUpdate: false,
	position: 0,
};

const lectureSlice = createSlice({
	name: "editor",
	initialState,
	reducers: {
		setLectureTitle: (state, action) => {
			state.lectureTitle = action.payload;
		},
		setLectureContent: (state, action) => {
			state.content = action.payload;
		},
		setLectureTargeted: (state, action) => {
			state.targeted = action.payload;
		},
		setLectureLanguage: (state, action) => {
			state.language = action.payload;
		},
		setBackgroundImage: (state, action) => {
			state.backgroundImage = action.payload;
		},
		setLectureInitialState: (state, action) => {
			state.initialEditorState = action.payload;
		},
		setUuid: (state) => {
			state.uuid = uuidv4();
		},
		resetBackgroundImage: (state) => {
			state.backgroundImage = null;
		},
		resetLectureState: (state) => {
			state.lectureTitle = "";
			state.content = "";
			state.initialEditorState = "";
			state.isFinal = false;
			state.targeted = [];
			state.language = "";
			state.uuid = "";
			state.backgroundImage = null;
			state.toUpdate = false;
			state.position = 0;
		},
		resetLanguage: (state) => {
			state.language = "";
		},
		resetLectureUuid: (state) => {
			state.uuid = "";
		},
		resetToUpdate: (state) => {
			state.toUpdate = false;
		},
	},
	// extraReducers: (builder) => {
	// 	builder
	// 		.addCase(fetchNewCourse.rejected, (state, action) => {
	// 			console.log(action.error.message);
	// 		})
	// 		.addCase(fetchNewCourse.fulfilled, (state) => {
	// 			state.lectureTitle = "";
	// 			state.content = "";
	// 			state.initialEditorState = "";
	// 			state.isFinal = false;
	// 			state.targeted = [];
	// 			state.language = "";
	// 			state.uuid = "";
	// 			state.backgroundImage = null;
	// 			state.toUpdate = false;
	// 			state.position = 0;
	// 		})
	// 		.addCase(fetchEditorTemplate.pending, (state, action) => {
	// 			state.isDraftLoading = true;
	// 		})
	// 		.addCase(fetchEditorTemplate.rejected, (state, action) => {
	// 			state.isDraftLoading = false;
	// 			state.toUpdate = false;
	// 		})
	// 		.addCase(fetchEditorTemplate.fulfilled, (state, action) => {
	// 			state.lectureTitle = action.payload.translation.title;
	// 			if (action.payload.translation.initialEditorState !== "null") {
	// 				state.initialEditorState =
	// 					action.payload.translation.initialEditorState;
	// 			} else {
	// 				action.payload.translation.initialEditorState = "";
	// 			}
	// 			state.uuid = action.payload.uuid;
	// 			// state.content = action.payload.translation.content;
	// 			state.backgroundImage = action.payload.translation.backgroundImage;
	// 			state.isFinal = isFinalConverter[action.payload.isFinal];
	// 			state.targeted = action.payload.targeted.map((role: number) =>
	// 				role.toString()
	// 			);
	// 			state.language = action.payload.translation.lang;
	// 			state.position = action.payload.position;
	// 			state.isDraftLoading = false;
	// 			state.toUpdate = true;
	// 		})

	// 		.addCase(fetchEducationTemplate.fulfilled, (state, action) => {
	// 			state.lectureTitle = action.payload.translation.title;
	// 			if (action.payload.translation.initialEditorState !== "null") {
	// 				state.initialEditorState =
	// 					action.payload.translation.initialEditorState;
	// 			} else {
	// 				action.payload.translation.initialEditorState = "";
	// 			}
	// 			state.uuid = action.payload.uuid;
	// 			// state.content = action.payload.translation.content;
	// 			state.backgroundImage = action.payload.translation.backgroundImage;
	// 			state.isFinal = isFinalConverter[action.payload.isFinal];
	// 			state.targeted = action.payload.targeted.map((role: number) =>
	// 				role.toString()
	// 			);
	// 			state.language = action.payload.translation.lang;
	// 			state.position = action.payload.position;
	// 			state.toUpdate = true;
	// 		});
	// },
});

export const {
	setLectureTitle,
	setLectureContent,
	setLectureTargeted,
	setLectureInitialState,
	setBackgroundImage,
	setLectureLanguage,
	setUuid,
	resetBackgroundImage,
	resetLectureState,
	resetLanguage,
	resetLectureUuid,
	resetToUpdate,
} = lectureSlice.actions;

export default lectureSlice;
