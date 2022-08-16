import React from 'react'
import { View, Image } from 'react-native'
import { useTheme } from '@/Hooks'
import Animated from 'react-native-reanimated'

type Props = {
  height?: number | string
  width?: number | string
  mode?: 'contain' | 'cover' | 'stretch' | 'repeat' | 'center'
  style?: View['props']['style'][]
  imageStyle?: Image['props']['style'][]
}

const Brand = ({ height, width, mode, style = [], imageStyle = [] }: Props) => {
  const { Layout, Images } = useTheme()

  return (
    <Animated.View style={[{ height, width }, ...style]}>
      <Animated.Image style={[Layout.fullSize, ...imageStyle]} source={Images.logo} resizeMode={mode} />
    </Animated.View>
  )
}

Brand.defaultProps = {
  height: 200,
  width: 200,
  mode: 'contain',
}

export default Brand
