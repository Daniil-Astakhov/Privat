import { $api } from "@/components/shared/api";
import { CountriesType } from "@/components/shared/types/interface";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCountries = createAsyncThunk(
	"welcome/fetchCountries",
	async (): Promise<Array<CountriesType>> => {
		const response = await $api.get("/countries", {
			headers: {
				BXAPP: (window as any)?.BXAPP?.USER_DATA,
				"academy-bitrix-token": localStorage.getItem("academy-bitrix-token"),
				Authorization: `Bearer ${localStorage.getItem("bearer")}`,
			},
		});

		return response?.data.data;
	}
);
