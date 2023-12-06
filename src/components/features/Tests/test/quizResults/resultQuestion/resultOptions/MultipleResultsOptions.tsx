import React, { FC } from "react";
import { Checkbox } from "@nextui-org/react";
import { QuizCorrectType } from "@/components/shared/types/interface";

const MultipleResultOptions: FC<{
	option: QuizCorrectType;
}> = ({ option }) => {
	const { text } = option;

	return (
		<Checkbox value={`${option.id}`} key={option.id}>
			{text}
		</Checkbox>
	);
};

export default MultipleResultOptions;
