type IsWeb = {
	(): boolean;
	_result?: undefined | boolean;
};
/**
 * checks if we are in a web browser
 */
export const isWeb: IsWeb = () =>
	isWeb._result !== undefined
		? isWeb._result
		: (isWeb._result =
				typeof window !== 'undefined' &&
				typeof window.HTMLElement !== 'undefined' &&
				typeof document !== 'undefined'); // making an assignment in parentheses will also return the result
