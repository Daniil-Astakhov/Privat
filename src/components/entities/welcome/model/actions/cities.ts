import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "@/components/shared/api";

export const fetchCities = createAsyncThunk(
	"welcome/fetchCities",
	async ({ country_id }: { country_id: number }): Promise<Array<any>> => {
		const response = await $api.get("/countries/cities", {
			headers: {
				BXAPP: (window as any)?.BXAPP?.USER_DATA,
				"academy-bitrix-token": localStorage.getItem("academy-bitrix-token"),
				Authorization: `Bearer ${localStorage.getItem("bearer")}`,
			},

			params: { country_id },
		});

		return response?.data.data;
	}
);
