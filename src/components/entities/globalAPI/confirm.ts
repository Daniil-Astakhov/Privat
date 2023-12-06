import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "@/components/shared/api";

export const fetchConfirm = createAsyncThunk(
	"confirm/fetchConfirm",
	async ({ id, department_id }: { id: number; department_id: string }) => {
		await $api
			.patch(
				`/users${id}/confirm`,
				{
					department_id,
				},
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
			// eslint-disable-next-line no-console
			.catch((err) => console.log(err));
	}
);
