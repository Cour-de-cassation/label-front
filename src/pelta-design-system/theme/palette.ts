import { colorType, constantColorType, displayModeType, shadeColorType } from './types';

import {
  blue,
  blueGrey,
  brown,
  cyan,
  deepOrange,
  deepPurple,
  green,
  grey,
  indigo,
  lightBlue,
  lightGreen,
  lime,
  orange,
  pink,
  purple,
  red,
  teal,
  yellow,
} from '@mui/material/colors';

export { emphasizeShadeColor, getColor, getShadeColor };

const COLORS: { [color in constantColorType]: string } = {
  black: '#000000',
  white: '#FFFFFF',
};

const shadeColors: {
  [color in shadeColorType[0]]: { [shade: string]: string };
} = {
  blue,
  blueGrey,
  brown,
  cyan,
  deepOrange,
  deepPurple,
  green,
  grey,
  indigo,
  lightBlue,
  lightGreen,
  lime,
  orange,
  pink,
  purple,
  red,
  teal,
  yellow,
};

function emphasizeShadeColor(color: colorType, displayMode: displayModeType): string {
  if (typeof color === 'string') {
    switch (color) {
      case 'black':
        return 'white';
      case 'white':
        return 'black';
    }
  } else {
    const [tint] = color;

    switch (displayMode) {
      case 'darkMode':
        return getShadeColor([tint, '100']);
      case 'lightMode':
        return getShadeColor([tint, '900']);
    }
  }
}

function getColor(color: colorType): string {
  if (typeof color === 'string') {
    return COLORS[color];
  } else {
    return getShadeColor(color);
  }
}

function getShadeColor(shadeColor: shadeColorType): string {
  const [tint, shade] = shadeColor;
  return shadeColors[tint][shade];
}
