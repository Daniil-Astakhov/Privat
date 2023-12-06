import { useDispatch } from "react-redux";
import { AppDispatch } from "@/providers/storeProvider";

export const useAppDispatch = (): any => useDispatch<AppDispatch>();
