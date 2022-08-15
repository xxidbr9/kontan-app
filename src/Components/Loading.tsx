import React from 'react'
import Lottie from 'lottie-react-native';


type LoadingProps = {
  style?: Lottie['props']['style']
}

const Loading = (props: LoadingProps) => {

  return (
    <Lottie resizeMode="cover" style={props.style || { justifyContent: "flex-start", bottom: 0, position: "absolute", width: 156, height: 156 }} source={require('@/Assets/Lottie/loading_animation')} autoPlay loop />
  )
}

export default Loading