import { View, Text, StyleSheet, StatusBar, Platform, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent, StyleProp, ViewStyle, Button } from 'react-native'
import React, { useEffect, useMemo, useRef } from 'react'
import { useTheme } from '@/Hooks'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'
import { CashReceiveIcon, CashOutIcon, MainAddIcon } from '@/Assets/Svgs'
import chroma from 'chroma-js'
import { dayOrNight, moneyFormatter } from '@/Helpers'
import { Colors } from '@/Theme/Variables'
import { navigator } from '@/Navigators'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, useValue } from 'react-native-reanimated'
import { mainLog, monthList, toGroupLogs } from '@/Dummies'


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
[ ] Add animation on top when scroll
[ ] Change to flat list for approach better performance
[ ] fix scroll month snap
*/

const RAW_BANNER_HEIGHT = 220
const IS_ANDROID = Platform.OS === 'android'
const STATUS_BAR_HEIGHT = IS_ANDROID ? StatusBar.currentHeight || 0 : 0
const BANNER_HEIGHT = IS_ANDROID ? RAW_BANNER_HEIGHT - STATUS_BAR_HEIGHT - 4 : Platform.OS === "ios" ? RAW_BANNER_HEIGHT : RAW_BANNER_HEIGHT
const PADDING_TOP = IS_ANDROID ? 24 : 12
const ABSOLUTE_TOP = IS_ANDROID ? 150 : 184
// const CONTAINER_PADDING = 16
const BALANCE_TOP = IS_ANDROID ? 72 : 98
const CALCULATION_BOTTOM = IS_ANDROID ? 48 : 44
const SCROLLED_BALANCE_TOP = IS_ANDROID ? 56 - STATUS_BAR_HEIGHT : 56
const SCROLLED_BALANCE_HERO_HEIGHT = IS_ANDROID ? 128 - STATUS_BAR_HEIGHT : 128
const ON_SCROLL_TOP = 42
const MONTH_TOP = IS_ANDROID ? 292 - STATUS_BAR_HEIGHT : 292
const MONTH_TOP_SCROLLED = SCROLLED_BALANCE_HERO_HEIGHT - 20
const MONTH_START_Y_POSITION = 184

