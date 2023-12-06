export type NotificationResult = "info" | "success" | "error";

export interface EditorModules {
	notificationResult: NotificationResult;
	notificationMessage: string;
	isNotificationOpen: boolean;
}

export interface NotificationSchema {
	confirmNotification: EditorModules;
	acceptNotification: EditorModules;
	archivedNotification: EditorModules;
	deleteNotification: EditorModules;
	welcomeNotification: EditorModules;
	newCourseNotification: EditorModules;
	updateCourseNotification: EditorModules;
}
