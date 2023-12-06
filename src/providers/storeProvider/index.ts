import { StoreProvider } from "./ui/StoreProvider";
import type { StateSchema } from "./config/StateSchema";
import { createReduxStore } from "./config/store";
import type { AppDispatch } from "./config/store";
import { useAppDispatch, useAppSelector } from "./config/hooks";

export {
	StoreProvider,
	createReduxStore,
	StateSchema,
	AppDispatch,
	useAppDispatch,
	useAppSelector,
};
