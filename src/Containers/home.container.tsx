import { View, Text, StyleSheet, StatusBar, Platform, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo, useRef } from 'react'
import { useTheme } from '@/Hooks'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'
import { CashReceiveIcon, CashOutIcon, MainAddIcon } from '@/Assets/Svgs'
import chroma from 'chroma-js'
import { dayOrNight, moneyFormatter } from '@/Helpers'
import { Colors } from '@/Theme/Variables'
import { navigator } from '@/Navigators'
import { MAIN_TAB } from '@/Routers'
import { Loading } from '@/Components'
import { ScrollView } from 'react-native-gesture-handler'


/* 
TODO
=====
[ ] Split cash flow to two components:
    - CashIn
    - CashOut
[ ] Add cash flow chart
[ ] Add cash flow list
[ ] Split all component to reusable components
[ ] Split money formatter to reusable components
*/

const RAW_BANNER_HEIGHT = 220
const IS_ANDROID = Platform.OS === 'android'
const STATUS_BAR_HEIGHT = IS_ANDROID ? StatusBar.currentHeight || 0 : 0
const BANNER_HEIGHT = IS_ANDROID ? RAW_BANNER_HEIGHT - STATUS_BAR_HEIGHT - 4 : Platform.OS === "ios" ? RAW_BANNER_HEIGHT : RAW_BANNER_HEIGHT
const PADDING_TOP = IS_ANDROID ? 24 : 12
const ABSOLUTE_TOP = IS_ANDROID ? 150 : 180
const CONTAINER_PADDING = 16


const HomeContainer = () => {
  const { Colors, MetricsSizes, Fonts, Gutters } = useTheme()

  const { t } = useTranslation()


  return (
    <React.Fragment>
      <StatusBar backgroundColor={Colors.primary} />
      <ScrollView scrollEventThrottle={16} onScroll={(event) => console.log(event.nativeEvent)} style={[StyleSheet.absoluteFill, { flex: 1 }]} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={[homeStyle.bannerHero, { height: BANNER_HEIGHT, backgroundColor: Colors.primary }]}>
          <SafeAreaView style={[{ paddingHorizontal: CONTAINER_PADDING, paddingTop: PADDING_TOP }]}>
            <View>
              <Text style={[Fonts.h5]}>{t("home.greeting")}</Text>
              <Text style={[Fonts.h5]}>{t('home.say', { time: dayOrNight(new Date) })}</Text>
            </View>
            <View style={{ marginTop: MetricsSizes.small }}>
              <Text style={[Fonts.titleRegular]}>Rp. {moneyFormatter(10000000)}</Text>
            </View>
          </SafeAreaView>
          <View style={[{ position: "absolute", zIndex: 9, elevation: 9, width: "100%", flex: 1, top: ABSOLUTE_TOP }]}>
            <View style={[{ marginHorizontal: CONTAINER_PADDING, padding: 16, backgroundColor: Colors.white, borderRadius: 12, display: 'flex', flexDirection: "row", }, homeStyle.cashFlow]}>

              <View style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "50%", paddingRight: 12 }}>
                <RoundIconRocket type='in' />
                <View style={[{ marginLeft: 12 }]}>
                  <Text style={[Fonts.bodyXSmall, { color: "rgba(33, 37, 41, 0.5)" }]}>{t('home.cashIn')}</Text>
                  <Text style={[Fonts.bodySmall]}>Rp. {moneyFormatter(1000000)}</Text>
                </View>
              </View>

              <View style={[homeStyle.verticalsLine]} />

              <View style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "50%", paddingLeft: 12 }}>
                <RoundIconRocket type='out' />
                <View style={[{ marginLeft: 12 }]}>
                  <Text style={[Fonts.bodyXSmall, { color: "rgba(33, 37, 41, 0.5)" }]}>{t('home.cashOut')}</Text>
                  <Text style={[Fonts.bodySmall]}>Rp. - {moneyFormatter(1000000)}</Text>
                </View>
              </View>


            </View>
          </View>
        </View>
      </ScrollView>
      {/* Floating Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPressIn={() => navigator.navigate('Skia', { screen: "Skia" })}
        style={[buttonStyle.wrapper]}
      >
        <MainAddIcon />
      </TouchableOpacity>
    </React.Fragment>
  )
}



const RoundIconRocket = (props: { type: "in" | "out" }) => {
  const color: string = props.type === "in" ? useTheme().Colors.success : useTheme().Colors.error
  const icon: JSX.Element = props.type === "in" ? <CashReceiveIcon color={color} /> : <CashOutIcon color={color} />
  const backgroundColor: string = chroma(color).alpha(.1).hex()

  return (
    <View style={[iconStyle.wrapper, { backgroundColor }]}>
      {icon}
    </View>
  )
}

const iconStyle = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 24,
    width: 36,
    height: 36
  }
})

const buttonStyle = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 62,
    position: 'absolute',
    bottom: 40,
    height: 62,
    borderRadius: 100,

    shadowOffset: {
      height: 0,
      width: 0
    },
    shadowOpacity: .2,
    shadowRadius: 16,
    shadowColor: Colors.primary,
    elevation: 20,
  }
})

const homeStyle = StyleSheet.create({
  bannerHero: {
    width: "100%",
  },

  verticalsLine: {
    height: '100%',
    width: 1.2,
    backgroundColor: "rgba(225, 225, 225, 1)",
  },

  cashFlow: {
    shadowOffset: {
      height: 0,
      width: 4
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowColor: "rgb(33, 37, 41)",
    elevation: 3,

    // box- shadow: 0px 4px 16px rgba(33, 37, 41, 0.1);
    // border- radius: 12px;
  }

})

export default HomeContainer