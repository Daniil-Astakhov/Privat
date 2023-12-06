"use client";

import { useWindowSize } from "@uidotdev/usehooks";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/providers/storeProvider";
import { useEffect } from "react";
import { defaultDataFetch } from "@/components/shared/functions/functions";
import { i18n } from "@/components/shared/lib";
import DesktopHeader from "./desktopHeader/ui/DesktopHeader";
import MobilePageHeader from "./mobilePageHeader/ui/MobilePageHeader";
import MobileProfileHeader from "./mobileProfileHeader/ui/MobileProfileHeader";

const Header = (): JSX.Element => {
	const size = useWindowSize();
	const { width } = size;
	const pathname = usePathname();

	const dispatch = useAppDispatch();

	const langRegExp = /^[a-z]{2}-[A-Z]{2}$/g;

	useEffect(() => {
		defaultDataFetch(dispatch);
	}, []);

	useEffect(() => {
		const lang = localStorage.getItem("i18nextLng");
		if (!lang) {
			i18n.changeLanguage("en");
			localStorage.setItem("i18nextLng", "en");
		}
		if (lang?.match(langRegExp)) {
			i18n.changeLanguage(lang.slice(0, 2));
			localStorage.setItem("i18nextLng", lang.slice(0, 2));
		}
	}, []);

	const isSizeNull = width === null;
	return (
		<>
			{!isSizeNull && width >= 1024 && <DesktopHeader />}
			{!isSizeNull && width < 1024 && pathname === "/root/profile" && (
				<MobileProfileHeader />
			)}
			{!isSizeNull && width < 1024 && pathname !== "/root/profile" && (
				<MobilePageHeader />
			)}
		</>
	);
};

export default Header;
