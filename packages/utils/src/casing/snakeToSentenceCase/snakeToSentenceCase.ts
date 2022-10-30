import { deSnake } from '~/casing';
import { sentenceCase } from '~/casing';

/**
 * snake_case => Sentence Case
 * @param string
 */
export const snakeToSentenceCase = (string = '') => sentenceCase(deSnake(string));
