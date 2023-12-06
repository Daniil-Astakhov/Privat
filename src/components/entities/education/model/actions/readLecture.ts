import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { $api } from "@/components/shared/api";

export const fetchReadLecture = createAsyncThunk(
	"education/fetchReadLecture",
	async ({ translation_id }: { translation_id: number }) => {
		const response = await $api
			.post<AxiosResponse<string>>(
				`/courses/translation/${translation_id}/read`,
				{},
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
			.then((res) => res);

		return response?.data.data;
	}
);
