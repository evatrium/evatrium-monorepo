import { Obj, ObjArr } from '~/types';
import { isFunc } from '~/isType/isFunc';

/**
 * Categorizes objects into groups
 * @param objArr
 * @param getGroupNameFromObj - string or function to extract the group name from the item
 * @param shouldGroup - validates the group name
 * @returns [
 * 	groups = {
 * 	  [key: groupName]: ObjArr
 * 	},
 * 	others: ObjArr
 * ]
 *
 *
 * @example
 *
 * const movies = [
 * 	{ genre: "comedy", name: "idiocracy" },
 * 	{ genre: "scifi", name: "ex machina" },
 * 	{ genre: "scifi", name: "the matrix" },
 * 	{ name: "the revenant" }
 * ];
 *
 * const [groups, others] = groupObjArrByProp(
 * 	movies,
 * 	"genre" // or pass a function: (movie) => movie.genre ? capitalize(movie.genre): false
 * );
 *
 * console.log(
 * 	groups,
 * 	others
 * );
 *
 * // groups: (object: grouped on key)
 * {
 *   "comedy": [
 *     {
 *       "genre": "comedy",
 *       "name": "idiocracy"
 *     }
 *   ],
 *   "scifi": [
 *     {
 *       "genre": "scifi",
 *       "name": "ex machina"
 *     },
 *     {
 *       "genre": "scifi",
 *       "name": "the matrix"
 *     },
 *   ]
 * }
 *
 * // others: array
 * [
 *   {
 *     "name": "the revenant"
 *   }
 * ]
 */
export const groupObjArrByProp = (
	objArr: ObjArr,
	getGroupNameFromObj: string | ((item: Obj) => string),
	shouldGroup = (groupName: string) => !!groupName
) => {
	const groups: Obj = {};
	const others: ObjArr = [];
	objArr.forEach((item: Obj) => {
		const groupName = isFunc(getGroupNameFromObj)
			? getGroupNameFromObj(item)
			: item[getGroupNameFromObj];
		const shouldGroupIt = shouldGroup(groupName);
		(shouldGroupIt ? groups[groupName] || (groups[groupName] = []) : others).push(item);
	});
	return [groups, others];
};
