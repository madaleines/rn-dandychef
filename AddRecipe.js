// import React from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, Slider } from 'react-native';
// import { RNCamera, TextDetector } from 'react-native-camera';
// import RNMlKit from 'react-native-firebase-mlkit';
//
//
// const flashModeOrder = {
//   off: 'on',
//   on: 'auto',
//   auto: 'torch',
//   torch: 'off',
// };
//
// const wbOrder = {
//   auto: 'sunny',
//   sunny: 'cloudy',
//   cloudy: 'shadow',
//   shadow: 'fluorescent',
//   fluorescent: 'incandescent',
//   incandescent: 'auto',
// };
//
// export default class CameraScreen extends React.Component {
//   state = {
//     flash: 'off',
//     zoom: 0,
//     autoFocus: 'on',
//     depth: 0,
//     type: 'back',
//     whiteBalance: 'auto',
//     ratio: '16:9',
//   };
//
//   toggleFacing() {
//     this.setState({
//       type: this.state.type === 'back' ? 'front' : 'back',
//     });
//   }
//
//   toggleFlash() {
//     this.setState({
//       flash: flashModeOrder[this.state.flash],
//     });
//   }
//
//   toggleWB() {
//     this.setState({
//       whiteBalance: wbOrder[this.state.whiteBalance],
//     });
//   }
//
//   toggleFocus() {
//     this.setState({
//       autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
//     });
//   }
//
//   zoomOut() {
//     this.setState({
//       zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
//     });
//   }
//
//   zoomIn() {
//     this.setState({
//       zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
//     });
//   }
//
//   setFocusDepth(depth) {
//     this.setState({
//       depth,
//     });
//   }
//
//   takePicture = async function() {
//     if (this.camera) {
//       const options = { quality: 0.5, base64: true, skipProcessing: true, forceUpOrientation: true };
//        const data = await this.camera.takePictureAsync(options);
//        // for on-device (Supports Android and iOS)
//        const deviceTextRecognition = await RNMlKit.deviceTextRecognition(data.uri);
//        console.log('Text Recognition On-Device', deviceTextRecognition);
//        // for cloud (At the moment supports only Android)
//        const cloudTextRecognition = await RNMlKit.cloudTextRecognition(data.uri);
//        console.log('Text Recognition Cloud', cloudTextRecognition);
//     }
//   };
//
//
//   renderCamera() {
//     return (
//       <RNCamera
//         ref={ref => {
//           this.camera = ref;
//         }}
//         style={{
//           flex: 1,
//         }}
//         type={this.state.type}
//         flashMode={this.state.flash}
//         autoFocus={this.state.autoFocus}
//         zoom={this.state.zoom}
//         whiteBalance={this.state.whiteBalance}
//         ratio={this.state.ratio}
//         focusDepth={this.state.depth}
//         permissionDialogTitle={'Permission to use camera'}
//         permissionDialogMessage={'We need your permission to use your camera phone'}
//       >
//         <View
//           style={{
//             flex: 0.5,
//             backgroundColor: 'transparent',
//             flexDirection: 'row',
//             justifyContent: 'space-around',
//           }}
//         >
//           <TouchableOpacity style={styles.flipButton} onPress={this.toggleFacing.bind(this)}>
//             <Text style={styles.flipText}> FLIP </Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.flipButton} onPress={this.toggleFlash.bind(this)}>
//             <Text style={styles.flipText}> FLASH: {this.state.flash} </Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.flipButton} onPress={this.toggleWB.bind(this)}>
//             <Text style={styles.flipText}> WB: {this.state.whiteBalance} </Text>
//           </TouchableOpacity>
//         </View>
//         <View
//           style={{
//             flex: 0.4,
//             backgroundColor: 'transparent',
//             flexDirection: 'row',
//             alignSelf: 'flex-end',
//           }}
//         >
//           <Slider
//             style={{ width: 150, marginTop: 15, alignSelf: 'flex-end' }}
//             onValueChange={this.setFocusDepth.bind(this)}
//             step={0.1}
//             disabled={this.state.autoFocus === 'on'}
//           />
//         </View>
//         {this.state.zoom !== 0 && (
//           <Text style={[styles.flipText, styles.zoomText]}>Zoom: {this.state.zoom}</Text>
//         )}
//         <View
//           style={{
//             flex: 0.1,
//             backgroundColor: 'transparent',
//             flexDirection: 'row',
//             alignSelf: 'flex-end',
//           }}
//         >
//           <TouchableOpacity
//             style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
//             onPress={this.zoomIn.bind(this)}
//           >
//             <Text style={styles.flipText}> + </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
//             onPress={this.zoomOut.bind(this)}
//           >
//             <Text style={styles.flipText}> - </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.flipButton, { flex: 0.25, alignSelf: 'flex-end' }]}
//             onPress={this.toggleFocus.bind(this)}
//           >
//             <Text style={styles.flipText}> AF : {this.state.autoFocus} </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.flipButton, styles.picButton, { flex: 0.3, alignSelf: 'flex-end' }]}
//             onPress={this.takePicture.bind(this)}
//           >
//             <Text style={styles.flipText}> SNAP </Text>
//           </TouchableOpacity>
//         </View>
//       </RNCamera>
//     );
//   }
//
//   render() {
//     return <View style={styles.container}>{this.renderCamera()}</View>;
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 10,
//     backgroundColor: '#000',
//   },
//   flipButton: {
//     flex: 0.3,
//     height: 40,
//     marginHorizontal: 2,
//     marginBottom: 10,
//     marginTop: 20,
//     borderRadius: 8,
//     borderColor: 'white',
//     borderWidth: 1,
//     padding: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   flipText: {
//     color: 'white',
//     fontSize: 15,
//   },
//   zoomText: {
//     position: 'absolute',
//     bottom: 70,
//     zIndex: 2,
//     left: 2,
//   },
//   picButton: {
//     backgroundColor: 'darkseagreen',
//   },
// });
//
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Dimensions, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Svg, { Rect, G, Text as SVGText } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

