import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Avatar, Button, ScrollShadow } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ContactsDataCard from "@/components/features/Profile/contactsDataCard/ui/contactsDataCard";
import PersonalDataCard from "@/components/features/Profile/personalDataCard/ui/personalDataCard";

import { useAppDispatch } from "@/providers/storeProvider";
import { fetchLogout } from "@/components/entities/welcome/model/actions/logout";

import { defaultDataFetch } from "@/components/shared/functions/functions";
import { animationOpacity } from "@/components/shared/styles/motion/animation";
import styles from "./profileMobile.module.sass";

const ProfileMobile = (): JSX.Element => {
	const { t } = useTranslation();
	const router = useRouter();

	const dispatch = useAppDispatch();

	useEffect(() => {
		defaultDataFetch(dispatch);
	}, []);

	return (
		<ScrollShadow size={5} className="flex justify-center w-[100%] h-[100%]">
			<div className={styles.mainData}>
				<motion.div
					{...animationOpacity}
					transition={{
						duration: 0.5,
						stiffness: 0,
						ease: "backInOut",
					}}
					className={styles.profile}
				>
					<Avatar src="" className="w-[150px] h-[150px] text-large" />

					<Button
						variant="light"
						className="uppercase mt-[10px]"
						onClick={() => {
							dispatch(fetchLogout());
							router.push("/login");
						}}
					>
						{t("Main.logout")}
					</Button>
				</motion.div>
				<motion.div
					{...animationOpacity}
					transition={{
						duration: 0.5,
						stiffness: 0,
						delay: 0.2,
						ease: "backInOut",
					}}
					className="w-full h-full"
				>
					<PersonalDataCard />
					<ContactsDataCard />
				</motion.div>
			</div>
		</ScrollShadow>
	);
};

export default ProfileMobile;
