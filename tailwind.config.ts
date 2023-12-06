/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable func-names */
import type { Config } from "tailwindcss";

import { nextui } from "@nextui-org/react";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			screens: {
				// minMobile: "425px",
				minMobile: "320px",
				minTablet: "768px",
				minPc: "1024px",
				maxMobile: { max: "424px" },
				maxTablet: { max: "767px" },
				maxPc: { max: "1023px" },
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
				arrow: "url('/icons/arrow.svg')",
			},
			colors: {
				main: "#dbdbdb",
				customText: "#FF0000",
				borderBlack: "#ffffff21",
				blackColor: "#171717",
				greyColor: "#A1A1AA",
				disabledColor: "#DBDBDB",
				greenColor: "#18CA65",
				pinkColor: "#F31260",
				darkPinkColor: "#CC0A4E",
				yellowColor: "#FFB864",
				whiteColor: "#FFFFFF",
			},
			top: {
				dv10: "10dvh",
			},
			fontSize: {
				xxs: "12px",
				xs: "13px",
				s: "14px",
				m: "15px",
				l: "16px",
				xl: "17px",
				xxl: "18px",
				h1Size: "20px",
			},
			width: {
				logo: "500px",
				dw: "100dvw",
			},
			height: {
				dv100: "100dvh",
				dv80: "80dvh",
				dv70: "70dvh",
				dv10: "10dvh",
			},
			minHeight: {
				"1/2": "50%",
				"1/3": "33%",
				"1/4": "25%",
				"1/5": "20%",
				"1/6": "16%",
				"1/10": "10%",
				"1/12": "8%",
				"1/20": "5%",
			},
			boxShadow: {
				lichiShadow:
					"0px 4px 15px 0px #00000008 0px 2px 30px 0px #00000005 0px 0px 1px 0px #00000033",
			},
		},
		darkMode: "class",
	},

	darkMode: "class",
	plugins: [nextui()],
};
export default config;
