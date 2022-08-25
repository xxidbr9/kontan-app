import { PencilIcon } from '@/Assets/Svgs'
import { moneyFormatter } from '@/Helpers'
import { useTheme } from '@/Hooks'
import React, { useEffect, useRef, useState } from 'react'
import { View, Text, TextInput, TouchableWithoutFeedback, Button, Pressable, Platform } from 'react-native'
import CurrencyInput from 'react-native-currency-input'
import { SafeAreaView } from 'react-native-safe-area-context'


/* 
TODO

[ ] split select button for log type
[ ] add logic for storing the new log
[ ] add category type
[ ] constant OS on globals
- [ ] category bottom sheet for create or pick existing ones

*/


const IS_ANDROID = Platform.OS === 'android'

const NewLogContainer = () => {
  const { Common, Fonts, Colors } = useTheme()
  const [moneyValue, setMoneyValue] = useState<number | null>(null)
  const inputMoneyRef = useRef<TextInput>(null)
  const inputDescRef = useRef<TextInput>(null)

  useEffect(() => {
    inputMoneyRef.current?.focus()
  }, [])

  const handleChange = (val: number) => {
    setMoneyValue(val)
  }

  return (
    <React.Fragment>
      <View style={[{ marginVertical: 24 }, Common.container]}>
        <View style={{ flexDirection: "column" }}>
          <Text style={[Fonts.h6, Fonts.medium]}>Jumlah</Text>
          <CurrencyInput
            placeholderTextColor={Colors.textOpacity}
            ref={inputMoneyRef}
            style={[Fonts.h4, Fonts.bold, { marginTop: 12 }]}
            returnKeyType="done"
            selectionColor={Colors.primary}
            placeholder="Rp 0"
            value={moneyValue}
            onChangeValue={handleChange}
            delimiter="."
            prefix='Rp '
            precision={0}
            minValue={0}
          />
        </View>
        <View style={{ flexDirection: "column", marginTop: 32 }}>
          <View style={{ flexDirection: "column" }}>
            <Text style={[Fonts.h6, Fonts.medium,]}>Deskripsi</Text>
            <Text style={[Fonts.bodyXSmall, { marginTop: 4, color: Colors.textOpacity }]}>Apa yang akan kamu catat</Text>
          </View>
          <TouchableWithoutFeedback onPress={() => inputDescRef.current?.focus()}>
            <View style={{ flexDirection: "row", borderRadius: 8, borderWidth: 1.2, borderColor: Colors.borderColor, padding: 12, marginTop: 16 }}>
              <PencilIcon />
              <TextInput
                placeholderTextColor={Colors.textOpacity}
                ref={inputDescRef} selectionColor={Colors.primary} style={[{ marginLeft: 12, padding:0 }]} placeholder="Tulis catatan : Buat makan malam 🍔" />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={{ flexDirection: "column", marginTop: 32 }}>
          <View style={{ flexDirection: "column" }}>
            <Text style={[Fonts.h6, Fonts.medium]}>Jenis catatan</Text>
            <Text style={[Fonts.bodyXSmall, { marginTop: 4, color: Colors.textOpacity }]}>Pilih mana yang ingin kamu catat, penambahan atau pengurangan saldo</Text>
          </View>

          <View style={{ flexDirection: "row", marginTop: 16 }}>
            <TouchableWithoutFeedback onPress={() => inputDescRef.current?.focus()} >
              <View style={[{ width: "auto", paddingVertical: 8, paddingHorizontal: 16, backgroundColor: Colors.primary, borderRadius: 20 }]}>
                <Text style={{ color: Colors.text }}>Tambah saldo +</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => inputDescRef.current?.focus()} >
              <View style={[{ marginLeft: 16, width: "auto", paddingVertical: 8, paddingHorizontal: 16, backgroundColor: Colors.white, borderWidth: 1.2, borderColor: Colors.borderColor, borderRadius: 20 }]}>
                <Text style={{ color: Colors.textOpacity }}>Kurangi saldo -</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>


        </View>
      </View>
      <SafeAreaView style={[{
        width: "100%", position: "absolute", bottom: 16
      }, Common.container]}>
        <Pressable style={[Common.button.rounded]}>
          <Text style={[Fonts.bodyRegular, Fonts.medium]}>Simpan</Text>
        </Pressable>
      </SafeAreaView>
    </React.Fragment>
  )
}

export default NewLogContainer