/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { ProfileSchema } from "@/components/entities/profile/model/types/interface";
import { User } from "@/components/shared/types/interface";

export const updateState = (state: User | ProfileSchema, data: any): void => {
	if (data !== undefined) {
		const { confirmed_at } = data;
		const parsedDate = new Date(confirmed_at);
		const stringDate = `${parsedDate.getDate()} ${
			parsedDate.getMonth() + 1
		} ${parsedDate.getFullYear()}`;
		const finalDate = stringDate
			.split(" ")
			.map((el) => (el.length > 1 ? el : `0${el}`))
			.join(".");

		state.id = data.id;
		state.name = data.name;
		state.lastname = data.lastname;
		state.phone = data.phone;
		state.shop = data.shop;
		state.role = data.role;
		state.confirmedAt = finalDate;
		state.job = data.job;
		state.email = data.email;
		state.user_id = data.user_id;
		if (
			"readMaterials" in state &&
			"materials" in state &&
			"materialsCount" in state &&
			"passedQuizzes" in state &&
			"quizzes" in state
		) {
			state.readMaterials = data.readMaterials;
			state.materials = data.materials;
			state.materialsCount = data.materialsCount;
			state.passedQuizzes = data.passedQuizzes;
			state.quizzes = data.quizzes;
		}
		// switchCaseHandler([state]);
	}
};
