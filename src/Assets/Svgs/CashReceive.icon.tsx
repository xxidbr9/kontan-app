import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const CashInIcon = (props: SvgProps) => (
  <Svg
    width={18}
    height={22}
    fill="none"
    {...props}
  >
    <Path
      d="M11.097 2.322 16.7 13.214c1.041 2.024-.735 4.388-2.77 3.688l-4.22-1.45a2.18 2.18 0 0 0-1.411-.005l-4.228 1.427c-2.04.688-3.802-1.687-2.75-3.704L6.989 2.31c.906-1.736 3.213-1.73 4.109.012Z"
      stroke={props.color || "#16D24B"}
      strokeWidth={1.5}
    />
    <Path
      d="m7.003 16.006 1.778-5.284a.25.25 0 0 1 .474.002l1.748 5.293"
      stroke={props.color || "#16D24B"}
      strokeWidth={1.5}
    />
    <Path
      d="m5.994 19.003-.003 1M11.994 19.02l-.003 1M8.997 18.012l-.009 3"
      stroke={props.color || "#16D24B"}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
)

export default CashInIcon
