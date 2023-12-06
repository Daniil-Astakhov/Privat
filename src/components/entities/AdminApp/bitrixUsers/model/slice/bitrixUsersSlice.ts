"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BitrixUsersFilters } from "@/components/shared/types/interface";

import { BitrixUsersSchema } from "../types/interface";
// import { fetchBitrixUsers } from "../api/bitrixUsers";

const initialState: BitrixUsersSchema = {
	bitrixUsers: [],
	bitrixUsersFilters: {
		name: "",
		lastname: "",
		job: "",
		department: "",
		by: 10,
	},
	bitrixUsersCount: 0,
	currentBitrixUsersPage: 1,
	isBitrixUsersLoading: true,
};

const bitrixUsersSlice = createSlice({
	name: "applicationsSlice",
	initialState,
	reducers: {
		setBitrixUsersFilters(state, action: PayloadAction<BitrixUsersFilters>) {
			state.bitrixUsersFilters = action.payload;
		},
		setCurrentBitrixUsersPage(state, action: PayloadAction<number>) {
			state.currentBitrixUsersPage = action.payload;
		},
	},
	// extraReducers: (builder) => {
	// 	builder
	// 		.addCase(fetchBitrixUsers.pending, (state, action) => {
	// 			state.isBitrixUsersLoading = true;
	// 		})
	// 		.addCase(fetchBitrixUsers.rejected, (state, action) => {
	// 			state.isBitrixUsersLoading = false;
	// 		})
	// 		.addCase(fetchBitrixUsers.fulfilled, (state, action) => {
	// 			const data = action.payload.data;

	// 			if (data !== undefined) {
	// 				state.bitrixUsersCount = data.total;
	// 				state.bitrixUsers = data.users;
	// 			}

	// 			state.isBitrixUsersLoading = false;
	// 		});
	// },
});

export default bitrixUsersSlice;

export const bitrixUsersActions = bitrixUsersSlice.actions;
