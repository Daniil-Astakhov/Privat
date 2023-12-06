import Image from "next/image";
import styles from "./lichiLogo.module.sass";

const LichiLogo = (): JSX.Element => {
	return (
		<Image
			className={styles.logo}
			src="/academy_main_logo.png"
			alt="main_logo"
			width={92}
			height={106}
		/>
	);
};

export default LichiLogo;
