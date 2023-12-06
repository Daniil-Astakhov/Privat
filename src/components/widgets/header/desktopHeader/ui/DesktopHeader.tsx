/* eslint-disable import/extensions */
import { useTranslation } from "react-i18next";
import Image from "next/image";
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { fetchLogout } from "@/components/entities/welcome/model/actions/logout";

import { useAppDispatch, useAppSelector } from "@/providers/storeProvider";
import styles from "./desktopHeader.module.sass";

const DesktopHeader = (): JSX.Element => {
	const pathname = usePathname();
	const { name, lastname } = useAppSelector((state) => state.profile);
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { t } = useTranslation();

	const desktopHeaderElements = [
		{ name: `${t("Rating.lectures")}`, to: "/lectures" },
		{ name: `${t("Rating.tests")}`, to: "/tests" },
		{ name: `${t("Rating.rating")}`, to: "/rating" },
	];

	const initials = `${!name ? "Пользователь" : name} ${
		!lastname ? "П" : lastname.slice(0, 1)
	}.`;
	const arr = [
		<Link className="flex w-full h-full" href="/profile" key="profile">
			{t("Main.profile")}
		</Link>,
		<div
			key="login"
			onClick={() => {
				dispatch(fetchLogout());
				router.push("/login");
			}}
		>
			{t("Main.logout")}
		</div>,
	];

	return (
		<header className={styles.header}>
			<Image src="/academy_mini_logo.svg" alt="a" width={43} height={43} />
			<nav className={styles.headerNav}>
				{desktopHeaderElements.map((element, index) => (
					<Link
						className={`${styles.link} ${
							pathname === element.to && styles.activeLink
						}`}
						key={index}
						href={element.to}
					>
						{element.name}
					</Link>
				))}
			</nav>
			<Dropdown radius="lg">
				<DropdownTrigger>
					<Button
						variant="light"
						className="text-[16px] hover:bg-[rgb(254,231,239)]"
					>
						{initials}
					</Button>
				</DropdownTrigger>
				<DropdownMenu shouldFocusWrap aria-label="lang">
					{arr.map((item, key) => (
						<DropdownItem textValue={`item: ${key}`} key={key}>
							{item}
						</DropdownItem>
					))}
				</DropdownMenu>
			</Dropdown>
		</header>
	);
};

export default DesktopHeader;
