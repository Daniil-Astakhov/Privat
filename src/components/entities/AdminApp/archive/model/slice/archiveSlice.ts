"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchFilters } from "@/components/shared/types/interface";

import { ArchiveSchema } from "../types/interface";

const initialState: ArchiveSchema = {
	archive: [],
	archiveFilters: {
		name: "",
		start: "",
		end: "",
		phone: "",
		email: "",
	},
	currentArchivePage: 1,
	archiveCount: 0,
	isArchiveLoading: true,
};

const archiveSlice = createSlice({
	name: "applicationsSlice",
	initialState,
	reducers: {
		setArchiveFilters(state, action: PayloadAction<SearchFilters>) {
			state.archiveFilters = action.payload;
		},
		setCurrentArchivePage(state, action: PayloadAction<number>) {
			state.currentArchivePage = action.payload;
		},
	},
	// extraReducers: (builder) => {
	// 	builder
	// 		.addCase(fetchArchiveSearch.pending, (state) => {
	// 			state.isArchiveLoading = true;
	// 		})
	// 		.addCase(fetchArchiveSearch.rejected, (state) => {
	// 			state.isArchiveLoading = false;
	// 		})
	// 		.addCase(fetchArchiveSearch.fulfilled, (state, action) => {
	// 			const data = action.payload;

	// 			if (data !== undefined) {
	// 				state.archiveCount = data.count;
	// 				state.archive = data.data;
	// 				state.archive.forEach((user: User) => {
	// 					updateState(user, user);
	// 				});
	// 			}

	// 			state.isArchiveLoading = false;
	// 		});
	// },
});

export default archiveSlice;

export const archiveActions = archiveSlice.actions;
