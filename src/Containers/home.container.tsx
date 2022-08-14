import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '@/Hooks'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'

const HomeContainer = () => {
  const { Colors, MetricsSizes, Fonts, Gutters } = useTheme()
  const { t } = useTranslation()

  return (
    <React.Fragment>
      <View style={[homeStyle.bannerHero, { backgroundColor: Colors.primary }]}>
        <SafeAreaView style={[{ paddingHorizontal: 24, paddingTop: 0 }]}>
          <View>
            <Text style={[Fonts.h5]}>{t("home.greeting")}</Text>
            <Text style={[Fonts.h5]}>{t('home.say', { time: t('time.day') })}</Text>
          </View>
          <View style={{ marginTop: MetricsSizes.small }}>
            <Text style={[Fonts.titleRegular]}>Rp. 10.000.000</Text>
          </View>
        </SafeAreaView>
        <View style={[{ position: "absolute", width: "100%", flex: 1, top: 180 }]}>
          <View style={[{ marginHorizontal: 24, padding: 16, backgroundColor: Colors.white, borderRadius: 12 }]}>
            <Text style={[Fonts.textRegular]}>Rp. 10.000.000</Text>
          </View>
        </View>
      </View>
    </React.Fragment>
  )
}



const homeStyle = StyleSheet.create({
  bannerHero: {
    width: "100%",
    height: 220,
  }
})

export default HomeContainer