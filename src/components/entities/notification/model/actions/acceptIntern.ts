import { $api } from "@/components/shared/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

// Accept intern to work (make him an employee).

export const fetchAccept = createAsyncThunk(
	"fetchAccept",
	async ({ bitrix_id }: { bitrix_id: number }) => {
		const response = await $api
			.patch<AxiosResponse<any>>(
				`/users/${bitrix_id}/accept`,
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
