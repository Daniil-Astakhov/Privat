import { $api } from "@/components/shared/api";
import { LanguagesType } from "@/components/shared/types/interface";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLanguages = createAsyncThunk(
	"welcome/fetchLanguages",
	async (): Promise<Array<LanguagesType>> => {
		const response = await $api.get("/languages", {
			headers: {
				BXAPP: (window as any)?.BXAPP?.USER_DATA,
				"academy-bitrix-token": localStorage.getItem("academy-bitrix-token"),
				Authorization: `Bearer ${localStorage.getItem("bearer")}`,
			},
		});

		return response?.data.data;
	}
);
