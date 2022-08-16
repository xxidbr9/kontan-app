import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from '@/Store'
import ApplicationNavigator from '@/Navigators/Application'
import './I18n'
import { useTranslation } from 'react-i18next'
import * as RNLocalize from "react-native-localize";
import RNBootSplash from "react-native-bootsplash";
import { StatusBar, Platform } from 'react-native'
import { Colors } from './Theme/Variables'



const App = () => {

  const { t, i18n } = useTranslation();


  useEffect(() => {
    const locales = RNLocalize.getLocales();
    if (locales.length > 0) i18n.changeLanguage(locales[0].languageCode);

    (async () => {
      await new Promise(res => {
        setTimeout(() => {
          res(true)
          RNBootSplash.hide();
        }, 1000)
      })
    })()

  }, [])

  return (
    <Provider store={store}>
      <StatusBar backgroundColor={Colors.primary} barStyle={"dark-content"} />
      {/**
     * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
     * and saved to redux.
     * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
     * for example `loading={<SplashScreen />}`.
     * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
     */}
      <PersistGate loading={null} persistor={persistor}>
        <ApplicationNavigator />
      </PersistGate>
    </Provider>
  )
}

export default App
