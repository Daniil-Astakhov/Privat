"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchFilters } from "@/components/shared/types/interface";

import { ConfirmSchema } from "../types/interface";
// import { fetchConfirm } from "../api/confirm";
// import { User } from "../../../shared/user/interfaces";
// import { updateState } from "../profile/model/functions";
// import { fetchInterns } from "../api/interns";

const initialState: ConfirmSchema = {
	confirmed: [],
	confirmedFilters: {
		name: "",
		start: "",
		end: "",
		phone: "",
		email: "",
	},
	confirmedCount: 0,
	currentConfirmedPage: 1,
	isConfirmationLoading: false,
	isInternsLoading: true,
};

const internsSlice = createSlice({
	name: "internsSlice",
	initialState,
	reducers: {
		setConfirmedFilters(state, action: PayloadAction<SearchFilters>) {
			state.confirmedFilters = action.payload;
		},
		setCurrentConfirmedPage(state, action: PayloadAction<number>) {
			state.currentConfirmedPage = action.payload;
		},
	},
	// extraReducers: (builder) => {
	// 	builder
	// 		.addCase(fetchInterns.pending, (state) => {
	// 			state.isInternsLoading = true;
	// 		})
	// 		.addCase(fetchInterns.rejected, (state) => {
	// 			state.isInternsLoading = false;
	// 		})
	// 		.addCase(fetchInterns.fulfilled, (state, action) => {
	// 			const data = action.payload as any;

	// 			if (data !== undefined) {
	// 				state.confirmedCount = data.count;
	// 				state.confirmed = data.data;
	// 				state.confirmed.forEach((user: User) => {
	// 					updateState(user, user);
	// 				});
	// 			}

	// 			state.isInternsLoading = false;
	// 		})
	// 		.addCase(fetchConfirm.pending, (state, action) => {
	// 			state.isConfirmationLoading = true;
	// 		})
	// 		.addCase(fetchConfirm.rejected, (state, action) => {
	// 			state.isConfirmationLoading = false;
	// 		})
	// 		.addCase(fetchConfirm.fulfilled, (state, action) => {
	// 			state.isConfirmationLoading = false;
	// 		});
	// },
});

export default internsSlice;

export const internsActions = internsSlice.actions;
