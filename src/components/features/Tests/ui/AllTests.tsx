/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import {
	animationOpacity,
	animationRocket,
	animationRocketTransition,
} from "@/components/shared/styles/motion/animation";
import { rocket } from "@/components/shared/styles/icons";

import { useAppSelector } from "@/providers/storeProvider";

interface PropsType {
	setModalData: Dispatch<
		SetStateAction<{
			headerData: string;
			bodyData: string;
		}>
	>;
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;
	// setMaterialQuizId: Dispatch<SetStateAction<any>>;
	setMaterialUuid: Dispatch<SetStateAction<any>>;
}

const AllTests: FC<PropsType> = (props): JSX.Element | null => {
	const { setModalData, setIsModalOpen, setMaterialUuid } = props;
	const { t } = useTranslation();
	const [selectedKeys, setSelectedKeys] = useState<any>(["1"]);

	const { educationArray } = useAppSelector((state) => state.education);

	const [hoveredItem, setHoveredItem] = useState<number | null>(null);

	return (
		<motion.div
			{...animationOpacity}
			transition={{
				duration: 0.5,
				stiffness: 0,
				ease: "backInOut",
			}}
			className="w-full max-w-[800px]"
		>
			<Accordion
				className="mb-[20px] px-0"
				variant="shadow"
				itemClasses={{
					base: "py-0 w-full p-0",
					title: "font-normal text-medium ml-[20px]",
					trigger: "",
					indicator: "text-medium mr-[20px]",
					content: " overflow-scroll text-small",
				}}
				// disabledKeys={["3"]}
				selectedKeys={selectedKeys}
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				onSelectionChange={setSelectedKeys}
			>
				<AccordionItem
					key="1"
					aria-label="Accordion 1"
					title={t("Education.Main.toComplete")}
				>
					{educationArray?.map((item: any, index: number) => {
						if (item.isRead && !item.quiz.passed)
							return (
								<motion.div
									className="relative h-[70px] hover:bg-[#FEE7EF] cursor-pointer border-b last:border-b-0 pr-[20px] pl-[20px] transition-colors"
									onClick={() => {
										setModalData({
											headerData: item.title,
											bodyData: t("Education.Main.readLecture"),
										});
										setMaterialUuid(item.quiz.id);
										setIsModalOpen(true);
									}}
									onMouseEnter={() => setHoveredItem(index)}
									onMouseLeave={() => setHoveredItem(null)}
									key={index}
								>
									<div className="flex flex-row w-full h-full items-center justify-between pr-[10px]">
										<span className="text-[15px]">{item.title}</span>
										<motion.span
											initial={{
												y: 0,
												x: 0,
											}}
											animate={
												hoveredItem === index
													? animationRocket
													: {
															y: [0],
															x: [0],
													  }
											}
											transition={animationRocketTransition}
										>
											{rocket({
												color: hoveredItem === index ? "#F31260" : "black",
											})}
										</motion.span>
									</div>
								</motion.div>
							);
					})}
				</AccordionItem>
				<AccordionItem
					key="2"
					aria-label="Accordion 2"
					title={t("Education.Main.passed")}
				>
					{educationArray?.map((item: any, index: number) => {
						if (item.isRead && item.quiz.passed)
							return (
								<div
									className="relative h-[70px] hover:bg-[#FEE7EF] cursor-pointer border-b last:border-b-0 pr-[20px] pl-[20px] transition-colors"
									onClick={() => {
										setModalData({
											headerData: item.title,
											bodyData: t("Education.Main.readLecture"),
										});
										setMaterialUuid(item.quiz.id);
										setIsModalOpen(true);
									}}
									onMouseEnter={() => setHoveredItem(index)}
									onMouseLeave={() => setHoveredItem(null)}
									key={index}
								>
									<div className="flex flex-row w-full h-full items-center justify-between pr-[10px]">
										<span className="text-[15px]">{item.title}</span>
									</div>
								</div>
							);
					})}
				</AccordionItem>
				<AccordionItem
					key="3"
					subtitle={
						<span className="flex flex-row gap-[5px] pl-[20px]">
							<p className="text-[#F31260]">*</p>{" "}
							<p>{t("Education.Main.afterReading")}</p>
						</span>
					}
					aria-label="Accordion 2"
					title={t("Education.Main.unavailable")}
				>
					{educationArray?.map((item: any, index: number) => {
						if (
							(item?.quiz?.passed == 0 || item?.quiz?.passed === null) &&
							(item?.isRead == 0 || item?.isRead === null)
						)
							return (
								<div
									className="relative h-[70px] hover:bg-[#FEE7EF] cursor-pointer border-b last:border-b-0 pr-[20px] pl-[20px] transition-colors"
									// onClick={() => {
									// 	setModalData({
									// 		headerData: item.title,
									// 		bodyData:
									// 			"Для получения возможности пройти этот тест, завершите лекцию.",
									// 	});
									// 	setMaterialUuid(item.quiz.id);
									// 	setIsModalOpen(true);
									// }}
									key={index}
								>
									<div className="flex flex-row w-full h-full items-center justify-between pr-[10px] ">
										<span className="text-[15px]">{item.title}</span>
									</div>
								</div>
							);
					})}
				</AccordionItem>
			</Accordion>
		</motion.div>
	);
};

export default AllTests;
