import { PercentColorType, ProgressPercentColorType } from "../types/interface";

export const arr = [
	"Алармы, этикетки и pos-материалы для интернет заказов",
	"Этапы продаж. Презентация товара",
	"Виды коммуникации внутри компании",
	"Организация рабочего процесса",
	"Внешний вид сотрудника Lichi",
	"Уход за товаром",
	"Основные правила снижения краж",
];

export const defaultModalData = { headerData: "", bodyData: "" };

export const isFinalConverter: Record<number, boolean> = {
	0: false,
	1: true,
};

export const handlePercentColor = (percent: number): PercentColorType => {
	if (percent <= 33) {
		return "red";
	}
	if (percent > 33 && percent <= 66) {
		return "yellow";
	}
	if (percent > 66) {
		return "green";
	}
	return "black";
};

export const handleProgressPercentColor = (
	percent: number
): ProgressPercentColorType => {
	if (percent <= 33) {
		return "redProgress";
	}
	if (percent > 33 && percent <= 66) {
		return "yellowProgress";
	}
	if (percent > 66) {
		return "greenProgress";
	}
	return "blackProgress";
};

export const phoneMasks: Record<string, string> = {
	Россия: "+7",
	Qatar: "+974",
	"United Arab Emirates": "+971",
};
