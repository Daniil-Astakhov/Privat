import { SearchFilters, User } from "@/components/shared/types/interface";

export interface ArchiveSchema {
	archive: Array<User>;
	archiveFilters: SearchFilters;
	currentArchivePage: number;
	archiveCount: number;
	isArchiveLoading: boolean;
}
