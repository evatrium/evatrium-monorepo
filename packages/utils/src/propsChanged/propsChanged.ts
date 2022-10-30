/**
 * checks if prev props match the next props
 * given that the number of keys have not changed
 */
export const fixedPropsChanged = (
	prev: Record<string, any>,
	next: Record<string, any>
): boolean => {
	for (const i in next) if (prev[i] !== next[i]) return true;
	return false;
};

/**
 * similar to shallow equal but for objects only
 * checks if number of keys are the same
 * and compares each key value pair for equality "==="
 */
export const propsChanged = (prev: Record<string, any>, next: Record<string, any>): boolean => {
	for (const i in prev) if (!(i in next)) return true;
	return fixedPropsChanged(prev, next);
};
