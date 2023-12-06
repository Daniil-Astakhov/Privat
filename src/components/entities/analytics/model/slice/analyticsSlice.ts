"use client";

import { createSlice } from "@reduxjs/toolkit";
import { fetchAnalytic } from "@/components/entities/analytics/model/actions/analytic";
import { fetchLogout } from "@/components/entities/welcome/model/actions/logout";
import { AnalyticsSchema } from "../types/interface";

const initialState: AnalyticsSchema = {
	courses: [],
	quizzes: [],
	rating: 0,
	totalCourses: 0,
	readCourses: 0,
	totalQuizzes: 0,
	passedQuizzes: 0,
	isAnalyticsLoading: false,
};

const analyticsSlice = createSlice({
	name: "analyticsSlice",
	initialState,
	reducers: {
		increaseReadMaterials(state) {
			state.readCourses += 1;
		},
		increasePassedQuizzes(state) {
			state.passedQuizzes += 1;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAnalytic.pending, (state) => {
				state.isAnalyticsLoading = true;
			})
			.addCase(fetchAnalytic.rejected, (state) => {
				state.isAnalyticsLoading = false;
			})
			.addCase(fetchAnalytic.fulfilled, (state, action) => {
				state.courses = action.payload.courses;
				state.quizzes = action.payload.quizzes;
				state.rating = action.payload.rating;
				state.totalCourses = action.payload.totalCourses;
				state.readCourses = action.payload.readCourses;
				state.totalQuizzes = action.payload.totalQuizzes;
				state.passedQuizzes = action.payload.passedQuizzes;

				state.isAnalyticsLoading = false;
			})
			.addCase(fetchLogout.fulfilled, (state) => {
				state.courses = [];
				state.quizzes = [];
				state.rating = 0;
				state.totalCourses = 0;
				state.readCourses = 0;
				state.totalQuizzes = 0;
				state.passedQuizzes = 0;
				state.isAnalyticsLoading = false;
			});
	},
});

export default analyticsSlice;

export const analyticsActions = analyticsSlice.actions;
