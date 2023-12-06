/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const updateDepartments = (state: any, data: any) => {
	if (data !== undefined) {
		for (let i = 0; i < data.length; i += 1) {
			state[i].value = data[i].ID;
			state[i].title = data[i].NAME;
			state[i].children = data[i].child;
			delete state[i].ID;
			delete state[i].NAME;
			delete state[i].SORT;
			delete state[i].PARENT;
			delete state[i].UF_HEAD;
			if (data[i].children.length > 0) {
				// state[i].selectable = false;
				updateDepartments(state[i].children, data[i].child);
			} else {
				state[i].isLeaf = true;
			}
		}
	}
};
