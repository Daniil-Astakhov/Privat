/* eslint-disable @typescript-eslint/no-unused-vars */
import uuid from "react-uuid";
/* eslint-disable react/jsx-no-useless-fragment */
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	useDisclosure,
	Card,
	CardBody,
	CardHeader,
	CircularProgress,
} from "@nextui-org/react";
import { useWindowSize } from "@uidotdev/usehooks";
import { useTranslation } from "react-i18next";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import {
	handlePercentColor,
	handleProgressPercentColor,
} from "@/components/shared/consts";
import { threedot } from "@/components/shared/styles/icons";
import MobileFooter from "@/components/widgets/footer/mobileFooter/ui/MobileFooter";
import { useAppDispatch, useAppSelector } from "@/providers/storeProvider";
import styles from "./resultsModal.module.sass";

interface LichiModalProps {
	setIsDetailsModalOpen: Dispatch<SetStateAction<boolean>>;
	setDetailsModalData: Dispatch<SetStateAction<any>>;
	setMaterialUuid: Dispatch<SetStateAction<string>>;
	open?: boolean;
	onChange?: (value: boolean) => void;
	closeCallback?: () => void;
	okCallback?: () => void;
}

const ResultsModal: FC<LichiModalProps> = ({
	setIsDetailsModalOpen,
	setMaterialUuid,
	setDetailsModalData,
	open = false,
	onChange = () => {
		return null;
	},
	okCallback = () => console.warn("closed"),
	closeCallback = () => console.warn("closed"),
}): JSX.Element => {
	const dispatch = useAppDispatch();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { quizzes, isAnalyticsLoading, rating, passedQuizzes } = useAppSelector(
		(state) => state.analytics
	);
	const size = useWindowSize();
	const { t } = useTranslation();

	const color = handlePercentColor(rating);
	const progressColor = handleProgressPercentColor(rating);

	useEffect(() => {
		if (open) {
			onOpen();
		}
	}, [open]);

	useEffect(() => {
		onChange(isOpen);
	}, [isOpen]);

	const handleOpenDetailsModal = (quiz: any) => {
		setDetailsModalData(quiz);
		setIsDetailsModalOpen(true);
	};

	const tabletSize = size.width !== null && size?.width < 1024;

	return (
		<Modal
			classNames={{
				wrapper: styles.wrapper,
				base: styles.base,
				backdrop: styles.backdrop,
				header: styles.header,
				body: styles.body,
				footer: styles.footer,
				closeButton: styles.closeButton,
			}}
			size="3xl"
			isOpen={isOpen}
			onClose={() => {
				if (closeCallback) closeCallback();
				onClose();
			}}
			backdrop="blur"
		>
			<ModalContent key="resultModal">
				{() => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							<h2>{t("Rating.rating")}</h2>
						</ModalHeader>
						<ModalBody>
							<div className={styles.modalWrapper}>
								<Card
									classNames={{
										base: styles.resultBase,
										body: styles.resultWrapper,
									}}
									shadow="none"
									radius="none"
									key="result"
								>
									<CardBody>
										<div
											className={`${styles.wrapper} ${styles.resultWrapper}`}
										>
											<div className={styles.textWrapper}>
												<h2 className={styles.rating}>{t("Rating.rating")}</h2>
												{tabletSize && (
													<CircularProgress
														aria-label="load"
														classNames={{
															svg: styles.svg,
															indicator: `${styles.indicator} ${styles[progressColor]}`,
															track: styles.track,
															value: `${styles.value} ${styles[color]}`,
														}}
														value={rating}
														strokeWidth={5}
														showValueLabel
													/>
												)}
												<h3 className={styles.congratulations}>
													{t("Rating.congratulations")}
												</h3>
												<h3 className={styles.passed}>
													{t("Rating.inAverage")}
													{/* Вы прошли {passedQuizzes} теста в среднем на */}
												</h3>
											</div>
											<h2 className={`${styles.percent} ${styles[color]}`}>
												{rating}%
											</h2>
											<div className={styles.descriptionWrapper}>
												<p className={styles.asterisk}>*</p>
												<p className={styles.description}>
													{t("Rating.averagePercent")}
												</p>
											</div>
										</div>
									</CardBody>
								</Card>

								<Card
									classNames={{
										base: styles.testsBase,
										header: styles.testsHeader,
										body: styles.testsWrapper,
									}}
									shadow="none"
									radius="none"
									key="tests"
								>
									<CardHeader>
										<h2 className={styles.testsHeader}>{t("Rating.tests")}</h2>
									</CardHeader>
									<CardBody>
										<div className={`${styles.wrapper} ${styles.testsWrapper}`}>
											<div className={styles.listWrapper}>
												<p className={styles.listHeading}>
													{t("Rating.notPassed")}
												</p>
												<ul className={styles.list}>
													{quizzes?.map((quiz: any) => (
														<>
															{Boolean(
																quiz.mark < 80 && quiz.mark !== null
															) && (
																<li key={quiz.title} className="w-full">
																	<div
																		className={styles.quiz}
																		onClick={() => {
																			setMaterialUuid(quiz.id);
																			handleOpenDetailsModal(quiz);
																		}}
																	>
																		<p>{quiz.title}</p>
																		{threedot({})}
																	</div>
																</li>
															)}
														</>
													))}
												</ul>
											</div>

											<div className={styles.listWrapper}>
												<p className={styles.listHeading}>
													{t("Rating.successfullyPassed")}
												</p>
												<ul className={styles.list}>
													{quizzes?.map((quiz: any) => (
														<>
															{Boolean(quiz.mark >= 80) && (
																<li key={quiz.title} className="w-full">
																	<div
																		className={styles.quiz}
																		onClick={() => {
																			setMaterialUuid(quiz.id);
																			handleOpenDetailsModal(quiz);
																		}}
																	>
																		<p>{quiz.title}</p>
																		{threedot({})}
																	</div>
																</li>
															)}
														</>
													))}
												</ul>
											</div>
										</div>
									</CardBody>
								</Card>
							</div>
						</ModalBody>
						{tabletSize && <MobileFooter />}
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default ResultsModal;
