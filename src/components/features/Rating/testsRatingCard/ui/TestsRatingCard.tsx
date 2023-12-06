import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Progress } from "@nextui-org/react";
import { useAppSelector } from "@/providers/storeProvider";
import {
	handlePercentColor,
	handleProgressPercentColor,
} from "@/components/shared/consts";
import styles from "./testsRatingCard.module.sass";

const TestsRatingCard = (): JSX.Element => {
	const [percent, setPercent] = useState<any>();
	const [color, setColor] = useState<any>();
	const [progressColor, setProgressColor] = useState<any>();
	const { t } = useTranslation();
	const { passedQuizzes, totalQuizzes, quizzes } = useAppSelector(
		(state) => state.analytics
	);

	useEffect(() => {
		setPercent(
			(quizzes.filter((quiz: any) => quiz.mark >= 80).length / totalQuizzes) *
				100
		);
	}, [passedQuizzes, quizzes, totalQuizzes]);

	useEffect(() => {
		if (percent) setColor(handlePercentColor(percent));

		if (percent) setProgressColor(handleProgressPercentColor(percent));
	}, [percent]);

	return (
		<Card className={styles.cardWrapper}>
			<CardHeader className={styles.cardHeader}>
				<h2>{t("Rating.tests")}</h2>
			</CardHeader>
			<CardBody className={styles.cardBody}>
				<h3 className={styles.title}>{t("Rating.passedTests")}</h3>
				<p className={`${styles.count} ${styles[color]}`}>
					{quizzes.filter((quiz: any) => quiz.mark >= 80).length}/{totalQuizzes}
				</p>
				<Progress
					aria-labelledby="loadingLabel"
					aria-label="Loading..."
					classNames={
						progressColor
							? { indicator: styles[progressColor] }
							: { indicator: styles.redProgress }
					}
					className={styles.progress}
					value={percent}
				/>
				<div>
					<p className={styles.asterisk}>*</p>
					<p className={styles.description}>{t("Rating.passAllTests")}</p>
				</div>
			</CardBody>
		</Card>
	);
};

export default TestsRatingCard;
