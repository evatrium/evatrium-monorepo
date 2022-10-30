/**
 * check if an object or function has keys
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const hasKeys = (objOrFunc: object | Function): boolean => {
	for (const key in objOrFunc)
		if (Object.prototype.hasOwnProperty.call(objOrFunc, key)) return true;
	return false;
};
