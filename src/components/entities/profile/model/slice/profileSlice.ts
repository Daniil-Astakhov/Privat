"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchJobTitles } from "@/components/entities/profile/model/actions/jobTitles";
import { updateState } from "@/components/entities/profile/model/functions";
import { ProfileSchema } from "@/components/entities/profile/model/types/interface";
import { fetchLogout } from "@/components/entities/welcome/model/actions/logout";
import { fetchProfile } from "@/components/entities/welcome/model/actions/profile";
import { fetchSignIn } from "@/components/entities/welcome/model/actions/signIn";
import {
	UserShopType,
	JobTitleType,
} from "@/components/shared/types/interface";

// import { updateState } from "./model/functions";
// import { fetchJobTitles } from "../api/jobTitles";

const initialState: ProfileSchema = {
	id: 0,
	name: "",
	lastname: "",
	phone: "",
	email: "",
	shop: {} as UserShopType,
	role: 3,
	confirmedAt: "",
	job: {} as JobTitleType,
	jobTitlesArray: [],
	isLoading: false,
	isProfileRejected: false,
	isLogoutSuccessful: false,
	user_id: 0,
};

const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		setIsProfileRejected(state, action: PayloadAction<boolean>) {
			state.isProfileRejected = action.payload;
		},
		setIsLogoutSuccessful(state, action: PayloadAction<boolean>) {
			state.isLogoutSuccessful = action.payload;
		},
		setIsLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchSignIn.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchSignIn.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(fetchSignIn.fulfilled, (state) => {
				state.isLoading = false;
			})
			.addCase(fetchProfile.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchProfile.rejected, (state) => {
				state.isProfileRejected = true;
				state.isLoading = false;
			})
			.addCase(fetchProfile.fulfilled, (state, action) => {
				const data = action.payload?.data;
				updateState(state, data);
				state.isLoading = false;
			})
			.addCase(fetchLogout.fulfilled, (state) => {
				state.isLogoutSuccessful = true;
				state.id = 0;
				state.role = 3;
				state.name = "";
				state.lastname = "";
				state.phone = "";
				state.email = "";
				state.confirmedAt = "";
				state.shop = {} as UserShopType;
				state.job = {} as JobTitleType;
			})
			.addCase(fetchJobTitles.fulfilled, (state, action) => {
				state.jobTitlesArray = action.payload;
			});
	},
});

export default profileSlice;

export const { setIsProfileRejected, setIsLogoutSuccessful, setIsLoading } =
	profileSlice.actions;
