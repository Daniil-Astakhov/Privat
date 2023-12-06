import { SearchFilters, User } from "@/components/shared/types/interface";

export interface ApplicationsSchema {
	unconfirmed: Array<User>;
	unconfirmedFilters: SearchFilters;
	unconfirmedCount: number;
	currentUnconfirmedPage: number;
	overallApplications: number;
	isApplicationsLoading: boolean;
	isConfirmLoading: boolean;
}
