// We need this field
// import { FormInstance } from "antd";

export type QuestionType = "Single" | "Multiple" | "Select";

export interface QuizAnswerType {
	uuid: string;
	text: string;
	id?: number;
}

export interface QuizCorrectType {
	id: any;
	uuid: string;
	text?: string;
	belongsTo?: string;
}

export interface QuizQuestionType {
	uuid: string;
	title: string;

	type: QuestionType;
	answers: Array<QuizAnswerType>;
	// We need this field
	// form?: FormInstance<any>;
	questionIndex?: number;
	contents?: Array<QuizAnswerType>;
	options?: Array<QuizAnswerType>;
	corrects?: any;
	id?: number;
	handleDeleteQuestion?: () => void;
}

export type JobTitleValue = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7";

export interface JobTitleType {
	id: number;
	title: string;
}

export interface UserShopType {
	country_id: string;
	city_id: string;
	country: string;
	city: string;
	name: string;
}

export interface User {
	id: number;
	name: string;
	lastname: string;
	phone: string;
	email: string;
	shop: UserShopType;
	job: JobTitleType;
	materials: any;
	materialsCount: number;
	passedQuizzes: number;
	quizzes: number;
	confirmedAt: string;
	user_id: number;
	readMaterials?: number;
	role?: number;
}

export interface BitrixUsersFilters {
	name: string;
	lastname: string;
	job: string;
	department: string;
	by?: number;
}

export interface SearchFilters {
	name: string;
	phone: string;
	email: string;
	start: string;
	end: string;
}

export interface APIConfirm {
	bitrix_id: number;
	department_id?: string;
	phone?: string;
	role?: number;
}

export type EducationQuizLayout = "Quiz" | "Results" | "Diagram";
type EducationResultType = "Correct" | "Incorrect" | "Partly Correct";

export interface EducationQuizTranslationType {
	title: string;
	description: string;
	parent_uuid: string;
	lang: string;
	quiztranslateble_type: string;
	quiztranslateble_id: number;
	questions: Array<QuizQuestionType>;
}

export interface EducationQuizType {
	author: number;
	uuid: string;
	allowed_time: number;
	attempts: number;
	pass_percent: number;
	translation: EducationQuizTranslationType;
	passed: number;
}

export interface QuizType {
	title: string;
	passed: number | boolean;
	uuid: string;
}

export interface TranslationType {
	backgroundImage: string | null;
	content: string;
	coursetranslateable_id: number;
	coursetranslateable_type: string;
	initialEditorState: string;
	lang: string;
	parent_uuid: string;
	title: string;
	id: number;
	noRootEditorState?: string;
}

export interface EducationArrayType {
	quiz: EducationQuizType;
	uuid: string;
	position: number;
	translation: TranslationType;
	isFinal: 0 | 1;
	isRead: 0 | 1;
	id: number;
}

export interface EducationDataProps {
	quiz: EducationQuizType;
	uuid: string;
	position: number;
	title: string;
	isFinal: 0 | 1;
	isRead: 0 | 1;
	id: number;
}

export interface EducationProps {
	data: EducationDataProps;
	isContentHidden?: boolean;
	setIsContentHidden?: (value: boolean) => void;
	isDragDisabled?: boolean;
	isDragging?: boolean;
	position?: number;
}

export interface EducationCorrectsType {
	question_uuid: string;
	choices: Array<QuizCorrectType>;
}

export interface EducationQuizResultsQuestions {
	questions_id: string;
	question_title: string;
	options: Array<QuizCorrectType>;
	answers: Array<QuizCorrectType>;
	choices: Array<QuizCorrectType>;
	type: QuestionType;
	result: EducationResultType;
}

export interface EducationQuizResults {
	quiz_title: string;
	quiz_uuid: string;
	questions: Array<EducationQuizResultsQuestions>;
	pass_percent: number;
	answered_percentage: number;
}

export interface EducationQuizAnswers {
	lang: string;
	quiz_uuid: string;

	title: string;
	quiz_id: number;
	questions: Array<EducationCorrectsType>;
}

export type Open = "Greeting" | "SignIn" | "Register" | "Forgot";

export interface FirstLayout {
	name: string;
	lastname: string;
	middlename: string;
	birthday: Date;
	job_id: string;
	shop_id: number;
}

export interface SecondLayout {
	phone: string;
	email: string;
	password: string;
	confirm?: string;
}

export type OpenedLayoutType = 1 | 2;

export interface RegisterType {
	name: string;
	lastname: string;
	middlename: string;
	phone: string;
	birthday: string;
	shop_id: string;
	country_id: string;
	city_id: string;
	job_id: string;
	email: string;
	language_id: string;
	// firstLayout: FirstLayout;
	// secondLayout: SecondLayout;
}

export type WelcomeRegisterErrorsKeys =
	| "name"
	| "lastname"
	| "middlename"
	| "birthday"
	| "phone"
	| "email"
	| "jobTitle"
	| "password"
	// Not sure about these keys yet.
	| "country"
	| "city"
	| "shop";

export type WelcomeRegisterErrors = Record<
	WelcomeRegisterErrorsKeys,
	Array<string>
>;

export interface WelcomeContextType {
	welcome: {
		whichOpen: Open;
		isSignedIn: boolean;
	};
}

export interface SignInType {
	login: string;
	password: string;
}

export interface CourseType {
	id: number;
	uuid: string;
	title: string;
	content: string;
	initialEditorState: string;
	isFinal: boolean;
	quiz: {
		uuid: string;
		quizTitle: string;
		synopsis: string;
		duration: number;
		percent: number;
		attempts: number;
		questions: Array<QuizQuestionType>;
	};
	targeted?: Array<string>;
}

export type PercentColorType = "red" | "yellow" | "green" | "black";

export type ProgressPercentColorType =
	| "redProgress"
	| "yellowProgress"
	| "greenProgress"
	| "blackProgress";

export interface LanguagesType {
	id: number;
	code: string;
	name: string;
}

export interface CountriesType {
	id: number;
	code: string;
	name: string;
}

export interface CitiesType {
	id: number;
	name: string;
	bitrix_id: number;
}

export interface ShopsType {
	name: string;
	shop_id: number;
	city_id: number;
	country_id: number;
}
