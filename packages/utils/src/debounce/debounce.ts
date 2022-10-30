export type DebouncedFunc<TFunc extends (this: any, ...args: any[]) => any> = {
	cancel: () => void;
	(this: ThisParameterType<TFunc>, ...args: Parameters<TFunc>): void;
};

/**
 * wraps and returns the provided function in a debounced function and
 * limits the number of times the actual function gets called.
 * Debounce can be canceled by calling yourWrappedDebounceFunc.cancel();
 * @param func - the function you'd like to debounce
 * @param wait - time in milliseconds to debounce
 * @returns - your function wrapped in a debounce
 * @example
 *
 * 	const debouncedPost = debounce(searchApi, 1000);
 *
 * 	debouncedPost('f');
 * 	debouncedPost('fo');
 * 	debouncedPost('foo');
 * 	// calls once if typed under 1000ms
 * 	debouncedPost('f');
 * 	debouncedPost('fo');
 * 	debouncedPost('foo');
 * 	debouncedPost.cancel();
 * 	// cancels call
 *
 */
export function debounce<TFunc extends (this: any, ...newArgs: any[]) => void>(
	func: TFunc,
	wait = 0
): DebouncedFunc<TFunc> {
	let timeout: any;

	function debounced(this: ThisParameterType<TFunc>, ...newArgs: Parameters<TFunc>) {
		const later = () => {
			func.apply(this, newArgs);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	}

	debounced.cancel = () => {
		clearTimeout(timeout);
	};

	return debounced;
}
