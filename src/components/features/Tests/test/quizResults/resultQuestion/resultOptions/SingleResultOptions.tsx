import { Radio } from "@nextui-org/react";
import React, { FC } from "react";
import { QuizCorrectType } from "@/components/shared/types/interface";

const SingleResultOptions: FC<{
	option: QuizCorrectType;
}> = ({ option }) => {
	const { text } = option;

	return (
		<Radio value={`${option.id}`} key={option.id}>
			{text}
		</Radio>
	);
};

export default SingleResultOptions;
