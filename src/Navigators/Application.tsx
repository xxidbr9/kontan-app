import React, { useEffect } from 'react'
import { Image, StatusBar, View, Text, Platform } from 'react-native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { HomeContainer, SkiaContainer, StartupContainer, NewLogContainer } from '@/Containers'
import { useTheme } from '@/Hooks'
import { navigationRef } from './utils'
import { MAIN_TAB, ROUTE_PATH } from '@/Navigators'
import MainNavigator from './Main'
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { BackIcon } from '@/Assets/Svgs'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTiming } from '@shopify/react-native-skia'



/* 
TODO

[ ] split navigation header to separate component
[ ] Animated.View for navigation header
[ ] add translation 


*/
const screenOptionStyle = {
  ...TransitionPresets.SlideFromRightIOS,
}; 

const IS_ANDROID = Platform.OS === 'android'

const Stack = createStackNavigator()

// @refresh reset
const ApplicationNavigator = () => {
  const { darkMode, NavigationTheme, Colors, Fonts, Common } = useTheme()

  return (
    <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
      {/* <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} /> */}
      <StatusBar barStyle={'dark-content'} />
      <Stack.Navigator
        initialRouteName={ROUTE_PATH.STARTUP}
        screenOptions={{ cardStyle: { backgroundColor: Colors.white }, ...screenOptionStyle }}
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
        <Stack.Screen
          name={"Skia"}
          component={SkiaContainer}
        />

        <Stack.Screen
          name={ROUTE_PATH.NEW_LOG}
          component={NewLogContainer}
          options={{
            headerShown: true,
            title: "Catatan baru",
            header: (props) => (
              <React.Fragment>
                <Animated.View
                  style={[
                    {
                      width: "100%",
                      height: IS_ANDROID ? 56 : 96,
                      backgroundColor: Colors.primary,
                    }]}>
                  <View style={[
                    Common.container,
                    {
                      width: "100%",
                      top: IS_ANDROID ? 12 : 56,
                      position: "absolute",
                    }]}>
                    <TouchableWithoutFeedback
                      onPress={props.navigation.goBack}>
                      <BackIcon />
                    </TouchableWithoutFeedback>
                    {props.options.headerRight && (
                      <TouchableWithoutFeedback>
                        <Text>Right</Text>
                      </TouchableWithoutFeedback>
                    )}
                  </View>
                </Animated.View>
                <View style={{ alignSelf: "center", position: "absolute", marginTop: IS_ANDROID ? 12 : 56 }}>
                  <Text style={[Fonts.bodySmall, Fonts.bold]}>{props.options.title}</Text>
                </View>
              </React.Fragment>
            )
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default ApplicationNavigator
