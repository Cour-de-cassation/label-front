import { range } from 'lodash';

const A_ASCII_CODE = 65;

export function convertTextIntoCharCode(text: string) {
  return parseInt(
    range(text.length)
      .map((_, index) => text.toUpperCase().charCodeAt(index) - A_ASCII_CODE + 1)
      .join(''),
    10,
  );
}
