"use client";

import { FC, useState } from "react";
import { useClickAway } from "@uidotdev/usehooks";
import Image from "next/image";
import styles from "./lichiSelect.module.sass";

type Option = { label: string; value: string };

interface LichiSelectType {
	label: string;
	className?: string;
	options?: Array<Option>;
}

const LichiSelect: FC<LichiSelectType> = (props): JSX.Element => {
	const { label, options = [], className = "" } = props;
	const [selectedValue, setSelectedValue] = useState<string>("");
	const [selectedLabel, setSelectedLabel] = useState<string>("");
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const ref = useClickAway(() => {
		setIsOpen(false);
	});

	const handleActiveItemClassName = (option: Option): string | null => {
		if (option.label === selectedLabel && option.value === selectedValue)
			return styles.active;
		return null;
	};

	return (
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		<div className={styles.wrapper} ref={ref}>
			<div
				className={`${styles.selectWrapper} ${
					isOpen && styles.activeSelectWrapper
				} ${className}`}
				onClick={() => {
					if (options?.length) {
						setIsOpen((prev) => !prev);
					}
				}}
			>
				<div>
					<p
						className={`${styles.label} ${selectedValue && styles.activeLabel}`}
					>
						{label}
					</p>
					{selectedValue && (
						<div className={styles.selectedOption}>{selectedLabel}</div>
					)}
				</div>
				<div className={`${styles.arrow} ${isOpen && styles.rotate}`}>
					<Image src="/icons/arrow.svg" alt="<" width={25} height={25} />
				</div>
			</div>
			{isOpen && (
				<div>
					{Boolean(options?.length) && (
						<div className={styles.options}>
							{options?.map((option, index) => (
								<div
									key={`${option}-${index}`}
									className={`${styles.option} ${handleActiveItemClassName(
										option
									)}`}
									onClick={() => {
										setSelectedLabel(option.label);
										setSelectedValue(option.value);
										setIsOpen(false);
									}}
								>
									{option.label}
								</div>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default LichiSelect;
