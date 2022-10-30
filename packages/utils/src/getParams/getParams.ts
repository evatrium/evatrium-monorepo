import { isWeb } from '~/isWeb';

/**
 * retrieves location.search params and converts them into an object
 * @param string
 */
export const getParams = (string?: string) =>
	Object.fromEntries(new URLSearchParams(string || (isWeb() ? location.search : '')));
