import { SearchFilters, User } from "@/components/shared/types/interface";

export interface EmployeesSchema {
	employees: Array<User>;
	employeesFilters: SearchFilters;
	employeesCount: number;
	currentEmployeesPage: number;
	isEmployeesLoading: boolean;
}
