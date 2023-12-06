"use client";

import { motion } from "framer-motion";
import { LoginAppPage } from "@/components/features/Auth/Login/ui/LoginForm";
import { animationOpacity } from "@/components/shared/styles/motion/animation";

export default function Home(): JSX.Element {
	return (
		<motion.div
			className=" flex justify-center items-center w-full h-full"
			{...animationOpacity}
			transition={{ duration: 0.5 }}
		>
			<LoginAppPage />
		</motion.div>
	);
}
