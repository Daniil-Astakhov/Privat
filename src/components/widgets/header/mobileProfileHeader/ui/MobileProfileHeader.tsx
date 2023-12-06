import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import RegistrationDrawer from "@/components/features/Auth/Registration/registrationDrawer/ui/RegistrationDrawer";
import styles from "./mobileProfileHeader.module.sass";

const MobileProfileHeader = (): JSX.Element => {
	const pathname = usePathname();
	const { t } = useTranslation();

	const routingTabNames: Record<string, string> = {
		"/profile": "Личный кабинет",
		"/lectures": `${t("Main.lectures")}`,
		"/tests": `${t("Main.tests")}`,
		"/rating": `${t("Main.rating")}`,
	};

	return (
		<header className={styles.header}>
			<Link href="/lectures">
				<Image src="/icons/arrow.svg" alt="<" width="24" height="24" />
			</Link>
			<h2 className={styles.tabName}>{routingTabNames[pathname]}</h2>
			<div className="mr-[10px]">
				<RegistrationDrawer />
			</div>
		</header>
	);
};

export default MobileProfileHeader;
