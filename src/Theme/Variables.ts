/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

/**
 * Colors
 */
export const Colors = {
  // Example colors:
  transparent: 'rgba(0,0,0,0)',
  inputBackground: '#FFFFFF',
  white: '#ffffff',
  text: '#212529',
  primary: '#FCD205',
  success: '#16D24B',
  error: '#F34D18',
  borderColor: "#E1E1E1",
  textOpacity: "rgba(33, 37, 41, 0.5)"
}

export const NavigationColors = {
  primary: Colors.primary,
  background: Colors.primary,
}

/**
 * FontSize
 */
export const FontSize = {
  xSmall: 12,
  small: 14,
  regular: 16,
  semiMedium: 18,
  medium: 20,
  xMedium: 24,
  semiLarge: 28,
  large: 32,
  xLarge: 36,
}

/**
 * Metrics Sizes
 */
const tiny = 6 // 6
const small = tiny * 2 // 12
const regular = tiny * 3 // 18
const large = regular * 2 // 30
export const MetricsSizes = {
  tiny,
  small,
  regular,
  large,
}

export default {
  Colors,
  NavigationColors,
  FontSize,
  MetricsSizes,
}
