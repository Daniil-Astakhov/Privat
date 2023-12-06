"use client";

import { ScrollShadow } from "@nextui-org/react";
import { useWindowSize } from "@uidotdev/usehooks";
import "@/app/globals.css";
import styles from "@/app/pages.module.sass";

export default function LecturesLayout({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {
	const size = useWindowSize();

	const isSizeNull = size?.width === null;

	return (
		<ScrollShadow size={5} className="w-[100%] h-[100%]">
			{!isSizeNull && (
				<main id="lectures_wrap" className={styles.main}>
					{children}
				</main>
			)}
		</ScrollShadow>
	);
}
