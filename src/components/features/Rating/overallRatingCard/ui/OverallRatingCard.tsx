import { useTranslation } from "react-i18next";
import {
	CircularProgress,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
} from "@nextui-org/react";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useAppSelector } from "@/providers/storeProvider";
import {
	handlePercentColor,
	handleProgressPercentColor,
} from "@/components/shared/consts";
import LichiButton from "@/components/shared/ui/lichiButton/ui/LichiButton";
import styles from "./overallRatingCard.module.sass";

interface PropsType {
	setIsRatingModalOpen: Dispatch<SetStateAction<boolean>>;
}

const OverallRatingCard: FC<PropsType> = (props): JSX.Element => {
	const [initRating, setInitRating] = useState<number>(100);
	const { setIsRatingModalOpen } = props;
	const { t } = useTranslation();

	const { rating } = useAppSelector((state) => state.analytics);
	const color = handlePercentColor(rating);
	const progressColor = handleProgressPercentColor(rating);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setInitRating(rating);
		}, 1000);

		return () => clearTimeout(timeoutId);
	}, [rating]);

	return (
		<Card
			classNames={{
				base: styles.card,
				header: styles.header,
				body: styles.body,
				footer: styles.footer,
			}}
		>
			<CardHeader>
				<h1 className={styles.rating}>{t("Rating.rating")}</h1>
			</CardHeader>
			<CardBody>
				<div className={styles.progressWrapper}>
					<CircularProgress
						aria-labelledby="loadingLabel"
						aria-label="Loading..."
						classNames={{
							svg: styles.svg,
							indicator: `${styles.indicator} ${styles[progressColor]}`,
							track: styles.track,
							value: `${styles.value} ${styles[color]}`,
						}}
						value={initRating}
						strokeWidth={5}
						showValueLabel
					/>
					<div className={styles.percentWrapper}>
						<p className={styles.congratulations}>
							{t("Rating.congratulations")}
						</p>
						<p aria-label="congratulations" className={styles.congratulations}>
							{t("Rating.inAverage")}
						</p>
						<p className={`${styles.percent} ${styles[color]}`}>{rating}%</p>
					</div>
				</div>
				<div className={styles.descriptionWrapper}>
					<p className={styles.asterisk}>*</p>
					<p className={styles.description}>{t("Rating.averagePercent")}</p>
				</div>
			</CardBody>
			<CardFooter>
				<LichiButton
					onClick={() => setIsRatingModalOpen(true)}
					label={t("Rating.details")}
					buttonStyle="borderless"
				/>
			</CardFooter>
		</Card>
	);
};

export default OverallRatingCard;
