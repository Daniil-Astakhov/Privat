/* eslint-disable consistent-return */
/* eslint-disable no-warning-comments */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/ban-ts-comment */

"use client";

import { useWindowSize } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
	Button,
	Card,
	CardBody,
	CircularProgress,
	Image,
} from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import RegistrationLanguage from "@/components/widgets/registrationLanguage/ui/registrationLanguage";
import RegistrationForm from "@/components/widgets/registrationForm/ui/registrationForm";
import { animationOpacity } from "@/components/shared/styles/motion/animation";
import LichiButton from "@/components/shared/ui/lichiButton/ui/LichiButton";
import { getFormFlag } from "@/components/entities/welcome/model/selectors/welcomSelectors";
import { useAppDispatch, useAppSelector } from "@/providers/storeProvider";
import { fetchCountries } from "@/components/entities/welcome/model/actions/countries";
import { fetchRegistration } from "@/components/entities/welcome/model/actions/registration";
import { LichiModal } from "@/components/shared/ui/lichiModal/ui/LichiModal";
import styles from "./registration.module.sass";

type RegistrationStateType = "language" | "form" | 0 | 1 | 2 | 3;

export const RegistrationAppPage = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const size = useWindowSize();
	const next = useAppSelector(getFormFlag);
	const { t } = useTranslation();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [windowW, setWindowW] = useState<number | undefined>();
	const [open, setOpen] = useState<RegistrationStateType>("language");

	useEffect(() => {
		dispatch(fetchCountries());
	}, []);

	const setFirstPosition = (): number | null | string => {
		if (open === "language") return 0;
		if (open === "form") return 100;

		return 100;
	};

	const pagPage = () => {
		if (open === "form") return "1 из 2";
		return `${open} из 2`;
	};

	const disabledBtn = () => {
		if (open === "language") return false;
		if (open === "form" && !next[1]) return false;
		if (open === 2 && !next[2]) return false;

		return true;
	};

	const setHeight = (openTab: number | string): number | null | string => {
		if (openTab === "language") return "600px";
		return "740px";
	};

	useEffect(() => {
		if (size.width) setWindowW(size?.width);
	}, [size.width]);

	// eslint-disable-next-line consistent-return
	const titleBtn = () => {
		if (open === 2) return t("Register.Main.finish");
		if (open === "language") return t("Register.Main.next");
		// @ts-ignore
		if (open !== 2 && !disabledBtn()) return t("Register.Main.next");
		// @ts-ignore
		if (open !== 2 && disabledBtn()) return t("Register.Main.fill");
	};

	const formSendData = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!next[1] && !next[2]) {
			const formData = new FormData(event.currentTarget);
			const form = {
				name: formData.get("name") as string,
				lastname: formData.get("lastname") as string,
				middlename: formData.get("middlename") as string,
				phone: formData.get("phone") as string,
				birthday: formData.get("age") as string,
				shop_id: formData.get("shop_id") as string,
				country_id: formData.get("country_id") as string,
				city_id: formData.get("city_id") as string,
				job_id: formData.get("job_id") as string,
				email: formData.get("email") as string,
				language_id: formData.get("lang") as string,
			};

			// TODO: Создание юзера
			// eslint-disable-next-line no-console
			console.log(form);
			dispatch(fetchRegistration(form)).then((data: any) => {
				if (data.payload.status === 201) setIsModalOpen(true);
			});
		}
	};

	return (
		<div className={styles.formWrap}>
			<LichiModal
				open={isModalOpen}
				contents={{
					header: <div>{t("Register.Main.success")}</div>,
					body: (
						<div>
							{t("Register.Main.modalMessage")}
							<button
								type="button"
								onClick={() => {
									router.push("/login");
									setIsModalOpen(false);
								}}
							>
								{t("Register.Main.main")}
							</button>
						</div>
					),
				}}
				// callback={handleOpenLecture}
				// onChange={onChangeModal}
			/>
			<form onSubmit={formSendData}>
				<motion.div
					animate={{
						...animationOpacity,
						// @ts-ignore
						height: `${windowW <= 767 ? "100vh" : setHeight(open)}`,
					}}
					transition={{
						duration: 0.7,
						stiffness: 0,
						ease: "backInOut",
					}}
				>
					<Card
						classNames={{
							base: "md:w-[610px] md:h-[100%] min-h-[600px] h-[100vh] w-[100vw] rounded-none md:rounded-[16px]",
							body: "overflow-hidden flex justify-center items-center",
						}}
					>
						<CardBody>
							<motion.div
								className="flex w-full justify-center relative"
								initial={false}
								animate={{
									// @ts-ignore
									width: `${open === "language" ? "100px" : "85px"}`,
									top: `${open === "language" ? "60px" : "0px"}`,
								}}
								transition={{ duration: 0.5 }}
							>
								<Image
									height={100}
									width={100}
									src="/academy_main_logo.png"
									alt="main_logo"
								/>
							</motion.div>

							<div className={styles.pag}>
								{open === "language" || (
									<motion.span
										{...animationOpacity}
										transition={{ duration: 0.5 }}
									>
										{pagPage()}
									</motion.span>
								)}
							</div>
							<motion.div
								{...animationOpacity}
								transition={{ duration: 0.5 }}
								className="flex flex-col justify-center items-center w-full h-full overflow-hidden"
							>
								<motion.div
									animate={
										open ? { x: `-${setFirstPosition()}%` } : { x: "0%" }
									}
									transition={{
										duration: 0.7,
										stiffness: 0,
										ease: "backInOut",
									}}
									className="absolute flex flex-row justify-center items-center gap-[100%] w-full h-[400px]"
								>
									<motion.div className="absolute w-full left-[0%]">
										<RegistrationLanguage />
									</motion.div>
									<motion.div className="absolute w-full left-[100%]">
										<RegistrationForm open={open} />
									</motion.div>
								</motion.div>
							</motion.div>
							<div className="w-full h-[93px] flex flex-col justify-center items-center md:pb-[15px] gap-[10px]">
								<div className="w-[130px] h-[34px]">
									<Button
										className="text-white w-full text-base  bg-black border-2 border-black h-full hover:border-pinkColor border-solid  hover:bg-pinkColor transition  first:text-white"
										type={open === 2 ? "submit" : "button"}
										isLoading={disabledBtn()}
										spinner={
											<CircularProgress
												className="scale-[70%] absolute hidden"
												aria-label="Loading..."
											/>
										}
										onClick={() => {
											if (open === "language") setOpen("form");
											// if (open === "language") setOpen(2);
											if (open === "form" && open) setOpen(2);
										}}
									>
										{titleBtn()}
									</Button>
								</div>
								<div className="w-[130px] h-[34px]">
									<LichiButton
										onClick={() => {
											if (open === "language") router.back();
											if (open === "form") setOpen("language");
											if (open === 1) setOpen("language");
											if (open === 2) setOpen("form");
										}}
										label={t("Register.Main.back")}
										buttonStyle="borderless"
										type="button"
									/>
								</div>
							</div>
						</CardBody>
					</Card>
				</motion.div>
			</form>
		</div>
	);
};
