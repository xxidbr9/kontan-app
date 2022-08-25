import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const PencilIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      d="M15.444 3.374c.396-.472 1.044-.585 1.536-.291.65.388 1.364.849 1.853 1.26.481.404 1.033 1.002 1.506 1.554.368.43.368 1.08-.027 1.55L10.157 19.533a2.183 2.183 0 0 1-1.31.76c-.723.12-1.69.265-2.523.337a8.924 8.924 0 0 1-1.055.042 2.522 2.522 0 0 1-.202-.015 2.51 2.51 0 0 1-.05-.197 8.927 8.927 0 0 1-.14-1.046 34.96 34.96 0 0 1-.102-2.543 2.183 2.183 0 0 1 .522-1.421L15.443 3.373ZM4.941 20.633l.006.002a.047.047 0 0 1-.006-.002Zm.168.138a.039.039 0 0 1 .003.005.04.04 0 0 1-.003-.005Z"
      stroke={props.color || "#E1E1E1"}
      strokeWidth={1.4}
    />
    <Path
      d="M14.012 5.733s1.171 1.681 2.194 2.354A57.562 57.562 0 0 0 18.5 9.5"
      stroke={props.color || "#E1E1E1"}
      strokeWidth={1.4}
      strokeLinecap="round"
    />
  </Svg>
)

export default PencilIcon