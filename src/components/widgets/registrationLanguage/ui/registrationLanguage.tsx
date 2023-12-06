"use client";

import { useTranslation } from "react-i18next";
import RegistrationDrawer from "@/components/features/Auth/Registration/registrationDrawer/ui/RegistrationDrawer";

import styles from "./registrationLanguage.module.sass";

const RegistrationLanguage = (): JSX.Element => {
	const { t } = useTranslation();

	return (
		<div className={styles.wrapper}>
			<div className={styles.languageWrapper}>
				<h1 className={styles.heading}>{t("Language.Other.choose")}</h1>
				<RegistrationDrawer />
			</div>
		</div>
	);
};

export default RegistrationLanguage;
