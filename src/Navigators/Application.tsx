import React from 'react'
import { StatusBar } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { HomeContainer, StartupContainer } from '@/Containers'
import { useTheme } from '@/Hooks'
import { navigationRef } from './utils'
import { ROUTE_PATH } from '@/Routers'

const Stack = createStackNavigator()

// @refresh reset
const ApplicationNavigator = () => {
  const { darkMode, NavigationTheme, Colors } = useTheme()

  return (
    <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
      <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
      <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: Colors.white }, }} >
        <Stack.Screen name={ROUTE_PATH.STARTUP} component={StartupContainer} />
        <Stack.Screen
          name={ROUTE_PATH.MAIN}
          component={HomeContainer}
          options={{
            headerShown: false,
            animationEnabled: false,
          }}
        />
        {/* <Stack.Screen
          name={ROUTE_PATH.MAIN}
          component={MainNavigator}
          options={{
            headerShown: false,
            animationEnabled: false,
          }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default ApplicationNavigator
