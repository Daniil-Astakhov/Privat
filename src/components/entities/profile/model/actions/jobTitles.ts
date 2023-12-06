import { $api } from "@/components/shared/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchJobTitles = createAsyncThunk(
	"profile/fetchJobTitles",
	async () => {
		const response = await $api.get("/users/jobs", {
			headers: {
				BXAPP: (window as any)?.BXAPP?.USER_DATA,
				"academy-bitrix-token": localStorage.getItem("academy-bitrix-token"),
				Authorization: `Bearer ${localStorage.getItem("bearer")}`,
			},
		});

		return response?.data.data;
	}
);
