import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "@/components/shared/api";
import { EducationQuizAnswers } from "@/components/shared/types/interface";

export const fetchQuizResults = createAsyncThunk(
	"education/fetchQuizResults",
	async ({ quiz_id, questions }: EducationQuizAnswers, thunkAPI) => {
		try {
			const response = await $api.post(
				`/quizzes/${quiz_id}/assessment`,
				{
					questions,
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
			);

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
