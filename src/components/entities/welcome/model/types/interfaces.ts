import {
	Open,
	RegisterType,
	OpenedLayoutType,
	WelcomeRegisterErrors,
	LanguagesType,
	CountriesType,
	CitiesType,
	ShopsType,
} from "@/components/shared/types/interface";

export interface WelcomeSchema {
	nextStapFormFlag: object;
	whichOpen: Open;
	isSignedIn: boolean;
	data: RegisterType;
	openedLayout: OpenedLayoutType;
	forgotLayout: OpenedLayoutType;
	forgotPhone: string;
	signInError: string;
	registerError: WelcomeRegisterErrors;
	forgotError: string;
	resetCode: string;
	selectedCountry: string;
	isLoading: boolean;
	profileError: string;
	languages: Array<LanguagesType>;
	countries: Array<CountriesType>;
	cities: Array<CitiesType>;
	shops: Array<ShopsType>;
}
