"use client";

import axios from "axios";

export const $api = axios.create({
	baseURL: "https://educenterapi-dev.spb.lichishop.com/api/v1",
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

if (typeof window !== "undefined") {
	$api.defaults.headers.common["X-Language"] =
		localStorage.getItem("i18nextLng") || "en";
}
