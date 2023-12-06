import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { $api } from "@/components/shared/api";

export const fetchMyAnalytic = createAsyncThunk("fetchAnalytic", async () => {
	const response = await $api
		.get<AxiosResponse<any>>("/analytic/my", {
			headers: {
				BXAPP: (window as any)?.BXAPP?.USER_DATA,
				"academy-bitrix-token": localStorage.getItem("academy-bitrix-token"),
				Authorization: `Bearer ${localStorage.getItem("bearer")}`,
			},
		})
		.then((res) => res);

	return response?.data.data;
});
