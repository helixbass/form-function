import colorUtil from 'color'

export type Color = string

export const atOpacity = (opacity: number) => (color: Color): Color =>
  colorUtil(color)
    .fade(1 - opacity)
    .toString()

export default {
  black: '#000000',
  white: '#ffffff',
  peach: '#ffcca5',
  peachLight: '#ffd8bb',
  // blue: '#9cdfe0',
  blue: '#95e7f4',
}
