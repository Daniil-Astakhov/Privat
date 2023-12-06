/* eslint-disable eqeqeq */

"use client";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import { useSessionStorage } from "@uidotdev/usehooks";
import { fetchAllCourses } from "@/components/entities/education/model/actions/allCourses";
import { defaultModalData } from "@/components/shared/consts";
import { LichiModal } from "@/components/shared/ui/lichiModal/ui/LichiModal";

import TestsModal from "@/components/widgets/testsModal/ui/TestsModal";
import { useAppSelector, useAppDispatch } from "@/providers/storeProvider";
import AllTests from "@/components/features/Tests/ui/AllTests";
import { defaultDataFetch } from "@/components/shared/functions/functions";
import styles from "./tests.module.sass";

export default function Tests(): JSX.Element {
	const { t } = useTranslation();

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [modalData, setModalData] = useState<{
		headerData: string;
		bodyData: string;
	}>(defaultModalData);
	const [isTestModalOpen, setIsTestModalOpen] = useSessionStorage(
		"isTestModalOpen",
		false
	);
	const [materialUuid, setMaterialUuid] = useSessionStorage<any>(
		"materialUuid",
		""
	);

	useEffect(() => {
		defaultDataFetch(dispatch);
	}, []);

	const { job } = useAppSelector((state) => state.profile);
	const dispatch = useAppDispatch();

	useEffect(() => {
		// eslint-disable-next-line no-warning-comments
		if (job.id) dispatch(fetchAllCourses({ jobTitle: job.id, page: 1 }));
	}, [job]);

	const onChangeTestModal = (e: boolean) => setIsTestModalOpen(e);

	const onChangeModal = (e: boolean) => {
		setIsModalOpen(e);
	};

	const handleOpenTest = () => setIsTestModalOpen(true);

	return (
		<div className={styles.collapseWrapper}>
			<AllTests
				setModalData={setModalData}
				setIsModalOpen={setIsModalOpen}
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				setMaterialUuid={setMaterialUuid}
			/>
			<LichiModal
				open={isModalOpen}
				buttonLabel={t("Education.Main.test")}
				contents={{
					header: <div>{modalData.headerData}</div>,
					body: <div>{modalData.bodyData}</div>,
				}}
				callback={handleOpenTest}
				onChange={onChangeModal}
			/>
			<TestsModal
				open={isTestModalOpen}
				quiz_id={materialUuid}
				// closeCallback={() => dispatch(resetLectureData())}
				okCallback={() => setIsTestModalOpen(false)}
				onChange={onChangeTestModal}
			/>
		</div>
	);
}
