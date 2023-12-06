/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	useDisclosure,
} from "@nextui-org/react";
import { InView } from "react-intersection-observer";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchLecture } from "@/components/entities/education/model/actions/lecture";
import { useAppDispatch, useAppSelector } from "@/providers/storeProvider";
import LichiButton from "@/components/shared/ui/lichiButton/ui/LichiButton";
import { fetchReadLecture } from "@/components/entities/education/model/actions/readLecture";
import { educationActions } from "@/components/entities/education/model/slice/educationSlice";
import { analyticsActions } from "@/components/entities/analytics/model/slice/analyticsSlice";
import { fetchAllCourses } from "@/components/entities/education/model/actions/allCourses";
import styles from "./pageModal.module.sass";

interface LichiModalProps {
	id: number;
	setIsLectureModalOpen: (value: SetStateAction<boolean>) => void;
	setIsTestModalOpen: Dispatch<SetStateAction<boolean>>;
	setMaterialUuid: Dispatch<any>;
	open?: boolean;
	onChange?: (value: boolean) => void;
	buttonLabel?: string;
	closeCallback?: () => void;
	okCallback?: () => void;
}

const PageModal: FC<LichiModalProps> = ({
	id,
	setIsLectureModalOpen,
	setIsTestModalOpen,
	setMaterialUuid,
	open = false,
	onChange = () => {
		return null;
	},
	okCallback = () => console.warn("closed"),
	closeCallback = () => console.warn("closed"),
	buttonLabel = "Закрыть",
}): JSX.Element => {
	const { lectureData } = useAppSelector((state: any) => state.education);
	const { job } = useAppSelector((state) => state.profile);

	const dispatch = useAppDispatch();
	const router = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { isRead } = lectureData;

	const contentLength = lectureData?.translation?.content?.length;

	const handleIsInView = (inView: boolean) => {
		if (inView) {
			dispatch(
				fetchReadLecture({
					translation_id: lectureData.translation.id,
				})
			).then((readData: any) => {
				if (readData.meta.requestStatus === "fulfilled") {
					if (!isRead) dispatch(analyticsActions.increaseReadMaterials());
					dispatch(educationActions.setIsRead(lectureData.uuid));
				}
				if (job.id) dispatch(fetchAllCourses({ jobTitle: job.id, page: 1 }));
			});
		}
	};

	useEffect(() => {
		if (open) {
			onOpen();
			dispatch(fetchLecture({ course_id: id }));
		}
	}, [open]);

	useEffect(() => {
		onChange(isOpen);
	}, [isOpen]);

	return (
		<Modal
			className="maxPc:rounded-none"
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
			<ModalContent>
				{(close) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							{lectureData?.translation?.title}
						</ModalHeader>
						<ModalBody>
							{Boolean(contentLength) && (
								<>
									<div
										// eslint-disable-next-line react/no-danger
										dangerouslySetInnerHTML={{
											__html: lectureData.translation.content,
										}}
									/>
									<InView
										as="div"
										onChange={(inView) => handleIsInView(inView)}
									/>
									<LichiButton
										className={styles.applyBtn}
										label={buttonLabel}
										onClick={() => {
											setIsLectureModalOpen(false);
											setMaterialUuid(lectureData?.quiz_id);
											setIsTestModalOpen(true);
											router.push("/tests");
											close();
										}}
									/>
								</>
							)}
						</ModalBody>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default PageModal;
