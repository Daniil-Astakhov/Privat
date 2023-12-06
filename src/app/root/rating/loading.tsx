import LichiLoader from "@/components/shared/ui/lichiLoader/ui/LichiLoader";

const Loading = (): JSX.Element => {
	return (
		<div className="w-full h-full flex items-center justify-center ">
			<LichiLoader />
		</div>
	);
};

export default Loading;