type Props = {};

type State = {
  canDetectText: boolean,
};

export default class AddRecipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textBlocks: [],
    };
  }

  textRecognized = object => {
    const { textBlocks } = object;
    this.setState({ textBlocks });
  };

  setRef = ref => () => (this.camera = ref);

  renderBlock = textBlock => (
    <G key={textBlock.value + textBlock.bounds.origin.x}>
      <Rect
        x={textBlock.bounds.origin.x}
        y={textBlock.bounds.origin.y}
        width={textBlock.bounds.size.width}
        height={textBlock.bounds.size.height}
        fill="rgba(0,0,0,0)"
        strokeWidth="1"
        stroke="rgb(255,0,0)"
        />
      <SVGText fill="red" x={textBlock.bounds.origin.x} y={textBlock.bounds.origin.y}>
        {textBlock.value}
      </SVGText>
    </G>
  );

  snapRecipe() {
    console.log(this.state.textBlocks)
    textValues = this.state.textBlocks.map(t => t.value)
    this.props.navigation.navigate(
      'SnapRecipe',
      {
        textBlocks: textValues,
      }
    )
  }

  render() {
    const { textBlocks = [] } = this.state;
    return (
      <View style={styles.container}>
        <RNCamera
          ref={this.setRef}
          style={{ flex: 1, width, justifyContent: 'flex-end' }}
          type={RNCamera.Constants.Type.back}
          onTextRecognized={this.textRecognized}
          >
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>

            <TouchableOpacity onPress={this.snapRecipe.bind(this)} style={styles.capture}>
              <Text style={{ fontSize: 14 }}> Snap Recipe </Text>
            </TouchableOpacity>

          </View>
        </RNCamera>
        <Svg style={{ position: 'absolute', height: height - 40, width, top: 0, left: 0 }}>
          {textBlocks.map(block => this.renderBlock(block))}
        </Svg>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    alignSelf: 'center',
  },
});
