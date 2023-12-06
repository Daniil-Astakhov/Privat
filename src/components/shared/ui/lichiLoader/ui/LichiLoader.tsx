"use client";

import { motion } from "framer-motion";
import { animationOpacity } from "@/components/shared/styles/motion/animation";
import styles from "./lichiLoader.module.sass";

const LichiLoader = (): JSX.Element => {
	return (
		<motion.div
			{...animationOpacity}
			transition={{ duration: 0.5 }}
			className={styles.ldsRing}
		>
			<div />
			<div />
			<div />
			<div />
		</motion.div>
	);
};

export default LichiLoader;
