import { FC } from "react";
import styles from "./validationMessage.module.sass";

const ValidationMessage: FC<{ message: string }> = (props): JSX.Element => {
	const { message } = props;
	return <p className={styles.message}>{message}</p>;
};

export default ValidationMessage;
