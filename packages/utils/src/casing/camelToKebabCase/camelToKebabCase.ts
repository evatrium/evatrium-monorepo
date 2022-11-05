/**
 * convert camelCase to kebab-case
 * asdf
 * @param str
 */
export const camelToKebabCase = (str: string) =>
  str.replace(/[A-Z]/g, (word: string) => '-' + word.toLowerCase());
