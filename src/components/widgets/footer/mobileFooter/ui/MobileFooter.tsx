import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import styles from "./mobileFooter.module.sass";

const MobileFooter = (): JSX.Element => {
	const pathname = usePathname();
	const { t } = useTranslation();

	const footerElements = [
		{
			name: "lectures",
			imgLink: "/icons/sort/sort.svg",
			activeImgLink: "/icons/sort/pinkSort.svg",
			label: `${t("Main.lectures")}`,
			to: "/lectures",
		},
		{
			name: "tests",
			imgLink: "/icons/flag/flag.svg",
			activeImgLink: "/icons/flag/pinkFlag.svg",
			label: `${t("Main.tests")}`,
			to: "/tests",
		},
		{
			name: "rating",
			imgLink: "/icons/cup/cup.svg",
			activeImgLink: "/icons/cup/pinkCup.svg",
			label: `${t("Main.rating")}`,
			to: "/rating",
		},
	];

	return (
		<footer className={styles.footer}>
			<nav className={styles.footerNav}>
				{footerElements.map((element, index) => (
					<Link className={styles.element} key={index} href={element.to}>
						<img
							src={
								pathname === element.to
									? element.activeImgLink
									: element.imgLink
							}
							width={23}
							height={23}
							alt={element.label}
						/>
						<p className={`${pathname === element.to && styles.activeElement}`}>
							{element.label}
						</p>
					</Link>
				))}
			</nav>
		</footer>
	);
};

export default MobileFooter;
