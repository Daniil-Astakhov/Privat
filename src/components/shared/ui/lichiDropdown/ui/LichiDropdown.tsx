import { useHover } from "@uidotdev/usehooks";
import { FC, ReactNode, useEffect, useState } from "react";
import { arrow } from "@/components/shared/styles/icons";
import styles from "./lichiDropdown.module.sass";

interface LichiDropdownType {
	label: string;
	options: Array<ReactNode>;
	position?: "top" | "bottom";
	className?: string;
}

const LichiDropdown: FC<LichiDropdownType> = (props): JSX.Element => {
	const { label, options = [], className = "", position = "bottom" } = props;
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [ref, hovering] = useHover<HTMLDivElement>();

	useEffect(() => {
		if (hovering) {
			setIsOpen(true);
		} else {
			setIsOpen(false);
		}
	}, [hovering]);

	return (
		<div className={styles.wrapper} ref={ref}>
			<div
				className={`${styles.selectWrapper} ${
					isOpen && styles.activeSelectWrapper
				} ${className}`}
			>
				<div>
					<p className={styles.label}>{label}</p>
				</div>
				{arrow({
					color: "#71717A",
					className: `${styles.arrow} ${isOpen && styles.rotate}`,
				})}
			</div>
			{isOpen && (
				<div className={`${styles.options} ${styles[position]}`}>
					{options?.map((option, index) => (
						<div key={index} className={styles.option}>
							{option}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default LichiDropdown;
