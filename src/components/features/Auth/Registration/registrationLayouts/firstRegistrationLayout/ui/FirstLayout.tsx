/* eslint-disable @typescript-eslint/ban-ts-comment */

"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useWindowSize } from "@uidotdev/usehooks";
import { getFormFlag } from "@/components/entities/welcome/model/selectors/welcomSelectors";
import welcomeSlice from "@/components/entities/welcome/model/slice/welcomeSlice";
import { useAppDispatch } from "@/components/shared/hooks/useAppDispatch";
import { useAppSelector } from "@/providers/storeProvider";
import styles from "../../registrationLayouts.module.sass";

// eslint-disable-next-line no-warning-comments

const FirstLayout = (): JSX.Element => {
	const [name, setName] = useState<any>("");
	const [windowH, setWindowH] = useState<number | undefined | null>();
	const next = useAppSelector(getFormFlag);
	const size = useWindowSize();
	const { jobTitlesArray } = useAppSelector((state) => state.profile);
	const { t } = useTranslation();

	const dispatch = useAppDispatch();
	const [lastname, setLastname] = useState<any>("");
	const [job, setJob] = useState();
	const [middlename, setMiddlename] = useState<any>("");
	const [age, setAge] = useState<any>("");

	useEffect(() => {
		if (size) setWindowH(size.height);
	}, [size]);

	const style = {
		inputWrapper: "bg-[#fff0] border-[1px]",
		helperWrapper: "absolute bottom-[-23px] right-0",
		label: "text-#F31260",
	};

	const validateNames = (value: any, typeValid: any) => {
		if (typeValid === "name") {
			if (name === "") return true;
			if (name) return /^[\p{L}]+$/u.test(value);
		}
		if (typeValid === "lastname") {
			if (lastname === "") return true;
			if (lastname) return /^[\p{L}]+$/u.test(value);
		}
		if (typeValid === "middlename") {
			if (middlename === "") return true;
			if (middlename) return /^[\p{L}]+$/u.test(value);
		}
		if (typeValid === "age") {
			if (age === "") return true;
			if (age)
				return /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/.test(value);
		}
		return null;
	};

	const isInvalid = (data: any, type: any): boolean | undefined => {
		if (data === "") return false;

		return !validateNames(data, type);
	};

	useEffect(() => {
		dispatch(welcomeSlice.actions.setNextStapFormFlag({ ...next, 1: true }));
		if (
			/^[\p{L}]+$/u.test(name) &&
			/^[\p{L}]+$/u.test(lastname) &&
			/^[\p{L}]+$/u.test(middlename) &&
			/^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/.test(age) &&
			job
		) {
			dispatch(welcomeSlice.actions.setNextStapFormFlag({ ...next, 1: false }));
		} else {
			dispatch(welcomeSlice.actions.setNextStapFormFlag({ ...next, 1: true }));
		}
	}, [job, age, name, lastname, middlename]);

	const handleInputChange = (event: string) => {
		const inputValue = event;

		// Оставляем только цифры
		const numericValue = inputValue.replace(/\D/g, "");

		// Добавляем точки в нужные позиции
		let formattedValue = numericValue;
		if (numericValue.length >= 2) {
			formattedValue = `${numericValue.slice(0, 2)}.${numericValue.slice(2)}`;
		}
		if (numericValue.length >= 4) {
			formattedValue = `${formattedValue.slice(0, 5)}.${formattedValue.slice(
				5
			)}`;
		}

		// Ограничиваем длину
		const limitedValue = formattedValue.slice(0, 10);

		// Устанавливаем значение в состояние
		setAge(limitedValue);
	};

	return (
		<div className="w-full">
			<div className={styles.inputsWrapper}>
				<motion.div
					animate={{
						// @ts-ignore
						height: `${windowH >= 677 ? "56px" : "47px"}`,
					}}
					transition={{
						duration: 0.7,
						stiffness: 0,
						ease: "backInOut",
					}}
					className="flex justify-center w-full"
				>
					<Input
						// @ts-ignore
						isInvalid={isInvalid}
						onChange={(e: any) => setName(e.target.value)}
						errorMessage={
							isInvalid(name, "name") && t("Register.ErrorMessage.name")
						}
						className="relative w-full max-w-[400px] h-full bg-[#fff0]"
						classNames={{ ...style }}
						type="text"
						name="name"
						label={t("Register.Placeholder.name")}
					/>
				</motion.div>
				<motion.div
					animate={{
						// @ts-ignore
						height: `${windowH >= 677 ? "56px" : "47px"}`,
					}}
					transition={{
						duration: 0.7,
						stiffness: 0,
						ease: "backInOut",
					}}
					className="flex justify-center w-full"
				>
					{" "}
					<Input
						// @ts-ignore
						isInvalid={isInvalid}
						errorMessage={
							isInvalid(lastname, "lastname") &&
							t("Register.ErrorMessage.lastname")
						}
						className="relative w-full max-w-[400px]"
						classNames={{ ...style }}
						type="text"
						name="lastname"
						label={t("Register.Placeholder.lastname")}
						onChange={(e: any) => setLastname(e.target.value)}
					/>
				</motion.div>
				<motion.div
					animate={{
						// @ts-ignore
						height: `${windowH >= 677 ? "56px" : "47px"}`,
					}}
					transition={{
						duration: 0.7,
						stiffness: 0,
						ease: "backInOut",
					}}
					className="flex justify-center w-full"
				>
					<Input
						// @ts-ignore
						isInvalid={isInvalid}
						errorMessage={
							isInvalid(middlename, "middlename") &&
							t("Register.ErrorMessage.middlename")
						}
						className="relative w-full max-w-[400px]"
						classNames={{ ...style }}
						type="text"
						name="middlename"
						label={t("Register.Placeholder.middlename")}
						onChange={(e: any) => setMiddlename(e.target.value)}
					/>
				</motion.div>
				<motion.div
					animate={{
						// @ts-ignore
						height: `${windowH >= 677 ? "56px" : "47px"}`,
					}}
					transition={{
						duration: 0.7,
						stiffness: 0,
						ease: "backInOut",
					}}
					className="flex justify-center w-full"
				>
					<Input
						// @ts-ignore
						isInvalid={isInvalid}
						errorMessage={
							isInvalid(age, "age") && t("Register.ErrorMessage.birthday")
						}
						className="relative w-full max-w-[400px]"
						classNames={{ ...style }}
						type="text"
						name="age"
						value={age}
						label={t("Register.Placeholder.birthday")}
						placeholder="DD/MM/YYYY"
						onChange={(e: any) => handleInputChange(e.target.value)}
					/>
				</motion.div>
				<motion.div
					animate={{
						// @ts-ignore
						height: `${windowH >= 677 ? "56px" : "47px"}`,
					}}
					transition={{
						duration: 0.7,
						stiffness: 0,
						ease: "backInOut",
					}}
					className="flex justify-center w-full"
				>
					<Select
						name="job_id"
						label={t("Register.Main.jobTitle")}
						placeholder={t("Register.Placeholder.title")}
						className="relative h-full w-full max-w-[400px]"
						classNames={{ mainWrapper: "h-full", trigger: "h-full" }}
						onChange={(e: any) => setJob(e.target.value)}
					>
						{jobTitlesArray?.map((item: any) => (
							<SelectItem key={item.id} value={item.id}>
								{item.title}
							</SelectItem>
						))}
					</Select>
				</motion.div>
			</div>
		</div>
	);
};

export default FirstLayout;
