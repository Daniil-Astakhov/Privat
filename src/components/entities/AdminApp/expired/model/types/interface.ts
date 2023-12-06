import { SearchFilters, User } from "@/components/shared/types/interface";

export interface ExpiredSchema {
	expired: Array<User>;
	expiredFilters: SearchFilters;
	expiredCount: number;
	overallExpired: number;
	currentExpiredPage: number;
	expiredLoading: boolean;
}
