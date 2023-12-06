import { NextUIProvider } from "@nextui-org/react";
import { FC, ReactNode } from "react";

const GlobalProvider: FC<{ children: ReactNode }> = ({
	children,
}): JSX.Element => {
	return <NextUIProvider>{children}</NextUIProvider>;
};

export default GlobalProvider;
