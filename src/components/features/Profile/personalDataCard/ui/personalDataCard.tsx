"use client";

import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { useAppSelector } from "@/providers/storeProvider";
import { useTranslation } from "react-i18next";
import styles from "./personalDataCard.module.sass";
// import { personalData } from "../model/consts";

const PersonalDataCard = (): JSX.Element => {
	const { name, lastname, job, shop, confirmedAt } = useAppSelector(
		(state) => state.profile
	);
	const { t } = useTranslation();

	const personalData = [
		{
			name: "name",
			title: `${t("Profile.Main.name")}`,
			value: `${name}`,
		},
		{
			name: "lastname",
			title: `${t("Profile.Main.lastname")}`,
			value: `${lastname}`,
		},
		{
			name: "title",
			title: `${t("Profile.Main.jobTitle")}`,
			value: `${job.title}`,
		},
		{
			name: "shop",
			title: `${t("Profile.Main.shop")}`,
			value: `${shop.name}`,
		},
		{
			name: "regitration",
			title: `${t("Profile.Main.date")}`,
			value: `${confirmedAt}`,
		},
	];

	return (
		<Card className={styles.data}>
			<CardHeader className={styles.cardHeader}>
				<h2 className={styles.heading}>{t("Profile.Main.personalCard")}</h2>
			</CardHeader>
			<CardBody className={styles.cardBody}>
				{personalData.map((data) => (
					<div className={styles.row} key={data.name}>
						<p className={styles.title}>{data.title}</p>
						<p className={styles.value}>{data.value}</p>
					</div>
				))}
			</CardBody>
		</Card>
	);
};

export default PersonalDataCard;
