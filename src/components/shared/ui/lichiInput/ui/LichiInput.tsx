import React, {
	forwardRef,
	InputHTMLAttributes,
	FC,
	useState,
	ChangeEvent,
	Ref,
} from "react";
import styles from "./lichiInput.module.sass";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	placeholder?: string;
	endContent?: JSX.Element | null;
}

const LichiInput: FC<InputProps> = forwardRef(
	(props, ref: Ref<HTMLInputElement>): JSX.Element => {
		const { label, endContent = null, type, placeholder = "", ...rest } = props;
		const [inputContent, setInputContent] = useState<string>("");

		const handleInputContent = (e: ChangeEvent<HTMLInputElement>) =>
			setInputContent(e.target.value);

		return (
			<div className={styles.inputWrapper}>
				<input
					ref={ref}
					onChange={handleInputContent}
					value={inputContent || ""}
					aria-label={label}
					className={styles.input}
					type={type}
					placeholder={placeholder}
					{...rest}
				/>
				<label
					className={`${styles.label} ${
						inputContent.length >= 1 ? null : styles.activeLabel
					}`}
					htmlFor="input"
				>
					{label}
				</label>
				{endContent && <div className={styles.endContent}>{endContent}</div>}
			</div>
		);
	}
);

export default LichiInput;
