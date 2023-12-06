"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProfile } from "@/components/entities/welcome/model/actions/profile";

import {
	Open,
	RegisterType,
	WelcomeRegisterErrors,
	OpenedLayoutType,
} from "@/components/shared/types/interface";
import { fetchSignIn } from "@/components/entities/welcome/model/actions/signIn";
import { fetchLogout } from "@/components/entities/welcome/model/actions/logout";
import { fetchLanguages } from "@/components/entities/welcome/model/actions/languages";
import { fetchCountries } from "@/components/entities/welcome/model/actions/countries";
import { WelcomeSchema } from "@/components/entities/welcome/model/types/interfaces";
import { fetchCities } from "../actions/cities";
import { fetchShops } from "../actions/shops";
// import { fetchRegister } from "../api/register";
// import { fetchProfile } from "../api/profile";
// import { fetchPasswordResetCode } from "../api/passwordResetCode";
// import { fetchPasswordResetPhone } from "../api/passwordResetPhone";
// import { fetchPasswordReset } from "../api/passwordReset";
// import { fetchConfirmPhone } from "../api/confirmPhone";

const initialState: WelcomeSchema = {
	whichOpen: "Greeting",
	isSignedIn: false,
	data: {} as RegisterType,
	openedLayout: 1,
	forgotLayout: 1,
	forgotPhone: "",
	signInError: "",
	registerError: {} as WelcomeRegisterErrors,
	nextStapFormFlag: {
		1: true,
		2: true,
		3: true,
	},
	forgotError: "",
	resetCode: "",
	selectedCountry: "",
	isLoading: false,
	profileError: "",
	languages: [],
	countries: [],
	cities: [],
	shops: [],
};

const welcomeSlice = createSlice({
	name: "welcome",
	initialState,
	reducers: {
		setCustomOpen(state, action: PayloadAction<Open>) {
			state.whichOpen = action.payload;
		},
		setNextStapFormFlag(state, action: PayloadAction<object>) {
			state.nextStapFormFlag = action.payload;
		},
		setProfileError(state, action: PayloadAction<string>) {
			state.profileError = action.payload;
		},
		setFirstLayout(
			state
			// action: PayloadAction<WelcomeSchema["data"]["firstLayout"]>
		) {
			// state.data.firstLayout = action.payload;
			state.openedLayout = 2;
		},
		setSecondLayout() // action: PayloadAction<WelcomeSchema["data"]["secondLayout"]>
		{
			// state.data.secondLayout = action.payload;
		},
		setOpenedLayout(state, action: PayloadAction<OpenedLayoutType>) {
			state.openedLayout = action.payload;
		},
		setForgotLayout(state, action: PayloadAction<OpenedLayoutType>) {
			state.forgotLayout = action.payload;
		},
		setSelectedCountry(state, action: PayloadAction<string>) {
			state.selectedCountry = action.payload;
		},
		setForgotPhone(state, action: PayloadAction<string>) {
			state.forgotPhone = action.payload;
		},
		confirmResetPassword(state) {
			state.whichOpen = "SignIn";
			state.forgotLayout = 1;
		},
		resetRegistrationData(state) {
			state.data = {} as RegisterType;
		},
		resetForgotPhone(state) {
			state.forgotPhone = "";
		},
		resetSignInError(state) {
			state.signInError = "";
		},
	},
	extraReducers: (builder) => {
		builder
			//     .addCase(fetchRegister.pending, (state) => {
			//       state.isLoading = true;
			//     })
			//     .addCase(fetchRegister.fulfilled, (state) => {
			//       state.whichOpen = "SignIn";
			//       state.openedLayout = 1;
			//       state.data = {} as RegisterType;
			//       state.isLoading = false;
			//     })
			//     .addCase(fetchRegister.rejected, (state, action) => {
			//       const message = (action.payload as any).errors;
			//       console.log(message);
			//       if (message) {
			//         state.registerError = message;
			//       }
			//       state.isLoading = false;
			//       Object.entries(message as WelcomeRegisterErrors).map(([key, value]) => {
			//         (state.registerError as Record<string, Array<string>>)[key] = value;
			//       });
			//       if (
			//         (message as WelcomeRegisterErrors).name ||
			//         (message as WelcomeRegisterErrors).lastname ||
			//         (message as WelcomeRegisterErrors).jobTitle
			//       ) {
			//         state.openedLayout = 1;
			//       }
			//     })
			.addCase(fetchCountries.fulfilled, (state, action) => {
				state.countries = action.payload;
			})
			.addCase(fetchCities.fulfilled, (state, action) => {
				state.cities = action.payload[0].cities;
			})
			.addCase(fetchShops.fulfilled, (state, action) => {
				state.shops = action.payload[0].shops;
			})
			.addCase(fetchLanguages.fulfilled, (state, action) => {
				state.languages = action.payload;
			})
			.addCase(fetchSignIn.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchSignIn.fulfilled, (state, action) => {
				if (action.payload !== undefined) {
					state.signInError = "";
					state.isSignedIn = true;
					state.isLoading = false;
					// location.reload();
				}
			})
			.addCase(fetchSignIn.rejected, (state, action) => {
				if ((action.payload as any).status === 492) {
					state.profileError = (action.payload as any).data.message;
				}
				state.signInError = (action.payload as any).data.message;
				// state.signInError = (action.payload as any).data.errors[0];
				state.isLoading = false;
			})
			.addCase(fetchProfile.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchProfile.fulfilled, (state, action) => {
				if (action.payload !== undefined) {
					state.signInError = "";
					state.isSignedIn = true;
				}
				state.isLoading = false;
			})
			.addCase(fetchProfile.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(fetchLogout.fulfilled, (state) => {
				if (typeof window !== "undefined")
					localStorage.removeItem("academy-bitrix-token");
				state.isSignedIn = false;
			});
		//     .addCase(fetchPasswordResetPhone.fulfilled, (state, action) => {
		//       state.forgotLayout = 2;
		//       state.forgotError = "";
		//     })
		//     .addCase(fetchPasswordResetPhone.rejected, (state, action) => {
		//       state.forgotError = action.payload as string;
		//     })
		//     .addCase(fetchPasswordResetCode.fulfilled, (state, action) => {
		//       state.resetCode = action.payload;
		//       state.forgotError = "";
		//     })
		//     .addCase(fetchPasswordResetCode.rejected, (state, action) => {
		//       if (action.error.message === "Request failed with status code 404") {
		//         state.forgotError = "Pin Confirmation Failed";
		//       }
		//     })
		//     .addCase(fetchPasswordReset.fulfilled, (state, action) => {
		//       state.whichOpen = "SignIn";
		//       state.forgotLayout = 1;
		//       state.resetCode = "";
		//     })
		//     .addCase(fetchPasswordReset.rejected, (state, action) => {
		//       state.forgotError = action.payload as string;
		//     })
		//     .addCase(fetchConfirmPhone.fulfilled, (state, action) => {
		//       state.whichOpen = "SignIn";
		//     })
		//     .addCase(fetchConfirmPhone.rejected, (state, action) => {
		//       state.whichOpen = "SignIn";
		//     });
	},
});

export default welcomeSlice;

export const {
	setCustomOpen,
	setFirstLayout,
	setSecondLayout,
	setOpenedLayout,
	setForgotLayout,
	setSelectedCountry,
	setForgotPhone,
	resetRegistrationData,
	confirmResetPassword,
	resetForgotPhone,
	resetSignInError,
	setProfileError,
	setNextStapFormFlag,
} = welcomeSlice.actions;
