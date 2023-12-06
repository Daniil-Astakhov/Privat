import { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "@/components/shared/api";
import { User } from "@/components/shared/types/interface";

export const fetchProfile = createAsyncThunk(
	"fetchProfile",
	async (_, thunkAPI) => {
		try {
			const response = await $api
				.get<AxiosResponse<User>>("/users/profile", {
					headers: {
						BXAPP: (window as any)?.BXAPP?.USER_DATA,
						"academy-bitrix-token": localStorage.getItem(
							"academy-bitrix-token"
						),
						Authorization: `Bearer ${localStorage.getItem("bearer")}`,
					},
				})
				.then((res) => res);
			return response?.data;
		} catch (err) {
			const error: any = err;

			if (!error) throw err;
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);
