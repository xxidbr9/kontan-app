import { PencilIcon } from '@/Assets/Svgs'
import { LoggingType } from '@/Dummies'
import { useTheme } from '@/Hooks'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, TextInput, TouchableWithoutFeedback, Pressable, Alert } from 'react-native'
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



type NewTransactionContainerProps = {
  // transaction: TransactionModel
}

const NewTransactionContainer = (props: NewTransactionContainerProps) => {
  const { Common, Fonts, Colors } = useTheme()
  const [moneyValue, setMoneyValue] = useState<number | null>(null)
  const [desc, setDesc] = useState('')
  const [selectedLogType, setSelectedLogType] = useState<LoggingType | null>(null)

  const isBtnDisabled = useMemo(() => {
    return moneyValue === null || moneyValue === 0 || selectedLogType === null
  }, [moneyValue, selectedLogType])

  const inputMoneyRef = useRef<TextInput>(null)
  const inputDescRef = useRef<TextInput>(null)

  const { t } = useTranslation()

  useEffect(() => {
    inputMoneyRef.current?.focus()
  }, [])


  const storeToDB = useCallback(async () => {
    // props.transaction.addNewTransaction(moneyValue || 0, desc, selectedLogType as string)
  }, [moneyValue, desc, selectedLogType])


  const handleSubmit = () => {
    Alert.alert('Submit', 'Are you sure you want to submit this transaction?', [
      { text: 'OK', onPress: () => storeToDB() },
      { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
    ])
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
            onChangeValue={setMoneyValue}
            delimiter="."
            prefix='Rp '
            precision={0}
            minValue={0}
          />
        </View>
        <View style={{ flexDirection: "column", marginTop: 32 }}>
          <View style={{ flexDirection: "column" }}>
            <Text style={[Fonts.h6, Fonts.medium,]}>{t('newTransaction.description')}</Text>
            <Text style={[Fonts.bodyXSmall, { marginTop: 4, color: Colors.textOpacity }]}>{t('newTransaction.whatNeedWrite')}</Text>
          </View>
          <TouchableWithoutFeedback onPress={() => inputDescRef.current?.focus()}>
            <View style={{ flexDirection: "row", borderRadius: 8, borderWidth: 1.2, borderColor: Colors.borderColor, padding: 12, marginTop: 16 }}>
              <PencilIcon />
              <TextInput
                placeholderTextColor={Colors.textOpacity}
                ref={inputDescRef}
                selectionColor={Colors.primary}
                style={[{ marginLeft: 12, padding: 0 }]}
                placeholder={t("newTransaction.placeholderText")}
                value={desc}
                onChangeText={setDesc}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={{ flexDirection: "column", marginTop: 32 }}>
          <View style={{ flexDirection: "column" }}>
            <Text style={[Fonts.h6, Fonts.medium]}>{t('newTransaction.noteType')}</Text>
            <Text style={[Fonts.bodyXSmall, { marginTop: 4, color: Colors.textOpacity }]}>{t('newTransaction.noteTypeDescription')}</Text>
          </View>

          <View style={{ flexDirection: "row", marginTop: 16 }}>
            {(['expense', 'income'] as LoggingType[]).map((logType, index) => (
              <TouchableWithoutFeedback onPress={() => setSelectedLogType(logType)} key={index}>
                <View style={[{ paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, borderWidth: 1.2 }, !!index ? { marginLeft: 16 } : {}, selectedLogType === logType ? { backgroundColor: Colors.primary, borderColor: Colors.primary } : { borderColor: Colors.borderColor, backgroundColor: Colors.white },]}>
                  {logType === 'income' ?
                    <Text style={{ color: logType === selectedLogType ? Colors.text : Colors.textOpacity }}>{t('newTransaction.income')}</Text>
                    :
                    <Text style={{ color: logType === selectedLogType ? Colors.text : Colors.textOpacity }}>{t('newTransaction.expense')}</Text>
                  }
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>


        </View>
      </View>
      <SafeAreaView style={[{
        width: "100%", position: "absolute", bottom: 16
      }, Common.container]}>
        <Pressable onPress={handleSubmit} style={[isBtnDisabled ? Common.button.roundedDisable : Common.button.rounded]} disabled={isBtnDisabled}>
          <Text style={[Fonts.bodyRegular, Fonts.medium, { color: isBtnDisabled ? Colors.textOpacity : Colors.text }]}>{t('newTransaction.save')}</Text>
        </Pressable>
      </SafeAreaView>
    </React.Fragment>
  )
}



export default NewTransactionContainer