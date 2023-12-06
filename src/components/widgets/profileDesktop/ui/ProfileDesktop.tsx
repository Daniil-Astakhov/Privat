/* eslint-disable @typescript-eslint/no-unused-vars */
import { Avatar, Button, ScrollShadow } from "@nextui-org/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import ContactsDataCard from "@/components/features/Profile/contactsDataCard/ui/contactsDataCard";
import PersonalDataCard from "@/components/features/Profile/personalDataCard/ui/personalDataCard";
import { fetchLogout } from "@/components/entities/welcome/model/actions/logout";
import { defaultDataFetch } from "@/components/shared/functions/functions";

import { useAppDispatch, useAppSelector } from "@/providers/storeProvider";
import styles from "./profileDesktop.module.sass";

const ProfileDesktop = (): JSX.Element => {
	const { name, lastname } = useAppSelector((state) => state.profile);
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { t } = useTranslation();

	useEffect(() => {
		defaultDataFetch(dispatch);
	}, []);

	return (
		<ScrollShadow size={5} className="flex justify-center w-[100%] h-[100%]">
			<div className={styles.mainData}>
				<div className={styles.profile}>
					<Avatar src="" className="w-[150px] h-[150px] text-large" />

					<Button
						variant="light"
						className="uppercase mt-[10px]"
						onClick={() => {
							dispatch(fetchLogout());
							router.push("/login");
						}}
					>
						{t("Profile.Main.exit")}
					</Button>
				</div>
				<div className="w-full h-full">
					<PersonalDataCard />
					<ContactsDataCard />
				</div>
			</div>
		</ScrollShadow>
	);
};

export default ProfileDesktop;
