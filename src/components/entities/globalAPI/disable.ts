import { $api } from "@/components/shared/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Soft delete (archive. From Employees and Interns and Expired-Interns (both of options));

export const fetchDisable = createAsyncThunk(
	"confirm/fetchDisable",
	async ({ bitrix_id }: { bitrix_id: number }, thunkAPI) => {
		try {
			const response = await $api
				.delete(`/users/${bitrix_id}/disable`, {
					headers: {
						BXAPP: (window as any)?.BXAPP?.USER_DATA,
						"academy-bitrix-token": localStorage.getItem(
							"academy-bitrix-token"
						),
						Authorization: `Bearer ${localStorage.getItem("bearer")}`,
					},
				})
				.then((res) => res);

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
