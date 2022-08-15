import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { HomeContainer, StartupContainer } from '@/Containers'
import { useTheme } from '@/Hooks'
import { navigationRef } from './utils'
import { MAIN_TAB, ROUTE_PATH } from '@/Routers'
import MainNavigator from './Main'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

const Stack = createStackNavigator()
// const AnimatedStackScreen = Animated.createAnimatedComponent(Stack.Screen)

// @refresh reset
const ApplicationNavigator = () => {
  const { darkMode, NavigationTheme, Colors } = useTheme()

  return (
    <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
      {/* <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} /> */}
      <StatusBar barStyle={'dark-content'} />
      <Stack.Navigator
        screenOptions={{ cardStyle: { backgroundColor: Colors.white }, }}
      >
        <Stack.Screen name={ROUTE_PATH.STARTUP} component={StartupContainer} options={{ headerShown: false }} />
        <Stack.Screen
          name={ROUTE_PATH.MAIN}
          component={HomeContainer}
          options={{
            headerShown: false,
            animationEnabled: false,
          }}
        />
        {/* <Stack.Screen
          name={'Home'}
          component={MainNavigator}
          options={{
            headerShown: false,
            // animationEnabled: false,
            presentation: "modal"
          }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default ApplicationNavigator
