"use client";

import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/providers/storeProvider";
import styles from "./contactsDataCard.module.sass";

const ContactsDataCard = (): JSX.Element => {
	const { email, phone } = useAppSelector((state) => state.profile);
	const { t } = useTranslation();

	return (
		<Card className={styles.data}>
			<CardHeader className={styles.cardHeader}>
				<h2 className={styles.heading}>{t("Profile.Main.contactsCard")}</h2>
			</CardHeader>
			<CardBody className={styles.cardBody}>
				<div className={styles.row} key="phone">
					<p className={styles.title}>{t("Profile.Main.phone")}</p>
					{/* <p className={styles.value}>+7(981)951-57-46</p> */}
					<p className={styles.value}>{phone}</p>
				</div>
				<div className={styles.row} key="email">
					<p className={styles.title}>{t("Profile.Main.email")}</p>
					<p className={styles.value}>{email}</p>
				</div>
			</CardBody>
		</Card>
	);
};

export default ContactsDataCard;
