/* eslint-disable camelcase */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "@/components/shared/api";

export const fetchLecture = createAsyncThunk(
	"education/fetchCourse",
	async ({ course_id }: { course_id: number }) => {
		const response = await $api.get(`/courses/${course_id}`, {
			headers: {
				BXAPP: (window as any)?.BXAPP?.USER_DATA,
				"academy-bitrix-token": localStorage.getItem("academy-bitrix-token"),
				Authorization: `Bearer ${localStorage.getItem("bearer")}`,
			},
		});

		return response?.data.data;
	}
);
