import React, { useEffect } from "react";
import { Canvas, Circle, Easing, Group, runTiming, useValue } from "@shopify/react-native-skia";
import { useTheme } from "@/Hooks";
import { PixelRatio, Pressable, StyleSheet, Text, View } from "react-native";
import { DonutSkiaChart } from "@/Components";
import { navigator } from "@/Navigators";
import { useNavigation } from "@react-navigation/native";


const radius = PixelRatio.roundToNearestPixel(130);
const STROKE_WIDTH = 12;

const SkiaContainer = () => {
  // const size = 256;
  // const r = size * 0.5;
  const { Colors, Common, Gutters } = useTheme()

  const targetPercentage = 85 / 100;
  const animationState = useValue(0);
  const navigate = useNavigation()


  const handleBack = () => {
    navigate.goBack()
  }

  useEffect(() => {
    runTiming(animationState, targetPercentage, {
      duration: 1250,
      easing: Easing.inOut(Easing.cubic),
    });
  }, [animationState, targetPercentage])

  return (
    <View style={styles.container}>
      <View style={styles.ringChartContainer}>
        <DonutSkiaChart
          backgroundColor={Colors.primary}
          radius={radius}
          strokeWidth={STROKE_WIDTH}
          percentageComplete={animationState}
          targetPercentage={targetPercentage}
        />
      </View>
      <Pressable onPress={handleBack} style={[Gutters.largeTMargin, Common.button.rounded]}>
        <Text style={styles.buttonText}>Back</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ringChartContainer: {
    width: radius * 2,
    height: radius * 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default SkiaContainer