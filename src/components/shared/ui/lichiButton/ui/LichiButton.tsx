/* eslint-disable react/button-has-type */
import { FC, ReactNode } from "react";

import styles from "./lichiButton.module.sass";
import LichiLoader from "../../lichiLoader/ui/LichiLoader";

type ButtonStyle = "black" | "whiteBlack" | "whiteGrey" | "borderless";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	label: string | ReactNode;
	buttonStyle?: ButtonStyle;
	isLoading?: boolean;
}

const LichiButton: FC<ButtonProps> = (props): JSX.Element => {
	const {
		buttonStyle = "black",
		label,
		isLoading = false,
		className,
		type,
		...rest
	} = props;

	return (
		<button
			className={`${styles.button} ${styles[buttonStyle]} ${className}`}
			{...rest}
			type={type || "button"}
		>
			{isLoading ? (
				<div className="h-full">
					<LichiLoader />
				</div>
			) : (
				label
			)}
		</button>
	);
};

export default LichiButton;
