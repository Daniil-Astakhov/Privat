import { ReducersMapObject, configureStore } from "@reduxjs/toolkit";
import applicationsSlice from "@/components/entities/AdminApp/applications/model/slice/applicationsSlice";
import archiveSlice from "@/components/entities/AdminApp/archive/model/slice/archiveSlice";
import bitrixUsersSlice from "@/components/entities/AdminApp/bitrixUsers/model/slice/bitrixUsersSlice";
import internsSlice from "@/components/entities/AdminApp/confirm/model/slice/internsSlice";
import departmentsSlice from "@/components/entities/AdminApp/departments/model/slice/departmentsSlice";
import editorState from "@/components/entities/AdminApp/editor/model/slice/editorSlice";
import employeesSlice from "@/components/entities/AdminApp/employees/model/slice/employeesSlice";
import expiredSlice from "@/components/entities/AdminApp/expired/model/slice/expiredSlice";
import analyticsSlice from "@/components/entities/analytics/model/slice/analyticsSlice";
import educationSlice from "@/components/entities/education/model/slice/educationSlice";
import lectureSlice from "@/components/entities/lecture/model/slice/lectureSlice";
import notificationSlice from "@/components/entities/notification/model/slice/notificationSlice";
import profileSlice from "@/components/entities/profile/model/slice/profileSlice";
import quizSlice from "@/components/entities/quiz/model/slice/quizSlice";
import samplesSlice from "@/components/entities/samples/model/slice/samplesSlice";
import welcomeSlice from "@/components/entities/welcome/model/slice/welcomeSlice";
import { validationQuizSlice } from "@/components/entities/quiz/model/slice/validationQuizSlice";
import { $api } from "@/components/shared/api";
import { StateSchema } from "..";
import { ThunkExtraArg } from "./StateSchema";

export function createReduxStore(initialState?: StateSchema): any {
	const rootReducers: ReducersMapObject<StateSchema> = {
		welcome: welcomeSlice.reducer,
		profile: profileSlice.reducer,
		confirm: internsSlice.reducer,
		expired: expiredSlice.reducer,
		applications: applicationsSlice.reducer,
		bitrixUsers: bitrixUsersSlice.reducer,
		archive: archiveSlice.reducer,
		employees: employeesSlice.reducer,
		education: educationSlice.reducer,
		quiz: quizSlice.reducer,
		lecture: lectureSlice.reducer,
		samples: samplesSlice.reducer,
		departments: departmentsSlice.reducer,
		editor: editorState.reducer,
		notifications: notificationSlice.reducer,
		analytics: analyticsSlice.reducer,
		validationQuiz: validationQuizSlice.reducer,
	};

	const extraArg: ThunkExtraArg = {
		api: $api,
	};

	return configureStore({
		reducer: rootReducers,
		devTools: true,
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				thunk: {
					extraArgument: extraArg,
				},
			}),
	});
}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
