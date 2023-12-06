"use client";

// import LoginPage from "@/pages/login/ui/login";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
// import Image from "next/image";
import { useRouter } from "next/navigation";
import {
	Button,
	Card,
	CardBody,
	CircularProgress,
	Image,
} from "@nextui-org/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { fetchSignIn } from "@/components/entities/welcome/model/actions/signIn";
import { fetchProfile } from "@/components/entities/welcome/model/actions/profile";
import { useAppDispatch, useAppSelector } from "@/providers/storeProvider";
import LichiInput from "@/components/shared/ui/lichiInput/ui/LichiInput";
import { EyeSlashFilledIcon } from "@/components/shared/ui/eyeSlashFilledIcon/ui/EyeSlashFilledIcon";
import { fetchMyAnalytic } from "@/components/entities/analytics/model/actions/myAnalytic";
import { EyeFilledIcon } from "@/components/shared/ui/eyeFilledIcon/ui/EyeFilledIcon";
import { animationOpacity } from "@/components/shared/styles/motion/animation";
import { useTranslation } from "react-i18next";
import styles from "./login.module.sass";

interface FormInput {
	login: string;
	password: string;
}

export const LoginAppPage = (): JSX.Element => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const { isLoading } = useAppSelector((state) => state.welcome);
	const router = useRouter();
	const {
		control,
		handleSubmit,
		// watch,
		formState: { errors },
	} = useForm<FormInput>();

	const onSubmit: SubmitHandler<FormInput> = (data) => {
		dispatch(fetchSignIn({ login: data.login, password: data.password })).then(
			(signInResponse: any) => {
				if (signInResponse.meta.requestStatus === "fulfilled") {
					dispatch(fetchProfile()).then((profileResponse: any) => {
						if (profileResponse.meta.requestStatus === "fulfilled") {
							dispatch(fetchMyAnalytic());
							router.push("/root/auth/profile");
						}
					});
				}
			}
		);
	};

	useEffect(() => {
		dispatch(fetchProfile()).then((profileResponse: any) => {
			if (profileResponse.meta.requestStatus === "fulfilled")
				dispatch(fetchMyAnalytic());
		});
	}, []);

	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);

	return (
		<Card
			classNames={{
				base: "md:w-[610px] md:h-[524px] h-full w-full rounded-none md:rounded-[16px]",
			}}
		>
			<CardBody>
				<motion.div
					{...animationOpacity}
					transition={{ duration: 0.5 }}
					className="flex flex-col justify-center items-center w-full h-full"
				>
					<motion.div {...animationOpacity} transition={{ duration: 0.5 }}>
						<Image
							className={styles.logo}
							src="/academy_main_logo.png"
							alt="main_logo"
							width={92}
							height={106}
							style={{ objectFit: "cover" }}
						/>
					</motion.div>

					<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
						<Controller
							name="login"
							control={control}
							rules={{ required: true }}
							aria-invalid={errors.login ? "true" : "false"}
							render={({ field }) => (
								<div className="flex w-full h-[64px]">
									{" "}
									<LichiInput
										{...field}
										label={t("Login.Main.phone")}
										placeholder="Email"
										type="email"
										value={field.value || ""}
									/>
								</div>
							)}
						/>
						<Controller
							name="password"
							control={control}
							rules={{ required: true }}
							aria-invalid={errors.password ? "true" : "false"}
							render={({ field }) => (
								<div className="flex w-full h-[64px]">
									<LichiInput
										{...field}
										label={t("Login.Main.password")}
										placeholder="Введите пароль"
										endContent={
											<button
												className="absolute right-0 focus:outline-none"
												type="button"
												onClick={toggleVisibility}
											>
												{isVisible ? (
													<EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
												) : (
													<EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
												)}
											</button>
										}
										type={isVisible ? "text" : "password"}
										value={field.value || ""}
									/>
								</div>
							)}
						/>
						<div className={styles.loginWrapper}>
							<Button
								className="text-white w-full text-base  bg-black border-2 border-black h-full hover:border-pinkColor border-solid  hover:bg-pinkColor transition"
								variant="bordered"
								type="submit"
								isLoading={isLoading}
								spinner={
									<CircularProgress
										className="scale-[70%]"
										aria-label="Loading..."
									/>
								}
							>
								{t("Login.Main.signIn")}
							</Button>
						</div>
					</form>
					<div>
						<Button
							className="text-[#71717A] text-base bg-none hover:bg-[#fff0] hover:text-[#52525B] active:text-[#52525B] disabled:text-disabledColor mt-[5px]"
							variant="light"
							type="button"
							onClick={() => router.push("/registration")}
						>
							{t("Table.Columns.registration")}
						</Button>
					</div>
					<div className=" flex "> v0.7.3</div>
				</motion.div>
			</CardBody>
		</Card>
	);
};