const HomeContainer = () => {
  const { Colors, Fonts, Common } = useTheme()

  const { t } = useTranslation()

  const scroll = useSharedValue(0)

  const iosStatusbarHeight = useSafeAreaInsets().top

  const stickyViewStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(scroll.value, [0, -1], [0, 1], Extrapolate.EXTEND)
    }
  })

  const onTopHeaderStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scroll.value, [0, ON_SCROLL_TOP, ON_SCROLL_TOP + 14], [0, 0, 1], Extrapolate.CLAMP)
    }
  })

  const onTopHeaderTextStyle = useAnimatedStyle(() => {
    const scrollDownTop = interpolate(scroll.value, [0, ON_SCROLL_TOP], [BALANCE_TOP, SCROLLED_BALANCE_TOP], Extrapolate.CLAMP)
    const scrollUpTop = interpolate(scroll.value, [0, -1], [BALANCE_TOP, BALANCE_TOP + 1], Extrapolate.EXTEND)

    return {
      top: scroll.value > 0 ? scrollDownTop : scrollUpTop
    }
  })

  const onTopMonthListStyle = useAnimatedStyle(() => {
    const scrollDownTop = interpolate(scroll.value, [MONTH_START_Y_POSITION - 1, MONTH_START_Y_POSITION], [MONTH_TOP_SCROLLED - 1, MONTH_TOP_SCROLLED], Extrapolate.CLAMP)
    const scrollUpTop = interpolate(scroll.value, [0, -1], [MONTH_TOP, MONTH_TOP + 1], Extrapolate.EXTEND)

    return {
      top: scroll.value >= MONTH_START_Y_POSITION ? scrollDownTop : scrollUpTop
    }
  })


  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scroll.value = e.contentOffset.y
    }
  })

  const HeaderComp = (
    <Animated.View style={[{ flexGrow: 1 }]} >
      <View style={[homeStyle.bannerHero, { height: BANNER_HEIGHT, backgroundColor: Colors.primary }]}>
        <SafeAreaView style={[Common.container, { paddingTop: PADDING_TOP, height: "100%" }]}>
          <View>
            <Text style={[Fonts.h5]}>
              <Text>{t("home.greeting")}</Text>
              <Text>,&nbsp;</Text>
              <Text>{t('home.say', { time: dayOrNight(new Date) })}</Text>
            </Text>
          </View>

          <View style={[{ flexDirection: "row", position: "absolute", bottom: CALCULATION_BOTTOM, marginHorizontal: 12 }]}>
            <Text style={[{ color: Colors.error }]}>*</Text>
            <Text style={[Fonts.bodyXSmall, { marginLeft: 2, color: chroma(Colors.text).alpha(.5).hex() }]}>
              {t('home.calculationInMonth')}
            </Text>
          </View>
        </SafeAreaView>
        <View style={[{ position: "absolute", zIndex: 2, elevation: 2, width: "100%", flex: 1, top: ABSOLUTE_TOP }]}>
          <View style={[{ marginHorizontal: Common.container.paddingHorizontal, padding: 12, backgroundColor: Colors.white, borderRadius: 12, display: 'flex', flexDirection: "row", }, homeStyle.cashFlow]}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "50%", paddingRight: 12, paddingVertical: 8 }}>
              <RoundIconRocket type='in' />
              <View style={[{ marginLeft: 12 }]}>
                <Text style={[Fonts.bodyXSmall, { color: Colors.textOpacity }]}>{t('home.cashIn')}</Text>
                <Text style={[Fonts.bodySmall]}>Rp. {moneyFormatter(1000000)}</Text>
              </View>
            </View>

            <View style={[homeStyle.verticalsLine]} />

            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "50%", paddingLeft: 12, paddingVertical: 8 }}>
              <RoundIconRocket type='out' />
              <View style={[{ marginLeft: 12 }]}>
                <Text style={[Fonts.bodyXSmall, { color: Colors.textOpacity }]}>{t('home.cashOut')}</Text>
                <Text style={[Fonts.bodySmall]}>- Rp.{moneyFormatter(1000000)}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Content Start */}
      <View style={[Common.container, { paddingTop: 66, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
        <Text style={[Fonts.h6, Fonts.bold]}>
          Catatan
        </Text>
        <TouchableOpacity activeOpacity={.8}>
          <Text style={[Fonts.bodyXSmall, { color: Colors.textOpacity }]}>
            Lihat
          </Text>
        </TouchableOpacity>
      </View>
      {/* Content End */}
    </Animated.View>
  )

  return (
    <React.Fragment>
      <StatusBar backgroundColor={Colors.primary} />
      <View style={{ height: iosStatusbarHeight, position: "absolute", width: "100%", backgroundColor: Colors.primary, zIndex: 1 }} />
      <Animated.View style={[{ position: "absolute", zIndex: 10, width: "100%", backgroundColor: Colors.primary }, stickyViewStyle]} />
      <Animated.View style={[{ position: "absolute", zIndex: 9999, width: "100%", backgroundColor: Colors.primary, height: SCROLLED_BALANCE_HERO_HEIGHT }, onTopHeaderStyle]} />
      <Balance style={[onTopHeaderTextStyle]} />
      {/* List Month start*/}
      <Animated.FlatList
        data={monthList}
        showsHorizontalScrollIndicator={false}
        style={[Common.container, { position: "absolute", borderBottomColor: Colors.borderColor, borderBottomWidth: .8, backgroundColor: Colors.white, paddingVertical: 12, zIndex: 9999, top: BANNER_HEIGHT + 84, marginTop: 16 }, onTopMonthListStyle]}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        renderItem={(item) => (
          <View style={[!item.index ? Common.backgroundPrimary : {}, { borderRadius: 12, paddingHorizontal: 16, paddingVertical: 4 }, item.index === monthList.length - 1 ? { marginRight: 32 } : {}]}>
            <Text style={[!item.index ? Fonts.bold : {}]}>
              {item.item}
            </Text>
          </View>
        )} />
      {/* List Month end */}

      {/* render all home */}
      <Animated.FlatList
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={HeaderComp}
        ListHeaderComponentStyle={{ marginBottom: 56 }}
        onScroll={onScroll}
        data={toGroupLogs(mainLog)}
        renderItem={({ index, item }) => (
          <View key={index} style={[Common.container]}>
            <Text>
              {JSON.stringify(item, null, 2)}
            </Text>
          </View>
        )} />


      {/* Floating Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPressIn={() => navigator.navigate('Skia', { screen: "Skia" })}
        style={[buttonStyle.wrapper]}
      >
        <MainAddIcon />
      </TouchableOpacity>
      {/* Floating Button end*/}
    </React.Fragment>
  )
}



type BalanceProps = {
  style?: StyleProp<Animated.AnimateStyle<StyleProp<ViewStyle>>>
  balance?: number
}

const Balance: React.FC<BalanceProps> = ({ style, balance = 10000000 }) => {
  const { t } = useTranslation()
  const { Fonts, Common } = useTheme()
  return (
    <Animated.View style={[{ position: "absolute", zIndex: 100000 }, Common.container, style]}>
      <Text style={[Fonts.bodyXSmall, Fonts.medium]}>{t('home.yourBalance')}</Text>
      <View style={[{ display: "flex", flexDirection: "row" }]}>
        <Text style={[Fonts.bodyLarge, Fonts.bold]}>Rp. </Text>
        <Text style={[Fonts.titleRegular]}>{moneyFormatter(balance)}</Text>
      </View>
    </Animated.View>
  )
}



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
    paddingVertical: 16,
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



// Icon rounded
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