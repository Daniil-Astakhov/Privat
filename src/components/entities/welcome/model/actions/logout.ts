import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "@/components/shared/api";

export const fetchLogout = createAsyncThunk("welcome/fetchLogout", async () => {
	$api
		.get("/auth/logout", {
			headers: {
				BXAPP: (window as any)?.BXAPP?.USER_DATA,
				"academy-bitrix-token": localStorage.getItem("academy-bitrix-token"),
				Authorization: `Bearer ${localStorage.getItem("bearer")}`,
			},
		})
		.catch((err) => console.error(err));
});
