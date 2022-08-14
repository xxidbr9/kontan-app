import React, { useEffect } from 'react'
import { ActivityIndicator, View, Text } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { Brand } from '@/Components'
import { setDefaultTheme } from '@/Store/Theme'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import { ROUTE_PATH } from '@/routers'

const StartupContainer = () => {
  const { Layout, Gutters, Fonts, Colors } = useTheme()

  const { t } = useTranslation()
  
  const init = async () => {
    
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true)
      }, 2000),
    )
    await setDefaultTheme({ theme: 'default', darkMode: false })
    navigateAndSimpleReset(ROUTE_PATH.MAIN)
  }

  useEffect(() => {
    init()
  })

  return (
    <View style={[Layout.fill, Layout.colCenter, { backgroundColor: Colors.primary }]}>
      <Brand width={180} height={180} />
      <View style={{ position: "absolute", bottom: 20 }}>
        {/* <ActivityIndicator size={'large'} style={[Gutters.largeVMargin]} /> */}
        {/* <Text style={Fonts.textCenter}>{t('welcome')}</Text> */}
      </View>
    </View>

  )
}

export default StartupContainer
