/* eslint-disable react/jsx-no-useless-fragment */

"use client";

import { motion } from "framer-motion";
import { animationOpacity } from "@/components/shared/styles/motion/animation";
import Footer from "@/components/widgets/footer/Footer";
import Header from "@/components/widgets/header/Header";
import { usePathname } from "next/navigation";

export default function ChildRootLayout({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {
	const pathname = usePathname();
	const visible = pathname === "/registration" || pathname === "/login";

	return (
		<motion.section
			{...animationOpacity}
			transition={{
				duration: 0.5,
				stiffness: 0,
				ease: "backInOut",
			}}
			className="flex flex-col h-[100vh] max-h-[100vh]"
		>
			{visible || (
				<motion.div
					className="relative"
					initial={{
						top: -100,
					}}
					animate={{
						top: 0,
					}}
					transition={{
						duration: 0.8,
						stiffness: 0,
						ease: "backInOut",
					}}
				>
					<Header />
				</motion.div>
			)}
			{children}
			{visible || (
				<motion.div
					className="relative"
					initial={{
						bottom: -100,
					}}
					animate={{
						bottom: 0,
					}}
					transition={{
						duration: 0.8,
						stiffness: 0,
						ease: "backInOut",
					}}
				>
					<Footer />
				</motion.div>
			)}
		</motion.section>
	);
}
