import React, { FC } from 'react';

import {
  Canvas,
  Path,
  SkFont,
  Skia,
  SkiaMutableValue,
  Text,
} from '@shopify/react-native-skia';
import { StyleSheet, View } from 'react-native';

interface CircularProgressProps {
  strokeWidth: number;
  radius: number;
  backgroundColor: string;
  percentageComplete: SkiaMutableValue<number>;
  targetPercentage: number;
  // font: SkFont;
  // smallerFont: SkFont;
}

const DonutSkiaChart: FC<CircularProgressProps> = ({
  strokeWidth,
  radius,
  percentageComplete,
  targetPercentage,
  // font,
  // smallerFont,
  ...props
}) => {
  const innerRadius = radius - strokeWidth / 2;
  const targetText = `${targetPercentage * 100}`;

  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);

  // const width = font.getTextWidth(targetText);
  // const titleWidth = smallerFont.getTextWidth('Power');

  return (
    <View style={styles.container}>
      <Canvas style={styles.container}>
        <Path
          path={path}
          color={props.backgroundColor}
          style="stroke"
          strokeJoin="round"
          strokeWidth={strokeWidth}
          strokeCap="round"
          start={0}
          end={percentageComplete}
        />
        {/* <Text
          x={innerRadius - width / 2}
          y={radius + strokeWidth}
          text={targetText}
          // font={font}
          // size={32}
          opacity={percentageComplete}
        /> */}
        {/* <Text
          x={innerRadius - titleWidth / 2}
          y={radius + 45}
          text={'Power'}
          font={smallerFont}
          size={32}
          opacity={percentageComplete}
        /> */}
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DonutSkiaChart;