/**
 * converts _ to " "
 * @param string
 */
export const deSnake = (string = '') => string.split('_').join(' ');
