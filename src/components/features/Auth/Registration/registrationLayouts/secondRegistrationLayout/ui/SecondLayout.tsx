/* eslint-disable @typescript-eslint/ban-ts-comment */

import { useTranslation } from "react-i18next";
import { useWindowSize } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import { Input, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/providers/storeProvider";
import { getFormFlag } from "@/components/entities/welcome/model";
import welcomeSlice from "@/components/entities/welcome/model/slice/welcomeSlice";
import {
	CitiesType,
	CountriesType,
	ShopsType,
} from "@/components/shared/types/interface";
import styles from "../../registrationLayouts.module.sass";
import { fetchCities } from "../../../../../../entities/welcome/model/actions/cities";
import { fetchShops } from "../../../../../../entities/welcome/model/actions/shops";

// eslint-disable-next-line no-warning-comments
// TODO: Parse cities and shops from backend

// const cities = [
// 	{
// 		label: "Санкт-Петербург",
// 		value: 1,
// 	},
// 	{
// 		label: "Москва",
// 		value: 2,
// 	},
// 	{
// 		label: "Сочи",
// 		value: 3,
// 	},
// ];

// const shops = [
// 	{
// 		label: "Галерея",
// 		value: 1,
// 	},
// 	{
// 		label: "МореМолл",
// 		value: 2,
// 	},
// 	{
// 		label: "Атриум",
// 		value: 3,
// 	},
// ];

const SecondLayout = (): JSX.Element => {
	const [phone, setPhone] = useState<any>("");
	const [validPhone, setValidPhone] = useState<any>("");
	const [email, setEmail] = useState<any>("");
	const [windowH, setWindowH] = useState<number | undefined | null>();
	const [country, setCountry] = useState<any>("");
	const [phoneMasNum, setPhoneMasNum] = useState();
	const [city, setCity] = useState<any>("");
	const [shop, setShop] = useState<any>("");

	const dispatch = useAppDispatch();
	const size = useWindowSize();
	const { t } = useTranslation();

	useEffect(() => {
		if (size) setWindowH(size.height);
	}, [size]);

	const phoneMask = (countryID: any) => {
		switch (countryID) {
			case "1":
				return "+7";
			case "2":
				return "+7";
			case "3":
				return "+971";
			case "4":
				return "+974";
			case "5":
				return "+48";
			default:
				return "";
		}
	};

	useEffect(() => {
		setValidPhone(`${phoneMasNum}${phone}`.replace(/\D/g, ""));
	}, [phone]);

	const next = useAppSelector(getFormFlag);
	// const { countries } = useAppSelector((state) => state.welcome);
	const { countries, cities, shops } = useAppSelector((state) => state.welcome);

	useEffect(() => {
		// @ts-ignore
		if (country) setPhoneMasNum(phoneMask(country));
		setPhone("");
	}, [country]);

	const validateNames = (value: any, typeValid: any) => {
		if (typeValid === "phone") {
			if (phone === "") return true;
			if (phone)
				return /^\+?\d{1,4}[-. ]?\(?\d{1,5}\)?[-. ]?\d{1,5}[-. ]?\d{1,5}[-. ]?$/.test(
					value
				);
		}
		if (typeValid === "email") {
			if (email === "") return true;
			if (email) return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
		}
		if (typeValid === "shop") {
			if (shop === "") return true;
			if (shop) return /^[0-9]+$/.test(value);
		}
		if (typeValid === "country") {
			if (country === "") return true;
			if (country) return /^[0-9]+$/.test(value);
		}
		if (typeValid === "city") {
			if (city === "") return true;

			if (city) return /^[0-9]+$/.test(value);
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
			/^\+?\d{1,4}[-. ]?\(?\d{1,5}\)?[-. ]?\d{1,5}[-. ]?\d{1,5}[-. ]?$/.test(
				phone
			) &&
			/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) &&
			/^[0-9]+$/.test(shop) &&
			/^[0-9]+$/.test(country) &&
			/^[0-9]+$/.test(city)
		) {
			dispatch(welcomeSlice.actions.setNextStapFormFlag({ ...next, 2: false }));
		} else {
			dispatch(welcomeSlice.actions.setNextStapFormFlag({ ...next, 2: true }));
		}
	}, [city, phone, email, country, shop]);

	const style = {
		inputWrapper: "bg-[#fff0] border-[1px]",
		helperWrapper: "absolute bottom-[-23px] right-0",
		label: "text-pinkColor",
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
					className="flex flex-col items-center justify-center w-full"
				>
					<input
						type="text"
						value={country}
						name="country_id"
						onChange={() => {}}
						className="h-0"
					/>
					<Autocomplete
						// @ts-ignore
						isInvalid={isInvalid}
						defaultItems={countries.map((countryData: CountriesType) => {
							return {
								label: countryData.name,
								value: countryData.id,
							};
						})}
						errorMessage={isInvalid(country, "country") && "Страна не найдена"}
						className="relative w-full max-w-[400px]"
						type="text"
						label={t("Register.Placeholder.country")}
						selectedKey={country}
						onSelectionChange={setCountry}
					>
						{(item: any) => (
							<AutocompleteItem
								key={item.value}
								value={item.value}
								onClick={() =>
									dispatch(fetchCities({ country_id: item.value }))
								}
							>
								{item.label}
							</AutocompleteItem>
						)}
					</Autocomplete>
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
					className="flex flex-col items-center justify-center w-full"
				>
					<input
						type="text"
						value={city}
						name="city_id"
						onChange={() => {}}
						className="h-0"
					/>
					<Autocomplete
						// @ts-ignore
						isInvalid={isInvalid}
						// defaultItems={cities}
						defaultItems={cities.map((cityData: CitiesType) => {
							return {
								label: cityData.name,
								value: cityData.id,
							};
						})}
						errorMessage={isInvalid(city, "city") && "Некоректный Город"}
						className="relative w-full max-w-[400px]"
						type="text"
						name="city_id"
						label={t("Register.Placeholder.city")}
						selectedKey={city}
						onSelectionChange={setCity}
					>
						{(item: any) => (
							<AutocompleteItem
								key={item.value}
								value={item.value}
								onClick={() => dispatch(fetchShops({ city_id: item.value }))}
							>
								{item.label}
							</AutocompleteItem>
						)}
					</Autocomplete>
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
					className="flex flex-col items-center justify-center w-full"
				>
					<input
						type="text"
						value={shop}
						name="shop_id"
						onChange={() => {}}
						className="h-0"
					/>
					<Autocomplete
						// @ts-ignore
						isInvalid={isInvalid}
						// defaultItems={shops}
						defaultItems={shops.map((shopData: ShopsType) => {
							return {
								label: shopData.name,
								value: shopData.shop_id,
							};
						})}
						errorMessage={isInvalid(shop, "shop") && "Некоректный Магазин"}
						className="relative w-full max-w-[400px]"
						type="text"
						name="shop_id"
						label={t("Register.Placeholder.shop")}
						selectedKey={shop}
						onSelectionChange={setShop}
					>
						{(item: any) => (
							<AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
						)}
					</Autocomplete>
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
					className="flex flex-col justify-center items-center w-full"
				>
					<input
						type="tel"
						className="h-0"
						value={validPhone}
						onChange={() => {}}
						name="phone"
					/>
					<Input
						// @ts-ignore
						isInvalid={isInvalid}
						onChange={(e: any) => setPhone(e.target.value)}
						errorMessage={
							isInvalid(phone, "phone") && t("Register.ErrorMessage.phone")
						}
						disabled={country <= 0}
						className="relative w-full max-w-[400px]  bg-[#fff0]"
						classNames={style}
						type="tel"
						label={t("Register.Main.phone")}
						startContent={
							<div className="pointer-events-none flex items-center">
								<span className="text-default-400 text-small">
									{phoneMask(country)}
								</span>
							</div>
						}
						endContent={
							<div className="pointer-events-none w-full h-full flex items-center">
								{country ? null : (
									<span className="text-[#F31260] text-small">
										{t("Register.Placeholder.chooseCountry")}
									</span>
								)}
							</div>
						}
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
							isInvalid(email, "email") && t("Register.ErrorMessage.email")
						}
						className="relative  max-w-[400px] w-full"
						classNames={style}
						type="email"
						name="email"
						label={t("Register.Placeholder.email")}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</motion.div>
			</div>
		</div>
	);
};

export default SecondLayout;
