import { isEmpty } from '~/isEmpty';
import { stringifyParams } from '~/stringifyParams';
import { isObj, isObjOrArr } from '~/isType';

/**
 * (experimental)
 * interpolates values in a template tag for building a request object
 * @param strings
 * @param interpolations
 * @example
 *
 *	endpoint`post:foo/${"bar"}?${{ id: 123, group: 1 }} ${{ message: "hello" }}`
 *
 * 	returns {
 * 			method: "POST",
 * 			url: "foo/bar?id=123&group=1",
 * 			search: "id=123&group=1",
 * 			body: JSON.stringify({ message: "hello" })
 * 		}
 *
 */
export const endpoint = (strings: TemplateStringsArray, ...interpolations: any[] | any) =>
	strings.reduce(
		(out, string, i) => {
			let value = interpolations[i];

			if (i === 0) {
				const [method, after] = string.split(':');
				out.method = method.toUpperCase();
				string = after;
			}

			// do we have a body
			if (isObjOrArr(value) && (string.endsWith(' ') || string.endsWith('\n'))) {
				out.body = JSON.stringify(value);
				out.url += string.trim();
				return out;
			}

			// do we have search params
			if (isObj(value)) {
				if (!isEmpty(value)) {
					out.search = value = `${string.endsWith('?') ? '' : '?'}${stringifyParams(value)}`;
				} else value = '';
			} else if (value === undefined) value = '';

			out.url += `${string}${value}`;

			return out;
		},
		{ method: '', url: '', search: '', body: undefined } as Record<string, any>
	);

// @TODO
export type EndpointReturnType = {
	method: 'POST' | 'PUT' | 'PATCH' | 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'CONNECT' | 'TRACE';
	url: string;
	search: string;
	body: string;
};
