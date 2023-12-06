import { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "@/components/shared/api";
import { EducationQuizType } from "@/components/shared/types/interface";

export const fetchQuiz = createAsyncThunk(
	"education/fetchQuiz",
	async ({ quiz_id }: { quiz_id: number }) => {
		const response = await $api.get<AxiosResponse<EducationQuizType>>(
			`/quizzes/${quiz_id}`,
			{
				headers: {
					BXAPP: (window as any)?.BXAPP?.USER_DATA,
					"academy-bitrix-token": localStorage.getItem("academy-bitrix-token"),
					Authorization: `Bearer ${localStorage.getItem("bearer")}`,
				},
			}
		);

		return response?.data.data;
	}
);
