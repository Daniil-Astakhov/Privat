import { CourseType } from "@/components/shared/types/interface";

export interface SamplesSchema {
	count: number;
	currentSamplePage: number;
	// currentRole: JobTitleValue | "";
	// currentRole: JobTitleType;
	currentRole: number | null;
	samples: Array<CourseType>;
	editorKey: number;
	isSending?: boolean;
}
