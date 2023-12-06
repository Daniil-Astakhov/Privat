import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Progress } from "@nextui-org/react";
import { useAppSelector } from "@/providers/storeProvider";
import {
	handlePercentColor,
	handleProgressPercentColor,
} from "@/components/shared/consts";
import styles from "./lecturesRatingCard.module.sass";

const LecturesRatingCard = (): JSX.Element => {
	const [percent, setPercent] = useState<any>();
	const [color, setColor] = useState<any>();
	const [progressColor, setProgressColor] = useState<any>();

	const { t } = useTranslation();
	const { readCourses, totalCourses } = useAppSelector(
		(state) => state.analytics
	);

	useEffect(() => {
		if (readCourses) setPercent((readCourses / totalCourses) * 100);
	}, [readCourses]);

	useEffect(() => {
		if (percent) setColor(handlePercentColor(percent));
		if (percent) setProgressColor(handleProgressPercentColor(percent));
	}, [percent]);

	return (
		<Card className={styles.cardWrapper}>
			<CardHeader className={styles.cardHeader}>
				<h2>{t("Rating.lectures")}</h2>
			</CardHeader>
			<CardBody className={styles.cardBody}>
				<h3 className={styles.title}>{t("Rating.passedMaterials")}</h3>
				<p className={`${styles.count} ${styles[color]}`}>
					{readCourses}/{totalCourses}
				</p>
				<Progress
					aria-labelledby="loadingLabel"
					aria-label="Loading..."
					classNames={{ indicator: styles[progressColor] }}
					className={styles.progress}
					value={percent}
				/>
				<div>
					<p className={styles.asterisk}>*</p>
					<p className={styles.description}>{t("Rating.passAllMaterials")}</p>
				</div>
			</CardBody>
		</Card>
	);
};

export default LecturesRatingCard;
