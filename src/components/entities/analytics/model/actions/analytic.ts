import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { $api } from "@/components/shared/api";

export const fetchAnalytic = createAsyncThunk(
	"fetchAnalytic",
	async ({ user_id }: { user_id: number }) => {
		const response = await $api
			.get<AxiosResponse<any>>(`/analytic/user/${user_id}`, {
				headers: {
					BXAPP: (window as any)?.BXAPP?.USER_DATA,
					"academy-bitrix-token": localStorage.getItem("academy-bitrix-token"),
					Authorization: `Bearer ${localStorage.getItem("bearer")}`,
				},
			})
			.then((res) => res);

		return response?.data.data;
	}
);
