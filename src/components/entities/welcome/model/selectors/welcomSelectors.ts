import { StateSchema } from "@/providers/storeProvider";

export const getFormFlag = (state: StateSchema): any =>
	state.welcome.nextStapFormFlag;
