"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchFilters } from "@/components/shared/types/interface";
import { ExpiredSchema } from "../types/interface";
// import { fetchExpired } from "../api/expired";
// import { User } from "../../../shared/user/interfaces";
// import { updateState } from "../profile/model/functions";
// import { fetchDisable } from "../api/disable";

const initialState: ExpiredSchema = {
	expired: [],
	expiredFilters: {
		name: "",
		start: "",
		end: "",
		phone: "",
		email: "",
	},
	expiredCount: 0,
	overallExpired: 0,
	currentExpiredPage: 1,
	expiredLoading: true,
};

const expiredSlice = createSlice({
	name: "applicationsSlice",
	initialState,
	reducers: {
		setExpiredFilters(state, action: PayloadAction<SearchFilters>) {
			state.expiredFilters = action.payload;
		},
		setCurrentExpiredPage(state, action: PayloadAction<number>) {
			state.currentExpiredPage = action.payload;
		},
		setOverallExpired(state, action: PayloadAction<number>) {
			state.overallExpired = action.payload;
		},
	},
	// extraReducers: (builder) => {
	//   builder
	//     .addCase(fetchExpired.pending, (state, action) => {
	//       state.expiredLoading = true;
	//     })
	//     .addCase(fetchExpired.rejected, (state, action) => {
	//       state.expiredLoading = true;
	//     })
	//     .addCase(fetchExpired.fulfilled, (state, action) => {
	//       const data = action.payload as any;

	//       if (data !== undefined) {
	//         state.expiredCount = data.count;
	//         state.expired = data.data;
	//         state.expired.forEach((user: User) => {
	//           updateState(user, user);
	//         });
	//       }

	//       state.expiredLoading = false;
	//     })
	//     .addCase(fetchDisable.fulfilled, (state, action) => {
	//       state.expired = state.expired.filter(
	//         (el) => el.id !== action.meta.arg.id
	//       );
	//     });
	// },
});

export default expiredSlice;

export const expiredActions = expiredSlice.actions;
