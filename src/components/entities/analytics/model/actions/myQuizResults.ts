import { $api } from "@/components/shared/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMyQuizResults = createAsyncThunk(
	"education/fetchMyQuizResults",
	async ({ quiz_id }: { quiz_id: number }, thunkAPI) => {
		try {
			const response = await $api.get(`/analytic/my/quiz/${quiz_id}`, {
				headers: {
					BXAPP: (window as any)?.BXAPP?.USER_DATA,
					"academy-bitrix-token": localStorage.getItem("academy-bitrix-token"),
					Authorization: `Bearer ${localStorage.getItem("bearer")}`,
				},
			});

			return response?.data;
		} catch (err) {
			const error: any = err;
			if (!error.response) {
				throw err;
			}
			return thunkAPI.rejectWithValue(error.response.data.data.messages);
		}
	}
);
