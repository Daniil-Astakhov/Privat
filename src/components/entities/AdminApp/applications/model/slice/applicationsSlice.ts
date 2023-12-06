"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchFilters } from "@/components/shared/types/interface";

import { ApplicationsSchema } from "../types/interface";

const initialState: ApplicationsSchema = {
	unconfirmed: [],
	unconfirmedFilters: {
		name: "",
		phone: "",
		email: "",
		start: "",
		end: "",
	},
	unconfirmedCount: 0,
	currentUnconfirmedPage: 1,
	overallApplications: 0,
	isApplicationsLoading: true,
	isConfirmLoading: false,
};

const applicationsSlice = createSlice({
	name: "applicationsSlice",
	initialState,
	reducers: {
		setUnconfirmedFilters(state, action: PayloadAction<SearchFilters>) {
			state.unconfirmedFilters = action.payload;
		},
		setCurrentUnconfirmedPage(state, action: PayloadAction<number>) {
			state.currentUnconfirmedPage = action.payload;
		},
		setOverallApplications(state, action: PayloadAction<number>) {
			state.overallApplications = action.payload;
		},
	},
	// extraReducers: (builder) => {
	//   builder
	//     .addCase(fetchUnconfirmed.pending, (state, action) => {
	//       state.isApplicationsLoading = true;
	//     })
	//     .addCase(fetchUnconfirmed.rejected, (state, action) => {
	//       state.isApplicationsLoading = false;
	//     })
	//     .addCase(fetchUnconfirmed.fulfilled, (state, action) => {
	//       const data = action.payload as any;

	//       if (data !== undefined) {
	//         state.unconfirmedCount = data.count;
	//         state.unconfirmed = data.data;
	//         state.unconfirmed.forEach((user: User) => {
	//           updateState(user, user);
	//         });
	//       }
	//       state.isApplicationsLoading = false;
	//     })
	//     .addCase(fetchConfirm.pending, (state) => {
	//       state.isConfirmLoading = true;
	//     })
	//     .addCase(fetchConfirm.rejected, (state) => {
	//       state.isConfirmLoading = false;
	//     })
	//     .addCase(fetchConfirm.fulfilled, (state, action) => {
	//       state.unconfirmed = state.unconfirmed.filter(
	//         (el) => el.id !== action.meta.arg.id
	//       );
	//       // If we make accepted user as mentor we don't need to change
	//       // overallApplications count.
	//       if (!action.meta.arg.role) state.overallApplications -= 1;

	//       state.isConfirmLoading = false;
	//     })
	//     .addCase(fetchDelete.fulfilled, (state, action) => {
	//       const lengthBefore = state.unconfirmed.length;

	//       state.unconfirmed = state.unconfirmed.filter(
	//         (el) => el.id !== action.meta.arg.id
	//       );

	//       const lengthAfter = state.unconfirmed.length;

	//       console.log(lengthBefore);
	//       console.log(lengthAfter);
	//     });
	// },
});

export default applicationsSlice;

export const applicationsActions = applicationsSlice.actions;
