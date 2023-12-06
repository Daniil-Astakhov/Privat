import { StateSchema } from "@/providers/storeProvider";

export const getName = (state: StateSchema): any => state.profile.name;

export const getLastname = (state: StateSchema): any => state.profile.lastname;
