import { $api } from "@/components/shared/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Full delete (really full. From applications); (it was fetchDelete)

export const fetchReject = createAsyncThunk(
	"confirm/fetchDelete",
	async ({ id }: { id: number }, thunkAPI) => {
		try {
			const response = await $api
				.delete(`/users/${id}/reject`, {
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
