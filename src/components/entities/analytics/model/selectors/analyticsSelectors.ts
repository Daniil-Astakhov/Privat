import { StateSchema } from "@/providers/storeProvider";

export const getRating = (state: StateSchema): any => state.analytics.rating;
