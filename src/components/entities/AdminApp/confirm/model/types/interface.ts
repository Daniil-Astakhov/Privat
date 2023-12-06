import { SearchFilters, User } from "@/components/shared/types/interface";

export interface ConfirmSchema {
	confirmed: Array<User>;
	confirmedFilters: SearchFilters;
	confirmedCount: number;
	currentConfirmedPage: number;
	isConfirmationLoading: boolean;
	isInternsLoading: boolean;
}
