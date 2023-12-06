import { Dispatch, FC, ReactNode, SetStateAction } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { arrow } from "@/components/shared/styles/icons";
import styles from "./lichiCollapse.module.sass";

interface LichiCollapseProps {
	label: string;
	options: Array<ReactNode>;
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	endContent?: ReactNode;
	className?: string;
	warning?: ReactNode;
}

const LichiCollapse: FC<LichiCollapseProps> = (props): JSX.Element => {
	const { label, options, endContent, className, warning, isOpen, setIsOpen } =
		props;

	// eslint-disable-next-line no-unneeded-ternary

	return (
		<div className={`${styles.collapseWrapper} ${className}`}>
			<section
				className={styles.collapseHeader}
				onClick={() => setIsOpen((prev) => !prev)}
			>
				<div>
					<h2 className={styles.label}>{label}</h2>
					{warning && isOpen && (
						<div className={styles.warningWrapper}>
							<Image src="/icons/asterisk.svg" alt="*" width={7} height={7} />
							<p className={styles.warning}>{warning}</p>
						</div>
					)}
				</div>
				{arrow({
					color: "#71717A",
					className: isOpen ? styles.rotatedArrow : "",
				})}
			</section>
			{isOpen && (
				<motion.div
					initial={{ y: "-10%" }}
					animate={{ y: "0%" }}
					exit={{ y: "-10%" }}
					className={styles.collapseBody}
				>
					<ul className={styles.elementsList}>
						{options?.map((option, index) => (
							<li key={index} className={styles.element}>
								<div className={styles.option}>{option}</div>
								<div className={styles.endContent}>{endContent}</div>
							</li>
						))}
					</ul>
				</motion.div>
			)}
		</div>
	);
};

export default LichiCollapse;
