import { AxiosInstance } from "axios";

import { QuizSlice } from "@/components/entities/quiz/model/slice/validationQuizSlice";
import { WelcomeSchema } from "@/components/entities/welcome/model/types/interfaces";
import { ProfileSchema } from "@/components/entities/profile/model/types/interface";
import { ConfirmSchema } from "@/components/entities/AdminApp/confirm/model/types/interface";
import { ExpiredSchema } from "@/components/entities/AdminApp/expired/model/types/interface";
import { ApplicationsSchema } from "@/components/entities/AdminApp/applications/model/types/interface";
import { BitrixUsersSchema } from "@/components/entities/AdminApp/bitrixUsers/model/types/interface";
import { ArchiveSchema } from "@/components/entities/AdminApp/archive/model/types/interface";
import { EmployeesSchema } from "@/components/entities/AdminApp/employees/model/types/interface";
import { EducationSchema } from "@/components/entities/education/model/types/interfaces";
import { QuizSchema } from "@/components/entities/quiz/model/types/interface";
import { LectureSchema } from "@/components/entities/lecture/model/types/interface";
import { SamplesSchema } from "@/components/entities/samples/model/types/interfaces";
import { DepartmentsSchema } from "@/components/entities/AdminApp/departments/model/types/interfaces";
import { EditorSchema } from "@/components/entities/AdminApp/editor/model/types/interfaces";
import { NotificationSchema } from "@/components/entities/notification/model/types/interface";
import { AnalyticsSchema } from "@/components/entities/analytics/model/types/interface";

export interface StateSchema {
	welcome: WelcomeSchema;
	profile: ProfileSchema;
	confirm: ConfirmSchema;
	expired: ExpiredSchema;
	applications: ApplicationsSchema;
	bitrixUsers: BitrixUsersSchema;
	archive: ArchiveSchema;
	employees: EmployeesSchema;
	education: EducationSchema;
	quiz: QuizSchema;
	lecture: LectureSchema;
	samples: SamplesSchema;
	departments: DepartmentsSchema;
	editor: EditorSchema;
	notifications: NotificationSchema;
	analytics: AnalyticsSchema;
	validationQuiz: QuizSlice;
}

export interface ThunkExtraArg {
	api: AxiosInstance;
}

export interface ThunkConfig<T> {
	rejectValue: T;
	extra: ThunkExtraArg;
	state: StateSchema;
}
