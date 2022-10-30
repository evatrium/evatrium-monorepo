/**
 * converts kebab case to normal case
 * foo-bar => foo bar
 * @param string
 */
export const deKebab = (string = '') => string.split('-').join(' ');
