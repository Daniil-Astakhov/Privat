/* eslint-disable react/destructuring-assignment */
import { motion } from "framer-motion";
import FirstLayout from "@/components/features/Auth/Registration/registrationLayouts/firstRegistrationLayout/ui/FirstLayout";
import SecondLayout from "@/components/features/Auth/Registration/registrationLayouts/secondRegistrationLayout/ui/SecondLayout";
import { useEffect } from "react";
import { useAppDispatch } from "@/providers/storeProvider";
import { fetchLanguages } from "@/components/entities/welcome/model/actions/languages";

interface Open {
	open: string | number;
}

const RegistrationForm = (open: Open): JSX.Element => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchLanguages());
	}, []);

	const setFirstPosition = (num: number | string): number | null | string => {
		if (num === 1) return 0;
		if (num === 2) return 100;
		return 0;
	};

	return (
		<motion.div
			// eslint-disable-next-line react/destructuring-assignment
			animate={
				open.open ? { x: `-${setFirstPosition(open.open)}%` } : { x: "0%" }
			}
			transition={{
				duration: 0.7,
				stiffness: 0,
				ease: "backInOut",
			}}
			className="absolute flex flex-row justify-center items-center gap-[100%] w-full h-full "
		>
			<motion.div className="absolute w-full left-[0%]">
				<FirstLayout />
			</motion.div>
			<motion.div className="absolute w-full left-[100%]">
				<SecondLayout />
			</motion.div>
		</motion.div>
	);
};

export default RegistrationForm;
