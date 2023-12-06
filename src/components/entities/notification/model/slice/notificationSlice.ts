"use client";

import { createSlice } from "@reduxjs/toolkit";
import { EditorModules, NotificationSchema } from "../types/interface";
// import { fetchConfirm } from "../api/confirm";
// import i18n from "i18next";
// import { fetchDelete } from "../api/delete";
// import { fetchDisable } from "../api/disable";
// import { fetchAccept } from "../api/acceptIntern";
// import { fetchNewCourse } from "../api/newCourse";
// import { fetchUpdateMaterial } from "../api/updateMaterial";
// import { fetchRegister } from "../api/register";
// import { fetchConfirmPhone } from "../api/confirmPhone";

const defaultNotification: EditorModules = {
	isNotificationOpen: false,
	notificationResult: "info",
	notificationMessage: "",
};

const initialState: NotificationSchema = {
	confirmNotification: defaultNotification,
	archivedNotification: defaultNotification,
	acceptNotification: defaultNotification,
	deleteNotification: defaultNotification,
	welcomeNotification: defaultNotification,
	newCourseNotification: defaultNotification,
	updateCourseNotification: defaultNotification,
};

const notificationSlice = createSlice({
	name: "notificationSlice",
	initialState,
	reducers: {
		resetConfirmNotification(state) {
			state.confirmNotification = defaultNotification;
		},
		resetArchivedNotification(state) {
			state.archivedNotification = defaultNotification;
		},
		resetAcceptNotification(state) {
			state.acceptNotification = defaultNotification;
		},
		resetDeleteNotification(state) {
			state.deleteNotification = defaultNotification;
		},
		resetWelcomeNotification(state) {
			state.welcomeNotification = defaultNotification;
		},
		resetNewCourseNotification: (state) => {
			state.newCourseNotification = defaultNotification;
		},
		resetUpdateCourseNotification: (state) => {
			state.updateCourseNotification = defaultNotification;
		},
	},

	// extraReducers: (builder) => {
	// 	builder
	// 		.addCase(fetchConfirm.rejected, (state, action) => {
	// 			state.confirmNotification.isNotificationOpen = true;
	// 			state.confirmNotification.notificationResult = "error";
	// 			state.confirmNotification.notificationMessage = `${i18n.t(
	// 				"Notification.Main.failureConfirmOfApplication"
	// 			)}`;
	// 		})
	// 		.addCase(fetchConfirm.fulfilled, (state, action) => {
	// 			state.confirmNotification.isNotificationOpen = true;
	// 			state.confirmNotification.notificationResult = "success";
	// 			state.confirmNotification.notificationMessage = `${i18n.t(
	// 				"Notification.Main.successConfirmOfApplication"
	// 			)}`;
	// 		})
	// 		.addCase(fetchDisable.rejected, (state) => {
	// 			state.archivedNotification.isNotificationOpen = true;
	// 			state.archivedNotification.notificationResult = "error";
	// 			state.archivedNotification.notificationMessage = `${i18n.t(
	// 				"Notification.Main.failureArchived"
	// 			)}`;
	// 		})
	// 		.addCase(fetchDisable.fulfilled, (state) => {
	// 			state.archivedNotification.isNotificationOpen = true;
	// 			state.archivedNotification.notificationResult = "success";
	// 			state.archivedNotification.notificationMessage = `${i18n.t(
	// 				"Notification.Main.successArchived"
	// 			)}`;
	// 		})
	// 		.addCase(fetchAccept.rejected, (state) => {
	// 			state.acceptNotification.isNotificationOpen = true;
	// 			state.acceptNotification.notificationResult = "error";
	// 			state.acceptNotification.notificationMessage = `${i18n.t(
	// 				"Notification.Main.failureNotAccepted"
	// 			)}`;
	// 		})
	// 		.addCase(fetchAccept.fulfilled, (state) => {
	// 			state.acceptNotification.isNotificationOpen = true;
	// 			state.acceptNotification.notificationResult = "success";
	// 			state.acceptNotification.notificationMessage = `${i18n.t(
	// 				"Notification.Main.successAccepted"
	// 			)}`;
	// 		})
	// 		.addCase(fetchDelete.rejected, (state, action) => {
	// 			state.deleteNotification.isNotificationOpen = true;
	// 			state.deleteNotification.notificationResult = "error";
	// 			state.deleteNotification.notificationMessage = `${i18n.t(
	// 				"Notification.Main.failureDeleted"
	// 			)}`;
	// 		})
	// 		.addCase(fetchDelete.fulfilled, (state) => {
	// 			state.deleteNotification.isNotificationOpen = true;
	// 			state.deleteNotification.notificationResult = "success";
	// 			state.deleteNotification.notificationMessage = `${i18n.t(
	// 				"Notification.Main.successDeleted"
	// 			)}`;
	// 		})
	// 		// fetchRegister.rejected is not created yet.
	// 		.addCase(fetchRegister.fulfilled, (state) => {
	// 			state.welcomeNotification.isNotificationOpen = true;
	// 			state.welcomeNotification.notificationResult = "success";
	// 			state.welcomeNotification.notificationMessage = `${i18n.t(
	// 				"Notification.Main.successRegistration"
	// 			)}`;
	// 		})
	// 		.addCase(fetchNewCourse.fulfilled, (state) => {
	// 			state.newCourseNotification.notificationResult = "success";
	// 			state.newCourseNotification.notificationMessage = `${i18n.t(
	// 				"Notification.Main.lectureSaved"
	// 			)}`;
	// 			state.newCourseNotification.isNotificationOpen = true;
	// 		})
	// 		.addCase(fetchNewCourse.rejected, (state) => {
	// 			state.newCourseNotification.notificationResult = "error";
	// 			state.newCourseNotification.notificationMessage = `${i18n.t(
	// 				"Notification.Main.lectureNotSaved"
	// 			)}`;
	// 			state.newCourseNotification.isNotificationOpen = true;
	// 		})
	// 		.addCase(fetchUpdateMaterial.fulfilled, (state) => {
	// 			state.updateCourseNotification.notificationResult = "success";
	// 			state.updateCourseNotification.notificationMessage = `${i18n.t(
	// 				"Notification.Main.lectureSaved"
	// 			)}`;
	// 			state.updateCourseNotification.isNotificationOpen = true;
	// 		})
	// 		.addCase(fetchUpdateMaterial.rejected, (state) => {
	// 			state.updateCourseNotification.notificationResult = "error";
	// 			state.updateCourseNotification.notificationMessage = `${i18n.t(
	// 				"Notification.Main.lectureNotSaved"
	// 			)}`;
	// 			state.updateCourseNotification.isNotificationOpen = true;
	// 		})
	// 		.addCase(fetchConfirmPhone.fulfilled, (state, action) => {
	// 			state.welcomeNotification.isNotificationOpen = true;
	// 			state.welcomeNotification.notificationResult = "success";
	// 			state.welcomeNotification.notificationMessage = (
	// 				action.payload as any
	// 			).message;
	// 		})
	// 		.addCase(fetchConfirmPhone.rejected, (state, action) => {
	// 			state.welcomeNotification.isNotificationOpen = true;
	// 			state.welcomeNotification.notificationResult = "error";
	// 			state.welcomeNotification.notificationMessage = (
	// 				action.payload as any
	// 			).data.message;
	// 		});
	// },
});

export default notificationSlice;

export const notificationActions = notificationSlice.actions;
