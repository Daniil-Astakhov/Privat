import { $api } from "@/components/shared/api";
// import { phoneMasks } from "@/components/shared/consts";
import { RegisterType } from "@/components/shared/types/interface";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRegistration = createAsyncThunk(
	"welcome/fetchRegistration",
	async (form: RegisterType, thunkAPI) => {
		const { birthday } = form;
		const parsedBirthday = birthday.split(".").reverse().join("-");
		try {
			const response = await $api.post(
				"/auth/registration",
				{ ...form, birthday: parsedBirthday },
				{
					headers: {
						BXAPP: (window as any)?.BXAPP?.USER_DATA,
						"academy-bitrix-token": localStorage.getItem(
							"academy-bitrix-token"
						),
						Authorization: `Bearer ${localStorage.getItem("bearer")}`,
					},
				}
			);

			return response?.data;
		} catch (err) {
			const error: any = err;
			if (!error.response) throw err;
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);
