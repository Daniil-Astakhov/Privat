"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SamplesSchema } from "../types/interfaces";
// import { fetchCoursesSample } from "../api/coursesSample";
// import { fetchProfile } from "../api/profile";
// import { fetchNewCourse } from "../api/newCourse";
// import { fetchDeleteCourse } from "../api/deleteCourse";
// import { JobTitleType } from "../../../shared/user/interfaces";
// import { fetchSignIn } from "../api/signIn";
// import { fetchUpdateMaterial } from "../api/updateMaterial";

const initialState: SamplesSchema = {
	count: 0,
	currentSamplePage: 1,
	currentRole: null,
	samples: [],
	isSending: false,
	editorKey: 0,
};

const sampleSlice = createSlice({
	name: "samples",
	initialState,
	reducers: {
		setCurrentSamplePage: (state, action: PayloadAction<number>) => {
			state.currentSamplePage = action.payload;
		},
		setCurrentRole: (state, action: PayloadAction<number>) => {
			state.currentRole = action.payload;
		},
		setEditorKey: (state) => {
			state.editorKey += 1;
		},
		resetStateSamples: (state) => {
			state.samples = [];
		},
	},
	// extraReducers: (builder) => {
	// 	builder
	// 		.addCase(
	// 			fetchCoursesSample.fulfilled,
	// 			(
	// 				state,
	// 				action: PayloadAction<{ count: number; data: Array<CourseType> }>
	// 			) => {
	// 				state.count = action.payload.count;
	// 				state.samples = action.payload.data.filter((el) => el.title);
	// 			}
	// 		)
	// 		.addCase(fetchSignIn.fulfilled, (state, action) => {
	// 			state.currentRole = action.payload.job.id;
	// 		})
	// 		.addCase(fetchProfile.fulfilled, (state, action) => {
	// 			state.currentRole = action.payload.data.job.id;
	// 		})
	// 		.addCase(fetchDeleteCourse.fulfilled, (state, action) => {
	// 			const uuid = action.meta.arg;

	// 			const deletableSample = state.samples.findIndex(
	// 				// (el) => el.uuid === uuid
	// 				(el) => el.id === uuid.id
	// 			);

	// 			if (deletableSample > -1) state.samples.splice(deletableSample, 1);

	// 			state.count -= 1;
	// 		})
	// 		.addCase(fetchNewCourse.pending, (state) => {
	// 			state.isSending = true;
	// 		})
	// 		.addCase(fetchNewCourse.fulfilled, (state) => {
	// 			state.isSending = false;
	// 		})
	// 		.addCase(fetchNewCourse.rejected, (state) => {
	// 			// localStorage.setItem("errorsMaterials", "w");
	// 			state.isSending = false;
	// 		})
	// 		.addCase(fetchUpdateMaterial.rejected, (state) => {
	// 			// console.log(action.payload);
	// 		})
	// 		.addCase(fetchUpdateMaterial.fulfilled, (state) => {
	// 			// console.log(action.payload);
	// 		});
	// },
});

export default sampleSlice;

export const {
	setCurrentSamplePage,
	setCurrentRole,
	setEditorKey,
	resetStateSamples,
} = sampleSlice.actions;
