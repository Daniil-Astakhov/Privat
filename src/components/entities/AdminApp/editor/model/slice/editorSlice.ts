"use client";

import { createSlice } from "@reduxjs/toolkit";
import { EditorSchema } from "../types/interfaces";

const initialState: EditorSchema = {
	some: "",
};

const editorState = createSlice({
	name: "editor",
	initialState,
	reducers: {},
	// extraReducers: (builder) => {},
});

export const editorActions = editorState.actions;

export default editorState;
