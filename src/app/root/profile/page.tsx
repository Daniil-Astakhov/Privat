"use client";

import { useWindowSize } from "@uidotdev/usehooks";
import ProfileDesktop from "@/components/widgets/profileDesktop/ui/ProfileDesktop";
import ProfileMobile from "@/components/widgets/profileMobile/ui/ProfileMobile";

const ProfileAppPage = (): JSX.Element => {
	const size = useWindowSize();

	return (
		<>
			{size.width !== null && size?.width >= 1024 && <ProfileDesktop />}
			{size.width !== null && size?.width < 1024 && <ProfileMobile />}
		</>
	);
};

export default ProfileAppPage;
