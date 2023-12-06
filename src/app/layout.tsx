"use client";

// import type { Metadata } from "next";
import { StoreProvider } from "../providers/storeProvider";
import GlobalProvider from "./provider";

// export const metadata: Metadata = {
// 	title: "Lichi Academy",
// 	description: "Welcome to Lichi Academy",
// };

// eslint-disable-next-line consistent-return

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {
	return (
		<html lang="en">
			<body className="h-[100vh] max-h-[100vh]">
				<GlobalProvider>
					<StoreProvider>{children}</StoreProvider>
				</GlobalProvider>
			</body>
		</html>
	);
}
