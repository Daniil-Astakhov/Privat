import { useTranslation } from "react-i18next";
/* eslint-disable react/jsx-no-useless-fragment */
import { useRouter } from "next/navigation";
import {
	Modal,
	ModalContent,
	ModalBody,
	useDisclosure,
	ModalFooter,
	ModalHeader,
} from "@nextui-org/react";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import educationSlice from "@/components/entities/education/model/slice/educationSlice";
import { greenSmile, redSmile } from "@/components/shared/styles/icons";
import { useAppDispatch } from "@/providers/storeProvider";
import LichiButton from "@/components/shared/ui/lichiButton/ui/LichiButton";
import { fetchMyQuizResults } from "@/components/entities/analytics/model/actions/myQuizResults";
import styles from "./detailsModal.module.sass";

interface LichiModalProps {
	detailsModalData: any;
	setIsTestModalOpen: Dispatch<SetStateAction<boolean>>;
	materialUuid: any;
	open?: boolean;
	onChange?: (value: boolean) => void;
	closeCallback?: () => void;
	okCallback?: () => void;
}

const DetailsModal: FC<LichiModalProps> = ({
	detailsModalData,
	materialUuid,
	setIsTestModalOpen,
	open = false,
	onChange = () => {
		return null;
	},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	okCallback = () => console.warn("closed"),
	closeCallback = () => console.warn("closed"),
}): JSX.Element => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { t } = useTranslation();

	useEffect(() => {
		if (open) {
			onOpen();
		}
	}, [open]);

	useEffect(() => {
		onChange(isOpen);
	}, [isOpen]);

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
			<ModalContent key="detailsModal">
				{() => (
					<>
						<ModalHeader>
							{detailsModalData.passed ? greenSmile() : redSmile()}
						</ModalHeader>
						<ModalBody>
							<h2 className={styles.title}>«{detailsModalData.title}»</h2>
							<div className={styles.info}>
								<div className={styles.percentWrapper}>
									<p className={styles.infoTitle}>{t("Rating.passPercent")}</p>
									<p className={styles.infoValue}>{detailsModalData.mark}%</p>
								</div>
								<div className={styles.correctsWrapper}>
									<p className={styles.infoTitle}>
										{t("Rating.correctAnswers")}
									</p>
									<p className={styles.infoValue}>
										{detailsModalData.corrects_count}/
										{detailsModalData.answers_count}
									</p>
								</div>
							</div>
							<p className={styles.passed}>
								{detailsModalData.passed
									? t("Rating.testPassed")
									: t("Rating.testFailed")}
							</p>
						</ModalBody>
						<ModalFooter>
							<LichiButton
								onClick={() => {
									dispatch(
										fetchMyQuizResults({
											quiz_id: materialUuid,
										})
									).then((data: any) => {
										if (data.meta.requestStatus === "fulfilled") {
											dispatch(educationSlice.actions.setQuizLayoutAsResults());
											setIsTestModalOpen(true);

											router.push("/tests");
										}
									});
								}}
								label={t("Rating.details")}
								buttonStyle="borderless"
							/>
							<LichiButton
								label={t("Rating.repeat")}
								onClick={() => {
									setIsTestModalOpen(true);
									router.push("/tests");
								}}
							/>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default DetailsModal;

// const againHandler = () => {
// 	// console.log("reset");
// 	dispatch(educationActions.resetQuizLayout());
// 	dispatch(educationActions.resetQuizAnswersQuestions());
// 	dispatch(educationActions.resetFetchCorrects());
// 	dispatch(educationActions.resetQuizResults());
// };
