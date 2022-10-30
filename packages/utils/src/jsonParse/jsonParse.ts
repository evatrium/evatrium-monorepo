export type JsonParseResults = {
	data: ReturnType<typeof JSON.parse> | undefined;
	error: undefined | Error;
};
/**
 * safe jsonParse wrapped in try catch with predictable return object
 * @returns { data, error }
 */
export const jsonParse = (str: string): JsonParseResults => {
	try {
		return { data: JSON.parse(str), error: undefined };
	} catch (error) {
		return { data: undefined, error: error as Error };
	}
};
