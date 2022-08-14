/**
 * This file contains all application's style relative to fonts
 */
import { StyleSheet } from 'react-native'
import { ThemeVariables } from './theme'

export default function ({ FontSize, Colors }: ThemeVariables) {

  const baseTypography = StyleSheet.create({
    h1: {
      fontSize: FontSize.xLarge,
      lineHeight: 44,
    },
    h2: {
      fontSize: FontSize.large,
      lineHeight: 40,
    },
    h3: {
      fontSize: FontSize.semiLarge,
      lineHeight: 36,
    },
    h4: {
      fontSize: FontSize.xMedium,
      lineHeight: 32,
    },
    h5: {
      fontSize: FontSize.medium,
      lineHeight: 28,
    },
    h6: {
      fontSize: FontSize.semiMedium,
      lineHeight: 24,
    },
    bodyLarge: {
      fontSize: FontSize.semiMedium,
      lineHeight: 28,
    },
    bodyRegular: {
      fontSize: FontSize.regular,
      lineHeight: 24,
    },
    bodySmall: {
      fontSize: FontSize.small,
      lineHeight: 20,
    },
    bodyXSmall: {
      fontSize: FontSize.xSmall,
      lineHeight: 16,
    },

  })

  // Main typography styles
  return StyleSheet.create({
    ...baseTypography,
    textSmall: {
      ...baseTypography.bodySmall,
      color: Colors.text,
    },
    textRegular: {
      ...baseTypography.bodyRegular,
      color: Colors.text,
    },
    textLarge: {
      ...baseTypography.bodyLarge,
      color: Colors.text,
    },
    titleSmall: {
      ...baseTypography.h6,
      fontWeight: 'bold',
      color: Colors.text,
    },
    titleRegular: {
      ...baseTypography.h3,
      fontWeight: 'bold',
      color: Colors.text,
    },
    titleLarge: {
      ...baseTypography.h2,
      fontWeight: 'bold',
      color: Colors.text,
    },

    textCenter: {
      textAlign: 'center',
    },
    textJustify: {
      textAlign: 'justify',
    },
    textLeft: {
      textAlign: 'left',
    },
    textRight: {
      textAlign: 'right',
    },
  })
}
