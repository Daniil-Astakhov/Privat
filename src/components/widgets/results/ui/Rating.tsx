import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSessionStorage } from "@uidotdev/usehooks";
import LecturesRatingCard from "@/components/features/Rating/lecturesRatingCard/ui/LecturesRatingCard";
import OverallRatingCard from "@/components/features/Rating/overallRatingCard/ui/OverallRatingCard";
import TestsRatingCard from "@/components/features/Rating/testsRatingCard/ui/TestsRatingCard";
import DetailsModal from "@/components/widgets/detailsModal/ui/DetailsModal";
import ResultsModal from "@/components/widgets/resultsModal/ui/ResultsModal";
import { useAppDispatch } from "@/providers/storeProvider";
import { fetchMyAnalytic } from "@/components/entities/analytics/model/actions/myAnalytic";
import { defaultDataFetch } from "@/components/shared/functions/functions";
import { animationOpacity } from "@/components/shared/styles/motion/animation";
import styles from "./rating.module.sass";

const Rating = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const [isRatingModalOpen, setIsRatingModalOpen] = useState<boolean>(false);
	const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);
	const [detailsModalData, setDetailsModalData] = useState({});

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [isTestModalOpen, setIsTestModalOpen] = useSessionStorage(
		"isTestModalOpen",
		false
	);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [materialUuid, setMaterialUuid] = useSessionStorage<string>(
		"materialUuid",
		""
	);

	useEffect(() => {
		defaultDataFetch(dispatch);
	}, []);

	const onChangeRatingModal = (e: boolean) => setIsRatingModalOpen(e);

	const onChangeDetailsModal = (e: boolean) => setIsDetailsModalOpen(e);

	useEffect(() => {
		dispatch(fetchMyAnalytic());
	}, []);

	return (
		<div className={styles.wrapper}>
			<motion.div
				{...animationOpacity}
				transition={{
					duration: 0.5,
					delay: 0.1,
					stiffness: 0,
					ease: "backInOut",
				}}
				className={styles.ratingCards}
			>
				<LecturesRatingCard />

				<TestsRatingCard />
			</motion.div>
			<motion.div
				{...animationOpacity}
				transition={{
					duration: 0.7,
					delay: 0.3,
					stiffness: 0,
					ease: "backInOut",
				}}
			>
				<OverallRatingCard setIsRatingModalOpen={setIsRatingModalOpen} />
			</motion.div>

			<ResultsModal
				setDetailsModalData={setDetailsModalData}
				setIsDetailsModalOpen={setIsDetailsModalOpen}
				setMaterialUuid={setMaterialUuid}
				open={isRatingModalOpen}
				okCallback={() => setIsRatingModalOpen(false)}
				onChange={onChangeRatingModal}
			/>

			<DetailsModal
				detailsModalData={detailsModalData}
				setIsTestModalOpen={setIsTestModalOpen}
				materialUuid={materialUuid}
				open={isDetailsModalOpen}
				okCallback={() => setIsDetailsModalOpen(false)}
				onChange={onChangeDetailsModal}
			/>
		</div>
	);
};

export default Rating;
