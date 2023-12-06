import RegistrationDrawer from "@/components/features/Auth/Registration/registrationDrawer/ui/RegistrationDrawer";
import styles from "./desktopFooter.module.sass";

const DesktopFooter = (): JSX.Element => {
	return (
		<footer className={styles.footer}>
			<div className={styles.dropdownWrapper}>
				<RegistrationDrawer />
			</div>
		</footer>
	);
};

export default DesktopFooter;
