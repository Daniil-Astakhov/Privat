import { useWindowSize } from "@uidotdev/usehooks";
import MobileFooter from "./mobileFooter/ui/MobileFooter";
import DesktopFooter from "./desktopFooter/ui/DesktopFooter";

const Footer = (): JSX.Element => {
	const size = useWindowSize();
	const { width } = size;

	const isSizeNull = width === null;
	return (
		<>
			{!isSizeNull && width < 1024 && <MobileFooter />}
			{!isSizeNull && width >= 1024 && <DesktopFooter />}
		</>
	);
};

export default Footer;
