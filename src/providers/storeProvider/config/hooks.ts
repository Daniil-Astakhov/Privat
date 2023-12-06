import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./interfaces";
import { StateSchema } from "..";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector;
