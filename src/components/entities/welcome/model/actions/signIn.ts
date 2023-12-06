import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { $api } from "@/components/shared/api";
import { SignInType, User } from "@/components/shared/types/interface";

export const fetchSignIn = createAsyncThunk(
	"welcome/fetchSignIn",
	async ({ login, password }: SignInType, thunkAPI) => {
		try {
			const response = await $api
				.post<AxiosResponse<User | any>>(
					"/auth/login",
					{
						login,
						password,
					},
					{
						headers: {
							BXAPP: (window as any)?.BXAPP?.USER_DATA,
							"academy-bitrix-token": localStorage.getItem(
								"academy-bitrix-token"
							),
							Authorization: `Bearer ${localStorage.getItem("bearer")}`,
						},
					}
				)
				.then((res) => {
					if (typeof window !== "undefined") {
						localStorage.setItem(
							"academy-bitrix-token",
							res.headers["academy-bitrix-token"]
						);
						localStorage.setItem("bearer", res.headers["x-bearer"]);
					}
					return res;
				});
			localStorage.setItem("bearer", response.data.data[0].bearer_token);

			return response?.data.data;
		} catch (err) {
			const error: any = err;
			if (!error.response) throw err;
			return thunkAPI.rejectWithValue(error.response);
		}
	}
);
