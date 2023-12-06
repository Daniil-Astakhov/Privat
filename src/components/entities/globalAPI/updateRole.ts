import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "@/components/shared/api";
import { APIConfirm } from "@/components/shared/types/interface";

export const fetchUpdateRole = createAsyncThunk(
	"confirm/fetchUpdateRole",
	async ({ bitrix_id, role }: APIConfirm) => {
		await $api
			.patch(
				`/users/${bitrix_id}/update-role`,
				{
					role,
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
