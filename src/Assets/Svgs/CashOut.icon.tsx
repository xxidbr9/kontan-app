import * as React from "react"
import Svg, { SvgProps, Rect, Path } from "react-native-svg"

const CashOutIcon = (props: SvgProps) => (
  <Svg
    width={37}
    height={38}
    fill="none"
    {...props}
  >
    <Rect
      y={0.988}
      width={36.046}
      height={36.023}
      rx={18.012}
      fill={props.color || "#F34D18"}
      fillOpacity={0.1}
    />
    <Path
      d="m15.95 27.678-5.604-10.892c-1.041-2.024.735-4.388 2.77-3.688l4.22 1.45c.459.158.951.16 1.411.005l4.228-1.427c2.04-.688 3.802 1.687 2.75 3.704l-5.667 10.86c-.906 1.736-3.212 1.73-4.108-.012Z"
      stroke={props.color || "#F34D18"}
      strokeWidth={1.5}
    />
    <Path
      d="m20.043 13.994-1.778 5.284a.25.25 0 0 1-.474-.002l-1.748-5.293"
      stroke={props.color || "#F34D18"}
      strokeWidth={1.5}
    />
    <Path
      d="m21.052 10.997.003-1M15.052 10.98l.003-1M18.05 11.989l.008-3"
      stroke={props.color || "#F34D18"}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
)

export default CashOutIcon
