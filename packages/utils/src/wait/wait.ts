/**
 * pause execution in the body of an async func
 * @param time - time to wait in milliseconds
 * @example
 *	const myAsyncFunc = async () => {
 * 		const mock = getMock();
 * 		await wait(1000);
 * 		return mock;
 * };
 */
export const wait = (time = 0) => new Promise((r) => setTimeout(r, time));
