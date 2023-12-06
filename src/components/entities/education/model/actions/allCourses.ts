import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { $api } from "@/components/shared/api";

export const fetchAllCourses = createAsyncThunk(
	"education/fetchAllCourses",
	async ({
		jobTitle,
		page,
		by,
		filter,
	}: {
		jobTitle: number;
		page?: number;
		by?: number;
		filter?: string;
	}): Promise<null | AxiosResponse<any, any>> => {
		try {
			const response = await $api.get("/courses", {
				params: {
					job_id: jobTitle,
					page,
					by,
					filter,
				},
				headers: {
					BXAPP: (window as any)?.BXAPP?.USER_DATA,
					"academy-bitrix-token": localStorage.getItem("academy-bitrix-token"),
					Authorization: `Bearer ${localStorage.getItem("bearer")}`,
				},
			});

			return response?.data;
		} catch (err) {
			console.error(err);
			return null;
		}
	}
);
