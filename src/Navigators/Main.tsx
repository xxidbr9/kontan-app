import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ExampleContainer } from '@/Containers'
import { MAIN_TAB } from '@/Routers/constant'

const Tab = createBottomTabNavigator()

// @refresh reset
const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={MAIN_TAB.HOME}
        component={ExampleContainer}
        options={{
          tabBarIconStyle: { display: 'none' },
          headerShown: false,
          tabBarLabelPosition: 'beside-icon',
        }}
      />
    </Tab.Navigator>
  )
}

export default MainNavigator
