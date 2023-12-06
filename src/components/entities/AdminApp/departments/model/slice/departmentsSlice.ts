"use client";

import { createSlice } from "@reduxjs/toolkit";
import { DepartmentsSchema } from "../types/interfaces";
// import { fetchGetDepartments } from "../api/departments";
// import { updateDepartments } from "./model/functions";

const initialState: DepartmentsSchema = {
	departments: [],
	currentID: "",
};

const departmentsSlice = createSlice({
	name: "departments",
	initialState,
	reducers: {},
	// extraReducers: (builder) => {
	//   builder.addCase(fetchGetDepartments.fulfilled, (state, action) => {
	//     state.departments = action.payload[0].child;
	//     updateDepartments(state.departments, action.payload[0].child);
	//   });
	// },
});

export default departmentsSlice;
