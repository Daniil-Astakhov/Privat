import { BitrixUsersFilters, User } from "@/components/shared/types/interface";

export interface BitrixUsersSchema {
	bitrixUsers: Array<User>;
	bitrixUsersFilters: BitrixUsersFilters;
	bitrixUsersCount: number;
	currentBitrixUsersPage: number;
	isBitrixUsersLoading: boolean;
}
