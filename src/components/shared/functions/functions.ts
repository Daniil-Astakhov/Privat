// import { ProfileSchema } from "@/entities/profile/model/types/interface";
// import { User } from "@/shared/types/interface";

import { fetchMyAnalytic } from "@/components/entities/analytics/model/actions/myAnalytic";
import { fetchJobTitles } from "@/components/entities/profile/model/actions/jobTitles";
import { fetchLanguages } from "@/components/entities/welcome/model/actions/languages";
import { fetchProfile } from "@/components/entities/welcome/model/actions/profile";
import { educationActions } from "@/components/entities/education/model/slice/educationSlice";

// export const updateState = (state: User | ProfileSchema, data: any) => {
// 	if (data !== undefined) {
// 		const confirmed_at = data.confirmed_at;
// 		const parsedDate = new Date(confirmed_at);
// 		const stringDate = `${parsedDate.getDate()} ${parsedDate.getMonth() + 1}`;
// 		const finalDate = stringDate
// 			.split(" ")
// 			.map((el) => (el.length > 1 ? el : `0${el}`))
// 			.join(".");

// 		state.id = data.id;
// 		state.name = data.name;
// 		state.lastname = data.lastname;
// 		state.phone = data.phone;
// 		state.shop = data.shop;
// 		state.role = data.role;
// 		state.confirmed_at = finalDate;
// 		state.job = data.job;
// 		if (
// 			"readMaterials" in state &&
// 			"materials" in state &&
// 			"materialsCount" in state &&
// 			"passedQuizzes" in state &&
// 			"quizzes" in state
// 		) {
// 			state.readMaterials = data.readMaterials;
// 			state.materials = data.materials;
// 			state.materialsCount = data.materialsCount;
// 			state.passedQuizzes = data.passedQuizzes;
// 			state.quizzes = data.quizzes;
// 		}
// 	}
// };

export function shuffle<T>(array: Array<T>): Array<T> {
	let currentIndex = array.length;

	// While there remain elements to shuffle.
	while (currentIndex > 0) {
		// Pick a remaining element.
		const randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}

	return array;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function defaultDataFetch(dispatch: any): void {
	dispatch(fetchLanguages());
	dispatch(fetchJobTitles());
	dispatch(fetchProfile()).then((profileResponse: any) => {
		if (profileResponse.meta.requestStatus === "fulfilled")
			dispatch(fetchMyAnalytic());
	});
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const againHandler = (dispatch: any): void => {
	dispatch(educationActions.resetQuizLayout());
	dispatch(educationActions.resetQuizAnswersQuestions());
	dispatch(educationActions.resetFetchCorrects());
	dispatch(educationActions.resetQuizResults());
};
