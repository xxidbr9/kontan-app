import React, { useEffect } from 'react'
import { ActivityIndicator, View, Text } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { Brand, Loading } from '@/Components'
import { setDefaultTheme } from '@/Store/Theme'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import { ROUTE_PATH } from '@/Routers'
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';


const TIMING = 1000
const ANIMATED_TIMING = TIMING - 500
const RUN_TIMING = TIMING - 200

const StartupContainer = () => {
  const { Layout, Gutters, Fonts, Colors } = useTheme()

  const { t } = useTranslation()

  const opacity = useSharedValue(1)
  const scale = useSharedValue(1)

  const animatedOpacity = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, {
        duration: ANIMATED_TIMING,
        easing: Easing.out(Easing.ease),
      })
    }
  })

  const animatedScale = useAnimatedStyle(() => {
    return {
      transform: [{
        scale: withTiming(scale.value, {
          duration: ANIMATED_TIMING,
          easing: Easing.out(Easing.ease),
        })
      }]
    }
  })

  const init = async () => {

    // fetched data from server
    await new Promise(resolve => {
      setTimeout(() => {
        opacity.value = 0
        scale.value = 1.5
      }, RUN_TIMING)

      setTimeout(() => {
        resolve(true)
        navigateAndSimpleReset(ROUTE_PATH.MAIN)
      }, TIMING)
    })

    await setDefaultTheme({ theme: 'default', darkMode: false })
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <Animated.View style={[Layout.fill, Layout.colCenter, { backgroundColor: Colors.primary }, animatedOpacity, animatedScale]}>
      <Brand width={180} height={180} imageStyle={[animatedOpacity]} />
      <View style={{ position: "absolute", bottom: 40, alignItems: "center" }}>
        <Loading />
        <Text style={[Fonts.bodyRegular]}>Kontan</Text>
      </View>
    </Animated.View>

  )
}

export default StartupContainer
