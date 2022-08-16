import * as React from "react"
import Svg, {
  SvgProps,
  G,
  Rect,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const MainAddIcon = (props: SvgProps) => (
  <Svg
    width={92}
    height={92}
    fill="none"
    {...props}
  >
    <G filter="url(#a)">
      <Rect
        x={15}
        y={15}
        width={62}
        height={62}
        rx={31}
        fill="#FCD201"
        // shapeRendering="crispEdges"
      />
      <Rect
        x={15}
        y={15}
        width={62}
        height={62}
        rx={31}
        fill="url(#b)"
        // shapeRendering="crispEdges"
      />
      <Path
        d="M58 46H34M46 34v24"
        stroke="#fff"
        strokeWidth={4}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <LinearGradient
        id="b"
        x1={85.5}
        y1={77}
        x2={46}
        y2={38.5}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FCA701" />
        <Stop offset={1} stopColor="#FCA701" stopOpacity={0} />
      </LinearGradient>
    </Defs>
  </Svg>
)

export default MainAddIcon
