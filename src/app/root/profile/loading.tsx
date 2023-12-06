"use client";

import LichiLoader from "@/components/shared/ui/lichiLoader/ui/LichiLoader";

const Loading = (): JSX.Element => {
	return (
		<div className="w-full h-full flex justify-center items-center">
			<LichiLoader />
		</div>
	);
};

export default Loading;
