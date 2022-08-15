import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '@/Hooks'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'
import CashInIcon from '@/Assets/Svgs/CashReceive.icon'
import CashOutIcon from '@/Assets/Svgs/CashOut.icon'
import chroma from 'chroma-js'


/* 
TODO
=====
[ ] Split cash flow to two components:
    - CashIn
    - CashOut
[ ] Add cash flow chart
[ ] Add cash flow list
*/
const HomeContainer = () => {
  const { Colors, MetricsSizes, Fonts, Gutters } = useTheme()
  const { t } = useTranslation()

  return (
    <React.Fragment>
      <View style={[homeStyle.bannerHero, { backgroundColor: Colors.primary }]}>
        <SafeAreaView style={[{ paddingHorizontal: 24, paddingTop: 12 }]}>
          <View>
            <Text style={[Fonts.h5]}>{t("home.greeting")}</Text>
            <Text style={[Fonts.h5]}>{t('home.say', { time: t('time.day') })}</Text>
          </View>
          <View style={{ marginTop: MetricsSizes.small }}>
            <Text style={[Fonts.titleRegular]}>Rp. 10.000.000</Text>
          </View>
        </SafeAreaView>
        <View style={[{ position: "absolute", width: "100%", flex: 1, top: 180 }]}>
          <View style={[{ marginHorizontal: 24, padding: 16, backgroundColor: Colors.white, borderRadius: 12, display: 'flex', flexDirection: "row" }]}>

            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "50%", paddingRight: 12 }}>
              <RoundIconRocket type='in' />
              <View style={[{ marginLeft: 12 }]}>
                <Text style={[Fonts.bodyXSmall, { color: "rgba(33, 37, 41, 0.5)" }]}>{t('home.cashIn')}</Text>
                <Text style={[Fonts.bodySmall]}>Rp. 1.000.000</Text>
              </View>
            </View>

            <View style={[homeStyle.verticalsLine]} />

            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "50%", paddingLeft: 12 }}>
              <RoundIconRocket type='out' />
              <View style={[{ marginLeft: 12 }]}>
                <Text style={[Fonts.bodyXSmall, { color: "rgba(33, 37, 41, 0.5)" }]}>{t('home.cashOut')}</Text>
                <Text style={[Fonts.bodySmall]}>- Rp. 1.000.000</Text>
              </View>
            </View>


          </View>
        </View>
      </View>
    </React.Fragment>
  )
}



const RoundIconRocket = (props: { type: "in" | "out" }) => {
  const color: string = props.type === "in" ? useTheme().Colors.success : useTheme().Colors.error
  const icon: JSX.Element = props.type === "in" ? <CashInIcon color={color} /> : <CashOutIcon color={color} />
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

const homeStyle = StyleSheet.create({
  bannerHero: {
    width: "100%",
    height: 220,
  },

  verticalsLine: {
    height: '100%',
    width: 1.2,
    backgroundColor: "rgba(225, 225, 225, 1)",
  }

})

export default HomeContainer