import { Dispatch, FC, ReactNode, SetStateAction, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import styles from "./lichiDrawer.module.sass";

const LichiDrawer: FC<{
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	content: ReactNode;
	header?: ReactNode;
}> = (props): JSX.Element => {
	const { isOpen, setIsOpen, header = <div />, content } = props;

	useEffect(() => {
		if (isOpen) {
			disableBodyScroll(document.body, {
				reserveScrollBarGap: true,
				allowTouchMove: () => {
					return true;
				},
			});
		} else {
			clearAllBodyScrollLocks();
		}
	}, [isOpen]);

	return (
		<div>
			{isOpen && (
				<div className={styles.wrapper}>
					<div className={styles.mask} onClick={() => setIsOpen(false)} />
					<motion.div
						className={styles.drawer}
						initial={{ x: "50%" }}
						animate={{ x: "0%" }}
					>
						<div className={styles.drawerHeader}>
							<div className={styles.drawerHeading}>{header}</div>
							<button
								className={styles.closeBtn}
								type="button"
								onClick={() => setIsOpen(false)}
							>
								<Image src="/icons/cross.svg" alt="x" width="16" height="16" />
							</button>
						</div>
						<div className={styles.divider} />
						<div className={styles.drawerBody}>{content}</div>
					</motion.div>
				</div>
			)}
		</div>
	);
};

export default LichiDrawer;
