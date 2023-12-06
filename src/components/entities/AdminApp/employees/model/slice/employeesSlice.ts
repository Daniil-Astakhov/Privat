"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchFilters } from "@/components/shared/types/interface";

import { EmployeesSchema } from "../types/interface";
// import { User } from "../../../shared/user/interfaces";
// import { updateState } from "../profile/model/functions";
// import { fetchEmployees } from "../api/employees";
// import { fetchDisable } from "../api/disable";

const initialState: EmployeesSchema = {
	employees: [],
	employeesFilters: {
		name: "",
		start: "",
		end: "",
		phone: "",
		email: "",
	},
	employeesCount: 0,
	currentEmployeesPage: 1,
	isEmployeesLoading: true,
};

const employeesSlice = createSlice({
	name: "applicationsSlice",
	initialState,
	reducers: {
		setEmployeesFilters(state, action: PayloadAction<SearchFilters>) {
			state.employeesFilters = action.payload;
		},
		setCurrentEmployeesPage(state, action: PayloadAction<number>) {
			state.currentEmployeesPage = action.payload;
		},
	},
	// extraReducers: (builder) => {
	// 	builder
	// 		.addCase(fetchEmployees.pending, (state) => {
	// 			state.isEmployeesLoading = true;
	// 		})
	// 		.addCase(fetchEmployees.rejected, (state) => {
	// 			state.isEmployeesLoading = false;
	// 		})
	// 		.addCase(fetchEmployees.fulfilled, (state, action) => {
	// 			const data = action.payload as any;

	// 			if (data !== undefined) {
	// 				state.employeesCount = data.count;
	// 				state.employees = data.data;
	// 				state.employees.forEach((user: User) => {
	// 					updateState(user, user);
	// 				});
	// 			}

	// 			state.isEmployeesLoading = false;
	// 		})
	// 		.addCase(fetchDisable.fulfilled, (state, action) => {
	// 			state.employees = state.employees.filter(
	// 				(el) => el.id !== action.meta.arg.id
	// 			);

	// 			// state.employeesCount -= 1;
	// 		});
	// },
});

export default employeesSlice;

export const employeesActions = employeesSlice.actions;
