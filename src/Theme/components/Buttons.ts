import { StyleSheet } from 'react-native'
import { CommonParams } from '@/Theme/theme'

export default function <C>({ Colors, Gutters, Layout }: CommonParams<C>) {
  const base = {
    ...Layout.center,
    ...Gutters.largeHPadding,
    paddingVertical:12,
    backgroundColor: Colors.primary,
  }

  const rounded = {
    ...base,
    borderRadius: 20,
  }

  const roundedDisable = {
    ...rounded,
    backgroundColor: Colors.btnDisable,
  }

  return StyleSheet.create({
    base,
    rounded,
    roundedDisable,
    outline: {
      ...base,
      backgroundColor: Colors.transparent,
      borderWidth: 2,
      borderColor: Colors.primary,
    },
    outlineRounded: {
      ...rounded,
      backgroundColor: Colors.transparent,
      borderWidth: 2,
      borderColor: Colors.primary,
    },
  })
}
